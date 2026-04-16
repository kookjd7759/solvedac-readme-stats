export const runtime = "edge";

import { fetchSolvedStreakSummary, fetchSolvedUser, fetchSolvedYearlyActivity } from "../../lib/solvedac";
import * as basic from "../../lib/render";

const CORS_HEADERS: Record<string, string> = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Cross-Origin-Resource-Policy": "cross-origin",
};

const JSON_HEADERS: Record<string, string> = {
  ...CORS_HEADERS,
  "Content-Type": "application/json; charset=utf-8",
  "Cache-Control": "no-store",
};

type FetchAttempt = {
  url: string;
  ok: boolean;
  error?: string;
  contentType?: string | null;
};

type AssetDebug = {
  ok: boolean;
  source?: string | null;
  resolvedUrl?: string | null;
  attempts?: FetchAttempt[];
  pageUrl?: string;
  pageAttempts?: FetchAttempt[];
  extractedUrls?: string[];
  error?: string;
};

function uniqueStrings(values: string[]) {
  return [...new Set(values.filter(Boolean))];
}

function safeErrorMessage(err: unknown) {
  if (err instanceof Error) return err.message;
  if (typeof err === "string") return err;
  try {
    return JSON.stringify(err);
  } catch {
    return "unknown error";
  }
}

function truthyParam(value: string | null) {
  const normalized = (value || "").trim().toLowerCase();
  return normalized === "1" || normalized === "true" || normalized === "yes";
}

function sanitizeFilenameSegment(value: string) {
  const normalized = value
    .trim()
    .replace(/[^a-z0-9_-]+/gi, "-")
    .replace(/^-+|-+$/g, "");

  return normalized || "card";
}

function buildImageHeaders(
  cacheControl: string,
  fileName?: string
): Record<string, string> {
  const headers: Record<string, string> = {
    ...CORS_HEADERS,
    "Content-Type": "image/svg+xml",
    "Cache-Control": cacheControl,
  };

  if (fileName) {
    headers["Content-Disposition"] = `attachment; filename="${fileName}"`;
  }

  return headers;
}

function bytesToBase64(bytes: Uint8Array) {
  let bin = "";
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
  return btoa(bin);
}

function renderSvgResponse(
  svg: string,
  cacheControl: string,
  fileName?: string
) {
  return new Response(svg, {
    headers: buildImageHeaders(cacheControl, fileName),
  });
}

function resolveAssetBases() {
  const envBases = (process.env.SOLVEDAC_ASSET_BASES || "")
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean);

  return uniqueStrings([
    ...envBases,
    "https://static.solved.ac",
    "https://solved.ac",
  ]);
}

const SOLVED_ASSET_BASES = resolveAssetBases();
const PRIMARY_ASSET_BASE = SOLVED_ASSET_BASES[0] || "https://static.solved.ac";

function normalizeAssetUrl(rawUrl: string, base = PRIMARY_ASSET_BASE) {
  const value = rawUrl.trim();
  if (!value) return value;
  if (value.startsWith("data:")) return value;
  if (/^https?:\/\//i.test(value)) return value;
  if (value.startsWith("//")) return `https:${value}`;
  if (value.startsWith("/")) return new URL(value, base).toString();
  return value;
}

function assetCandidatesFromRaw(rawUrl: string | null | undefined) {
  if (!rawUrl) return [];

  const value = rawUrl.trim();
  if (!value) return [];

  if (value.startsWith("/") && !value.startsWith("//")) {
    return uniqueStrings(
      SOLVED_ASSET_BASES.map((base) => normalizeAssetUrl(value, base))
    );
  }

  return [normalizeAssetUrl(value)];
}

function staticPathCandidates(path: string) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return assetCandidatesFromRaw(normalizedPath);
}

function escRe(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function mimeFromAssetUrl(url: string, fallback?: string) {
  const lower = url.split("?")[0]!.split("#")[0]!.toLowerCase();
  if (lower.endsWith(".svg")) return "image/svg+xml";
  if (lower.endsWith(".png")) return "image/png";
  if (lower.endsWith(".webp")) return "image/webp";
  if (lower.endsWith(".avif")) return "image/avif";
  if (lower.endsWith(".jpg") || lower.endsWith(".jpeg")) return "image/jpeg";
  return fallback;
}

async function fetchAsDataUri(url: string, forcedMime?: string) {
  const res = await fetch(url, {
    headers: {
      Accept: "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
      "Accept-Language": "en-US,en;q=0.9,ko;q=0.8",
    },
    cache: "no-store",
  });

  if (!res.ok) throw new Error(`asset fetch failed (${res.status}): ${url}`);

  const contentType = forcedMime || res.headers.get("content-type") || "application/octet-stream";
  const ab = await res.arrayBuffer();
  const b64 = bytesToBase64(new Uint8Array(ab));

  return {
    dataUri: `data:${contentType.split(";")[0]};base64,${b64}`,
    contentType,
  };
}

async function fetchAssetFromCandidates(
  source: string | null | undefined,
  candidates: string[],
  fallbackMime?: string
) {
  const attempts: FetchAttempt[] = [];

  for (const candidate of uniqueStrings(candidates)) {
    try {
      const { dataUri, contentType } = await fetchAsDataUri(
        candidate,
        mimeFromAssetUrl(candidate, fallbackMime)
      );

      attempts.push({
        url: candidate,
        ok: true,
        contentType: contentType.split(";")[0],
      });

      return {
        dataUri,
        debug: {
          ok: true,
          source: source ?? null,
          resolvedUrl: candidate,
          attempts,
        } satisfies AssetDebug,
      };
    } catch (err) {
      attempts.push({
        url: candidate,
        ok: false,
        error: safeErrorMessage(err),
      });
    }
  }

  return {
    dataUri: "",
    debug: {
      ok: false,
      source: source ?? null,
      attempts,
      error: attempts.at(-1)?.error || "no asset candidates available",
    } satisfies AssetDebug,
  };
}

async function fetchHtmlFromCandidates(pageUrls: string[]) {
  const attempts: FetchAttempt[] = [];

  for (const pageUrl of uniqueStrings(pageUrls)) {
    try {
      const res = await fetch(pageUrl, {
        headers: {
          Accept: "text/html,application/xhtml+xml",
          "Accept-Language": "en-US,en;q=0.9,ko;q=0.8",
        },
        cache: "no-store",
      });

      if (!res.ok) throw new Error(`page fetch error ${res.status}: ${pageUrl}`);

      const html = await res.text();
      attempts.push({ url: pageUrl, ok: true, contentType: res.headers.get("content-type") });

      return { html, pageUrl, attempts };
    } catch (err) {
      attempts.push({
        url: pageUrl,
        ok: false,
        error: safeErrorMessage(err),
      });
    }
  }

  throw new Error(attempts.at(-1)?.error || "page fetch failed");
}

function collectMatchedAssetUrls(html: string, regex: RegExp) {
  const normalizedHtml = html.replace(/\\\//g, "/");
  return uniqueStrings(
    (normalizedHtml.match(regex) || []).map((url) =>
      normalizeAssetUrl(url).replace(/\?+$/, "")
    )
  );
}

function scoreBySize(url: string) {
  const m = url.match(/\/(\d{2,4})x(\d{2,4})\//i);
  if (m) return Number(m[1]) * Number(m[2]);
  return 1_000_000_000;
}

const BG_URL_CACHE = new Map<string, string>();

async function resolveBackgroundImageUrl(backgroundId: string) {
  const cached = BG_URL_CACHE.get(backgroundId);
  if (cached) {
    return {
      url: cached,
      debug: {
        ok: true,
        source: backgroundId,
        resolvedUrl: cached,
        extractedUrls: [cached],
      } satisfies AssetDebug,
    };
  }

  const pageUrls = [
    `https://solved.ac/en/backgrounds/${encodeURIComponent(backgroundId)}`,
    `https://solved.ac/backgrounds/${encodeURIComponent(backgroundId)}`,
  ];

  const { html, pageUrl, attempts } = await fetchHtmlFromCandidates(pageUrls);
  const id = escRe(backgroundId);

  let urls = collectMatchedAssetUrls(
    html,
    new RegExp(
      String.raw`(?:(?:https?:)?\/\/[^"' <>\n]+)?\/profile_bg\/[^"' <>\n]*${id}[^"' <>\n]*\.(?:avif|jpe?g|png|webp)(?:\?[^"' <>\n]*)?`,
      "ig"
    )
  );

  if (urls.length === 0) {
    urls = collectMatchedAssetUrls(
      html,
      /(?:(?:https?:)?\/\/[^"' <>\n]+)?\/profile_bg\/[^"' <>\n]*\.(?:avif|jpe?g|png|webp)(?:\?[^"' <>\n]*)?/ig
    );
  }

  if (urls.length === 0) {
    throw new Error(`background image url not found for ${backgroundId}`);
  }

  const best = urls.sort((a, b) => scoreBySize(b) - scoreBySize(a))[0]!;
  BG_URL_CACHE.set(backgroundId, best);

  return {
    url: best,
    debug: {
      ok: true,
      source: backgroundId,
      resolvedUrl: best,
      pageUrl,
      pageAttempts: attempts,
      extractedUrls: urls,
    } satisfies AssetDebug,
  };
}

const BADGE_URL_CACHE = new Map<string, string>();

async function resolveBadgeImageUrlFromBadgePage(badgeId: string) {
  const cached = BADGE_URL_CACHE.get(badgeId);
  if (cached) {
    return {
      url: cached,
      debug: {
        ok: true,
        source: badgeId,
        resolvedUrl: cached,
        extractedUrls: [cached],
      } satisfies AssetDebug,
    };
  }

  const pageUrls = [
    `https://solved.ac/badges/${encodeURIComponent(badgeId)}`,
    `https://solved.ac/en/badges/${encodeURIComponent(badgeId)}`,
  ];

  const { html, pageUrl, attempts } = await fetchHtmlFromCandidates(pageUrls);
  const id = escRe(badgeId);

  let urls = collectMatchedAssetUrls(
    html,
    new RegExp(
      String.raw`(?:(?:https?:)?\/\/[^"' <>\n]+)?\/profile_badge(?:\/profile)?(?:\/\d{2,4}x\d{2,4})?\/${id}[^"' <>\n]*\.(?:avif|png|svg|webp)(?:\?[^"' <>\n]*)?`,
      "ig"
    )
  );

  if (urls.length === 0) {
    urls = collectMatchedAssetUrls(
      html,
      /(?:(?:https?:)?\/\/[^"' <>\n]+)?\/profile_badge(?:\/profile)?(?:\/\d{2,4}x\d{2,4})?\/[^"' <>\n]*\.(?:avif|png|svg|webp)(?:\?[^"' <>\n]*)?/ig
    );
  }

  if (urls.length === 0) {
    throw new Error(`badge image url not found in badge page for badgeId=${badgeId}`);
  }

  const best = urls.sort((a, b) => scoreBySize(b) - scoreBySize(a))[0]!;
  BADGE_URL_CACHE.set(badgeId, best);

  return {
    url: best,
    debug: {
      ok: true,
      source: badgeId,
      resolvedUrl: best,
      pageUrl,
      pageAttempts: attempts,
      extractedUrls: urls,
    } satisfies AssetDebug,
  };
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const handle = (searchParams.get("handle") || "").trim();
  const version = (searchParams.get("v") || "1").trim() === "2" ? "2" : "1";
  const showStreakGrass = truthyParam(searchParams.get("streak"));
  const shouldDownload = truthyParam(searchParams.get("download"));
  const debugMode = ["1", "true", "json"].includes(
    (searchParams.get("debug") || "").trim().toLowerCase()
  );
  const fileName = shouldDownload
    ? `solvedac-${sanitizeFilenameSegment(handle || "card")}-v${version}.svg`
    : undefined;

  if (!handle) {
    if (debugMode) {
      return new Response(
        JSON.stringify({ error: "missing ?handle=..." }, null, 2),
        { headers: JSON_HEADERS }
      );
    }

    return renderSvgResponse(
      version === "2"
        ? basic.renderErrorCardV2("missing ?handle=...")
        : basic.renderErrorCard("missing ?handle=..."),
      "no-store",
      fileName
    );
  }

  try {
    const u = await fetchSolvedUser(handle);
    const assets: Record<string, AssetDebug> = {};

    const tier = u.tier ?? 0;
    const tierResult = await fetchAssetFromCandidates(
      `/tier_small/${tier}.svg`,
      staticPathCandidates(`/tier_small/${tier}.svg`),
      "image/svg+xml"
    );
    const tierDataUri = tierResult.dataUri;
    assets.tier = tierResult.debug;

    const avatarSource = u.profileImageUrl || "/misc/360x360/default_profile.png";
    const avatarResult = await fetchAssetFromCandidates(
      avatarSource,
      assetCandidatesFromRaw(avatarSource)
    );
    const avatarDataUri = avatarResult.dataUri;
    assets.avatar = avatarResult.debug;

    let bgDataUri = "";
    const bgId = (u as any).backgroundId as string | undefined;
    if (bgId) {
      try {
        const bgResolved = await resolveBackgroundImageUrl(bgId);
        const bgResult = await fetchAssetFromCandidates(bgId, [bgResolved.url]);
        bgDataUri = bgResult.dataUri;
        assets.background = {
          ...bgResolved.debug,
          ...bgResult.debug,
          pageUrl: bgResolved.debug.pageUrl,
          pageAttempts: bgResolved.debug.pageAttempts,
          extractedUrls: bgResolved.debug.extractedUrls,
        };
      } catch (err) {
        assets.background = {
          ok: false,
          source: bgId,
          error: safeErrorMessage(err),
        };
      }
    } else {
      assets.background = {
        ok: false,
        source: null,
        error: "backgroundId not present in solved.ac user payload",
      };
    }

    let badgeDataUri = "";
    const badgeId = (u as any).badgeId as string | undefined;
    if (badgeId) {
      try {
        const badgeResolved = await resolveBadgeImageUrlFromBadgePage(badgeId);
        const badgeResult = await fetchAssetFromCandidates(badgeId, [badgeResolved.url]);
        badgeDataUri = badgeResult.dataUri;
        assets.badge = {
          ...badgeResolved.debug,
          ...badgeResult.debug,
          pageUrl: badgeResolved.debug.pageUrl,
          pageAttempts: badgeResolved.debug.pageAttempts,
          extractedUrls: badgeResolved.debug.extractedUrls,
        };
      } catch (err) {
        assets.badge = {
          ok: false,
          source: badgeId,
          error: safeErrorMessage(err),
        };
      }
    } else {
      assets.badge = {
        ok: false,
        source: null,
        error: "badgeId not present in solved.ac user payload",
      };
    }

    let classDataUri = "";
    const classNum = (u as any).class as number | undefined;
    const classDeco = ((u as any).classDecoration as string | undefined) || "none";

    if (classNum && classNum >= 1 && classNum <= 10) {
      const suffix =
        classDeco === "silver" ? "s" :
        classDeco === "gold" ? "g" :
        "";

      const classPath = `/class/c${classNum}${suffix}.svg`;
      const classResult = await fetchAssetFromCandidates(
        classPath,
        staticPathCandidates(classPath),
        "image/svg+xml"
      );
      classDataUri = classResult.dataUri;
      assets.class = classResult.debug;
    } else {
      assets.class = {
        ok: false,
        source: null,
        error: "class not present or outside supported range",
      };
    }

    if (debugMode) {
      return new Response(
        JSON.stringify(
          {
            handle,
            version,
            showStreakGrass,
            fetchedAt: new Date().toISOString(),
            assetBases: SOLVED_ASSET_BASES,
            user: u,
            assets,
          },
          null,
          2
        ),
        { headers: JSON_HEADERS }
      );
    }

    let streakSummary = null;
    let streakActivity = null;
    if (showStreakGrass) {
      const [summaryResult, activityResult] = await Promise.allSettled([
        fetchSolvedStreakSummary(handle),
        fetchSolvedYearlyActivity(handle),
      ]);

      if (summaryResult.status === "fulfilled") {
        streakSummary = summaryResult.value;
      } else {
        streakSummary = {
          currentStreak: 0,
          longestStreak: u.maxStreak ?? 0,
        };
      }

      if (activityResult.status === "fulfilled") {
        streakActivity = activityResult.value;
      } else {
        streakActivity = {
          dailyCounts: {},
          activeDays: 0,
        };
      }
    }

    const renderInput = {
      user: u,
      tierDataUri,
      avatarDataUri,
      bgDataUri,
      badgeDataUri,
      classDataUri,
      streakSummary,
      streakActivity,
      showStreakGrass,
    };

    const svg = version === "2"
      ? basic.renderCardV2(renderInput)
      : basic.renderCard(renderInput);

    return renderSvgResponse(
      svg,
      "public, max-age=0, s-maxage=900, stale-while-revalidate=86400",
      fileName
    );
  } catch (e: any) {
    if (debugMode) {
      return new Response(
        JSON.stringify(
          {
            handle,
            version,
            showStreakGrass,
            fetchedAt: new Date().toISOString(),
            error: e?.message || "unknown error",
            assetBases: SOLVED_ASSET_BASES,
          },
          null,
          2
        ),
        { headers: JSON_HEADERS }
      );
    }

    return renderSvgResponse(
      version === "2"
        ? basic.renderErrorCardV2(e?.message || "unknown error")
        : basic.renderErrorCard(e?.message || "unknown error"),
      "no-store",
      fileName
    );
  }
}

export async function OPTIONS() {
  return new Response(null, { headers: CORS_HEADERS });
}
