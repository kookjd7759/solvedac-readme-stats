from __future__ import annotations

import base64
import json
import mimetypes
import os
import re
import sys
from datetime import datetime, timedelta, timezone
from pathlib import Path
from time import perf_counter
from typing import Any
from urllib.error import HTTPError
from urllib.parse import quote, urlencode, urlparse
from urllib.request import Request, urlopen

from path import (
    PATH_BACKGROUND,
    PATH_BASE,
    PATH_BEDGE,
    PATH_PROFILE,
    PATH_USERDATA,
    PATH_USERLIST,
)


BASE_DIR = Path(PATH_BASE)
BACKGROUND_DIR = Path(PATH_BACKGROUND)
BADGE_DIR = Path(PATH_BEDGE)
PROFILE_DIR = Path(PATH_PROFILE)
USER_LIST_PATH = Path(PATH_USERLIST)
USER_DATA_PATH = Path(PATH_USERDATA)

DIRECT_API_BASE = "https://solved.ac/api/v3/user/show?handle="
FALLBACK_PROXY_BASE = "https://r.jina.ai/http://solved.ac/api/v3/user/show?handle="
PROFILE_MARKDOWN_BASE = "https://r.jina.ai/http://solved.ac/en/profile/"
STATIC_ASSET_BASE = "https://static.solved.ac"
DIRECT_SOLVED_BASE = "https://solved.ac"
BOJ_ACCEPTED_STATUS_BASE = "https://www.acmicpc.net/status"

REQUEST_TIMEOUT = 60
USER_AGENT = "solvedac-readme-stats-db-maker/1.0 (+https://github.com/kookjd7759/solvedac-readme-stats)"
DEFAULT_PROFILE_MARKERS = (
    "/misc/360x360/default_profile.png",
    "/misc/default_profile.png",
)
STREAK_DAY_SHIFT_MS = 3 * 60 * 60 * 1000
YEARLY_STREAK_GRID_DAYS = 53 * 7


def log(message: str) -> None:
    print(message, flush=True)


def log_error(message: str) -> None:
    print(message, file=sys.stderr, flush=True)


def format_elapsed(seconds: float) -> str:
    return f"{seconds:.2f}s"


def format_bytes(num_bytes: int) -> str:
    units = ["B", "KB", "MB", "GB"]
    value = float(num_bytes)
    unit_index = 0
    while value >= 1024 and unit_index < len(units) - 1:
        value /= 1024
        unit_index += 1
    return f"{value:.1f}{units[unit_index]}"


def log_stage_start(label: str, detail: str | None = None) -> float:
    suffix = f" -> {detail}" if detail else ""
    log(f"  step       {label} start{suffix}")
    return perf_counter()


def log_stage_done(label: str, started_at: float, detail: str | None = None) -> None:
    suffix = f" -> {detail}" if detail else ""
    log(f"  step       {label} done ({format_elapsed(perf_counter() - started_at)}){suffix}")


def sanitize_id_segment(value: str) -> str:
    cleaned = "".join(ch if ch.isalnum() or ch in {"-", "_"} else "-" for ch in value.strip())
    cleaned = cleaned.strip("-")
    return cleaned or "asset"


def ensure_directories() -> None:
    BACKGROUND_DIR.mkdir(parents=True, exist_ok=True)
    BADGE_DIR.mkdir(parents=True, exist_ok=True)
    PROFILE_DIR.mkdir(parents=True, exist_ok=True)


def default_data() -> dict[str, Any]:
    return {
        "users": {},
        "backgrounds": {},
        "badges": {},
    }


def parse_user_list_handle(line: str) -> str | None:
    stripped = line.strip()
    if not stripped:
        return None

    parts = stripped.split()
    if not parts:
        return None

    # Support both "handle" and "rank handle" formats from user_list.txt.
    return parts[-1].strip() or None


def read_user_list() -> list[str]:
    if not USER_LIST_PATH.exists():
        return []

    handles: list[str] = []
    for raw_line in USER_LIST_PATH.read_text(encoding="utf-8").splitlines():
        handle = parse_user_list_handle(raw_line)
        if handle:
            handles.append(handle)
    return handles


def load_user_data() -> dict[str, Any]:
    if not USER_DATA_PATH.exists():
        return default_data()

    raw = USER_DATA_PATH.read_text(encoding="utf-8").strip()
    if not raw:
        return default_data()

    parsed = json.loads(raw)
    if not isinstance(parsed, dict):
        return default_data()

    users_raw = parsed.get("users") if isinstance(parsed.get("users"), dict) else {}
    backgrounds_raw = parsed.get("backgrounds") if isinstance(parsed.get("backgrounds"), dict) else {}
    badges_raw = parsed.get("badges") if isinstance(parsed.get("badges"), dict) else {}

    users: dict[str, dict[str, Any]] = {}
    for handle, value in users_raw.items():
        if not isinstance(value, dict):
            continue

        normalized_user: dict[str, Any] = {}
        for key in (
            "handle",
            "tier",
            "solvedCount",
            "rank",
            "class",
            "classDecoration",
            "maxStreak",
            "tierAssetPath",
            "classAssetPath",
            "profileImagePath",
            "backgroundId",
            "backgroundPath",
            "badgeId",
            "badgePath",
            "streakSummary",
            "streakActivity",
        ):
            if key not in value:
                continue
            if key == "streakActivity":
                normalized_user[key] = normalize_streak_activity_payload(value[key])
            else:
                normalized_user[key] = value[key]

        users[handle] = normalized_user

    def normalize_asset_store(raw_store: dict[str, Any]) -> dict[str, str]:
        normalized: dict[str, str] = {}
        for asset_id, value in raw_store.items():
            if isinstance(value, str):
                normalized[asset_id] = value
            elif isinstance(value, dict) and isinstance(value.get("path"), str):
                normalized[asset_id] = value["path"]
        return normalized

    return {
        "users": users,
        "backgrounds": normalize_asset_store(backgrounds_raw),
        "badges": normalize_asset_store(badges_raw),
    }


def save_user_data(payload: dict[str, Any]) -> int:
    temp_path = USER_DATA_PATH.with_suffix(f"{USER_DATA_PATH.suffix}.tmp")
    serialized = json.dumps(payload, ensure_ascii=False, indent=2) + "\n"
    temp_path.write_text(
        serialized,
        encoding="utf-8",
    )
    temp_path.replace(USER_DATA_PATH)
    return len(serialized.encode("utf-8"))


def make_request(url: str, accept: str) -> Request:
    return Request(
        url,
        headers={
            "Accept": accept,
            "Accept-Language": "en-US,en;q=0.9,ko;q=0.8",
            "User-Agent": USER_AGENT,
        },
    )


def request_text(url: str, accept: str) -> tuple[str, str | None]:
    req = make_request(url, accept)
    with urlopen(req, timeout=REQUEST_TIMEOUT) as response:
        charset = response.headers.get_content_charset() or "utf-8"
        body = response.read().decode(charset, errors="replace")
        return body, response.headers.get("Content-Type")


def request_binary(url: str) -> tuple[bytes, str | None]:
    req = make_request(
        url,
        "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    )
    with urlopen(req, timeout=REQUEST_TIMEOUT) as response:
        return response.read(), response.headers.get("Content-Type")


def is_cloudflare_challenge(status: int, content_type: str | None, body: str) -> bool:
    if status != 403:
        return False
    ct = (content_type or "").lower()
    lower = body.lower()
    return "text/html" in ct and (
        "just a moment" in lower
        or "__cf_chl" in lower
        or "cloudflare" in lower
    )


def extract_first_json_object(text: str) -> str:
    trimmed = text.strip()
    if trimmed.startswith("{") and trimmed.endswith("}"):
        return trimmed

    marker = "Markdown Content:"
    marker_idx = trimmed.find(marker)
    if marker_idx >= 0:
        after_marker = trimmed[marker_idx + len(marker):].strip()
        if after_marker.startswith("{") and after_marker.endswith("}"):
            return after_marker

    first_brace = trimmed.find("{")
    last_brace = trimmed.rfind("}")
    if first_brace >= 0 and last_brace > first_brace:
        return trimmed[first_brace:last_brace + 1]

    raise ValueError("json object not found")


def parse_solved_user_from_text(text: str) -> dict[str, Any]:
    parsed = json.loads(extract_first_json_object(text))
    if not isinstance(parsed, dict) or not parsed.get("handle"):
        raise ValueError("invalid solved user payload")
    return parsed


def fetch_solved_user(handle: str) -> tuple[dict[str, Any], str]:
    clean_handle = handle.strip()
    if not clean_handle:
        raise ValueError("missing solved.ac handle")

    direct_url = f"{DIRECT_API_BASE}{quote(clean_handle)}"
    try:
        body, content_type = request_text(direct_url, "application/json")
        return parse_solved_user_from_text(body), "direct"
    except HTTPError as exc:
        body = ""
        try:
            body = exc.read().decode("utf-8", errors="replace")
        except Exception:
            body = ""
        if not is_cloudflare_challenge(exc.code, exc.headers.get("Content-Type") if exc.headers else None, body):
            raise RuntimeError(f"solved.ac API error {exc.code}") from exc
    except Exception:
        pass

    fallback_url = f"{FALLBACK_PROXY_BASE}{quote(clean_handle)}"
    body, _content_type = request_text(
        fallback_url,
        "text/plain, application/json;q=0.9, */*;q=0.8",
    )
    return parse_solved_user_from_text(body), "fallback"


def parse_profile_streak_summary(text: str) -> dict[str, int]:
    current_match = re.search(r"Streak\s+[*_]*?(\d+)[*_]*\s+days", text, re.IGNORECASE)
    longest_match = re.search(r"Longest:\s*[*_]*?(\d+)[*_]*\s+days", text, re.IGNORECASE)

    if not current_match and not longest_match:
        raise ValueError("streak section not found")

    return {
        "currentStreak": int(current_match.group(1)) if current_match else 0,
        "longestStreak": int(longest_match.group(1)) if longest_match else 0,
    }


def fetch_profile_streak_summary(handle: str) -> dict[str, int]:
    profile_url = f"{PROFILE_MARKDOWN_BASE}{quote(handle)}"
    body, _content_type = request_text(
        profile_url,
        "text/plain, text/markdown;q=0.9, */*;q=0.8",
    )
    return parse_profile_streak_summary(body)


def date_key_from_timestamp_ms(timestamp_ms: int) -> str:
    shifted = datetime.fromtimestamp(
        (timestamp_ms + STREAK_DAY_SHIFT_MS) / 1000,
        tz=timezone.utc,
    )
    return shifted.strftime("%Y-%m-%d")


def utc_date_from_date_key(date_key: str) -> datetime:
    year, month, day = (int(part) for part in date_key.split("-"))
    return datetime(year, month, day, tzinfo=timezone.utc)


def format_utc_date_key(dt: datetime) -> str:
    return dt.strftime("%Y-%m-%d")


def add_utc_days(dt: datetime, days: int) -> datetime:
    return dt + timedelta(days=days)


def get_yearly_grid_start_date_key(now_ms: int | None = None) -> str:
    now_value = now_ms if now_ms is not None else int(datetime.now(tz=timezone.utc).timestamp() * 1000)
    today_key = date_key_from_timestamp_ms(now_value)
    today = utc_date_from_date_key(today_key)
    grid_end = add_utc_days(today, 6 - int(today.strftime("%w")))
    grid_start = add_utc_days(grid_end, -(YEARLY_STREAK_GRID_DAYS - 1))
    return format_utc_date_key(grid_start)


def encode_active_date_keys(active_date_keys: set[str], start_date_key: str | None = None) -> dict[str, str]:
    if not active_date_keys:
        return {
            "startDate": start_date_key or get_yearly_grid_start_date_key(),
            "activeMask": "",
        }

    ordered_dates = sorted(active_date_keys)
    first_date_key = start_date_key or ordered_dates[0]
    first_date = utc_date_from_date_key(first_date_key)
    last_date = utc_date_from_date_key(ordered_dates[-1])
    total_days = (last_date - first_date).days + 1

    bit_bytes = bytearray((total_days + 7) // 8)
    for date_key in ordered_dates:
        offset = (utc_date_from_date_key(date_key) - first_date).days
        if offset < 0:
            continue
        bit_bytes[offset // 8] |= 1 << (offset % 8)

    encoded = base64.urlsafe_b64encode(bytes(bit_bytes)).decode("ascii").rstrip("=")
    return {
        "startDate": first_date_key,
        "activeMask": encoded,
    }


def normalize_streak_activity_payload(value: Any) -> dict[str, str]:
    if isinstance(value, dict):
        start_date = value.get("startDate")
        active_mask = value.get("activeMask")
        if isinstance(start_date, str) and isinstance(active_mask, str):
            return {
                "startDate": start_date,
                "activeMask": active_mask,
            }

        daily_counts = value.get("dailyCounts")
        if isinstance(daily_counts, dict):
            active_date_keys = {
                date_key
                for date_key, count in daily_counts.items()
                if isinstance(date_key, str) and isinstance(count, (int, float)) and count > 0
            }
            return encode_active_date_keys(active_date_keys)

    return {
        "startDate": get_yearly_grid_start_date_key(),
        "activeMask": "",
    }


def parse_accepted_status_page(html: str) -> tuple[list[int], str | None]:
    timestamps_ms = [
        int(match) * 1000
        for match in re.findall(r'data-timestamp="(\d+)"', html)
        if match.isdigit()
    ]
    next_top_match = re.search(
        r'<a\s+href="[^"]*?(?:top=|&amp;top=)(\d+)[^"]*"\s+id="next_page"',
        html,
        re.IGNORECASE,
    )
    next_top = next_top_match.group(1) if next_top_match else None
    return timestamps_ms, next_top


def fetch_accepted_status_page(handle: str, top: str | None = None) -> tuple[list[int], str | None]:
    params = {
        "user_id": handle,
        "result_id": "4",
    }
    if top:
        params["top"] = top

    url = f"{BOJ_ACCEPTED_STATUS_BASE}?{urlencode(params)}"
    body, _content_type = request_text(
        url,
        "text/html,application/xhtml+xml",
    )
    return parse_accepted_status_page(body)


def fetch_yearly_activity(handle: str) -> tuple[dict[str, str], int, dict[str, int | str]]:
    threshold_key = get_yearly_grid_start_date_key()
    threshold_day = utc_date_from_date_key(threshold_key)
    active_date_keys: set[str] = set()
    seen_tops: set[str] = set()
    next_top: str | None = None
    pages_fetched = 0
    submission_rows_seen = 0

    for _page in range(240):
        timestamps_ms, parsed_next_top = fetch_accepted_status_page(handle, next_top)
        pages_fetched += 1
        if not timestamps_ms:
            break

        submission_rows_seen += len(timestamps_ms)
        for timestamp_ms in timestamps_ms:
            date_key = date_key_from_timestamp_ms(timestamp_ms)
            day_dt = utc_date_from_date_key(date_key)
            if day_dt < threshold_day:
                continue
            active_date_keys.add(date_key)

        oldest_timestamp = min(timestamps_ms)
        oldest_date_key = date_key_from_timestamp_ms(oldest_timestamp)
        oldest_day = utc_date_from_date_key(oldest_date_key)

        if not parsed_next_top or oldest_day < threshold_day:
            break
        if parsed_next_top in seen_tops:
            break

        seen_tops.add(parsed_next_top)
        next_top = parsed_next_top

    return (
        encode_active_date_keys(active_date_keys, threshold_key),
        len(active_date_keys),
        {
            "pagesFetched": pages_fetched,
            "submissionRowsSeen": submission_rows_seen,
            "thresholdKey": threshold_key,
        },
    )


def normalize_asset_url(raw_url: str, base: str = STATIC_ASSET_BASE) -> str:
    value = raw_url.strip()
    if not value:
        return value
    if value.startswith("data:") or re.match(r"^https?://", value, re.IGNORECASE):
        return value
    if value.startswith("//"):
        return f"https:{value}"
    if value.startswith("/"):
        return f"{base}{value}"
    return value


def collect_matched_asset_urls(text: str, regex: re.Pattern[str]) -> list[str]:
    normalized = text.replace("\\/", "/")
    results = [normalize_asset_url(match).rstrip("?") for match in regex.findall(normalized)]
    unique: list[str] = []
    seen: set[str] = set()
    for url in results:
        if url and url not in seen:
            seen.add(url)
            unique.append(url)
    return unique


def score_by_size(url: str) -> int:
    match = re.search(r"/(\d{2,4})x(\d{2,4})/", url, re.IGNORECASE)
    if match:
        return int(match.group(1)) * int(match.group(2))
    return 1_000_000_000


def fetch_text_from_candidates(page_urls: list[str], accept: str) -> tuple[str, str]:
    errors: list[str] = []
    for page_url in page_urls:
        try:
            text, _content_type = request_text(page_url, accept)
            return text, page_url
        except Exception as exc:
            errors.append(f"{page_url}: {exc}")
    raise RuntimeError(errors[-1] if errors else "page fetch failed")


def extract_background_asset_urls(text: str, background_id: str) -> list[str]:
    escaped_id = re.escape(background_id)
    urls = collect_matched_asset_urls(
        text,
        re.compile(
            rf'(?:(?:https?:)?//[^"\' <>\n]+)?/profile_bg/[^"\' <>\n]*{escaped_id}[^"\' <>\n]*\.(?:avif|jpe?g|png|webp)(?:\?[^"\' <>\n]*)?',
            re.IGNORECASE,
        ),
    )
    if urls:
        return urls

    return collect_matched_asset_urls(
        text,
        re.compile(
            r'(?:(?:https?:)?//[^"\' <>\n]+)?/profile_bg/[^"\' <>\n]*\.(?:avif|jpe?g|png|webp)(?:\?[^"\' <>\n]*)?',
            re.IGNORECASE,
        ),
    )


def extract_badge_asset_urls(text: str, badge_id: str) -> list[str]:
    escaped_id = re.escape(badge_id)
    urls = collect_matched_asset_urls(
        text,
        re.compile(
            rf'(?:(?:https?:)?//[^"\' <>\n]+)?/profile_badge(?:/profile)?(?:/\d{{2,4}}x\d{{2,4}})?/{escaped_id}[^"\' <>\n]*\.(?:avif|png|svg|webp)(?:\?[^"\' <>\n]*)?',
            re.IGNORECASE,
        ),
    )
    if urls:
        return urls

    return collect_matched_asset_urls(
        text,
        re.compile(
            r'(?:(?:https?:)?//[^"\' <>\n]+)?/profile_badge(?:/profile)?(?:/\d{2,4}x\d{2,4})?/[^"\' <>\n]*\.(?:avif|png|svg|webp)(?:\?[^"\' <>\n]*)?',
            re.IGNORECASE,
        ),
    )


def resolve_background_url(background_id: str, handle: str) -> tuple[str | None, str]:
    detail_candidates = [
        f"{DIRECT_SOLVED_BASE}/en/backgrounds/{quote(background_id)}",
        f"{DIRECT_SOLVED_BASE}/backgrounds/{quote(background_id)}",
        f"https://r.jina.ai/http://solved.ac/en/backgrounds/{quote(background_id)}",
    ]
    profile_candidates = [
        f"{PROFILE_MARKDOWN_BASE}{quote(handle)}",
    ]

    try:
        text, _page_url = fetch_text_from_candidates(
            detail_candidates,
            "text/html,application/xhtml+xml,text/plain;q=0.9,*/*;q=0.8",
        )
        urls = extract_background_asset_urls(text, background_id)
        if urls:
            best = sorted(urls, key=score_by_size, reverse=True)[0]
            return best, "detail"
    except Exception:
        pass

    try:
        text, _page_url = fetch_text_from_candidates(
            profile_candidates,
            "text/plain, text/markdown;q=0.9, text/html;q=0.8, */*;q=0.5",
        )
        urls = extract_background_asset_urls(text, background_id)
        if urls:
            best = sorted(urls, key=score_by_size, reverse=True)[0]
            return best, "profile"
    except Exception:
        pass

    return None, "failed"


def resolve_badge_url(badge_id: str, handle: str) -> tuple[str | None, str]:
    detail_candidates = [
        f"{DIRECT_SOLVED_BASE}/badges/{quote(badge_id)}",
        f"{DIRECT_SOLVED_BASE}/en/badges/{quote(badge_id)}",
        f"https://r.jina.ai/http://solved.ac/en/badges/{quote(badge_id)}",
    ]
    profile_candidates = [
        f"{PROFILE_MARKDOWN_BASE}{quote(handle)}",
    ]

    try:
        text, _page_url = fetch_text_from_candidates(
            detail_candidates,
            "text/html,application/xhtml+xml,text/plain;q=0.9,*/*;q=0.8",
        )
        urls = extract_badge_asset_urls(text, badge_id)
        if urls:
            best = sorted(urls, key=score_by_size, reverse=True)[0]
            return best, "detail"
    except Exception:
        pass

    try:
        text, _page_url = fetch_text_from_candidates(
            profile_candidates,
            "text/plain, text/markdown;q=0.9, text/html;q=0.8, */*;q=0.5",
        )
        urls = extract_badge_asset_urls(text, badge_id)
        if urls:
            best = sorted(urls, key=score_by_size, reverse=True)[0]
            return best, "profile"
    except Exception:
        pass

    return None, "failed"


def guess_extension(url: str, content_type: str | None) -> str:
    suffix = Path(urlparse(url).path).suffix.lower()
    if suffix:
        return suffix
    if content_type:
        guessed = mimetypes.guess_extension(content_type.split(";")[0].strip())
        if guessed:
            return guessed
    return ".bin"


def relative_to_db_root(path: Path) -> str:
    return path.relative_to(BASE_DIR).as_posix()


def remove_legacy_duplicates(target_dir: Path, asset_id: str, keep_name: str) -> None:
    asset_key = sanitize_id_segment(asset_id)
    for child in target_dir.iterdir():
        if not child.is_file() or child.name == keep_name:
            continue
        stem = child.stem
        if stem.startswith(f"{asset_key}__") or f"__{asset_key}" in stem:
            child.unlink(missing_ok=True)


def is_default_profile_url(url: str | None) -> bool:
    if not url:
        return True
    lowered = url.lower()
    return any(marker in lowered for marker in DEFAULT_PROFILE_MARKERS)


def download_file_if_missing(url: str, output_path: Path) -> str:
    if output_path.exists():
        return "cached"
    binary, _content_type = request_binary(url)
    output_path.write_bytes(binary)
    return "saved"


def save_profile_image(handle: str, profile_url: str | None) -> tuple[str | None, str]:
    normalized_url = normalize_asset_url(profile_url) if isinstance(profile_url, str) else None
    if not normalized_url or is_default_profile_url(normalized_url):
        return None, "skipped"

    ext = guess_extension(normalized_url, None)
    output_path = PROFILE_DIR / f"{sanitize_id_segment(handle)}{ext}"
    status = download_file_if_missing(normalized_url, output_path)
    return relative_to_db_root(output_path), status


def ensure_shared_asset(
    asset_kind: str,
    asset_id: str | None,
    handle: str,
    resolved_url: str | None,
    target_dir: Path,
    store: dict[str, str],
) -> tuple[str | None, str]:
    if not isinstance(asset_id, str) or not asset_id:
        return None, "skipped"

    existing_path = store.get(asset_id)
    if existing_path and (BASE_DIR / existing_path).exists():
        return existing_path, "cached"

    source = "resolved"
    candidate_url = normalize_asset_url(resolved_url) if resolved_url else None
    if not candidate_url:
        if asset_kind == "background":
            candidate_url, source = resolve_background_url(asset_id, handle)
        else:
            candidate_url, source = resolve_badge_url(asset_id, handle)

    if not candidate_url:
        return None, "failed"

    ext = guess_extension(candidate_url, None)
    output_path = target_dir / f"{sanitize_id_segment(asset_id)}{ext}"
    status = download_file_if_missing(candidate_url, output_path)
    remove_legacy_duplicates(target_dir, asset_id, output_path.name)

    stored_path = relative_to_db_root(output_path)
    store[asset_id] = stored_path
    return stored_path, f"{status} ({source})"


def build_class_asset_path(user: dict[str, Any]) -> str | None:
    class_num = user.get("class")
    if not isinstance(class_num, int) or class_num < 1 or class_num > 10:
        return None

    decoration = user.get("classDecoration") or "none"
    suffix = "s" if decoration == "silver" else "g" if decoration == "gold" else ""
    return f"/class/c{class_num}{suffix}.svg"


def build_tier_asset_path(user: dict[str, Any]) -> str:
    tier = int(user.get("tier") or 0)
    return f"/tier_small/{tier}.svg"


def build_svg_ready_user_record(
    user: dict[str, Any],
    profile_path: str | None,
    background_path: str | None,
    badge_path: str | None,
    streak_summary: dict[str, int],
    streak_activity: dict[str, Any],
) -> dict[str, Any]:
    record: dict[str, Any] = {
        "handle": user.get("handle", ""),
        "tier": user.get("tier", 0),
        "solvedCount": user.get("solvedCount", 0),
        "rank": user.get("rank", 0),
        "class": user.get("class", 0),
        "classDecoration": user.get("classDecoration") or "none",
        "maxStreak": user.get("maxStreak", 0),
        "tierAssetPath": build_tier_asset_path(user),
        "streakSummary": streak_summary,
        "streakActivity": streak_activity,
    }

    class_asset_path = build_class_asset_path(user)
    if class_asset_path:
        record["classAssetPath"] = class_asset_path

    if profile_path:
        record["profileImagePath"] = profile_path

    if isinstance(user.get("backgroundId"), str) and user.get("backgroundId"):
        record["backgroundId"] = user["backgroundId"]
        if background_path:
            record["backgroundPath"] = background_path
    if isinstance(user.get("badgeId"), str) and user.get("badgeId"):
        record["badgeId"] = user["badgeId"]
        if badge_path:
            record["badgePath"] = badge_path

    return record


def main() -> int:
    ensure_directories()
    handles = read_user_list()

    if not handles:
        log(f"[done] no handles in {USER_LIST_PATH}")
        return 0

    data = load_user_data()
    users = data.get("users")
    backgrounds = data.get("backgrounds")
    badges = data.get("badges")
    if not isinstance(users, dict):
        users = {}
        data["users"] = users
    if not isinstance(backgrounds, dict):
        backgrounds = {}
        data["backgrounds"] = backgrounds
    if not isinstance(badges, dict):
        badges = {}
        data["badges"] = badges

    total = len(handles)
    seen_in_run: set[str] = set()
    successful_updates = 0

    for index, handle in enumerate(handles, start=1):
        if handle in seen_in_run:
            log(f"[{index}/{total}] {handle}")
            log("  duplicate  skipped")
            continue
        seen_in_run.add(handle)

        log(f"[{index}/{total}] {handle}")
        try:
            user_fetch_started = log_stage_start("user fetch", handle)
            user, api_source = fetch_solved_user(handle)
            log_stage_done(
                "user fetch",
                user_fetch_started,
                f"{api_source}, solved={user.get('solvedCount', 0)}, rank={user.get('rank', 0)}",
            )

            profile_started = log_stage_start("profile image", user.get("profileImageUrl") or "default/skipped")
            profile_path, profile_status = save_profile_image(
                handle,
                user.get("profileImageUrl"),
            )
            log_stage_done(
                "profile image",
                profile_started,
                f"{profile_status}" + (f", path={profile_path}" if profile_path else ""),
            )

            background_started = log_stage_start("background asset", str(user.get("backgroundId") or "none"))
            background_path, background_status = ensure_shared_asset(
                asset_kind="background",
                asset_id=user.get("backgroundId"),
                handle=handle,
                resolved_url=None,
                target_dir=BACKGROUND_DIR,
                store=backgrounds,
            )
            log_stage_done(
                "background asset",
                background_started,
                f"{background_status}" + (f", path={background_path}" if background_path else ""),
            )

            badge_started = log_stage_start("badge asset", str(user.get("badgeId") or "none"))
            badge_path, badge_status = ensure_shared_asset(
                asset_kind="badge",
                asset_id=user.get("badgeId"),
                handle=handle,
                resolved_url=None,
                target_dir=BADGE_DIR,
                store=badges,
            )
            log_stage_done(
                "badge asset",
                badge_started,
                f"{badge_status}" + (f", path={badge_path}" if badge_path else ""),
            )

            streak_status = "default"
            streak_summary = {
                "currentStreak": 0,
                "longestStreak": int(user.get("maxStreak") or 0),
            }
            streak_summary_started = log_stage_start("streak summary", handle)
            try:
                fetched_streak_summary = fetch_profile_streak_summary(handle)
                streak_summary = {
                    "currentStreak": int(fetched_streak_summary.get("currentStreak") or 0),
                    "longestStreak": max(
                        int(fetched_streak_summary.get("longestStreak") or 0),
                        int(user.get("maxStreak") or 0),
                    ),
                }
                streak_status = "saved"
            except Exception:
                streak_status = "summary-fallback"
            log_stage_done(
                "streak summary",
                streak_summary_started,
                f"{streak_status}, current={streak_summary['currentStreak']}, longest={streak_summary['longestStreak']}",
            )

            streak_activity = {
                "startDate": get_yearly_grid_start_date_key(),
                "activeMask": "",
            }
            streak_active_days = 0
            streak_activity_meta: dict[str, int | str] = {
                "pagesFetched": 0,
                "submissionRowsSeen": 0,
                "thresholdKey": streak_activity["startDate"],
            }
            streak_activity_started = log_stage_start("streak activity", handle)
            try:
                streak_activity, streak_active_days, streak_activity_meta = fetch_yearly_activity(handle)
                if streak_status == "saved":
                    streak_status = "saved + activity"
                else:
                    streak_status = "activity-only"
            except Exception:
                if streak_status == "saved":
                    streak_status = "summary-only"
                else:
                    streak_status = "fallback"
            log_stage_done(
                "streak activity",
                streak_activity_started,
                "status="
                + streak_status
                + f", activeDays={streak_active_days}, pages={streak_activity_meta.get('pagesFetched', 0)}, rows={streak_activity_meta.get('submissionRowsSeen', 0)}",
            )

            users[handle] = build_svg_ready_user_record(
                user=user,
                profile_path=profile_path,
                background_path=background_path,
                badge_path=badge_path,
                streak_summary=streak_summary,
                streak_activity=streak_activity,
            )
            successful_updates += 1

            log(f"  user       ok ({api_source})")
            log(f"  profile    {profile_status}" + (f" -> {profile_path}" if profile_path else ""))
            log(f"  background {background_status}" + (f" -> {background_path}" if background_path else ""))
            log(f"  badge      {badge_status}" + (f" -> {badge_path}" if badge_path else ""))
            log(
                "  streak     "
                + streak_status
                + f" -> current {streak_summary['currentStreak']}, longest {streak_summary['longestStreak']}, activeDays {streak_active_days}"
            )

            save_started = log_stage_start("json save", USER_DATA_PATH.name)
            bytes_written = save_user_data(data)
            log_stage_done(
                "json save",
                save_started,
                f"{USER_DATA_PATH.name}, users={successful_updates}, size={format_bytes(bytes_written)}",
            )
            log(f"  checkpoint saved -> {USER_DATA_PATH.name} ({successful_updates} users)")
        except Exception as exc:
            log_error(f"  error      {exc}")

    log(f"[done] saved {USER_DATA_PATH} ({successful_updates} users)")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
