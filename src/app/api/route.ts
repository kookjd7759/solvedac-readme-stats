export const runtime = "edge";

import { fetchSolvedUser } from "@/lib/solvedac";
import * as basic from "@/lib/render";

const OK_HEADERS: Record<string, string> = {
  "Content-Type": "image/svg+xml",
  "Cache-Control": "public, max-age=0, s-maxage=900, stale-while-revalidate=86400",
};

const ERR_HEADERS: Record<string, string> = {
  "Content-Type": "image/svg+xml",
  "Cache-Control": "no-store",
};

function bytesToBase64(bytes: Uint8Array) {
  let bin = "";
  for (let i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
  return btoa(bin);
}

async function fetchAsDataUri(url: string, forcedMime?: string): Promise<string> {
  const res = await fetch(url, {
    headers: {
      Accept: "image/avif,image/webp,image/apng,image/svg+xml,image/*,*/*;q=0.8",
    },
  });

  if (!res.ok) throw new Error(`asset fetch failed (${res.status}): ${url}`);

  const ct = forcedMime || res.headers.get("content-type") || "application/octet-stream";
  const ab = await res.arrayBuffer();
  const b64 = bytesToBase64(new Uint8Array(ab));
  return `data:${ct.split(";")[0]};base64,${b64}`;
}

// Edge 인스턴스 안에서만 살아있는 간단 캐시 (성능용)
const BG_URL_CACHE = new Map<string, string>();

async function resolveBackgroundImageUrl(backgroundId: string): Promise<string> {
  const cached = BG_URL_CACHE.get(backgroundId);
  if (cached) return cached;

  const pageUrl = `https://solved.ac/en/backgrounds/${encodeURIComponent(backgroundId)}`;
  const html = await fetch(pageUrl, {
    headers: { Accept: "text/html,application/xhtml+xml" },
  }).then(async (r) => {
    if (!r.ok) throw new Error(`background page fetch error ${r.status}`);
    return await r.text();
  });

  // backgroundId가 들어간 profile_bg URL들을 전부 수집
  const re = new RegExp(
    `https:\\/\\/static\\.solved\\.ac\\/profile_bg\\/[^\\"\\']*${backgroundId}[^\\"\\']*\\.(?:jpe?g|png|webp)`,
    "ig"
  );

  const urls = html.match(re) || [];
  if (urls.length === 0) throw new Error(`background image url not found for ${backgroundId}`);

  // 점수로 "가장 큰 이미지" 추정해서 선택
  function score(url: string) {
    const m = url.match(/\/(\d{2,4})x(\d{2,4})\//i);
    if (m) {
      const w = Number(m[1]);
      const h = Number(m[2]);
      return w * h;
    }
    let s = 1_000_000_000;
    if (url.includes("/profile/")) s -= 200_000_000;
    return s;
  }

  const best = urls.sort((a, b) => score(b) - score(a))[0]!;

  BG_URL_CACHE.set(backgroundId, best);
  return best;
}
const BADGE_URL_CACHE = new Map<string, string>();

function escRe(s: string) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function normalizeSolvedStaticUrl(u: string) {
  // protocol-relative / relative 처리
  if (u.startsWith("//")) u = "https:" + u;
  else if (u.startsWith("/")) u = "https://static.solved.ac" + u;

  // 끝에 달린 "?" 같은 찌꺼기 제거
  u = u.replace(/\?+$/, "");

  return u;
}

async function resolveBadgeImageUrlFromBadgePage(badgeId: string): Promise<string> {
  const cached = BADGE_URL_CACHE.get(badgeId);
  if (cached) return cached;

  // ✅ 배지 상세 페이지는 badgeId로 접근 가능
  const pageUrl = `https://solved.ac/badges/${encodeURIComponent(badgeId)}`;
  console.log("[badge] badge page:", pageUrl);

  const res = await fetch(pageUrl, {
    headers: { Accept: "text/html,application/xhtml+xml" },
  });

  const html = await res.text();
  console.log("[badge] badge page status:", res.status, "len:", html.length);

  if (!res.ok) throw new Error(`badge page fetch error ${res.status}`);

  const id = escRe(badgeId);

  // ✅ 두 케이스 모두 커버:
  // 1) /profile_badge/120x120/{id}.png
  // 2) /profile_badge/profile/120x120/{id}-uuid.png
  // + full / // / / (상대경로) 전부 허용
  const re = new RegExp(
    String.raw`(?:(?:https?:)?\/\/static\.solved\.ac)?\/profile_badge(?:\/profile)?\/120x120\/${id}[^"' <>\n]*\.png(?:\?[^"' <>\n]*)?`,
    "i"
  );

  const m = html.match(re);
  if (!m) throw new Error(`badge image url not found in badge page for badgeId=${badgeId}`);

  const url = normalizeSolvedStaticUrl(m[0]);
  BADGE_URL_CACHE.set(badgeId, url);
  console.log("[badge] found:", url);

  return url;
}



export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const handle = (searchParams.get("handle") || "").trim();
  if (!handle) {
    return new Response(basic.renderErrorCard("missing ?handle=..."), { headers: ERR_HEADERS });
  }

  try {
    const u = await fetchSolvedUser(handle);
    console.log("[user keys]", Object.keys(u as any));
    console.log("[user badge fields]", (u as any).badgeId, (u as any).badge, (u as any).badgeUrl, (u as any).profileBadge);

    // Tier icon (SVG) - data uri로 인라인 (README 안정)
    const tier = u.tier ?? 0;
    const tierUrl = `https://static.solved.ac/tier_small/${tier}.svg`;
    const tierDataUri = await fetchAsDataUri(tierUrl, "image/svg+xml");

    // Avatar: null이면 default_profile 사용
    const avatarUrl = u.profileImageUrl ?? "https://static.solved.ac/misc/360x360/default_profile.png";
    const avatarDataUri = await fetchAsDataUri(avatarUrl, "image/png");

    // Background (optional)
    let bgDataUri = "";
    const bgId = (u as any).backgroundId as string | undefined;
    if (bgId) {
      try {
        const bgUrl = await resolveBackgroundImageUrl(bgId);
        const lower = bgUrl.toLowerCase();
        const mime =
          lower.endsWith(".png") ? "image/png" :
          lower.endsWith(".webp") ? "image/webp" :
          "image/jpeg";
        bgDataUri = await fetchAsDataUri(bgUrl, mime);
      } catch {
        bgDataUri = "";
      }
    }

    let badgeDataUri = "";
    const badgeId = (u as any).badgeId as string | undefined;

    if (badgeId) {
      try {
        console.log("BADGE ID:", badgeId);
        const badgeUrl = await resolveBadgeImageUrlFromBadgePage(badgeId);
        badgeDataUri = await fetchAsDataUri(badgeUrl, "image/png");
      } catch (e) {
        console.log("[badge] fail:", e);
        badgeDataUri = "";
      }
    }

    // Class icon (optional)
    let classDataUri = "";
    const classNum = (u as any).class as number | undefined;
    const classDeco = ((u as any).classDecoration as string | undefined) || "none";

    if (classNum && classNum >= 1 && classNum <= 10) {
      const suffix =
        classDeco === "silver" ? "s" :
        classDeco === "gold" ? "g" :
        "";

      const classUrl = `https://static.solved.ac/class/c${classNum}${suffix}.svg`;

      try {
        classDataUri = await fetchAsDataUri(classUrl, "image/svg+xml");
      } catch (e) {
        console.log("[class] fail:", e);
        classDataUri = "";
      }
    }


    const svg = basic.renderCard({
      user: u,
      tierDataUri,
      avatarDataUri,
      bgDataUri,
      badgeDataUri,
      classDataUri,
    });

    return new Response(svg, { headers: OK_HEADERS });
  } catch (e: any) {
    return new Response(basic.renderErrorCard(e?.message || "unknown error"), { headers: ERR_HEADERS });
  }
}
