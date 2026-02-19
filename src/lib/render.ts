import type { SolvedUser } from "./solvedac";

function esc(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

export function renderCard(u: SolvedUser) {
  const handle = esc(u.handle);
  const tier = u.tier ?? 0;
  const iconUrl = `https://static.solved.ac/tier_small/${tier}.svg`;
  const solved = u.solvedCount ?? 0;
  const streak = u.maxStreak ?? 0;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="495" height="130" viewBox="0 0 495 130" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0b1220"/>
      <stop offset="100%" stop-color="#111827"/>
    </linearGradient>
  </defs>

  <rect width="495" height="130" rx="18" fill="url(#bg)"/>
  <rect x="0.5" y="0.5" width="494" height="129" rx="17.5" fill="none" stroke="#334155" opacity="0.65"/>

  <image href="${iconUrl}" x="22" y="28" width="74" height="74" />

  <text x="112" y="54" fill="#E5E7EB" font-size="22"
    font-family="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto">${handle}</text>

  <text x="112" y="79" fill="#93C5FD" font-size="14" font-weight="600"
    font-family="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto">
    tier ${tier}
  </text>

  <g font-family="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto">
    <rect x="112" y="92" width="130" height="26" rx="13" fill="#0F172A" stroke="#334155" opacity="0.95"/>
    <text x="127" y="110" fill="#CBD5E1" font-size="13">Solved</text>
    <text x="188" y="110" fill="#E5E7EB" font-size="13" font-weight="700">${solved}</text>

    <rect x="252" y="92" width="170" height="26" rx="13" fill="#0F172A" stroke="#334155" opacity="0.95"/>
    <text x="267" y="110" fill="#CBD5E1" font-size="13">Max streak</text>
    <text x="343" y="110" fill="#E5E7EB" font-size="13" font-weight="700">${streak}</text>
  </g>
</svg>`;
}

export function renderErrorCard(msg: string) {
  const safe = esc(msg);
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="495" height="130" viewBox="0 0 495 130" xmlns="http://www.w3.org/2000/svg">
  <rect width="495" height="130" rx="18" fill="#111827"/>
  <rect x="0.5" y="0.5" width="494" height="129" rx="17.5" fill="none" stroke="#334155" opacity="0.65"/>
  <text x="24" y="55" fill="#FCA5A5" font-size="18"
    font-family="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto">Error</text>
  <text x="24" y="82" fill="#E5E7EB" font-size="14"
    font-family="ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto">${safe}</text>
</svg>`;
}
