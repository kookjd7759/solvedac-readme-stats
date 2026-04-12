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

const DIRECT_API_BASE = "https://solved.ac/api/v3/user/show?handle=";
const FALLBACK_PROXY_BASE = "https://r.jina.ai/http://solved.ac/api/v3/user/show?handle=";
const CACHE_TTL_MS = 5 * 60 * 1000;

const USER_CACHE = new Map<string, { value: SolvedUser; expiresAt: number }>();

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
