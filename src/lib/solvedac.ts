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
const BOJ_USER_PAGE_BASE = "https://www.acmicpc.net/user/";
const CACHE_TTL_MS = 5 * 60 * 1000;
const KST_OFFSET_MS = 9 * 60 * 60 * 1000;
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
  const todayKey = new Date(nowMs + KST_OFFSET_MS).toISOString().slice(0, 10);
  const today = utcDateFromDateKey(todayKey);
  const gridEnd = addUtcDays(today, 6 - today.getUTCDay());
  return formatUtcDateKey(addUtcDays(gridEnd, -(YEARLY_STREAK_GRID_DAYS - 1)));
}

type UserDayProblemsEntry = [number, number];

function formatUserDayProblemDateKey(rawDate: number) {
  const value = String(rawDate);
  if (!/^\d{8}$/.test(value)) {
    throw new Error("invalid BOJ user_day_problems date");
  }

  return `${value.slice(0, 4)}-${value.slice(4, 6)}-${value.slice(6, 8)}`;
}

function parseUserDayProblems(html: string): UserDayProblemsEntry[] {
  const match = html.match(/const\s+user_day_problems\s*=\s*(\[[\s\S]*?\]);/);
  if (!match?.[1]) {
    throw new Error("BOJ user page parse error: user_day_problems not found");
  }

  const parsed = JSON.parse(match[1]) as UserDayProblemsEntry[];
  if (!Array.isArray(parsed)) {
    throw new Error("BOJ user page parse error: invalid user_day_problems payload");
  }

  return parsed;
}

async function fetchUserDayProblems(handle: string): Promise<UserDayProblemsEntry[]> {
  const url = `${BOJ_USER_PAGE_BASE}${encodeURIComponent(handle)}`;
  const res = await fetch(url, {
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
    throw new Error(`BOJ user page fetch failed (${res.status})`);
  }

  return parseUserDayProblems(body);
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
  const dailyCounts = new Map<string, number>();

  for (const [rawDate, count] of await fetchUserDayProblems(cleanHandle)) {
    const dateKey = formatUserDayProblemDateKey(rawDate);
    if (dateKey < thresholdKey) {
      continue;
    }

    if (!Number.isFinite(count) || count <= 0) {
      continue;
    }

    dailyCounts.set(dateKey, count);
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
