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

  tierDataUri: string;   // data:image/svg+xml;base64,...
  avatarDataUri: string; // data:image/*;base64,... (없으면 "")
  bgDataUri: string;     // data:image/*;base64,... (없으면 "")
  badgeDataUri: string;  // optional (현재 레이아웃엔 미사용)

  accentColor?: string;
};

export function renderCard(input: RenderInput) {
  const u = input.user;

  const handle = esc(u.handle || "");
  const tier = u.tier ?? 0;
  const solved = u.solvedCount ?? 0;
  const rank = (u as any).rank ?? 0;
  const clazz = (u as any).class ?? 0;
  const streak = u.maxStreak ?? 0;

  const hasAvatar = !!input.avatarDataUri;
  const hasBg = !!input.bgDataUri;

  // ===== Layout =====
  const W = 560;
  const H = 220;
  const R = 18;

  // Top composition
  const topH = 92;

  // Avatar
  const avatarSize = 62;
  const avatarR = avatarSize / 2;
  const avatarCx = 56;
  const avatarCy = 46;

  // Name line (under avatar area)
  const nameX = 18;
  const nameY = topH + 34;

  // Tier icon next to name
  const tierSize = 18;
  const tierX = nameX;
  const tierY = topH + 18; // 이미지 y는 top-left 기준이라 약간 위

  const textX = nameX + tierSize + 8;

  // Stats rows (4 lines)
  const rowsTop = topH + 58;
  const rowH = 28;
  const rowGap = 8;
  const leftPad = 18;
  const rightPad = 18;
  const rowW = W - leftPad - rightPad;

  const font = "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto";
  const accent = input.accentColor || "#3ef0b1";

  function row(label: string, value: string, y: number) {
    const L = esc(label);
    const V = esc(value);
    // borderless: tint background + 아주 옅은 divider
    return `
      <g>
        <rect x="${leftPad}" y="${y}" width="${rowW}" height="${rowH}" rx="12" fill="#F8FAFC"/>
        <text x="${leftPad + 12}" y="${y + 19}" fill="#64748B" font-size="12" font-weight="700" font-family="${font}">
          ${L}
        </text>
        <text x="${leftPad + rowW - 12}" y="${y + 19}" text-anchor="end" fill="#0F172A" font-size="12.5" font-weight="900" font-family="${font}">
          ${V}
        </text>
      </g>
    `;
  }

  // Triangular clip for background (diagonal split)
  // Triangle points: (W*0.38, 0) -> (W, 0) -> (W, topH)
  const triX = Math.round(W * 0.36);

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <clipPath id="clipCard">
      <rect x="0" y="0" width="${W}" height="${H}" rx="${R}"/>
    </clipPath>

    <clipPath id="clipAvatar">
      <circle cx="${avatarCx}" cy="${avatarCy}" r="${avatarR}"/>
    </clipPath>

    <clipPath id="clipBgTri">
      <polygon points="${triX},0 ${W},0 ${W},${topH}"/>
    </clipPath>

    <linearGradient id="base" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="100%" stop-color="#F8FAFC"/>
    </linearGradient>

    <linearGradient id="triFallback" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${accent}" stop-opacity="0.20"/>
      <stop offset="100%" stop-color="#60A5FA" stop-opacity="0.18"/>
    </linearGradient>

    <filter id="shadow" x="-25%" y="-25%" width="160%" height="160%">
      <feDropShadow dx="0" dy="10" stdDeviation="14" flood-color="#0F172A" flood-opacity="0.10"/>
    </filter>

    <filter id="avatarShadow" x="-25%" y="-25%" width="160%" height="160%">
      <feDropShadow dx="0" dy="6" stdDeviation="10" flood-color="#0F172A" flood-opacity="0.14"/>
    </filter>
  </defs>

  <!-- Card -->
  <g filter="url(#shadow)">
    <g clip-path="url(#clipCard)">
      <rect x="0" y="0" width="${W}" height="${H}" rx="${R}" fill="url(#base)"/>

      <!-- Top-left area base (clean) -->
      <rect x="0" y="0" width="${W}" height="${topH}" fill="#FFFFFF"/>

      <!-- Diagonal background triangle on the back -->
      <g clip-path="url(#clipBgTri)">
        <rect x="${triX}" y="0" width="${W - triX}" height="${topH}" fill="url(#triFallback)"/>
        ${
          hasBg
            ? `<image href="${input.bgDataUri}" x="${triX}" y="0" width="${W - triX}" height="${topH}"
                     preserveAspectRatio="xMidYMid slice"/>`
            : ""
        }
        <!-- subtle overlay to keep it classy -->
        <rect x="${triX}" y="0" width="${W - triX}" height="${topH}" fill="#0F172A" opacity="0.06"/>
      </g>

      <!-- Diagonal separator line (single, clean) -->
      <line x1="${triX}" y1="0" x2="${W}" y2="${topH}" stroke="#E2E8F0" stroke-width="2" opacity="0.9"/>

      <!-- Subtle top-bottom divider -->
      <line x1="18" y1="${topH}" x2="${W - 18}" y2="${topH}" stroke="#EEF2F7"/>
    </g>
  </g>

  <!-- Avatar (top-left) -->
  <g filter="url(#avatarShadow)">
    <circle cx="${avatarCx}" cy="${avatarCy}" r="${avatarR + 3}" fill="#FFFFFF"/>
    <circle cx="${avatarCx}" cy="${avatarCy}" r="${avatarR + 2}" fill="none" stroke="#E5E7EB"/>
    ${
      hasAvatar
        ? `<image href="${input.avatarDataUri}" x="${avatarCx - avatarR}" y="${avatarCy - avatarR}"
                 width="${avatarSize}" height="${avatarSize}" clip-path="url(#clipAvatar)"
                 preserveAspectRatio="xMidYMid slice"/>`
        : `<text x="${avatarCx}" y="${avatarCy + 6}" text-anchor="middle"
                 fill="#94A3B8" font-size="18" font-weight="900" font-family="${font}">?</text>`
    }
  </g>

  <!-- Tier + Handle line (under topH) -->
  <image href="${input.tierDataUri}" x="${tierX}" y="${tierY}" width="${tierSize}" height="${tierSize}"/>
  <text x="${textX}" y="${nameY}" fill="#0F172A" font-size="18" font-weight="900" font-family="${font}">
    ${handle}
  </text>

  <!-- Stats rows (4 lines) -->
  ${row("Solved", `${solved}`, rowsTop)}
  ${row("Rank", rank ? `#${rank}` : "-", rowsTop + (rowH + rowGap) * 1)}
  ${row("Class", clazz ? `${clazz}` : "-", rowsTop + (rowH + rowGap) * 2)}
  ${row("Max streak", `${streak}`, rowsTop + (rowH + rowGap) * 3)}
</svg>`;
}

export function renderErrorCard(msg: string) {
  const safe = esc(msg);
  const W = 560;
  const H = 140;
  const R = 18;
  const font = "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto";

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="shadow" x="-25%" y="-25%" width="160%" height="160%">
      <feDropShadow dx="0" dy="10" stdDeviation="14" flood-color="#0F172A" flood-opacity="0.10"/>
    </filter>
  </defs>
  <g filter="url(#shadow)">
    <rect width="${W}" height="${H}" rx="${R}" fill="#FFFFFF"/>
  </g>
  <text x="22" y="54" fill="#DC2626" font-size="16" font-weight="900" font-family="${font}">Error</text>
  <text x="22" y="80" fill="#0F172A" font-size="12.5" font-weight="700" font-family="${font}">${safe}</text>
</svg>`;
}
