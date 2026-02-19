// src/lib/render.ts
import type { SolvedUser } from "./solvedac";

function esc(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

type RenderInput = {
  user: SolvedUser;

  // data URI 권장 (README/camo 안정)
  tierDataUri: string; // data:image/svg+xml;base64,...
  avatarDataUri: string; // data:image/*;base64,... (없으면 "")
  bgDataUri: string; // data:image/*;base64,... (없으면 "")
  badgeDataUri: string; // data:image/svg+xml;base64,... (없으면 "")
};

export function renderCard(input: RenderInput) {
  const u = input.user;

  const handle = esc(u.handle || "");
  const tier = u.tier ?? 0;
  const solved = u.solvedCount ?? 0;

  // user/show 스키마에 따라 있을 수도/없을 수도
  const rank = (u as any).rank ?? 0;
  const clazz = (u as any).class ?? 0;

  const hasBg = !!input.bgDataUri;
  const hasAvatar = !!input.avatarDataUri;
  const hasBadge = !!input.badgeDataUri;

  // ===== Modern / borderless layout =====
  const W = 560;
  const H = 220;

  const R = 20;
  const font = "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto";

  // Header
  const headerH = 72;

  // Avatar overlaps header+body slightly, but not touching lines
  const avatarSize = 60;
  const avatarR = avatarSize / 2;
  const avatarCx = W / 2;
  const avatarCy = headerH - 6;

  // Name / badge
  const nameY = headerH + 34;
  const badgeY = headerH + 46;

  // Content region
  const pad = 18;
  const contentTop = headerH + 62; // 충분히 내려서 안 겹치게
  const contentBottomPad = 16;
  const contentH = H - contentTop - contentBottomPad;

  const leftW = 170;
  const gap = 14;
  const rightW = W - pad * 2 - leftW - gap;

  const leftX = pad;
  const rightX = pad + leftW + gap;

  // Right rows
  const rowH = 32;
  const rowGap = 10;
  const row1Y = contentTop + 6;
  const row2Y = row1Y + rowH + rowGap;
  const row3Y = row2Y + rowH + rowGap;

  // Tier card internals (라벨/아이콘/텍스트 안 겹치게)
  const tierLabelY = contentTop + 18;
  const tierIconSize = 74;
  const tierIconX = leftX + (leftW - tierIconSize) / 2;
  const tierIconY = contentTop + 28; // label 아래로 확실히
  const tierTextY = contentTop + contentH - 12; // 맨 아래 고정

  function statRow(label: string, value: string, y: number) {
    const safeLabel = esc(label);
    const safeValue = esc(value);

    // borderless 느낌: stroke 없이, 배경만 살짝 틴트 + 얇은 divider 라인 느낌
    // (완전 stroke 제거하면 경계가 흐려서, 하단 1px 라인만 아주 옅게)
    return `
      <g>
        <rect x="${rightX}" y="${y}" width="${rightW}" height="${rowH}" rx="12" fill="#F8FAFC"/>
        <line x1="${rightX + 12}" y1="${y + rowH - 0.5}" x2="${rightX + rightW - 12}" y2="${
          y + rowH - 0.5
        }" stroke="#E2E8F0"/>
        <text x="${rightX + 12}" y="${y + 21}" fill="#0F172A" font-size="12.5" font-weight="600"
              font-family="${font}">${safeLabel}</text>
        <text x="${rightX + rightW - 12}" y="${y + 21}" text-anchor="end"
              fill="#0F172A" font-size="13.5" font-weight="800"
              font-family="${font}">${safeValue}</text>
      </g>
    `;
  }

  // “카드 외곽 테두리 없음” 대신 은은한 그림자만
  // GitHub에서도 feDropShadow는 대체로 잘 먹힘 (과하지 않게)
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <clipPath id="clipCard">
      <rect x="0" y="0" width="${W}" height="${H}" rx="${R}"/>
    </clipPath>

    <clipPath id="clipAvatar">
      <circle cx="${avatarCx}" cy="${avatarCy}" r="${avatarR}"/>
    </clipPath>

    <!-- fallback header gradient (very soft) -->
    <linearGradient id="hdrFallback" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#EEF2FF"/>
      <stop offset="100%" stop-color="#F8FAFC"/>
    </linearGradient>

    <!-- subtle header overlay for text contrast -->
    <linearGradient id="hdrOverlay" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#000" stop-opacity="0.04"/>
      <stop offset="100%" stop-color="#000" stop-opacity="0.08"/>
    </linearGradient>

    <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="10" stdDeviation="14" flood-color="#0F172A" flood-opacity="0.10"/>
    </filter>

    <filter id="avatarShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="6" stdDeviation="10" flood-color="#0F172A" flood-opacity="0.14"/>
    </filter>
  </defs>

  <!-- Background is transparent by default in README; we draw the card -->
  <g filter="url(#softShadow)">
    <g clip-path="url(#clipCard)">
      <!-- Card base -->
      <rect x="0" y="0" width="${W}" height="${H}" rx="${R}" fill="#FFFFFF"/>

      <!-- Header -->
      <rect x="0" y="0" width="${W}" height="${headerH}" fill="url(#hdrFallback)"/>
      ${
        hasBg
          ? `<image href="${input.bgDataUri}" x="0" y="0" width="${W}" height="${headerH}" preserveAspectRatio="xMidYMid slice"/>`
          : ""
      }
      <rect x="0" y="0" width="${W}" height="${headerH}" fill="url(#hdrOverlay)"/>

      <!-- Body (white) -->
      <rect x="0" y="${headerH}" width="${W}" height="${H - headerH}" fill="#FFFFFF"/>

      <!-- Very subtle divider line between header and body -->
      <line x1="16" y1="${headerH + 0.5}" x2="${W - 16}" y2="${headerH + 0.5}" stroke="#EEF2F7"/>
    </g>
  </g>

  <!-- Avatar -->
  <g filter="url(#avatarShadow)">
    <circle cx="${avatarCx}" cy="${avatarCy}" r="${avatarR + 3}" fill="#FFFFFF"/>
    ${
      hasAvatar
        ? `<image href="${input.avatarDataUri}" x="${avatarCx - avatarR}" y="${avatarCy - avatarR}"
                 width="${avatarSize}" height="${avatarSize}" clip-path="url(#clipAvatar)"
                 preserveAspectRatio="xMidYMid slice"/>`
        : `<text x="${avatarCx}" y="${avatarCy + 5}" text-anchor="middle"
                 fill="#94A3B8" font-size="18" font-weight="800" font-family="${font}">?</text>`
    }
  </g>

  <!-- Handle -->
  <text x="${W / 2}" y="${nameY}" text-anchor="middle"
        fill="#0F172A" font-size="18" font-weight="900" font-family="${font}">
    ${handle}
  </text>

  <!-- Badge (optional): small, clean, no stroke -->
  ${
    hasBadge
      ? `
  <g>
    <rect x="${W / 2 - 78}" y="${badgeY}" width="156" height="22" rx="11" fill="#F1F5F9"/>
    <image href="${input.badgeDataUri}" x="${W / 2 - 66}" y="${badgeY + 3}" width="16" height="16"/>
    <text x="${W / 2 - 44}" y="${badgeY + 15}" fill="#334155" font-size="11.5" font-weight="700" font-family="${font}">
      Profile badge
    </text>
  </g>`
      : ""
  }

  <!-- Left: Tier (borderless card with gentle tint) -->
  <g>
    <rect x="${leftX}" y="${contentTop}" width="${leftW}" height="${contentH}" rx="16" fill="#F8FAFC"/>
    <text x="${leftX + leftW / 2}" y="${tierLabelY}" text-anchor="middle"
          fill="#64748B" font-size="11.5" font-weight="900" font-family="${font}">TIER</text>

    <image href="${input.tierDataUri}" x="${tierIconX}" y="${tierIconY}"
           width="${tierIconSize}" height="${tierIconSize}"/>

    <text x="${leftX + leftW / 2}" y="${tierTextY}" text-anchor="middle"
          fill="#0F172A" font-size="12.5" font-weight="900" font-family="${font}">tier ${tier}</text>
  </g>

  <!-- Right: Stats rows -->
  ${statRow("Solved", `${solved}`, row1Y)}
  ${statRow("Rank", rank ? `#${rank}` : "-", row2Y)}
  ${statRow("Class", clazz ? `${clazz}` : "-", row3Y)}
</svg>`;
}

export function renderErrorCard(msg: string) {
  const safe = esc(msg);
  const W = 560;
  const H = 140;
  const R = 20;
  const font = "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto";

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="10" stdDeviation="14" flood-color="#0F172A" flood-opacity="0.10"/>
    </filter>
  </defs>

  <g filter="url(#softShadow)">
    <rect width="${W}" height="${H}" rx="${R}" fill="#FFFFFF"/>
  </g>

  <text x="22" y="54" fill="#DC2626" font-size="16" font-weight="900" font-family="${font}">Error</text>
  <text x="22" y="80" fill="#0F172A" font-size="12.5" font-weight="700" font-family="${font}">${safe}</text>
</svg>`;
}
