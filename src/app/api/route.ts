export const runtime = "edge";

import { fetchSolvedUser } from "@/lib/solvedac";
import * as basic from "@/lib/render_basic";
import * as v1 from "@/lib/render_v1";

const OK_HEADERS: Record<string, string> = {
  "Content-Type": "image/svg+xml",
  "Cache-Control": "public, max-age=0, s-maxage=21600, stale-while-revalidate=86400",
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
  // 1) 경로에 1234x567 같은 사이즈가 있으면 면적 큰 것 우선
  // 2) 사이즈가 없으면 "profile/"(저해상도) 보다 다른 경로를 더 선호
  function score(url: string) {
    const m = url.match(/\/(\d{2,4})x(\d{2,4})\//i);
    if (m) {
      const w = Number(m[1]);
      const h = Number(m[2]);
      return w * h; // 면적
    }
    // 사이즈 표기가 없으면 보통 그쪽이 더 큰 원본/상위 프리뷰인 경우가 많아서 가산점
    let s = 1_000_000_000;
    // profile/은 대체로 미리보기라 감점
    if (url.includes("/profile/")) s -= 200_000_000;
    return s;
  }

  const best = urls
    .map((u) => u)
    .sort((a, b) => score(b) - score(a))[0];

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

  // ✅ theme 처리
  // - 기본: basic
  // - theme=v1 이면 v1 렌더
  const theme = (searchParams.get("theme") || "basic").trim().toLowerCase();
  const renderer = theme === "v1" ? v1 : basic;

  try {
    const u = await fetchSolvedUser(handle);

    // Tier icon (SVG) - data uri로 인라인 (README 안정)
    const tier = u.tier ?? 0;
    const tierUrl = `https://static.solved.ac/tier_small/${tier}.svg`;
    const tierDataUri = await fetchAsDataUri(tierUrl, "image/svg+xml");

    // Avatar: null이면 default_profile 사용
    const avatarUrl = u.profileImageUrl ?? "https://static.solved.ac/misc/360x360/default_profile.png";
    const avatarDataUri = await fetchAsDataUri(avatarUrl, "image/png"); // octet-stream 방지

    // ✅ Background: backgroundId 기반으로 실제 이미지 URL 파싱해서 로딩
    let bgDataUri = "";
    const bgId = (u as any).backgroundId as string | undefined;
    if (bgId) {
      try {
        const bgUrl = await resolveBackgroundImageUrl(bgId);
        // solved.ac 쪽이 octet-stream 주는 케이스 많아서 확장자 기반 forcedMime
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

    // ✅ Badge: 실제 응답은 string (ex: solves_03000)
    // 정적 파일 경로가 환경에 따라 다를 수 있어서 후보를 몇 개 순서대로 시도
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

    // v1 테마에서 색상 쓸 수 있게(없어도 됨)
    const accentColor = "#3ef0b1";

    const svg =
      theme === "v1"
        ? v1.renderCard({ user: u, tierDataUri, avatarDataUri, bgDataUri, badgeDataUri, accentColor })
        : basic.renderCard({ user: u, tierDataUri, avatarDataUri, bgDataUri, badgeDataUri });

    return new Response(svg, { headers: OK_HEADERS });
  } catch (e: any) {
    return new Response(renderer.renderErrorCard(e?.message || "unknown error"), { headers: ERR_HEADERS });
  }
}
