from __future__ import annotations

import json
import mimetypes
import os
import re
import sys
from datetime import datetime, timezone
from pathlib import Path
from typing import Any
from urllib.error import HTTPError, URLError
from urllib.parse import quote, quote as url_quote, urlparse
from urllib.request import Request, urlopen


BASE_DIR = Path(__file__).resolve().parent
USER_LIST_PATH = BASE_DIR / "user_list.txt"
USER_DATA_PATH = BASE_DIR / "user_data.json"
IMG_DIR = BASE_DIR / "img"
PROFILE_DIR = IMG_DIR / "profile"
BACKGROUND_DIR = IMG_DIR / "background"
BADGE_DIR = IMG_DIR / "bedge"

API_BASE_CANDIDATES = [
    os.getenv("SOLVEDAC_README_STATS_API_BASE", "").strip(),
    "http://localhost:3000",
    "https://solvedac-readme-stats.vercel.app",
]

USER_AGENT = "solvedac-readme-stats-db-maker/1.0"
REQUEST_TIMEOUT = 30
ASSET_URL_RE = re.compile(
    r"https?://[^\s\"'<>]+?\.(?:avif|png|svg|webp|jpe?g)(?:\?[^)\]\s\"'<>]*)?",
    re.IGNORECASE,
)
DEFAULT_PROFILE_MARKERS = (
    "/misc/360x360/default_profile.png",
    "/misc/default_profile.png",
)


def utc_now_iso() -> str:
    return datetime.now(timezone.utc).replace(microsecond=0).isoformat()


def unique_non_empty(values: list[str]) -> list[str]:
    seen: set[str] = set()
    result: list[str] = []
    for value in values:
        normalized = value.strip()
        if not normalized or normalized in seen:
            continue
        seen.add(normalized)
        result.append(normalized)
    return result


def sanitize_id_segment(value: str) -> str:
    cleaned = "".join(ch if ch.isalnum() or ch in {"-", "_"} else "-" for ch in value.strip())
    cleaned = cleaned.strip("-")
    return cleaned or "asset"


def encode_name_segment(value: str | None) -> str:
    if not value:
        return "unknown"
    return url_quote(value.strip(), safe="") or "unknown"


def ensure_directories() -> None:
    IMG_DIR.mkdir(parents=True, exist_ok=True)
    PROFILE_DIR.mkdir(parents=True, exist_ok=True)
    BACKGROUND_DIR.mkdir(parents=True, exist_ok=True)
    BADGE_DIR.mkdir(parents=True, exist_ok=True)


def read_user_list() -> list[str]:
    if not USER_LIST_PATH.exists():
        return []

    handles = [
        line.strip()
        for line in USER_LIST_PATH.read_text(encoding="utf-8").splitlines()
        if line.strip()
    ]
    return unique_non_empty(handles)


def default_data() -> dict[str, Any]:
    return {
        "users": {},
        "backgrounds": {},
        "badges": {},
    }


def load_user_data() -> dict[str, Any]:
    if not USER_DATA_PATH.exists():
        return default_data()

    raw = USER_DATA_PATH.read_text(encoding="utf-8").strip()
    if not raw:
        return default_data()

    parsed = json.loads(raw)
    if not isinstance(parsed, dict):
        return default_data()

    users = parsed.get("users") if isinstance(parsed.get("users"), dict) else {}
    backgrounds_raw = parsed.get("backgrounds") if isinstance(parsed.get("backgrounds"), dict) else {}
    badges_raw = parsed.get("badges") if isinstance(parsed.get("badges"), dict) else {}

    backgrounds: dict[str, str] = {}
    for asset_id, value in backgrounds_raw.items():
        if isinstance(value, str):
            backgrounds[asset_id] = value
        elif isinstance(value, dict) and isinstance(value.get("path"), str):
            backgrounds[asset_id] = value["path"]

    badges: dict[str, str] = {}
    for asset_id, value in badges_raw.items():
        if isinstance(value, str):
            badges[asset_id] = value
        elif isinstance(value, dict) and isinstance(value.get("path"), str):
            badges[asset_id] = value["path"]

    normalized_users: dict[str, dict[str, Any]] = {}
    for handle, value in users.items():
        if not isinstance(value, dict):
            continue

        user_payload = value.get("user") if isinstance(value.get("user"), dict) else value
        profile_image_path = value.get("profileImagePath")
        if not isinstance(profile_image_path, str):
            render_sources = value.get("renderSources") if isinstance(value.get("renderSources"), dict) else {}
            profile_image_path = render_sources.get("profilePath") or value.get("profileImagePath")

        next_user: dict[str, Any] = {
            "tier": user_payload.get("tier", 0),
            "solvedCount": user_payload.get("solvedCount", 0),
            "rank": user_payload.get("rank", 0),
            "class": user_payload.get("class", 0),
            "classDecoration": user_payload.get("classDecoration") or "none",
            "maxStreak": user_payload.get("maxStreak", 0),
        }

        background_id = user_payload.get("backgroundId")
        badge_id = user_payload.get("badgeId")

        if isinstance(profile_image_path, str) and profile_image_path:
            next_user["profileImagePath"] = profile_image_path
        if isinstance(background_id, str) and background_id:
            next_user["backgroundId"] = background_id
        if isinstance(badge_id, str) and badge_id:
            next_user["badgeId"] = badge_id

        normalized_users[handle] = next_user

    return {
        "users": normalized_users,
        "backgrounds": backgrounds,
        "badges": badges,
    }


def save_user_data(payload: dict[str, Any]) -> None:
    USER_DATA_PATH.write_text(
        json.dumps(payload, ensure_ascii=False, indent=2) + "\n",
        encoding="utf-8",
    )


def request_text(url: str, accept: str) -> str:
    req = Request(
        url,
        headers={
            "Accept": accept,
            "User-Agent": USER_AGENT,
        },
    )
    with urlopen(req, timeout=REQUEST_TIMEOUT) as response:
        charset = response.headers.get_content_charset() or "utf-8"
        return response.read().decode(charset, errors="replace")


def request_binary(url: str) -> tuple[bytes, str | None]:
    req = Request(
        url,
        headers={
            "Accept": "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
            "User-Agent": USER_AGENT,
        },
    )
    with urlopen(req, timeout=REQUEST_TIMEOUT) as response:
        return response.read(), response.headers.get("Content-Type")


def normalize_asset_url(value: Any) -> str | None:
    if not isinstance(value, str):
        return None

    stripped = value.strip()
    match = ASSET_URL_RE.search(stripped)
    if match:
        return match.group(0)

    return stripped or None


def log_info(message: str) -> None:
    print(message)


def log_warn(message: str) -> None:
    print(message, file=sys.stderr)


def fetch_debug_payload(handle: str) -> tuple[dict[str, Any], str]:
    errors: list[str] = []

    for base_url in unique_non_empty(API_BASE_CANDIDATES):
        debug_url = f"{base_url.rstrip('/')}/api?handle={quote(handle)}&v=2&debug=1"
        try:
            body = request_text(debug_url, "application/json, text/plain;q=0.9, */*;q=0.8")
            payload = json.loads(body)
            if not isinstance(payload, dict) or "user" not in payload:
                raise ValueError("debug payload does not contain a user object")
            return payload, base_url.rstrip("/")
        except (HTTPError, URLError, TimeoutError, ValueError, json.JSONDecodeError) as exc:
            errors.append(f"{base_url}: {exc}")

    raise RuntimeError(
        "Unable to fetch debug payload for "
        f"{handle}. Tried: {' | '.join(errors) if errors else 'no API base configured'}"
    )


def fetch_profile_markdown(handle: str) -> str:
    url = f"https://r.jina.ai/http://solved.ac/en/profile/{quote(handle)}"
    return request_text(url, "text/plain, text/markdown;q=0.9, */*;q=0.8")


def fetch_asset_detail_markdown(asset_kind: str, asset_id: str) -> str:
    if asset_kind == "background":
        url = f"https://r.jina.ai/http://solved.ac/en/backgrounds/{quote(asset_id)}"
    else:
        url = f"https://r.jina.ai/http://solved.ac/en/badges/{quote(asset_id)}"
    return request_text(url, "text/plain, text/markdown;q=0.9, */*;q=0.8")


def resolve_asset_url_from_detail_page(asset_kind: str, asset_id: str) -> str | None:
    try:
        markdown = fetch_asset_detail_markdown(asset_kind, asset_id)
    except Exception:
        return None

    if asset_kind == "background":
        pattern = re.compile(
            rf"https?://[^\s\"'<>]*?/profile_bg/[^\s\"'<>]*{re.escape(asset_id)}[^\s\"'<>]*\.(?:avif|png|webp|jpe?g)(?:\?[^)\]\s\"'<>]*)?",
            re.IGNORECASE,
        )
    else:
        pattern = re.compile(
            rf"https?://[^\s\"'<>]*?/profile_badge(?:/profile)?(?:/\d{{2,4}}x\d{{2,4}})?/{re.escape(asset_id)}[^\s\"'<>]*\.(?:avif|png|svg|webp)(?:\?[^)\]\s\"'<>]*)?",
            re.IGNORECASE,
        )

    match = pattern.search(markdown)
    if match:
        return normalize_asset_url(match.group(0))

    if asset_kind == "background":
        fallback = re.search(
            r"https?://[^\s\"'<>]*?/profile_bg/[^\s\"'<>]*\.(?:avif|png|webp|jpe?g)(?:\?[^)\]\s\"'<>]*)?",
            markdown,
            re.IGNORECASE,
        )
    else:
        fallback = re.search(
            r"https?://[^\s\"'<>]*?/profile_badge(?:/profile)?(?:/\d{2,4}x\d{2,4})?/[^\\s\"'<>]*\.(?:avif|png|svg|webp)(?:\?[^)\]\s\"'<>]*)?",
            markdown,
            re.IGNORECASE,
        )

    if fallback:
        return normalize_asset_url(fallback.group(0))

    return None


def guess_extension(url: str, content_type: str | None) -> str:
    parsed = urlparse(url)
    suffix = Path(parsed.path).suffix.lower()
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

    normalized = url.lower()
    return any(marker in normalized for marker in DEFAULT_PROFILE_MARKERS)


def download_file_if_missing(url: str, output_path: Path) -> tuple[str, str | None, int | None]:
    if output_path.exists():
        return "cached", None, output_path.stat().st_size

    binary, content_type = request_binary(url)
    output_path.write_bytes(binary)
    return "saved", content_type, len(binary)


def save_profile_image(handle: str, profile_url: str | None) -> tuple[str | None, str]:
    normalized_url = normalize_asset_url(profile_url)
    if not normalized_url or is_default_profile_url(normalized_url):
        return None, "skipped (default or missing)"

    ext = guess_extension(normalized_url, None)
    output_path = PROFILE_DIR / f"{sanitize_id_segment(handle)}{ext}"
    status, _content_type, _size = download_file_if_missing(normalized_url, output_path)
    return relative_to_db_root(output_path), status


def ensure_shared_asset(
    asset_kind: str,
    asset_id: str | None,
    asset_payload: dict[str, Any],
    target_dir: Path,
    store: dict[str, Any],
) -> tuple[str | None, str]:
    if not asset_id:
        return None, "skipped (missing id)"

    resolved_url = normalize_asset_url(asset_payload.get("resolvedUrl"))
    used_fallback = False
    if not resolved_url:
        resolved_url = resolve_asset_url_from_detail_page(asset_kind, asset_id)
        used_fallback = bool(resolved_url)
    if not resolved_url:
        return None, "failed (resolvedUrl missing)"

    existing = store.get(asset_id)
    existing_path = existing if isinstance(existing, str) else None
    if isinstance(existing_path, str) and (BASE_DIR / existing_path).exists():
        return existing_path, "cached"

    ext = guess_extension(resolved_url, None)
    filename = f"{sanitize_id_segment(asset_id)}{ext}"
    output_path = target_dir / filename
    existing_file_path: Path | None = None
    if isinstance(existing_path, str):
        candidate = BASE_DIR / existing_path
        if candidate.exists():
            existing_file_path = candidate

    if existing_file_path and existing_file_path.resolve() != output_path.resolve() and not output_path.exists():
        existing_file_path.replace(output_path)

    status, content_type, size = download_file_if_missing(resolved_url, output_path)
    remove_legacy_duplicates(target_dir, asset_id, output_path.name)

    stored_path = relative_to_db_root(output_path)
    store[asset_id] = stored_path
    if used_fallback:
        return stored_path, f"{status} (detail fallback)"
    return stored_path, status


def build_minimal_user_record(
    handle: str,
    payload: dict[str, Any],
    profile_path: str | None,
) -> dict[str, Any]:
    user = payload.get("user") if isinstance(payload.get("user"), dict) else {}

    record: dict[str, Any] = {
        "tier": user.get("tier", 0),
        "solvedCount": user.get("solvedCount", 0),
        "rank": user.get("rank", 0),
        "class": user.get("class", 0),
        "classDecoration": user.get("classDecoration") or "none",
        "maxStreak": user.get("maxStreak", 0),
    }

    if profile_path:
        record["profileImagePath"] = profile_path

    background_id = user.get("backgroundId")
    badge_id = user.get("badgeId")

    if background_id:
        record["backgroundId"] = background_id
    if badge_id:
        record["badgeId"] = badge_id

    return record


def main() -> int:
    ensure_directories()
    handles = read_user_list()

    if not handles:
        print("No handles found in DB/user_list.txt")
        return 0

    data = load_user_data()
    users = data["users"] if isinstance(data.get("users"), dict) else {}
    backgrounds = data["backgrounds"] if isinstance(data.get("backgrounds"), dict) else {}
    badges = data["badges"] if isinstance(data.get("badges"), dict) else {}
    data["users"] = users
    data["backgrounds"] = backgrounds
    data["badges"] = badges

    for handle in handles:
        log_info(f"[handle] {handle}")
        try:
            payload, api_base = fetch_debug_payload(handle)
            log_info(f"  api: ok ({api_base})")

            user = payload.get("user") if isinstance(payload.get("user"), dict) else {}
            assets = payload.get("assets") if isinstance(payload.get("assets"), dict) else {}

            profile_path, profile_status = save_profile_image(
                handle,
                user.get("profileImageUrl"),
            )
            log_info(f"  profile: {profile_status}" + (f" -> {profile_path}" if profile_path else ""))

            background_path, background_status = ensure_shared_asset(
                asset_kind="background",
                asset_id=user.get("backgroundId"),
                asset_payload=dict(assets.get("background") or {}),
                target_dir=BACKGROUND_DIR,
                store=backgrounds,
            )
            log_info(
                f"  background: {background_status}"
                + (f" -> {background_path}" if background_path else "")
            )

            badge_path, badge_status = ensure_shared_asset(
                asset_kind="badge",
                asset_id=user.get("badgeId"),
                asset_payload=dict(assets.get("badge") or {}),
                target_dir=BADGE_DIR,
                store=badges,
            )
            log_info(
                f"  badge: {badge_status}"
                + (f" -> {badge_path}" if badge_path else "")
            )

            users[handle] = build_minimal_user_record(handle, payload, profile_path)
            log_info(f"[ok] {handle}")
        except Exception as exc:
            log_warn(f"[error] {handle}: {exc}")

    save_user_data(data)
    log_info(f"[done] saved {USER_DATA_PATH}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
