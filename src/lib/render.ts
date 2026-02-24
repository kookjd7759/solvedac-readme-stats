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

  tierDataUri: string;
  avatarDataUri: string;
  bgDataUri: string;

  badgeDataUri: string; // 설정 뱃지 (있으면)
  classDataUri?: string; // ✅ NEW: 클래스 아이콘(data uri) (없으면 ""/undefined)

  accentColor?: string;
};

export function renderCard(input: RenderInput) {
  const u = input.user;

  const handle = esc(u.handle || "");
  const solved = u.solvedCount ?? 0;
  const rank = (u as any).rank ?? 0;
  const clazz = (u as any).class ?? 0;
  const streak = u.maxStreak ?? 0;

  const hasAvatar = !!input.avatarDataUri;
  const hasBg = !!input.bgDataUri;

  const hasBadge = !!input.badgeDataUri;
  const hasClassIcon = !!(input.classDataUri && input.classDataUri.trim().length > 0);

  // ===== Layout =====
  const W = 560;
  const H = 220;
  const R = 18;
  const PAD = 33; // 바깥 패딩

  const topH = 92;

  // Avatar
  const avatarSize = 62;
  const avatarR = avatarSize / 2;
  const avatarCx = 56;
  const avatarCy = 46;

  // Name line
  const nameX = 18;
  const nameY = topH + 34;

  // Tier icon next to name
  const tierSize = 18;
  const tierX = nameX;
  const tierY = topH + 18;

  const textX = nameX + tierSize + 8;

  // ✅ NEW: name + badges
  const tagH = 18;
  const tagR = 9;
  const tagGap = 6;

  // 배지/클래스 아이콘 크기
  const badgeIcon = 14;
  const classIcon = 14;

  // 닉네임 오른쪽 시작 위치: 대충 텍스트 뒤로 충분히 떨어뜨리기
  // (SVG에서 텍스트 실제 폭 측정이 어려워서, handle 길이에 따라 보정)
  // 평균 폰트 18px에서 글자폭 ~ 9~10px 정도로 잡고 + 여유
  const approxNameW = Math.min(280, 10 * handle.length + 8);
  const tagsX = textX + approxNameW + 10;

  const font = "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto";
  const accent = input.accentColor || "#3ef0b1";

  // Stats rows (4 lines)
  const rowsTop = topH + 58;
  const rowH = 28;
  const rowGap = 8;
  const leftPad = 18;
  const rightPad = 18;
  const rowW = W - leftPad - rightPad;

  function row(label: string, value: string, y: number) {
    const L = esc(label);
    const V = esc(value);
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

  // Diagonal bg
  const triX = Math.round(W * 0.29);
  const kneeY = Math.round(topH * 1.0);
  const kneeX = Math.round(W * 0.60);

  // ✅ badge overlay (bottom-right)
  const badgeSize = 50;     // 크기 (원하면 64~88 사이로 조절)
  const badgeX = avatarCx + avatarR - badgeSize / 2 + 40;
  const badgeY = avatarCy + avatarR - badgeSize / 2 - 30;

  const badgeOverlay = hasBadge
    ? `
      <g>
        <!-- 배지 뒤 흰색 테두리(가독성) -->
        <circle cx="${badgeX + badgeSize / 2}" cy="${badgeY + badgeSize / 2}" r="${badgeSize / 2 + 2}"
                fill="#FFFFFF" opacity="0.95"/>
        <!-- 아주 약한 그림자 -->
        <circle cx="${badgeX + badgeSize / 2}" cy="${badgeY + badgeSize / 2}" r="${badgeSize / 2 + 2}"
                fill="#000" opacity="0.08"/>
        <image href="${input.badgeDataUri}"
              x="${badgeX}" y="${badgeY}"
              width="${badgeSize}" height="${badgeSize}"
              preserveAspectRatio="xMidYMid meet"
              style="filter: drop-shadow(0 2px 6px rgba(0,0,0,0.25));"/>
      </g>
    `
    : "";


  function iconPill(x: number, y: number, iconHref: string, title: string) {
    const safe = esc(title);
    const w = 32;
    return `
      <g>
        <rect x="${x}" y="${y - tagH + 3}" width="${w}" height="${tagH}" rx="${tagR}" fill="#F1F5F9"/>
        <image href="${iconHref}" x="${x + 9}" y="${y - tagH + 5}" width="${classIcon}" height="${classIcon}"/>
        <title>${safe}</title>
      </g>
    `;
  }

  const tagY = nameY;
  let curX = tagsX;

  const classMarkup =
    hasClassIcon ? iconPill(curX, tagY, input.classDataUri!, `Class ${clazz || ""}`.trim()) : "";

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${W + PAD * 2}" height="${H + PAD * 2}"
     viewBox="-${PAD} -${PAD} ${W + PAD * 2} ${H + PAD * 2}"
     xmlns="http://www.w3.org/2000/svg">
  <defs>
    <clipPath id="clipCard">
      <rect x="0" y="0" width="${W}" height="${H}" rx="${R}"/>
    </clipPath>

    <clipPath id="clipAvatar">
      <circle cx="${avatarCx}" cy="${avatarCy}" r="${avatarR}"/>
    </clipPath>

    <clipPath id="clipBgTri">
      <polygon points="${triX},0 ${W},0 ${W},${kneeY} ${kneeX},${kneeY}"/>
    </clipPath>

    <linearGradient id="base" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="100%" stop-color="#F3F6FB"/>
    </linearGradient>

    <linearGradient id="triFallback" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${accent}" stop-opacity="0.20"/>
      <stop offset="100%" stop-color="#60A5FA" stop-opacity="0.18"/>
    </linearGradient>

    <filter id="shadow"
      filterUnits="userSpaceOnUse"
      x="${-(PAD + 70)}" y="${-(PAD + 70)}"
      width="${W + (PAD + 70) * 2}" height="${H + (PAD + 70) * 2}">
      <feDropShadow dx="0" dy="14" stdDeviation="16" flood-color="#0F172A" flood-opacity="0.14"/>
      <feDropShadow dx="0" dy="4"  stdDeviation="6"  flood-color="#0F172A" flood-opacity="0.08"/>
      <feDropShadow dx="0" dy="1"  stdDeviation="1.5" flood-color="#0F172A" flood-opacity="0.10"/>
    </filter>

    <filter id="avatarShadow" x="-25%" y="-25%" width="160%" height="160%">
      <feDropShadow dx="0" dy="6" stdDeviation="10" flood-color="#0F172A" flood-opacity="0.14"/>
    </filter>

    <radialGradient id="shine" cx="0.18" cy="0.08" r="0.9">
      <stop offset="0%" stop-color="#FFFFFF" stop-opacity="0.75"/>
      <stop offset="45%" stop-color="#FFFFFF" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="#FFFFFF" stop-opacity="0"/>
    </radialGradient>

  </defs>

  <g filter="url(#shadow)">
    <g clip-path="url(#clipCard)">
      <rect x="0" y="0" width="${W}" height="${H}" rx="${R}" fill="url(#base)"/>

      <polygon points="0,0 ${triX},0 ${kneeX},${kneeY} 0,${kneeY}" fill="#FFFFFF"/>

      <g clip-path="url(#clipBgTri)">
        <rect x="${triX}" y="0" width="${W - triX}" height="${kneeY}" fill="url(#triFallback)"/>
        ${
          hasBg
            ? `<image href="${input.bgDataUri}" x="${triX}" y="0" width="${W - triX}" height="${kneeY}"
                    preserveAspectRatio="xMidYMid slice"/>`
            : ""
        }
        <rect x="${triX}" y="0" width="${W - triX}" height="${kneeY}" fill="#0F172A" opacity="0.06"/>
      </g>

      <line x1="${triX}" y1="0" x2="${kneeX}" y2="${kneeY}" stroke="#E2E8F0" stroke-width="2" opacity="0.9"/>
      <line x1="${kneeX}" y1="${kneeY}" x2="${W}" y2="${kneeY}" stroke="#E2E8F0" stroke-width="2" opacity="0.9"/>

      <line x1="18" y1="${topH}" x2="${W - 18}" y2="${topH}" stroke="#EEF2F7"/>

      <!-- ✅ card border (inside clip) -->
      <rect x="0.5" y="0.5" width="${W - 1}" height="${H - 1}" rx="${R - 0.5}"
            fill="none" stroke="#E5E7EB" stroke-opacity="0.65"/>

      <!-- ✅ subtle inner highlight (top-left shine) -->
      <path d="M ${R} 1 H ${W - R} 
              C ${W - R/2} 1 ${W - 1} ${R/2} ${W - 1} ${R}
              V ${Math.round(topH * 0.55)} 
              C ${Math.round(W * 0.66)} ${Math.round(topH * 0.38)} ${Math.round(W * 0.40)} ${Math.round(topH * 0.28)} ${R} ${Math.round(topH * 0.22)}
              Z"
            fill="url(#shine)"/>
    </g>
  </g>

  <!-- Avatar -->
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

  <!-- Tier + Handle -->
  <image href="${input.tierDataUri}" x="${tierX}" y="${tierY}" width="${tierSize}" height="${tierSize}"/>
  <text x="${textX}" y="${nameY}" fill="#0F172A" font-size="18" font-weight="900" font-family="${font}">
    ${handle}
  </text>

  <!-- ✅ NEW: Handle 오른쪽에 badge + class -->
  ${classMarkup}

  <!-- Rows -->
  ${row("Solved", `${solved}`, rowsTop)}
  ${row("Rank", rank ? `#${rank}` : "-", rowsTop + (rowH + rowGap) * 1)}

+  <!-- ✅ Badge bottom-right overlay -->
+  ${badgeOverlay}
</svg>`;
}

export function renderErrorCard(msg: string) {
  const safe = esc(msg);
  const W = 560;
  const H = 140;
  const R = 18;
  const PAD = 33; // 바깥 패딩
  const font = "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto";

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${W + PAD * 2}" height="${H + PAD * 2}"
     viewBox="0 0 ${W + PAD * 2} ${H + PAD * 2}"
     xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="shadow"
      filterUnits="userSpaceOnUse"
      x="${-(PAD + 70)}" y="${-(PAD + 70)}"
      width="${W + (PAD + 70) * 2}" height="${H + (PAD + 70) * 2}">
      <feDropShadow dx="0" dy="14" stdDeviation="16" flood-color="#0F172A" flood-opacity="0.14"/>
      <feDropShadow dx="0" dy="4"  stdDeviation="6"  flood-color="#0F172A" flood-opacity="0.08"/>
      <feDropShadow dx="0" dy="1"  stdDeviation="1.5" flood-color="#0F172A" flood-opacity="0.10"/>
    </filter>
  </defs>
  <g filter="url(#shadow)">
    <rect width="${W}" height="${H}" rx="${R}" fill="#FFFFFF"/>
  </g>
  <text x="22" y="54" fill="#DC2626" font-size="16" font-weight="900" font-family="${font}">Error</text>
  <text x="22" y="80" fill="#0F172A" font-size="12.5" font-weight="700" font-family="${font}">${safe}</text>
</svg>`;
}
