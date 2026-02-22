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
  const reAll = new RegExp(
    `https:\\/\\/static\\.solved\\.ac\\/profile_bg\\/[^\\"\\']*${backgroundId}[^\\"\\']*\\.(?:jpe?g|png|webp)`,
    "ig"
  );

  const urls = html.match(reAll) || [];
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

async function tryFetchDataUri(url: string, forcedMime?: string) {
  try {
    return await fetchAsDataUri(url, forcedMime);
  } catch {
    return "";
  }
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const handle = (searchParams.get("handle") || "").trim();
  if (!handle) {
    return new Response(basic.renderErrorCard("missing ?handle=..."), { headers: ERR_HEADERS });
  }

  try {
    const u = await fetchSolvedUser(handle);

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

    // Badge (optional)
    let badgeDataUri = "";
    const badgeId = (u as any).badgeId as string | undefined;
    if (badgeId) {
      const candidates = [
        `https://static.solved.ac/profile_badge/${badgeId}.svg`,
        `https://static.solved.ac/badges/${badgeId}.svg`,
      ];
      for (const url of candidates) {
        badgeDataUri = await tryFetchDataUri(url, "image/svg+xml");
        if (badgeDataUri) break;
      }
    }

    // 지금은 class 아이콘은 미사용(렌더 타입 맞추기용)
    const classDataUri = "";

    // ✅ 무조건 basic.renderCard만 사용
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
