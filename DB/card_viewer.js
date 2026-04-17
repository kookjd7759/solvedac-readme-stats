const DATA_URL_CANDIDATES = ["./user_data.json", "../DB/user_data.json", "/DB/user_data.json"];
const STATIC_SOLVED_BASE = "https://static.solved.ac";

const W = 560;
const H = 220;
const R = 18;
const PAD = 33;
const topH = 92;
const avatarSize = 62;
const avatarR = avatarSize / 2;
const avatarCx = 56;
const avatarCy = 46;
const font = "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto";
const STREAK_DAY_SHIFT_MS = 3 * 60 * 60 * 1000;
const YEARLY_STREAK_GRID_DAYS = 53 * 7;

const elements = {
  handleInput: document.querySelector("#handle-input"),
  renderButton: document.querySelector("#render-button"),
  downloadButton: document.querySelector("#download-button"),
  previewEmpty: document.querySelector("#preview-empty"),
  previewCanvas: document.querySelector("#preview-canvas"),
  statusPill: document.querySelector("#status-pill"),
  messageCard: document.querySelector("#message-card"),
  dataSource: document.querySelector("#data-source"),
  openSvgLink: document.querySelector("#open-svg-link"),
  streakInput: document.querySelector("#streak-input"),
  versionCards: Array.from(document.querySelectorAll(".version-card")),
  loadJsonButton: document.querySelector("#load-json-button"),
  jsonFileInput: document.querySelector("#json-file-input"),
};

const state = {
  draftHandle: "",
  draftVersion: "2",
  draftShowStreak: false,
  submittedHandle: "",
  submittedVersion: "2",
  submittedShowStreak: false,
  previewSvg: "",
  previewBlobUrl: "",
  data: null,
  lowerHandleIndex: new Map(),
};

boot();

async function boot() {
  bindEvents();
  syncVersionCards();
  setStatus("loading");

  try {
    const loaded = await loadInitialData();
    applyLoadedData(loaded.data, loaded.sourceLabel);
  } catch (error) {
    elements.dataSource.textContent = `${DATA_URL_CANDIDATES[0]} could not be loaded`;
    setStatus("error");
    setMessage(
      `Could not auto-load local DB. Choose user_data.json manually with the button below. (${safeErrorMessage(error)})`,
      true
    );
  }
}

function bindEvents() {
  elements.versionCards.forEach((card) => {
    card.addEventListener("click", () => {
      const input = card.querySelector('input[name="version"]');
      if (!input) return;
      state.draftVersion = input.value;
      input.checked = true;
      syncVersionCards();
    });
  });

  elements.handleInput.addEventListener("input", () => {
    state.draftHandle = elements.handleInput.value.trim();
  });

  elements.handleInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      renderLocalCard();
    }
  });

  elements.streakInput.addEventListener("change", () => {
    state.draftShowStreak = elements.streakInput.checked;
  });

  elements.renderButton.addEventListener("click", renderLocalCard);
  elements.downloadButton.addEventListener("click", downloadSvg);
  elements.loadJsonButton.addEventListener("click", () => {
    elements.jsonFileInput.click();
  });
  elements.jsonFileInput.addEventListener("change", handleJsonFileSelected);
}

async function loadInitialData() {
  const errors = [];

  for (const candidate of DATA_URL_CANDIDATES) {
    try {
      const response = await fetch(candidate, { cache: "no-store" });
      if (!response.ok) {
        throw new Error(`failed to load ${candidate} (${response.status})`);
      }

      return {
        data: await response.json(),
        sourceLabel: candidate,
      };
    } catch (error) {
      errors.push(safeErrorMessage(error));
    }
  }

  throw new Error(errors.join(" | "));
}

function applyLoadedData(data, sourceLabel) {
  state.data = data;
  buildHandleIndex();

  const userCount = Object.keys(state.data?.users || {}).length;
  elements.dataSource.textContent = `${sourceLabel} (${userCount.toLocaleString()} users loaded)`;
  setStatus("ready");
  setMessage(
    `Local database loaded. Enter one saved handle and render a card. (${userCount.toLocaleString()} users available)`,
    false
  );
}

async function handleJsonFileSelected(event) {
  const file = event.target.files?.[0];
  if (!file) return;

  setStatus("loading");
  setMessage(`Loading ${file.name} ...`, false);

  try {
    const text = await file.text();
    const parsed = JSON.parse(text);
    applyLoadedData(parsed, `${file.name} (manual)`);
  } catch (error) {
    setStatus("error");
    setMessage(`Could not parse selected JSON file. (${safeErrorMessage(error)})`, true);
  } finally {
    elements.jsonFileInput.value = "";
  }
}

function buildHandleIndex() {
  state.lowerHandleIndex = new Map();
  for (const handle of Object.keys(state.data?.users || {})) {
    state.lowerHandleIndex.set(handle.toLowerCase(), handle);
  }
}

function syncVersionCards() {
  elements.versionCards.forEach((card) => {
    const input = card.querySelector('input[name="version"]');
    card.classList.toggle("version-card-active", input && input.value === state.draftVersion);
  });
}

function setStatus(status) {
  elements.statusPill.textContent = status;
  elements.statusPill.dataset.status = status;
}

function setMessage(message, isError) {
  elements.messageCard.textContent = message;
  elements.messageCard.classList.toggle("is-error", Boolean(isError));
}

function safeErrorMessage(error) {
  return error instanceof Error ? error.message : String(error || "unknown error");
}

function esc(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function getTierAccentColor(tier) {
  if (tier >= 31) return "#7C3AED";
  if (tier >= 26) return "#FF0062";
  if (tier >= 21) return "#00B4FC";
  if (tier >= 16) return "#27E2A4";
  if (tier >= 11) return "#EC9A00";
  if (tier >= 6) return "#435F7A";
  if (tier >= 1) return "#AD5600";
  return "#94A3B8";
}

function normalizeHandleLookup(handle) {
  return state.lowerHandleIndex.get(String(handle || "").trim().toLowerCase()) || null;
}

function dateKeyFromTimestampMs(timestampMs) {
  return new Date(timestampMs + STREAK_DAY_SHIFT_MS).toISOString().slice(0, 10);
}

function utcDateFromDateKey(dateKey) {
  const [year, month, day] = String(dateKey || "")
    .split("-")
    .map((value) => Number(value));
  return new Date(Date.UTC(year || 0, (month || 1) - 1, day || 1));
}

function formatDateKey(date) {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function addUtcDays(date, days) {
  const next = new Date(date.getTime());
  next.setUTCDate(next.getUTCDate() + days);
  return next;
}

function getTodayDateKey() {
  return dateKeyFromTimestampMs(Date.now());
}

function buildYearlyGridDates() {
  const today = utcDateFromDateKey(getTodayDateKey());
  const gridEnd = addUtcDays(today, 6 - today.getUTCDay());
  const gridStart = addUtcDays(gridEnd, -(YEARLY_STREAK_GRID_DAYS - 1));
  return Array.from({ length: YEARLY_STREAK_GRID_DAYS }, (_, index) => addUtcDays(gridStart, index));
}

function decodeBase64UrlToBytes(value) {
  if (!value) return new Uint8Array();
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padding = "=".repeat((4 - (normalized.length % 4 || 4)) % 4);
  const binary = atob(normalized + padding);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }
  return bytes;
}

function decodeStreakActivity(activity) {
  if (!activity || typeof activity !== "object") {
    return { dailyCounts: {}, activeDays: 0 };
  }

  if (activity.dailyCounts && typeof activity.dailyCounts === "object") {
    const normalized = {};
    for (const [dateKey, count] of Object.entries(activity.dailyCounts)) {
      if (count > 0) normalized[dateKey] = 1;
    }
    return {
      dailyCounts: normalized,
      activeDays: Object.keys(normalized).length,
    };
  }

  const startDate = typeof activity.startDate === "string" ? activity.startDate : getTodayDateKey();
  const activeMask = typeof activity.activeMask === "string" ? activity.activeMask : "";
  const bytes = decodeBase64UrlToBytes(activeMask);
  const start = utcDateFromDateKey(startDate);
  const dailyCounts = {};

  for (let byteIndex = 0; byteIndex < bytes.length; byteIndex += 1) {
    const byte = bytes[byteIndex];
    for (let bit = 0; bit < 8; bit += 1) {
      if ((byte & (1 << bit)) === 0) continue;
      const dayOffset = byteIndex * 8 + bit;
      const dateKey = formatDateKey(addUtcDays(start, dayOffset));
      dailyCounts[dateKey] = 1;
    }
  }

  return {
    dailyCounts,
    activeDays: Object.keys(dailyCounts).length,
  };
}

function resolveAssetHref(path, staticAsset = false) {
  if (!path) return "";
  if (/^https?:\/\//i.test(path) || String(path).startsWith("data:")) {
    return path;
  }
  if (staticAsset || String(path).startsWith("/")) {
    return new URL(String(path).replace(/^\/+/, ""), `${STATIC_SOLVED_BASE}/`).href;
  }
  return new URL(String(path), window.location.href).href;
}

function renderTierIcon(href, tier, x, y, size) {
  if (href) {
    return `<image href="${href}" x="${x}" y="${y}" width="${size}" height="${size}" preserveAspectRatio="xMidYMid meet"/>`;
  }

  return `
    <g>
      <circle cx="${x + size / 2}" cy="${y + size / 2}" r="${size / 2}" fill="#E2E8F0"/>
      <text x="${x + size / 2}" y="${y + size / 2 + 4}"
            text-anchor="middle" fill="#334155" font-size="11" font-weight="900" font-family="${font}">
        ${esc(String(tier))}
      </text>
    </g>
  `;
}

function renderStreakGrassPanel(x, y, width, summary, activity, streakFallback) {
  const panelH = 116;
  const rows = 7;
  const cols = 53;
  const cellSize = 7;
  const gap = 2;
  const gridDates = buildYearlyGridDates();
  const gridW = cols * cellSize + (cols - 1) * gap;
  const gridX = x + Math.round((width - gridW) / 2);
  const gridY = y + 40;
  const longest = Math.max(summary?.longestStreak || 0, streakFallback || 0);
  const today = utcDateFromDateKey(getTodayDateKey()).getTime();
  const counts = activity?.dailyCounts || {};
  const cells = [];

  for (let col = 0; col < cols; col += 1) {
    for (let row = 0; row < rows; row += 1) {
      const date = gridDates[col * rows + row];
      const dateKey = formatDateKey(date);
      const isFuture = date.getTime() > today;
      const count = counts[dateKey] || 0;
      const fill = isFuture ? "#F8FAFC" : count > 0 ? "#86EFAC" : "#E2E8F0";
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
        ${esc(String(longest))}
      </text>
      ${cells.join("")}
    </g>
  `;
}

function renderCard(input) {
  const u = input.user;
  const handle = esc(u.handle || "");
  const solved = u.solvedCount ?? 0;
  const rank = u.rank ?? 0;
  const streak = u.maxStreak ?? 0;
  const showStreakGrass = Boolean(input.showStreakGrass);
  const hasAvatar = Boolean(input.avatarHref);
  const hasBg = Boolean(input.bgHref);
  const hasBadge = Boolean(input.badgeHref);
  const hasClassIcon = Boolean(input.classHref);
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
  const streakSummary = input.streakSummary || { currentStreak: 0, longestStreak: streak };
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

  function row(label, value, y) {
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
    ? `<g><image href="${input.badgeHref}" x="${badgeX}" y="${badgeY}" width="${badgeSize}" height="${badgeSize}" preserveAspectRatio="xMidYMid meet" style="filter: drop-shadow(0 2px 6px rgba(0,0,0,0.25));"/></g>`
    : "";

  const classOverlay = hasClassIcon
    ? `<g><image href="${input.classHref}" x="${classX}" y="${classY}" width="${badgeSize}" height="${badgeSize}" preserveAspectRatio="xMidYMid meet" style="filter: drop-shadow(0 2px 6px rgba(0,0,0,0.25));"/></g>`
    : "";

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
    <filter id="shadow" filterUnits="userSpaceOnUse" x="${-(PAD + 70)}" y="${-(PAD + 70)}"
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
        ${hasBg ? `<image href="${input.bgHref}" x="${triX}" y="0" width="${W - triX}" height="${kneeY}" preserveAspectRatio="xMidYMid slice"/>` : ""}
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
              Z" fill="url(#shine)"/>
    </g>
  </g>
  <g filter="url(#avatarShadow)">
    <circle cx="${avatarCx}" cy="${avatarCy}" r="${avatarR + 3}" fill="#FFFFFF"/>
    <circle cx="${avatarCx}" cy="${avatarCy}" r="${avatarR + 2}" fill="none" stroke="#E5E7EB"/>
    ${hasAvatar
      ? `<image href="${input.avatarHref}" x="${avatarCx - avatarR}" y="${avatarCy - avatarR}" width="${avatarSize}" height="${avatarSize}" clip-path="url(#clipAvatar)" preserveAspectRatio="xMidYMid slice"/>`
      : `<text x="${avatarCx}" y="${avatarCy + 6}" text-anchor="middle" fill="#94A3B8" font-size="18" font-weight="900" font-family="${font}">?</text>`}
  </g>
  ${badgeOverlay}
  ${classOverlay}
  ${renderTierIcon(input.tierHref, u.tier ?? 0, tierX, tierY, tierSize)}
  <text x="${textX}" y="${nameY}" fill="#0F172A" font-size="18" font-weight="900" font-family="${font}">${handle}</text>
  ${row("Solved", `${solved}`, rowsTop)}
  ${row("Rank", rank ? `#${rank}` : "-", rowsTop + rowH + rowGap)}
  ${showStreakGrass ? renderStreakGrassPanel(leftPad, streakPanelY, rowW, streakSummary, streakActivity, streak) : ""}
</svg>`;
}

function renderCardV2(input) {
  const u = input.user;
  const handle = esc(u.handle || "");
  const solved = u.solvedCount ?? 0;
  const rank = u.rank ?? 0;
  const streak = u.maxStreak ?? 0;
  const showStreakGrass = Boolean(input.showStreakGrass);
  const tier = u.tier ?? 0;
  const accent = input.accentColor || getTierAccentColor(tier);
  const hasAvatar = Boolean(input.avatarHref);
  const hasBg = Boolean(input.bgHref);
  const hasBadge = Boolean(input.badgeHref);
  const hasClassIcon = Boolean(input.classHref);
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
  const upperStroke = "#D8E4F0";
  const badgeSize = 50;
  const badgeX = avatarCx + avatarR - badgeSize / 2 + 40;
  const badgeY = avatarCy + avatarR - badgeSize / 2 - 20;
  const classGap = 8;
  const classX = badgeX + badgeSize + classGap;
  const classY = badgeY;
  const streakSummary = input.streakSummary || { currentStreak: 0, longestStreak: streak };
  const streakActivity = input.streakActivity || null;
  const badgeOverlay = hasBadge
    ? `<image href="${input.badgeHref}" x="${badgeX}" y="${badgeY}" width="${badgeSize}" height="${badgeSize}" preserveAspectRatio="xMidYMid meet"/>`
    : "";
  const classOverlay = hasClassIcon
    ? `<image href="${input.classHref}" x="${classX}" y="${classY}" width="${badgeSize}" height="${badgeSize}" preserveAspectRatio="xMidYMid meet"/>`
    : "";

  function row(label, value, y) {
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
           <image href="${input.bgHref}" x="${triX}" y="0" width="${W - triX}" height="${heroH}" preserveAspectRatio="xMidYMid slice" opacity="0.78"/>
           <rect x="${triX}" y="0" width="${W - triX}" height="${heroH}" fill="#FFFFFF" opacity="0.06"/>`
        : `<rect x="${triX}" y="0" width="${W - triX}" height="${heroH}" fill="url(#heroFallbackV2)"/>`}
    </g>
    <line x1="${triX}" y1="0" x2="${kneeX}" y2="${kneeY}" stroke="${upperStroke}" stroke-width="0.9" stroke-linecap="round"/>
    <line x1="0" y1="${kneeY}" x2="${W}" y2="${kneeY}" stroke="${upperStroke}" stroke-width="0.9" stroke-linecap="round"/>
    <circle cx="${avatarCx}" cy="${avatarCy}" r="${avatarOuterR + 2}" fill="url(#avatarRingV2)"/>
    <circle cx="${avatarCx}" cy="${avatarCy}" r="${avatarOuterR + 1}" fill="none" stroke="#DCE4EE"/>
    <circle cx="${avatarCx}" cy="${avatarCy}" r="${avatarR + 1}" fill="none" stroke="${accent}" stroke-opacity="0.22"/>
    ${hasAvatar
      ? `<image href="${input.avatarHref}" x="${avatarCx - avatarR}" y="${avatarCy - avatarR}" width="${avatarSize}" height="${avatarSize}" clip-path="url(#clipAvatarV2)" preserveAspectRatio="xMidYMid slice"/>`
      : `<text x="${avatarCx}" y="${avatarCy + 6}" text-anchor="middle" fill="#94A3B8" font-size="18" font-weight="900" font-family="${font}">?</text>`}
    ${badgeOverlay}
    ${classOverlay}
    ${renderTierIcon(input.tierHref, tier, tierX, tierY, tierSize)}
    <text x="${nameX}" y="${nameY}" fill="#0F172A" font-size="${handleFontSize}" font-weight="900" font-family="${font}">
      ${handle}
    </text>
    ${row("Solved", `${solved}`, rowsTop)}
    ${row("Rank", rank ? `#${rank}` : "-", rowsTop + rowH + rowGap)}
    ${showStreakGrass ? renderStreakGrassPanel(rowX, streakPanelY, rowW, streakSummary, streakActivity, streak) : ""}
    <rect x="0.5" y="0.5" width="${W - 1}" height="${cardH - 1}" rx="${R - 0.5}" fill="none" stroke="#D9E2EC"/>
  </g>
</svg>`;
}

function materializeRenderInput(record, handleKey) {
  const streakSummary = record.streakSummary || {
    currentStreak: 0,
    longestStreak: record.maxStreak || 0,
  };

  return {
    user: {
      handle: handleKey,
      tier: record.tier || 0,
      solvedCount: record.solvedCount || 0,
      rank: record.rank || 0,
      class: record.class || 0,
      classDecoration: record.classDecoration || "none",
      maxStreak: record.maxStreak || streakSummary.longestStreak || 0,
    },
    tierHref: resolveAssetHref(record.tierAssetPath || `/tier_small/${record.tier || 0}.svg`, true),
    avatarHref: resolveAssetHref(record.profileImagePath || ""),
    bgHref: resolveAssetHref(record.backgroundPath || ""),
    badgeHref: resolveAssetHref(record.badgePath || ""),
    classHref: resolveAssetHref(record.classAssetPath || "", true),
    streakSummary,
    streakActivity: decodeStreakActivity(record.streakActivity),
  };
}

function showPreview(svg) {
  elements.previewCanvas.hidden = false;
  elements.previewEmpty.hidden = true;
  elements.previewCanvas.innerHTML = svg;
}

function hidePreview() {
  elements.previewCanvas.hidden = true;
  elements.previewCanvas.innerHTML = "";
  elements.previewEmpty.hidden = false;
}

function updatePreviewBlob(svg) {
  if (state.previewBlobUrl) {
    URL.revokeObjectURL(state.previewBlobUrl);
  }

  const blob = new Blob([svg], { type: "image/svg+xml;charset=utf-8" });
  state.previewBlobUrl = URL.createObjectURL(blob);
  elements.openSvgLink.href = state.previewBlobUrl;
  elements.openSvgLink.target = "_blank";
  elements.openSvgLink.removeAttribute("aria-disabled");
  elements.downloadButton.disabled = false;
}

function buildDownloadFilename() {
  const safeHandle = (state.submittedHandle || "card")
    .trim()
    .replace(/[^a-z0-9_-]+/gi, "-")
    .replace(/^-+|-+$/g, "") || "card";
  const streakSuffix = state.submittedShowStreak ? "-streak" : "";
  return `solvedac-${safeHandle}-v${state.submittedVersion}${streakSuffix}.svg`;
}

function renderLocalCard() {
  const handleInput = state.draftHandle.trim();
  if (!handleInput) {
    hidePreview();
    elements.downloadButton.disabled = true;
    setStatus("error");
    setMessage("Please enter a saved handle from user_data.json.", true);
    return;
  }

  if (!state.data?.users) {
    hidePreview();
    elements.downloadButton.disabled = true;
    setStatus("error");
    setMessage("Local database is not loaded yet.", true);
    return;
  }

  const handleKey = normalizeHandleLookup(handleInput);
  if (!handleKey) {
    hidePreview();
    elements.downloadButton.disabled = true;
    setStatus("error");
    setMessage(`Handle "${handleInput}" was not found in user_data.json.`, true);
    return;
  }

  const record = state.data.users[handleKey];
  const input = materializeRenderInput(record, handleKey);
  const svg =
    state.draftVersion === "2"
      ? renderCardV2({ ...input, showStreakGrass: state.draftShowStreak })
      : renderCard({ ...input, showStreakGrass: state.draftShowStreak });

  state.submittedHandle = handleKey;
  state.submittedVersion = state.draftVersion;
  state.submittedShowStreak = state.draftShowStreak;
  state.previewSvg = svg;

  showPreview(svg);
  updatePreviewBlob(svg);
  setStatus("preview");
  setMessage(
    `Rendered ${handleKey} from local DB. Version v${state.draftVersion}, streak=${state.draftShowStreak ? "true" : "false"}.`,
    false
  );
}

function downloadSvg() {
  if (!state.previewBlobUrl || !state.previewSvg) {
    setStatus("error");
    setMessage("Render a card before downloading the SVG.", true);
    return;
  }

  const link = document.createElement("a");
  link.href = state.previewBlobUrl;
  link.download = buildDownloadFilename();
  document.body.appendChild(link);
  link.click();
  link.remove();

  setStatus("ready");
  setMessage("SVG download started.", false);
}

window.addEventListener("beforeunload", () => {
  if (state.previewBlobUrl) {
    URL.revokeObjectURL(state.previewBlobUrl);
  }
});
