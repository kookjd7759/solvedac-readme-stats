const SNAPSHOT_SEED_DATA = window.__PLATINUM_SNAPSHOT__ || null;
const SNAPSHOT_LABEL = SNAPSHOT_SEED_DATA?.meta?.snapshotLabel || "2026-04-21 09:00 KST";
const SNAPSHOT_SCOPE_LABEL = "백준 플래티넘 V 이상";
const SNAPSHOT_DATA_URL = "./user_data.json";
const SNAPSHOT_REF =
  SNAPSHOT_SEED_DATA?.meta?.ref || "88d50a0479a17fe7903477c60b3a8c0d47d30d73";
const SNAPSHOT_ASSET_BASE = `https://cdn.jsdelivr.net/gh/kookjd7759/solvedac-readme-stats@${SNAPSHOT_REF}/DB/`;
const TIER_DATA = window.__TIER_ASSETS__ || {};
const CLASS_DATA = window.__CLASS_ASSETS__ || {};
const STATUS_LABELS = {
  idle: "대기",
  ready: "준비됨",
  loading: "불러오는 중",
  preview: "미리보기",
  error: "오류",
};

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
const INITIAL_RANKING_VISIBLE = 72;
const RANKING_LOAD_STEP = 72;

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
  previewSummary: document.querySelector("#preview-summary"),
  streakInput: document.querySelector("#streak-input"),
  versionCards: Array.from(document.querySelectorAll(".version-card")),
  exampleButtons: Array.from(document.querySelectorAll("[data-handle-example]")),
  snapshotUserCount: document.querySelector("#snapshot-user-count"),
  snapshotTimeLabel: document.querySelector("#snapshot-time-label"),
  topRankHandle: document.querySelector("#top-rank-handle"),
  topRankCopy: document.querySelector("#top-rank-copy"),
  rankingSummary: document.querySelector("#ranking-summary"),
  rankingFilterInput: document.querySelector("#ranking-filter-input"),
  rankingShortcutButtons: Array.from(document.querySelectorAll("[data-ranking-band]")),
  rankingFocusTitle: document.querySelector("#ranking-focus-title"),
  rankingFocusCopy: document.querySelector("#ranking-focus-copy"),
  rankingFeatured: document.querySelector("#ranking-featured"),
  rankingList: document.querySelector("#ranking-list"),
  rankingMoreButton: document.querySelector("#ranking-more-button"),
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
  assetDataUriCache: new Map(),
  rankedRecords: [],
  rankingQuery: "",
  rankingBand: "all",
  rankingVisibleCount: INITIAL_RANKING_VISIBLE,
};

boot();

async function boot() {
  bindEvents();
  syncVersionCards();
  syncPreviewSummary();
  setStatus("loading");

  try {
    if (SNAPSHOT_SEED_DATA?.users) {
      applyLoadedData(SNAPSHOT_SEED_DATA, "내장 저장본");
      return;
    }

    const response = await fetch(SNAPSHOT_DATA_URL, { cache: "no-store" });
    if (!response.ok) {
      throw new Error(`저장본 JSON을 불러오지 못했습니다. (${response.status})`);
    }

    const data = await response.json();
    applyLoadedData(data, "JSON 대체 로드");
  } catch (error) {
    elements.dataSource.textContent = "저장본을 불러오지 못했습니다.";
    setStatus("error");
    setMessage(`플래티넘 아카이브를 불러오지 못했습니다. (${safeErrorMessage(error)})`, true);
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

  elements.exampleButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const example = button.getAttribute("data-handle-example") || "";
      state.draftHandle = example;
      elements.handleInput.value = example;
      elements.handleInput.focus();
    });
  });

  elements.handleInput.addEventListener("input", () => {
    state.draftHandle = elements.handleInput.value.trim();
  });

  elements.handleInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      void renderLocalCard();
    }
  });

  elements.streakInput.addEventListener("change", () => {
    state.draftShowStreak = elements.streakInput.checked;
  });

  elements.renderButton.addEventListener("click", () => {
    void renderLocalCard();
  });
  elements.downloadButton.addEventListener("click", downloadSvg);

  elements.rankingFilterInput?.addEventListener("input", () => {
    state.rankingQuery = elements.rankingFilterInput.value.trim();
    state.rankingVisibleCount = INITIAL_RANKING_VISIBLE;
    renderRankingView();
  });

  elements.rankingShortcutButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const nextBand = button.getAttribute("data-ranking-band") || "all";
      state.rankingBand = nextBand;
      state.rankingVisibleCount = INITIAL_RANKING_VISIBLE;
      syncRankingShortcutButtons();
      renderRankingView();
    });
  });

  elements.rankingMoreButton?.addEventListener("click", () => {
    state.rankingVisibleCount += RANKING_LOAD_STEP;
    renderRankingView();
  });

  elements.rankingFeatured?.addEventListener("click", handleRankingPick);
  elements.rankingList?.addEventListener("click", handleRankingPick);
}

function applyLoadedData(data, sourceKind) {
  state.data = data;
  buildHandleIndex();
  buildRankedRecords();

  const userCount = state.data?.meta?.userCount || Object.keys(state.data?.users || {}).length;
  elements.dataSource.textContent = `${SNAPSHOT_LABEL} 저장본 · ${userCount.toLocaleString()}명 · ${sourceKind}`;
  setStatus("ready");
  setMessage(`${SNAPSHOT_SCOPE_LABEL} 저장본이 준비되었습니다. 저장된 핸들을 입력해 카드를 다시 만들 수 있습니다.`, false);
  renderArchiveHero();
  syncRankingShortcutButtons();
  renderRankingView();
}

function buildHandleIndex() {
  state.lowerHandleIndex = new Map();
  for (const handle of Object.keys(state.data?.users || {})) {
    state.lowerHandleIndex.set(handle.toLowerCase(), handle);
  }
}

function buildRankedRecords() {
  state.rankedRecords = Object.entries(state.data?.users || {})
    .map(([handle, record]) => ({
      handle,
      ...record,
      rank: Number(record.rank) || Number.MAX_SAFE_INTEGER,
      solvedCount: Number(record.solvedCount) || 0,
      maxStreak: Number(record.maxStreak) || 0,
      tier: Number(record.tier) || 0,
      class: Number(record.class) || 0,
      classDecoration: record.classDecoration || "none",
    }))
    .sort((left, right) => {
      if (left.rank !== right.rank) return left.rank - right.rank;
      if (left.solvedCount !== right.solvedCount) return right.solvedCount - left.solvedCount;
      return String(left.handle).localeCompare(String(right.handle));
    });
}

function renderArchiveHero() {
  const total = state.rankedRecords.length;
  const topRecord = state.rankedRecords[0] || null;

  if (elements.snapshotUserCount) {
    elements.snapshotUserCount.textContent = `${formatNumber(total)}명`;
  }

  if (elements.snapshotTimeLabel) {
    elements.snapshotTimeLabel.textContent = SNAPSHOT_LABEL;
  }

  if (topRecord && elements.topRankHandle) {
    elements.topRankHandle.textContent = topRecord.handle;
  }

  if (topRecord && elements.topRankCopy) {
    elements.topRankCopy.textContent = `순위 #${formatNumber(topRecord.rank)} · 해결 ${formatNumber(
      topRecord.solvedCount
    )}`;
  }
}

function syncRankingShortcutButtons() {
  elements.rankingShortcutButtons.forEach((button) => {
    const band = button.getAttribute("data-ranking-band") || "all";
    button.classList.toggle("is-active", band === state.rankingBand);
  });
}

function syncVersionCards() {
  elements.versionCards.forEach((card) => {
    const input = card.querySelector('input[name="version"]');
    card.classList.toggle("version-card-active", input && input.value === state.draftVersion);
  });
}

function syncPreviewSummary() {
  if (!state.submittedHandle) {
    elements.previewSummary.textContent = "아직 불러온 카드가 없습니다.";
    return;
  }

  elements.previewSummary.textContent = `${state.submittedHandle} · v${state.submittedVersion}${
    state.submittedShowStreak ? " · 연속 풀이 포함" : ""
  }`;
}

function setStatus(status) {
  elements.statusPill.textContent = STATUS_LABELS[status] || status;
  elements.statusPill.dataset.status = status;
}

function setMessage(message, isError) {
  elements.messageCard.textContent = message;
  elements.messageCard.classList.toggle("is-error", Boolean(isError));
}

function safeErrorMessage(error) {
  return error instanceof Error ? error.message : String(error || "unknown error");
}

function formatNumber(value) {
  return Number(value || 0).toLocaleString("ko-KR");
}

function esc(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function getTierDisplaySrc(tier) {
  return resolveTierAssetHref(tier);
}

function getClassDisplaySrc(clazz, decoration) {
  return resolveClassAssetHref(clazz, decoration);
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

function getClassDecorationColor(decoration) {
  if (decoration === "gold") return "#F59E0B";
  if (decoration === "silver") return "#94A3B8";
  return "#334155";
}

function buildInlineSvgDataUri(svg) {
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function buildTierFallbackDataUri(tier) {
  const accent = getTierAccentColor(tier);
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${accent}" stop-opacity="0.94" />
          <stop offset="100%" stop-color="#ffffff" stop-opacity="0.2" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r="28" fill="#ffffff" />
      <circle cx="32" cy="32" r="26" fill="url(#g)" />
      <circle cx="32" cy="32" r="22" fill="#ffffff" fill-opacity="0.88" />
      <text x="32" y="39" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="20" font-weight="900" fill="${accent}">
        ${esc(String(tier))}
      </text>
    </svg>
  `;
  return buildInlineSvgDataUri(svg);
}

function resolveTierAssetHref(tier) {
  const safeTier = Math.max(0, Math.min(31, Number(tier) || 0));
  return TIER_DATA[String(safeTier)] || buildTierFallbackDataUri(safeTier);
}

function getClassAssetKey(clazz, decoration) {
  const safeClass = Math.max(0, Math.min(10, Number(clazz) || 0));
  if (!safeClass) return "";

  const suffix =
    decoration === "gold" ? "g" : decoration === "silver" ? "s" : "";

  return `c${safeClass}${suffix}`;
}

function resolveClassAssetHref(clazz, decoration) {
  const assetKey = getClassAssetKey(clazz, decoration);
  if (!assetKey) return "";

  return CLASS_DATA[assetKey] || buildClassFallbackDataUri(clazz, decoration);
}

function buildClassFallbackDataUri(clazz, decoration) {
  if (!clazz) return "";

  const accent = getClassDecorationColor(decoration);
  const label = `C${clazz}`;
  const shine =
    decoration === "gold" ? "#FEF3C7" : decoration === "silver" ? "#E2E8F0" : "#DBEAFE";
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">
      <rect x="4" y="4" width="56" height="56" rx="16" fill="#ffffff" />
      <rect x="6" y="6" width="52" height="52" rx="14" fill="${shine}" />
      <rect x="10" y="10" width="44" height="44" rx="12" fill="#ffffff" />
      <rect x="10" y="10" width="44" height="10" rx="10" fill="${accent}" fill-opacity="0.92" />
      <text x="32" y="42" text-anchor="middle" font-family="Segoe UI, Arial, sans-serif" font-size="19" font-weight="900" fill="${accent}">
        ${label}
      </text>
    </svg>
  `;
  return buildInlineSvgDataUri(svg);
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

function resolveAssetHref(path) {
  if (!path) return "";
  if (/^https?:\/\//i.test(path) || String(path).startsWith("data:")) {
    return path;
  }
  return new URL(String(path), SNAPSHOT_ASSET_BASE).href;
}

function blobToDataUrl(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = () => reject(reader.error || new Error("파일 읽기에 실패했습니다."));
    reader.readAsDataURL(blob);
  });
}

async function fetchAssetAsDataUri(href) {
  if (!href) return "";
  if (String(href).startsWith("data:")) return href;

  if (!state.assetDataUriCache.has(href)) {
    const pending = fetch(href, { cache: "force-cache" })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error(`이미지 자산을 불러오지 못했습니다. (${response.status})`);
        }

        const blob = await response.blob();
        return blobToDataUrl(blob);
      })
      .catch(() => "");

    state.assetDataUriCache.set(href, pending);
  }

  return state.assetDataUriCache.get(href);
}

function renderTierIcon(href, tier, x, y, size) {
  if (href) {
    return `<image href="${href}" x="${x}" y="${y}" width="${size}" height="${size}" preserveAspectRatio="xMidYMid meet"/>`;
  }

  return `
    <g>
      <circle cx="${x + size / 2}" cy="${y + size / 2}" r="${size / 2}" fill="#E2E8F0"/>
      <text x="${x + size / 2}" y="${y + size / 2 + 4}" text-anchor="middle" fill="#334155" font-size="11" font-weight="900" font-family="${font}">
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
    tierHref: resolveTierAssetHref(record.tier || 0),
    avatarHref: resolveAssetHref(record.profileImagePath || ""),
    bgHref: resolveAssetHref(record.backgroundPath || ""),
    badgeHref: resolveAssetHref(record.badgePath || ""),
    classHref: resolveClassAssetHref(record.class || 0, record.classDecoration || "none"),
    streakSummary,
    streakActivity: decodeStreakActivity(record.streakActivity),
  };
}

function handleRankingPick(event) {
  const trigger = event.target.closest("[data-rank-handle]");
  if (!trigger) return;

  event.preventDefault();
  const handle = trigger.getAttribute("data-rank-handle");
  if (!handle) return;

  state.draftHandle = handle;
  elements.handleInput.value = handle;
  elements.handleInput.focus({ preventScroll: true });
  void renderLocalCard();
}

function getRankingBandRecords() {
  const band = String(state.rankingBand || "all");
  const limit = Number.parseInt(band, 10);
  if (!Number.isFinite(limit)) {
    return state.rankedRecords;
  }

  return state.rankedRecords.filter((record) => record.rank <= limit);
}

function getFilteredRankedRecords() {
  const query = String(state.rankingQuery || "").trim().toLowerCase();
  const source = getRankingBandRecords();
  if (!query) return source;

  const rankToken = query.replace(/^#/, "");
  return source.filter((record) => {
    const handle = String(record.handle || "").toLowerCase();
    const rank = String(record.rank || "");
    const solved = String(record.solvedCount || "");
    return (
      handle.includes(query) ||
      rank.includes(rankToken) ||
      `#${rank}`.includes(query) ||
      solved.includes(rankToken)
    );
  });
}

function buildFeaturedCardMarkup(record, featuredIndex) {
  const handle = record.handle;
  const selected = state.submittedHandle === handle;
  const tierSrc = getTierDisplaySrc(record.tier || 0);
  const classSrc = record.class ? getClassDisplaySrc(record.class, record.classDecoration) : "";
  const avatarSrc = record.profileImagePath ? resolveAssetHref(record.profileImagePath) : "";
  const bgSrc = record.backgroundPath ? resolveAssetHref(record.backgroundPath) : "";
  const spotlightText =
    featuredIndex === 0
      ? "기록 보관소 최상단"
      : featuredIndex === 1
      ? "상위권에 남은 장면"
      : "회상용 대표 기록";

  return `
    <article class="featured-card${selected ? " is-selected" : ""}">
      <div class="featured-bg">
        ${
          bgSrc
            ? `<img src="${esc(bgSrc)}" alt="" loading="lazy" />`
            : `<div class="featured-bg-fallback"></div>`
        }
      </div>
      <div class="featured-content">
        <div class="featured-topline">
          <span class="featured-rank-badge">#${formatNumber(record.rank)}</span>
          <img class="featured-tier" src="${esc(tierSrc)}" alt="티어 ${esc(record.tier)}" />
        </div>

        <div class="featured-middle">
          ${
            avatarSrc
              ? `<img class="featured-avatar" src="${esc(avatarSrc)}" alt="${esc(handle)} 아바타" loading="lazy" />`
              : ""
          }
          <div>
            <h3 class="featured-handle">${esc(handle)}</h3>
            <div class="featured-subline">${spotlightText}</div>
          </div>
          <div class="featured-meta">
            <span class="featured-meta-chip">해결 ${formatNumber(record.solvedCount)}</span>
            <span class="featured-meta-chip">최대 연속 ${formatNumber(record.maxStreak)}</span>
          </div>
        </div>

        <div class="featured-bottom">
          <span class="featured-class">
            ${classSrc ? `<img src="${esc(classSrc)}" alt="클래스 ${esc(record.class)}" />` : ""}
            <span>클래스 ${record.class || "-"}</span>
          </span>
          <button type="button" class="featured-action" data-rank-handle="${esc(handle)}">이 카드 열기</button>
        </div>
      </div>
    </article>
  `;
}

function buildRankingRowMarkup(record) {
  const handle = record.handle;
  const selected = state.submittedHandle === handle;
  const tierSrc = getTierDisplaySrc(record.tier || 0);
  const classSrc = record.class ? getClassDisplaySrc(record.class, record.classDecoration) : "";
  const rankBadge =
    record.rank <= 3
      ? `<span class="ranking-rank-medal">${record.rank}</span>`
      : "";

  return `
    <button type="button" class="ranking-row${selected ? " is-selected" : ""}" data-rank-handle="${esc(handle)}">
      <span class="ranking-rank">
        ${rankBadge}
        <span>#${formatNumber(record.rank)}</span>
      </span>

      <span class="ranking-user">
        <img class="ranking-tier-icon" src="${esc(tierSrc)}" alt="티어 ${esc(record.tier)}" />
        <span class="ranking-user-copy">
          <strong>${esc(handle)}</strong>
          <span>티어 ${esc(record.tier)} · 백준 플래티넘 V 이상 보관소</span>
        </span>
      </span>

      <span class="ranking-class">
        ${classSrc ? `<img src="${esc(classSrc)}" alt="클래스 ${esc(record.class)}" />` : ""}
        <span>C${record.class || "-"}</span>
      </span>

      <span class="ranking-stat">
        <strong>${formatNumber(record.solvedCount)}</strong>
        해결 수
      </span>

      <span class="ranking-stat">
        <strong>${formatNumber(record.maxStreak)}</strong>
        최대 연속
      </span>

      <span class="ranking-action">카드 열기</span>
    </button>
  `;
}

function renderRankingFocus(filteredRecords) {
  if (!elements.rankingFocusTitle || !elements.rankingFocusCopy) return;

  const selectedRecord =
    state.submittedHandle &&
    filteredRecords.find((record) => record.handle === state.submittedHandle);
  const focusRecord = selectedRecord || filteredRecords[0] || state.rankedRecords[0] || null;

  if (!focusRecord) {
    elements.rankingFocusTitle.textContent = "보관된 사용자가 없습니다";
    elements.rankingFocusCopy.textContent = "표시할 수 있는 순위 데이터가 아직 없습니다.";
    return;
  }

  if (selectedRecord) {
    elements.rankingFocusTitle.textContent = `${focusRecord.handle} · 순위 #${formatNumber(focusRecord.rank)}`;
    elements.rankingFocusCopy.textContent = `해결 ${formatNumber(
      focusRecord.solvedCount
    )}문제, 최대 연속 ${formatNumber(focusRecord.maxStreak)}일 기록을 미리보기와 함께 보고 있습니다.`;
    return;
  }

  elements.rankingFocusTitle.textContent = `${focusRecord.handle} · 이번 열람 구간의 시작`;
  elements.rankingFocusCopy.textContent = `현재 보이는 범위는 순위 #${formatNumber(
    focusRecord.rank
  )}부터 이어집니다. 목록을 눌러 바로 카드를 열 수 있습니다.`;
}

function renderRankingView() {
  if (!elements.rankingFeatured || !elements.rankingList || !elements.rankingSummary) return;

  const filtered = getFilteredRankedRecords();
  const visible = filtered.slice(0, state.rankingVisibleCount);
  const hasQuery = Boolean(String(state.rankingQuery || "").trim());
  const hasBandFilter = state.rankingBand !== "all";
  const bandLabel = hasBandFilter ? `Top ${state.rankingBand}` : "전체";

  if (!filtered.length) {
    elements.rankingFeatured.innerHTML = "";
    elements.rankingList.innerHTML = `
      <div class="ranking-empty">
        검색 조건에 맞는 사용자가 없습니다.<br />
        핸들 일부나 순위를 다시 입력해 보세요.
      </div>
    `;
    elements.rankingSummary.textContent = "검색 결과가 없습니다.";
    renderRankingFocus([]);
    elements.rankingMoreButton.hidden = true;
    return;
  }

  const firstRank = visible[0]?.rank || filtered[0]?.rank || 0;
  const lastRank = visible.at(-1)?.rank || filtered.at(-1)?.rank || 0;
  elements.rankingSummary.textContent = hasQuery
    ? `${bandLabel} 범위에서 검색 결과 ${formatNumber(filtered.length)}명 · 현재 ${formatNumber(
        visible.length
      )}명 표시`
    : `${bandLabel} 열람 중 · 저장된 ${formatNumber(state.rankedRecords.length)}명 중 현재 순위 #${formatNumber(
        firstRank
      )}부터 #${formatNumber(lastRank)}까지 열람 중`;

  elements.rankingFeatured.innerHTML = filtered
    .slice(0, 3)
    .map((record, index) => buildFeaturedCardMarkup(record, index))
    .join("");

  elements.rankingList.innerHTML = visible.map((record) => buildRankingRowMarkup(record)).join("");
  renderRankingFocus(filtered);

  if (visible.length < filtered.length) {
    elements.rankingMoreButton.hidden = false;
    elements.rankingMoreButton.textContent = `다음 ${formatNumber(
      Math.min(RANKING_LOAD_STEP, filtered.length - visible.length)
    )}명 더 보기`;
  } else {
    elements.rankingMoreButton.hidden = true;
  }
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
  elements.openSvgLink.href = "#";
  elements.openSvgLink.setAttribute("aria-disabled", "true");
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
  return `solvedac-${safeHandle}-archive-2026-04-21-v${state.submittedVersion}${streakSuffix}.svg`;
}

async function renderLocalCard() {
  const handleInput = state.draftHandle.trim();
  if (!handleInput) {
    hidePreview();
    elements.downloadButton.disabled = true;
    setStatus("error");
    setMessage("저장된 핸들을 먼저 입력해 주세요.", true);
    return;
  }

  if (!state.data?.users) {
    hidePreview();
    elements.downloadButton.disabled = true;
    setStatus("error");
    setMessage("아직 저장본이 로드되지 않았습니다.", true);
    return;
  }

  const handleKey = normalizeHandleLookup(handleInput);
  if (!handleKey) {
    hidePreview();
    elements.downloadButton.disabled = true;
    setStatus("error");
    setMessage(`"${handleInput}" 핸들은 ${SNAPSHOT_LABEL} 저장본에 없습니다.`, true);
    return;
  }

  const record = state.data.users[handleKey];
  const input = materializeRenderInput(record, handleKey);

  elements.downloadButton.disabled = true;
  setStatus("loading");
  setMessage(`${handleKey} 카드 데이터를 저장본에서 조합하는 중입니다...`, false);

  try {
    const [tierHref, avatarHref, bgHref, badgeHref, classHref] = await Promise.all([
      fetchAssetAsDataUri(input.tierHref),
      fetchAssetAsDataUri(input.avatarHref),
      fetchAssetAsDataUri(input.bgHref),
      fetchAssetAsDataUri(input.badgeHref),
      fetchAssetAsDataUri(input.classHref),
    ]);

    const svg =
      state.draftVersion === "2"
        ? renderCardV2({
            ...input,
            tierHref,
            avatarHref,
            bgHref,
            badgeHref,
            classHref,
            showStreakGrass: state.draftShowStreak,
          })
        : renderCard({
            ...input,
            tierHref,
            avatarHref,
            bgHref,
            badgeHref,
            classHref,
            showStreakGrass: state.draftShowStreak,
          });

    state.submittedHandle = handleKey;
    state.submittedVersion = state.draftVersion;
    state.submittedShowStreak = state.draftShowStreak;
    state.previewSvg = svg;

    showPreview(svg);
    updatePreviewBlob(svg);
    syncPreviewSummary();
    renderRankingView();
    setStatus("preview");
    setMessage(`${handleKey} 카드를 ${SNAPSHOT_LABEL} 저장본 기준으로 렌더링했습니다.`, false);
  } catch (error) {
    hidePreview();
    elements.downloadButton.disabled = true;
    setStatus("error");
    setMessage(`아카이브 렌더링에 실패했습니다. (${safeErrorMessage(error)})`, true);
  }
}

function downloadSvg() {
  if (!state.previewBlobUrl || !state.previewSvg) {
    setStatus("error");
    setMessage("카드를 먼저 렌더링한 뒤 다운로드해 주세요.", true);
    return;
  }

  const link = document.createElement("a");
  link.href = state.previewBlobUrl;
  link.download = buildDownloadFilename();
  document.body.appendChild(link);
  link.click();
  link.remove();

  setStatus("preview");
  setMessage("SVG 다운로드를 시작했습니다.", false);
}

window.addEventListener("beforeunload", () => {
  if (state.previewBlobUrl) {
    URL.revokeObjectURL(state.previewBlobUrl);
  }
});
