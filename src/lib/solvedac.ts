export type SolvedUser = {
  handle: string;
  tier: number;

  solvedCount?: number;
  rank?: number;

  class?: number;
  classDecoration?: string;

  profileImageUrl?: string | null;

  backgroundId?: string | null;
  badgeId?: string | null;

  maxStreak?: number;
};

export type SolvedStreakSummary = {
  currentStreak: number;
  longestStreak: number;
};

export type SolvedYearlyActivity = {
  dailyCounts: Record<string, number>;
  activeDays: number;
};

const DIRECT_API_BASE = "https://solved.ac/api/v3/user/show?handle=";
const FALLBACK_PROXY_BASE = "https://r.jina.ai/http://solved.ac/api/v3/user/show?handle=";
const PROFILE_MARKDOWN_BASE = "https://r.jina.ai/http://solved.ac/en/profile/";
const BOJ_ACCEPTED_STATUS_BASE = "https://www.acmicpc.net/status";
const CACHE_TTL_MS = 5 * 60 * 1000;
const STREAK_DAY_SHIFT_MS = 3 * 60 * 60 * 1000;
const YEARLY_STREAK_GRID_DAYS = 53 * 7;

const USER_CACHE = new Map<string, { value: SolvedUser; expiresAt: number }>();
const STREAK_CACHE = new Map<string, { value: SolvedStreakSummary; expiresAt: number }>();
const YEARLY_ACTIVITY_CACHE = new Map<
  string,
  { value: SolvedYearlyActivity; expiresAt: number }
>();

function isCloudflareChallenge(status: number, contentType: string | null, body: string) {
  if (status !== 403) return false;
  const ct = (contentType || "").toLowerCase();
  const lower = body.toLowerCase();
  return (
    ct.includes("text/html") &&
    (lower.includes("just a moment") ||
      lower.includes("__cf_chl") ||
      lower.includes("cloudflare"))
  );
}

function extractFirstJsonObject(text: string) {
  const trimmed = text.trim();
  if (trimmed.startsWith("{") && trimmed.endsWith("}")) return trimmed;

  const marker = "Markdown Content:";
  const markerIdx = trimmed.indexOf(marker);
  if (markerIdx >= 0) {
    const afterMarker = trimmed.slice(markerIdx + marker.length).trim();
    if (afterMarker.startsWith("{") && afterMarker.endsWith("}")) return afterMarker;
  }

  const firstBrace = trimmed.indexOf("{");
  const lastBrace = trimmed.lastIndexOf("}");
  if (firstBrace >= 0 && lastBrace > firstBrace) {
    return trimmed.slice(firstBrace, lastBrace + 1);
  }

  throw new Error("solved.ac fallback parse error: json object not found");
}

function parseSolvedUserFromText(text: string) {
  const jsonText = extractFirstJsonObject(text);
  const parsed = JSON.parse(jsonText) as SolvedUser;

  if (!parsed || typeof parsed !== "object" || !parsed.handle) {
    throw new Error("solved.ac fallback parse error: invalid payload");
  }

  return parsed;
}

async function fetchDirect(handle: string): Promise<SolvedUser> {
  const url = `${DIRECT_API_BASE}${encodeURIComponent(handle)}`;
  const res = await fetch(url, {
    headers: {
      Accept: "application/json",
      "User-Agent":
        "solvedac-readme-stats/1.0 (+https://github.com/kookjd7759/solvedac-readme-stats)",
    },
    cache: "no-store",
  });

  const body = await res.text();
  if (!res.ok) {
    if (isCloudflareChallenge(res.status, res.headers.get("content-type"), body)) {
      throw new Error("solved.ac direct blocked by Cloudflare");
    }
    throw new Error(`solved.ac API error ${res.status}`);
  }

  return parseSolvedUserFromText(body);
}

async function fetchViaFallbackProxy(handle: string): Promise<SolvedUser> {
  const url = `${FALLBACK_PROXY_BASE}${encodeURIComponent(handle)}`;
  const res = await fetch(url, {
    headers: {
      Accept: "text/plain, application/json;q=0.9, */*;q=0.8",
      "User-Agent":
        "solvedac-readme-stats/1.0 (+https://github.com/kookjd7759/solvedac-readme-stats)",
    },
    cache: "no-store",
  });

  const body = await res.text();
  if (!res.ok) {
    throw new Error(`solved.ac fallback proxy error ${res.status}`);
  }

  return parseSolvedUserFromText(body);
}

function parseSolvedStreakSummary(text: string): SolvedStreakSummary {
  const currentMatch = text.match(/Streak\s+[*_]*?(\d+)[*_]*\s+days/i);
  const longestMatch = text.match(/Longest:\s*[*_]*?(\d+)[*_]*\s+days/i);

  if (!currentMatch && !longestMatch) {
    throw new Error("solved.ac profile parse error: streak section not found");
  }

  return {
    currentStreak: Number(currentMatch?.[1] || 0),
    longestStreak: Number(longestMatch?.[1] || 0),
  };
}

async function fetchProfileStreakViaMarkdown(handle: string): Promise<SolvedStreakSummary> {
  const url = `${PROFILE_MARKDOWN_BASE}${encodeURIComponent(handle)}`;
  const res = await fetch(url, {
    headers: {
      Accept: "text/plain, text/markdown;q=0.9, */*;q=0.8",
      "User-Agent":
        "solvedac-readme-stats/1.0 (+https://github.com/kookjd7759/solvedac-readme-stats)",
    },
    cache: "no-store",
  });

  const body = await res.text();
  if (!res.ok) {
    throw new Error(`solved.ac profile fallback error ${res.status}`);
  }

  return parseSolvedStreakSummary(body);
}

function dateKeyFromTimestampMs(timestampMs: number) {
  return new Date(timestampMs + STREAK_DAY_SHIFT_MS).toISOString().slice(0, 10);
}

function utcDateFromDateKey(dateKey: string) {
  const [year, month, day] = dateKey.split("-").map(Number);
  return new Date(Date.UTC(year!, (month || 1) - 1, day || 1));
}

function formatUtcDateKey(date: Date) {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function addUtcDays(date: Date, days: number) {
  const next = new Date(date.getTime());
  next.setUTCDate(next.getUTCDate() + days);
  return next;
}

function getYearlyGridStartDateKey(nowMs = Date.now()) {
  const todayKey = dateKeyFromTimestampMs(nowMs);
  const today = utcDateFromDateKey(todayKey);
  const gridEnd = addUtcDays(today, 6 - today.getUTCDay());
  return formatUtcDateKey(addUtcDays(gridEnd, -(YEARLY_STREAK_GRID_DAYS - 1)));
}

type AcceptedStatusPage = {
  timestampsMs: number[];
  nextTop: string | null;
};

function parseAcceptedStatusPage(html: string): AcceptedStatusPage {
  const timestampsMs = Array.from(html.matchAll(/data-timestamp="(\d+)"/g))
    .map((match) => Number(match[1]) * 1000)
    .filter((value) => Number.isFinite(value) && value > 0);

  const nextTop =
    html.match(/<a\s+href="[^"]*?(?:top=|&amp;top=)(\d+)[^"]*"\s+id="next_page"/i)?.[1] || null;

  return { timestampsMs, nextTop };
}

async function fetchAcceptedStatusPage(
  handle: string,
  top?: string
): Promise<AcceptedStatusPage> {
  const url = new URL(BOJ_ACCEPTED_STATUS_BASE);
  url.searchParams.set("user_id", handle);
  url.searchParams.set("result_id", "4");
  if (top) {
    url.searchParams.set("top", top);
  }

  const res = await fetch(url.toString(), {
    headers: {
      Accept: "text/html,application/xhtml+xml",
      "Accept-Language": "ko,en-US;q=0.9,en;q=0.8",
      "User-Agent":
        "solvedac-readme-stats/1.0 (+https://github.com/kookjd7759/solvedac-readme-stats)",
    },
    cache: "no-store",
  });

  const body = await res.text();
  if (!res.ok) {
    throw new Error(`BOJ accepted status fetch failed (${res.status})`);
  }

  return parseAcceptedStatusPage(body);
}

export async function fetchSolvedUser(handle: string): Promise<SolvedUser> {
  const cleanHandle = handle.trim();
  if (!cleanHandle) throw new Error("missing solved.ac handle");

  const cached = USER_CACHE.get(cleanHandle);
  if (cached && cached.expiresAt > Date.now()) return cached.value;

  try {
    const user = await fetchDirect(cleanHandle);
    USER_CACHE.set(cleanHandle, { value: user, expiresAt: Date.now() + CACHE_TTL_MS });
    return user;
  } catch (directErr: any) {
    try {
      const user = await fetchViaFallbackProxy(cleanHandle);
      USER_CACHE.set(cleanHandle, { value: user, expiresAt: Date.now() + CACHE_TTL_MS });
      return user;
    } catch (fallbackErr: any) {
      const directMsg = directErr?.message || "direct fetch failed";
      const fallbackMsg = fallbackErr?.message || "fallback fetch failed";
      throw new Error(`solved.ac API unavailable (${directMsg}; ${fallbackMsg})`);
    }
  }
}

export async function fetchSolvedStreakSummary(handle: string): Promise<SolvedStreakSummary> {
  const cleanHandle = handle.trim();
  if (!cleanHandle) throw new Error("missing solved.ac handle");

  const cached = STREAK_CACHE.get(cleanHandle);
  if (cached && cached.expiresAt > Date.now()) return cached.value;

  const summary = await fetchProfileStreakViaMarkdown(cleanHandle);
  STREAK_CACHE.set(cleanHandle, {
    value: summary,
    expiresAt: Date.now() + CACHE_TTL_MS,
  });
  return summary;
}

export async function fetchSolvedYearlyActivity(
  handle: string
): Promise<SolvedYearlyActivity> {
  const cleanHandle = handle.trim();
  if (!cleanHandle) throw new Error("missing solved.ac handle");

  const cached = YEARLY_ACTIVITY_CACHE.get(cleanHandle);
  if (cached && cached.expiresAt > Date.now()) return cached.value;

  const thresholdKey = getYearlyGridStartDateKey();
  const thresholdDayMs = utcDateFromDateKey(thresholdKey).getTime();
  const dailyCounts = new Map<string, number>();
  const seenTops = new Set<string>();
  let nextTop: string | null = null;

  for (let page = 0; page < 240; page += 1) {
    const statusPage = await fetchAcceptedStatusPage(cleanHandle, nextTop || undefined);

    if (statusPage.timestampsMs.length === 0) {
      break;
    }

    for (const timestampMs of statusPage.timestampsMs) {
      const dateKey = dateKeyFromTimestampMs(timestampMs);
      const dayMs = utcDateFromDateKey(dateKey).getTime();
      if (dayMs < thresholdDayMs) continue;

      dailyCounts.set(dateKey, (dailyCounts.get(dateKey) || 0) + 1);
    }

    const oldestTimestampMs = Math.min(...statusPage.timestampsMs);
    const oldestDateKey = dateKeyFromTimestampMs(oldestTimestampMs);
    const oldestDayMs = utcDateFromDateKey(oldestDateKey).getTime();

    if (!statusPage.nextTop || oldestDayMs < thresholdDayMs) {
      break;
    }

    if (seenTops.has(statusPage.nextTop)) {
      break;
    }

    seenTops.add(statusPage.nextTop);
    nextTop = statusPage.nextTop;
  }

  const activity: SolvedYearlyActivity = {
    dailyCounts: Object.fromEntries(
      [...dailyCounts.entries()].sort((a, b) => a[0].localeCompare(b[0]))
    ),
    activeDays: dailyCounts.size,
  };

  YEARLY_ACTIVITY_CACHE.set(cleanHandle, {
    value: activity,
    expiresAt: Date.now() + CACHE_TTL_MS,
  });

  return activity;
}
