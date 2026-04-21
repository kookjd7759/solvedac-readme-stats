const API_BASE = "https://solvedac-readme-stats.vercel.app/api";
const STATUS_LABELS = {
  idle: "대기",
  loading: "불러오는 중",
  preview: "미리보기",
  error: "오류",
};

const elements = {
  handleInput: document.querySelector("#handle-input"),
  renderButton: document.querySelector("#render-button"),
  downloadButton: document.querySelector("#download-button"),
  previewImage: document.querySelector("#preview-image"),
  previewEmpty: document.querySelector("#preview-empty"),
  statusPill: document.querySelector("#status-pill"),
  messageCard: document.querySelector("#message-card"),
  apiUrl: document.querySelector("#api-url"),
  markdownSnippet: document.querySelector("#markdown-snippet"),
  openSvgLink: document.querySelector("#open-svg-link"),
  streakInput: document.querySelector("#streak-input"),
  versionCards: Array.from(document.querySelectorAll(".version-card")),
  exampleButtons: Array.from(document.querySelectorAll("[data-handle-example]")),
  copyUrlButton: document.querySelector("#copy-url-button"),
  copyMarkdownButton: document.querySelector("#copy-markdown-button"),
  previewSummary: document.querySelector("#preview-summary"),
};

const state = {
  draftHandle: "",
  draftVersion: "2",
  draftShowStreak: false,
  submittedHandle: "",
  submittedVersion: "2",
  submittedShowStreak: false,
  previewUrl: "",
};

boot();

function boot() {
  elements.versionCards.forEach((card) => {
    card.addEventListener("click", () => {
      const input = card.querySelector('input[name="version"]');
      if (!input) return;

      state.draftVersion = input.value;
      input.checked = true;
      syncVersionCards();
      syncOutputPanels();
    });
  });

  elements.exampleButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const example = button.getAttribute("data-handle-example") || "";
      state.draftHandle = example;
      elements.handleInput.value = example;
      syncOutputPanels();
      elements.handleInput.focus();
    });
  });

  elements.handleInput.addEventListener("input", () => {
    state.draftHandle = elements.handleInput.value.trim();
    syncOutputPanels();
  });

  elements.handleInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      renderCard();
    }
  });

  elements.streakInput.addEventListener("change", () => {
    state.draftShowStreak = elements.streakInput.checked;
    syncOutputPanels();
  });

  elements.previewImage.addEventListener("load", () => {
    elements.downloadButton.disabled = false;
    setStatus("preview");
    setMessage("카드 미리보기가 준비되었습니다. 지금 보이는 상태 그대로 SVG로 저장할 수 있습니다.", false);
  });

  elements.previewImage.addEventListener("error", () => {
    elements.downloadButton.disabled = true;
    hidePreview();
    setStatus("error");
    setMessage("카드 이미지를 불러오지 못했습니다. 핸들과 옵션을 다시 확인해 주세요.", true);
  });

  elements.renderButton.addEventListener("click", renderCard);
  elements.downloadButton.addEventListener("click", downloadSvg);
  elements.copyUrlButton.addEventListener("click", () => copyOutput(elements.apiUrl.textContent, "API 주소를 복사했습니다."));
  elements.copyMarkdownButton.addEventListener("click", () =>
    copyOutput(elements.markdownSnippet.textContent, "README 코드를 복사했습니다.")
  );

  syncVersionCards();
  syncOutputPanels();
  setStatus("idle");
}

function syncVersionCards() {
  elements.versionCards.forEach((card) => {
    const input = card.querySelector('input[name="version"]');
    card.classList.toggle("version-card-active", input && input.value === state.draftVersion);
  });
}

function buildApiUrl(handle, version, options = {}) {
  if (!handle) return "";

  const { download = false, cacheBust = false, streak = false } = options;
  const url = new URL(API_BASE);

  url.searchParams.set("handle", handle);
  url.searchParams.set("v", version);
  url.searchParams.set("streak", streak ? "true" : "false");

  if (download) {
    url.searchParams.set("download", "1");
  }

  if (cacheBust) {
    url.searchParams.set("_preview", Date.now().toString());
  }

  return url.toString();
}

function buildMarkdownSnippet(handle, version, streak) {
  const apiUrl = buildApiUrl(handle, version, { streak });
  if (!apiUrl) {
    return "이미지 마크다운을 바로 복사할 수 있습니다.";
  }

  return `![solved.ac 카드](${apiUrl})`;
}

function buildPreviewSummary(handle, version, streak) {
  if (!handle) {
    return "아직 렌더링한 카드가 없습니다.";
  }

  return `${handle} · v${version}${streak ? " · 연속 풀이 포함" : ""}`;
}

function buildDownloadFilename() {
  const safeHandle = (state.submittedHandle || "card")
    .trim()
    .replace(/[^a-z0-9_-]+/gi, "-")
    .replace(/^-+|-+$/g, "") || "card";
  const streakSuffix = state.submittedShowStreak ? "-streak" : "";

  return `solvedac-${safeHandle}-v${state.submittedVersion}${streakSuffix}.svg`;
}

function syncOutputPanels() {
  const apiUrl = buildApiUrl(state.draftHandle, state.draftVersion, {
    streak: state.draftShowStreak,
  });
  const markdownSnippet = buildMarkdownSnippet(
    state.draftHandle,
    state.draftVersion,
    state.draftShowStreak
  );

  elements.apiUrl.textContent = apiUrl || "핸들을 입력하면 주소가 생성됩니다.";
  elements.markdownSnippet.textContent = markdownSnippet;
  elements.previewSummary.textContent = buildPreviewSummary(
    state.submittedHandle,
    state.submittedVersion,
    state.submittedShowStreak
  );

  const canCopy = Boolean(apiUrl);
  elements.copyUrlButton.disabled = !canCopy;
  elements.copyMarkdownButton.disabled = !canCopy;

  if (!apiUrl) {
    elements.openSvgLink.href = "#";
    elements.openSvgLink.setAttribute("aria-disabled", "true");
    return;
  }

  elements.openSvgLink.href = apiUrl;
  elements.openSvgLink.removeAttribute("aria-disabled");
}

function renderCard() {
  const nextHandle = state.draftHandle.trim();
  if (!nextHandle) {
    elements.downloadButton.disabled = true;
    hidePreview();
    setStatus("error");
    setMessage("solved.ac 핸들을 먼저 입력해 주세요.", true);
    return;
  }

  state.submittedHandle = nextHandle;
  state.submittedVersion = state.draftVersion;
  state.submittedShowStreak = state.draftShowStreak;
  state.previewUrl = buildApiUrl(nextHandle, state.draftVersion, {
    cacheBust: true,
    streak: state.draftShowStreak,
  });

  elements.downloadButton.disabled = true;
  setStatus("loading");
  setMessage("카드를 불러오는 중입니다...", false);
  showPreview(state.previewUrl);
  syncOutputPanels();
}

function showPreview(previewUrl) {
  elements.previewImage.hidden = false;
  elements.previewEmpty.hidden = true;
  elements.previewImage.src = previewUrl;
}

function hidePreview() {
  elements.previewImage.hidden = true;
  elements.previewImage.removeAttribute("src");
  elements.previewEmpty.hidden = false;
}

function downloadSvg() {
  if (!state.submittedHandle) {
    setStatus("error");
    setMessage("카드를 먼저 렌더링한 뒤 다운로드해 주세요.", true);
    return;
  }

  const downloadUrl = buildApiUrl(state.submittedHandle, state.submittedVersion, {
    download: true,
    cacheBust: true,
    streak: state.submittedShowStreak,
  });

  const link = document.createElement("a");
  link.href = downloadUrl;
  link.download = buildDownloadFilename();
  document.body.appendChild(link);
  link.click();
  link.remove();

  setStatus("preview");
  setMessage("SVG 다운로드를 시작했습니다.", false);
}

async function copyOutput(text, successMessage) {
  if (!text || text.includes("입력하면")) {
    setStatus("error");
    setMessage("복사할 내용이 아직 준비되지 않았습니다.", true);
    return;
  }

  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text);
    } else {
      fallbackCopy(text);
    }

    setStatus("preview");
    setMessage(successMessage, false);
  } catch (error) {
    fallbackCopy(text);
    setStatus("preview");
    setMessage(successMessage, false);
  }
}

function fallbackCopy(text) {
  const textarea = document.createElement("textarea");
  textarea.value = text;
  textarea.setAttribute("readonly", "true");
  textarea.style.position = "absolute";
  textarea.style.left = "-9999px";
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand("copy");
  textarea.remove();
}

function setStatus(status) {
  elements.statusPill.textContent = STATUS_LABELS[status] || status;
  elements.statusPill.dataset.status = status;
}

function setMessage(message, isError) {
  elements.messageCard.textContent = message;
  elements.messageCard.classList.toggle("is-error", Boolean(isError));
}
