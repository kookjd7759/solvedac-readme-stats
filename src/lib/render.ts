import type { SolvedStreakSummary, SolvedUser, SolvedYearlyActivity } from './solvedac';
import { esc } from './esc';
import { W, H, R, PAD, topH } from './constant/layout';
import { avatarCx, avatarCy, avatarR, avatarSize } from './constant/avatar';

type RenderInput = {
    user: SolvedUser;
    tierDataUri: string;
    avatarDataUri: string;
    bgDataUri: string;
    badgeDataUri: string;
    classDataUri?: string;
    accentColor?: string;
    streakSummary?: SolvedStreakSummary | null;
    streakActivity?: SolvedYearlyActivity | null;
    showStreakGrass?: boolean;
};

const font = 'ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto';
const STREAK_DAY_SHIFT_MS = 3 * 60 * 60 * 1000;
const YEARLY_STREAK_GRID_DAYS = 53 * 7;

function getTierAccentColor(tier: number) {
    if (tier >= 31) return '#7C3AED';
    if (tier >= 26) return '#FF0062';
    if (tier >= 21) return '#00B4FC';
    if (tier >= 16) return '#27E2A4';
    if (tier >= 11) return '#EC9A00';
    if (tier >= 6) return '#435F7A';
    if (tier >= 1) return '#AD5600';
    return '#94A3B8';
}

function renderTierIcon(dataUri: string, tier: number, x: number, y: number, size: number) {
    const tierFallbackText = esc(String(tier));

    if (dataUri) {
        return `<image href="${dataUri}" x="${x}" y="${y}" width="${size}" height="${size}" preserveAspectRatio="xMidYMid meet"/>`;
    }

    return `
      <g>
        <circle cx="${x + size / 2}" cy="${y + size / 2}" r="${size / 2}" fill="#E2E8F0"/>
        <text x="${x + size / 2}" y="${y + size / 2 + 4}"
              text-anchor="middle" fill="#334155" font-size="11" font-weight="900" font-family="${font}">
          ${tierFallbackText}
        </text>
      </g>
    `;
}

function renderAssetToken(href: string, x: number, y: number, size: number) {
    return `
      <g>
        <circle cx="${x + size / 2}" cy="${y + size / 2}" r="${size / 2}" fill="#FFFFFF" fill-opacity="0.88"/>
        <circle cx="${x + size / 2}" cy="${y + size / 2}" r="${size / 2 - 0.5}" fill="none" stroke="#E2E8F0"/>
        <image href="${href}" x="${x + 5}" y="${y + 5}" width="${size - 10}" height="${size - 10}" preserveAspectRatio="xMidYMid meet"/>
      </g>
    `;
}

function renderAvatarFallback(handle: string, cx: number, cy: number, radius: number, accent: string) {
    const label = esc((handle.trim().charAt(0) || '?').toUpperCase());
    const fontSize = Math.max(18, Math.round(radius * 0.9));

    return `
      <g>
        <circle cx="${cx}" cy="${cy}" r="${radius}" fill="#F4F7FB"/>
        <circle cx="${cx}" cy="${cy}" r="${radius - 1}" fill="none" stroke="${accent}" stroke-opacity="0.18"/>
        <text x="${cx}" y="${cy + Math.round(fontSize * 0.34)}"
              text-anchor="middle" fill="${accent}" font-size="${fontSize}" font-weight="900" font-family="${font}">
          ${label}
        </text>
      </g>
    `;
}

function renderPrimaryStat(
    x: number,
    y: number,
    width: number,
    label: string,
    value: string,
    helper: string
) {
    return `
      <g>
        <rect x="${x}" y="${y}" width="${width}" height="66" rx="18" fill="#F8FAFC"/>
        <text x="${x + 18}" y="${y + 22}" fill="#64748B" font-size="11" font-weight="800" letter-spacing="0.12em" font-family="${font}">
          ${esc(label)}
        </text>
        <text x="${x + 18}" y="${y + 47}" fill="#0F172A" font-size="24" font-weight="900" font-family="${font}">
          ${esc(value)}
        </text>
        <text x="${x + 18}" y="${y + 61}" fill="#94A3B8" font-size="11.5" font-weight="700" font-family="${font}">
          ${esc(helper)}
        </text>
      </g>
    `;
}

function formatDateKey(date: Date) {
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

function utcDateFromDateKey(dateKey: string) {
    const [year, month, day] = dateKey.split('-').map(Number);
    return new Date(Date.UTC(year || 0, (month || 1) - 1, day || 1));
}

function addUtcDays(date: Date, days: number) {
    const next = new Date(date.getTime());
    next.setUTCDate(next.getUTCDate() + days);
    return next;
}

function getTodayDateKey() {
    return new Date(Date.now() + STREAK_DAY_SHIFT_MS).toISOString().slice(0, 10);
}

function buildYearlyGridDates() {
    const today = utcDateFromDateKey(getTodayDateKey());
    const gridEnd = addUtcDays(today, 6 - today.getUTCDay());
    const gridStart = addUtcDays(gridEnd, -(YEARLY_STREAK_GRID_DAYS - 1));
    return Array.from({ length: YEARLY_STREAK_GRID_DAYS }, (_, index) => addUtcDays(gridStart, index));
}

function renderStreakGrassPanel(
    x: number,
    y: number,
    width: number,
    summary: SolvedStreakSummary,
    activity: SolvedYearlyActivity | null | undefined,
    streakFallback: number
) {
    const panelH = 116;
    const rows = 7;
    const cols = 53;
    const cellSize = 7;
    const gap = 2;
    const gridDates = buildYearlyGridDates();
    const gridW = cols * cellSize + (cols - 1) * gap;
    const gridX = x + Math.round((width - gridW) / 2);
    const gridY = y + 40;
    const gridH = rows * cellSize + (rows - 1) * gap;
    const longest = Math.max(summary.longestStreak || 0, streakFallback || 0);
    const today = utcDateFromDateKey(getTodayDateKey()).getTime();
    const counts = activity?.dailyCounts || {};
    const cells: string[] = [];

    for (let col = 0; col < cols; col += 1) {
        for (let row = 0; row < rows; row += 1) {
            const date = gridDates[col * rows + row]!;
            const dateKey = formatDateKey(date);
            const isFuture = date.getTime() > today;
            const count = counts[dateKey] || 0;
            const fill = isFuture ? '#F8FAFC' : count > 0 ? '#86EFAC' : '#E2E8F0';
            const cellX = gridX + col * (cellSize + gap);
            const cellY = gridY + row * (cellSize + gap);

            cells.push(
                `<rect x="${cellX}" y="${cellY}" width="${cellSize}" height="${cellSize}" rx="2" fill="${fill}"/>`
            );
        }
    }

    return `
      <g>
        <rect x="${x}" y="${y}" width="${width}" height="${panelH}" rx="18" fill="#F8FAFC"/>
        <text x="${x + 14}" y="${y + 19}" fill="#64748B" font-size="12" font-weight="800" font-family="${font}">
          Max Streak
        </text>
        <text x="${x + width - 14}" y="${y + 19}" text-anchor="end" fill="#0F172A" font-size="13" font-weight="900" font-family="${font}">
          ${esc(`${longest}`)}
        </text>
        ${cells.join('')}
      </g>
    `;
}

export function renderCard(input: RenderInput) {
    const u = input.user;
    const handle = esc(u.handle || '');
    const solved = u.solvedCount ?? 0;
    const rank = (u as any).rank ?? 0;
    const streak = u.maxStreak ?? 0;
    const showStreakGrass = !!input.showStreakGrass;
    const hasAvatar = !!input.avatarDataUri;
    const hasBg = !!input.bgDataUri;
    const hasBadge = !!input.badgeDataUri;
    const hasClassIcon = !!(input.classDataUri && input.classDataUri.trim().length > 0);
    const nameX = 18;
    const nameY = topH + 34;
    const tierSize = 24;
    const tierX = nameX;
    const tierY = topH + 18;
    const textX = nameX + tierSize + 8;
    const rowsTop = topH + 58;
    const rowH = 28;
    const rowGap = 8;
    const leftPad = 18;
    const rowW = W - leftPad * 2;
    const accent = input.accentColor || getTierAccentColor(u.tier ?? 0);
    const streakSummary = input.streakSummary || {
        currentStreak: 0,
        longestStreak: streak,
    };
    const streakActivity = input.streakActivity || null;
    const triX = Math.round(W * 0.29);
    const kneeY = Math.round(topH * 1.0);
    const kneeX = Math.round(W * 0.6);
    const badgeSize = 50;
    const badgeX = avatarCx + avatarR - badgeSize / 2 + 40;
    const badgeY = avatarCy + avatarR - badgeSize / 2 - 20;
    const classGap = 8;
    const classX = badgeX + badgeSize + classGap;
    const classY = badgeY;
    const streakPanelY = rowsTop + rowH * 2 + rowGap + 10;
    const streakPanelH = showStreakGrass ? 116 : 0;
    const cardH = H + streakPanelH + (showStreakGrass ? 20 : 0);

    function row(label: string, value: string, y: number) {
        return `
      <g>
        <rect x="${leftPad}" y="${y}" width="${rowW}" height="${rowH}" rx="12" fill="#F8FAFC"/>
        <text x="${leftPad + 12}" y="${y + 19}" fill="#64748B" font-size="12" font-weight="700" font-family="${font}">
          ${esc(label)}
        </text>
        <text x="${leftPad + rowW - 12}" y="${y + 19}" text-anchor="end" fill="#0F172A" font-size="12.5" font-weight="900" font-family="${font}">
          ${esc(value)}
        </text>
      </g>
    `;
    }

    const badgeOverlay = hasBadge
        ? `
      <g>
        <image href="${input.badgeDataUri}"
              x="${badgeX}" y="${badgeY}"
              width="${badgeSize}" height="${badgeSize}"
              preserveAspectRatio="xMidYMid meet"
              style="filter: drop-shadow(0 2px 6px rgba(0,0,0,0.25));"/>
      </g>
    `
        : '';

    const classOverlay = hasClassIcon
        ? `
      <g>
        <image href="${input.classDataUri}"
              x="${classX}" y="${classY}"
              width="${badgeSize}" height="${badgeSize}"
              preserveAspectRatio="xMidYMid meet"
              style="filter: drop-shadow(0 2px 6px rgba(0,0,0,0.25));"/>
      </g>
    `
        : '';

    const tierIcon = renderTierIcon(input.tierDataUri, u.tier ?? 0, tierX, tierY, tierSize);

    return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${W + PAD * 2}" height="${cardH + PAD * 2}"
     viewBox="-${PAD} -${PAD} ${W + PAD * 2} ${cardH + PAD * 2}"
     xmlns="http://www.w3.org/2000/svg">
  <defs>
    <clipPath id="clipCard">
      <rect x="0" y="0" width="${W}" height="${cardH}" rx="${R}"/>
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
      width="${W + (PAD + 70) * 2}" height="${cardH + (PAD + 70) * 2}">
      <feDropShadow dx="0" dy="10" stdDeviation="10" flood-color="#0F172A" flood-opacity="0.14"/>
      <feDropShadow dx="0" dy="3" stdDeviation="4" flood-color="#0F172A" flood-opacity="0.08"/>
      <feDropShadow dx="0" dy="1" stdDeviation="1" flood-color="#0F172A" flood-opacity="0.10"/>
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
      <rect x="0" y="0" width="${W}" height="${cardH}" rx="${R}" fill="url(#base)"/>
      <polygon points="0,0 ${triX},0 ${kneeX},${kneeY} 0,${kneeY}" fill="#FFFFFF"/>

      <g clip-path="url(#clipBgTri)">
        <rect x="${triX}" y="0" width="${W - triX}" height="${kneeY}" fill="url(#triFallback)"/>
        ${hasBg
            ? `<image href="${input.bgDataUri}" x="${triX}" y="0" width="${W - triX}" height="${kneeY}" preserveAspectRatio="xMidYMid slice"/>`
            : ''}
        <rect x="${triX}" y="0" width="${W - triX}" height="${kneeY}" fill="#0F172A" opacity="0.06"/>
      </g>

      <line x1="${triX}" y1="0" x2="${kneeX}" y2="${kneeY}" stroke="#E2E8F0" stroke-width="2" opacity="0.9"/>
      <line x1="${kneeX}" y1="${kneeY}" x2="${W}" y2="${kneeY}" stroke="#E2E8F0" stroke-width="2" opacity="0.9"/>
      <line x1="18" y1="${topH}" x2="${W - 18}" y2="${topH}" stroke="#EEF2F7"/>

      <rect x="0.5" y="0.5" width="${W - 1}" height="${cardH - 1}" rx="${R - 0.5}" fill="none" stroke="#E5E7EB" stroke-opacity="0.65"/>

      <path d="M ${R} 1 H ${W - R}
              C ${W - R / 2} 1 ${W - 1} ${R / 2} ${W - 1} ${R}
              V ${Math.round(topH * 0.55)}
              C ${Math.round(W * 0.66)} ${Math.round(topH * 0.38)} ${Math.round(W * 0.4)} ${Math.round(topH * 0.28)} ${R} ${Math.round(topH * 0.22)}
              Z"
            fill="url(#shine)"/>
    </g>
  </g>

  <g filter="url(#avatarShadow)">
    <circle cx="${avatarCx}" cy="${avatarCy}" r="${avatarR + 3}" fill="#FFFFFF"/>
    <circle cx="${avatarCx}" cy="${avatarCy}" r="${avatarR + 2}" fill="none" stroke="#E5E7EB"/>
    ${hasAvatar
        ? `<image href="${input.avatarDataUri}" x="${avatarCx - avatarR}" y="${avatarCy - avatarR}" width="${avatarSize}" height="${avatarSize}" clip-path="url(#clipAvatar)" preserveAspectRatio="xMidYMid slice"/>`
        : renderAvatarFallback(u.handle || '', avatarCx, avatarCy, avatarR, accent)}
  </g>

  ${badgeOverlay}
  ${classOverlay}
  ${tierIcon}

  <text x="${textX}" y="${nameY}" fill="#0F172A" font-size="18" font-weight="900" font-family="${font}">
    ${handle}
  </text>

  ${row('Solved', `${solved}`, rowsTop)}
  ${row('Rank', rank ? `#${rank}` : '-', rowsTop + rowH + rowGap)}
  ${showStreakGrass ? renderStreakGrassPanel(leftPad, streakPanelY, rowW, streakSummary, streakActivity, streak) : ''}
</svg>`;
}

export function renderCardV2(input: RenderInput) {
    const u = input.user;
    const handle = esc(u.handle || '');
    const solved = u.solvedCount ?? 0;
    const rank = (u as any).rank ?? 0;
    const clazz = (u as any).class ?? 0;
    const streak = u.maxStreak ?? 0;
    const showStreakGrass = !!input.showStreakGrass;
    const tier = u.tier ?? 0;
    const accent = input.accentColor || getTierAccentColor(tier);
    const hasAvatar = !!input.avatarDataUri;
    const hasBg = !!input.bgDataUri;
    const hasBadge = !!input.badgeDataUri;
    const hasClassIcon = !!(input.classDataUri && input.classDataUri.trim().length > 0);
    const baseCardH = 244;
    const heroH = 96;
    const triX = Math.round(W * 0.3);
    const kneeX = Math.round(W * 0.62);
    const kneeY = heroH;
    const tierSize = 24;
    const tierX = 18;
    const tierY = heroH + 16;
    const nameX = tierX + tierSize + 10;
    const nameY = heroH + 34;
    const handleFontSize = handle.length > 18 ? 19 : handle.length > 14 ? 21 : 23;
    const avatarOuterR = avatarR + 4;
    const rowH = 28;
    const rowGap = 8;
    const rowX = 18;
    const rowW = W - rowX * 2;
    const rowsTop = 160;
    const streakPanelY = rowsTop + rowH * 2 + rowGap + 10;
    const streakPanelH = showStreakGrass ? 116 : 0;
    const cardH = baseCardH + streakPanelH + (showStreakGrass ? 20 : 0);
    const upperStroke = '#D8E4F0';
    const badgeSize = 50;
    const badgeX = avatarCx + avatarR - badgeSize / 2 + 40;
    const badgeY = avatarCy + avatarR - badgeSize / 2 - 20;
    const classGap = 8;
    const classX = badgeX + badgeSize + classGap;
    const classY = badgeY;
    const streakSummary = input.streakSummary || {
        currentStreak: 0,
        longestStreak: streak,
    };
    const streakActivity = input.streakActivity || null;
    const badgeOverlay = hasBadge
        ? `<image href="${input.badgeDataUri}" x="${badgeX}" y="${badgeY}" width="${badgeSize}" height="${badgeSize}" preserveAspectRatio="xMidYMid meet"/>`
        : '';
    const classOverlay = hasClassIcon
        ? `<image href="${input.classDataUri}" x="${classX}" y="${classY}" width="${badgeSize}" height="${badgeSize}" preserveAspectRatio="xMidYMid meet"/>`
        : '';

    function row(label: string, value: string, y: number) {
        return `
      <g>
        <rect x="${rowX}" y="${y}" width="${rowW}" height="${rowH}" rx="14" fill="#F8FAFC"/>
        <text x="${rowX + 14}" y="${y + 19}" fill="#64748B" font-size="12" font-weight="800" font-family="${font}">
          ${esc(label)}
        </text>
        <text x="${rowX + rowW - 14}" y="${y + 19}" text-anchor="end" fill="#0F172A" font-size="13" font-weight="900" font-family="${font}">
          ${esc(value)}
        </text>
      </g>
    `;
    }

    return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${W}" height="${cardH}" viewBox="0 0 ${W} ${cardH}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <clipPath id="clipCardV2">
      <rect x="0" y="0" width="${W}" height="${cardH}" rx="${R}"/>
    </clipPath>
    <clipPath id="clipAvatarV2">
      <circle cx="${avatarCx}" cy="${avatarCy}" r="${avatarR}"/>
    </clipPath>
    <clipPath id="clipHeroV2">
      <polygon points="${triX},0 ${W},0 ${W},${kneeY} ${kneeX},${kneeY}"/>
    </clipPath>
    <linearGradient id="heroFallbackV2" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${accent}" stop-opacity="0.22"/>
      <stop offset="100%" stop-color="#60A5FA" stop-opacity="0.16"/>
    </linearGradient>
    <linearGradient id="accentRailV2" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="${accent}"/>
      <stop offset="100%" stop-color="#60A5FA"/>
    </linearGradient>
    <linearGradient id="avatarRingV2" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#FFFFFF"/>
      <stop offset="100%" stop-color="#F1F5F9"/>
    </linearGradient>
  </defs>

  <g clip-path="url(#clipCardV2)">
    <rect x="0" y="0" width="${W}" height="${cardH}" rx="${R}" fill="#FFFFFF"/>

    <polygon points="0,0 ${triX},0 ${kneeX},${kneeY} 0,${kneeY}" fill="#FFFFFF"/>
    <g clip-path="url(#clipHeroV2)">
      ${hasBg
        ? `<rect x="${triX}" y="0" width="${W - triX}" height="${heroH}" fill="#FFFFFF"/>
      <image href="${input.bgDataUri}" x="${triX}" y="0" width="${W - triX}" height="${heroH}" preserveAspectRatio="xMidYMid slice" opacity="0.78"/>
      <rect x="${triX}" y="0" width="${W - triX}" height="${heroH}" fill="#FFFFFF" opacity="0.06"/>`
        : `<rect x="${triX}" y="0" width="${W - triX}" height="${heroH}" fill="url(#heroFallbackV2)"/>`}
    </g>

    <line x1="${triX}" y1="0" x2="${kneeX}" y2="${kneeY}" stroke="${upperStroke}" stroke-width="0.9" stroke-linecap="round"/>
    <line x1="0" y1="${kneeY}" x2="${W}" y2="${kneeY}" stroke="${upperStroke}" stroke-width="0.9" stroke-linecap="round"/>

    <circle cx="${avatarCx}" cy="${avatarCy}" r="${avatarOuterR + 2}" fill="url(#avatarRingV2)"/>
    <circle cx="${avatarCx}" cy="${avatarCy}" r="${avatarOuterR + 1}" fill="none" stroke="#DCE4EE"/>
    <circle cx="${avatarCx}" cy="${avatarCy}" r="${avatarR + 1}" fill="none" stroke="${accent}" stroke-opacity="0.22"/>
    ${hasAvatar
        ? `<image href="${input.avatarDataUri}" x="${avatarCx - avatarR}" y="${avatarCy - avatarR}" width="${avatarSize}" height="${avatarSize}" clip-path="url(#clipAvatarV2)" preserveAspectRatio="xMidYMid slice"/>`
        : renderAvatarFallback(u.handle || '', avatarCx, avatarCy, avatarR, accent)}

    ${badgeOverlay}
    ${classOverlay}
    ${renderTierIcon(input.tierDataUri, tier, tierX, tierY, tierSize)}
    <text x="${nameX}" y="${nameY}" fill="#0F172A" font-size="${handleFontSize}" font-weight="900" font-family="${font}">
      ${handle}
    </text>
    ${row('Solved', `${solved}`, rowsTop)}
    ${row('Rank', rank ? `#${rank}` : '-', rowsTop + rowH + rowGap)}
    ${showStreakGrass ? renderStreakGrassPanel(rowX, streakPanelY, rowW, streakSummary, streakActivity, streak) : ''}

    <rect x="0.5" y="0.5" width="${W - 1}" height="${cardH - 1}" rx="${R - 0.5}" fill="none" stroke="#D9E2EC"/>
  </g>
</svg>`;
}

export function renderErrorCard(msg: string) {
    const safe = esc(msg);
    const errorW = 560;
    const errorH = 140;
    const errorR = 18;

    return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${errorW + PAD * 2}" height="${errorH + PAD * 2}"
     viewBox="0 0 ${errorW + PAD * 2} ${errorH + PAD * 2}"
     xmlns="http://www.w3.org/2000/svg">
  <defs>
    <filter id="shadow"
      filterUnits="userSpaceOnUse"
      x="${-(PAD + 70)}" y="${-(PAD + 70)}"
      width="${errorW + (PAD + 70) * 2}" height="${errorH + (PAD + 70) * 2}">
      <feDropShadow dx="0" dy="14" stdDeviation="16" flood-color="#0F172A" flood-opacity="0.14"/>
      <feDropShadow dx="0" dy="4" stdDeviation="6" flood-color="#0F172A" flood-opacity="0.08"/>
      <feDropShadow dx="0" dy="1" stdDeviation="1.5" flood-color="#0F172A" flood-opacity="0.10"/>
    </filter>
  </defs>
  <g filter="url(#shadow)">
    <rect width="${errorW}" height="${errorH}" rx="${errorR}" fill="#FFFFFF"/>
  </g>
  <text x="22" y="54" fill="#DC2626" font-size="16" font-weight="900" font-family="${font}">Error</text>
  <text x="22" y="80" fill="#0F172A" font-size="12.5" font-weight="700" font-family="${font}">${safe}</text>
</svg>`;
}

export function renderErrorCardV2(msg: string) {
    const safe = esc(msg);
    const errorW = 560;
    const errorH = 140;
    const errorR = 18;

    return `<?xml version="1.0" encoding="UTF-8"?>
<svg width="${errorW}" height="${errorH}" viewBox="0 0 ${errorW} ${errorH}" xmlns="http://www.w3.org/2000/svg">
  <rect x="0" y="0" width="${errorW}" height="${errorH}" rx="${errorR}" fill="#FFFFFF"/>
  <rect x="0.5" y="0.5" width="${errorW - 1}" height="${errorH - 1}" rx="${errorR - 0.5}" fill="none" stroke="#D9E2EC"/>
  <text x="24" y="48" fill="#DC2626" font-size="12" font-weight="800" letter-spacing="0.16em" font-family="${font}">ERROR</text>
  <text x="24" y="78" fill="#0F172A" font-size="18" font-weight="900" font-family="${font}">Unable to render card</text>
  <text x="24" y="104" fill="#475569" font-size="12.5" font-weight="700" font-family="${font}">${safe}</text>
</svg>`;
}
