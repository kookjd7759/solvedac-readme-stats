export const runtime = "edge";

import { fetchSolvedUser } from "@/lib/solvedac";
import { renderCard, renderErrorCard } from "@/lib/render";

const OK_HEADERS = {
  "Content-Type": "image/svg+xml; charset=utf-8",
  "Cache-Control": "public, max-age=0, s-maxage=21600, stale-while-revalidate=86400",
};

const ERR_HEADERS = {
  "Content-Type": "image/svg+xml; charset=utf-8",
  "Cache-Control": "no-store",
};

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const handle = (searchParams.get("handle") || "").trim();

  if (!handle) {
    return new Response(renderErrorCard("missing ?handle=..."), { headers: ERR_HEADERS });
  }

  try {
    const u = await fetchSolvedUser(handle);
    return new Response(renderCard(u), { headers: OK_HEADERS });
  } catch (e: any) {
    return new Response(renderErrorCard(e?.message || "unknown error"), { headers: ERR_HEADERS });
  }
}
