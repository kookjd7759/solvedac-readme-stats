const API_BASE = "https://solvedac-readme-stats.vercel.app/api";

const elements = {
  handleInput: document.querySelector("#handle-input"),
  renderButton: document.querySelector("#render-button"),
  downloadButton: document.querySelector("#download-button"),
  previewImage: document.querySelector("#preview-image"),
  previewEmpty: document.querySelector("#preview-empty"),
  statusPill: document.querySelector("#status-pill"),
  messageCard: document.querySelector("#message-card"),
  apiUrl: document.querySelector("#api-url"),
  openSvgLink: document.querySelector("#open-svg-link"),
  versionCards: Array.from(document.querySelectorAll(".version-card")),
};

const state = {
  draftHandle: "",
  draftVersion: "2",
  submittedHandle: "",
  submittedVersion: "2",
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
      syncApiUrl();
    });
  });

  elements.handleInput.addEventListener("input", () => {
    state.draftHandle = elements.handleInput.value.trim();
    syncApiUrl();
  });

  elements.handleInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      renderCard();
    }
  });

  elements.previewImage.addEventListener("load", () => {
    elements.downloadButton.disabled = false;
    setStatus("ready");
    setMessage(
      "Preview updated. Download SVG saves the exact card you see on screen. / 미리보기가 갱신되었습니다. Download SVG는 지금 화면에 보이는 카드를 그대로 저장합니다.",
      false
    );
  });

  elements.previewImage.addEventListener("error", () => {
    elements.downloadButton.disabled = true;
    hidePreview();
    setStatus("error");
    setMessage(
      "The preview image could not be loaded. Check the handle and try again. / 미리보기 이미지를 불러오지 못했습니다. handle을 확인하고 다시 시도해 주세요.",
      true
    );
  });

  elements.renderButton.addEventListener("click", renderCard);
  elements.downloadButton.addEventListener("click", downloadSvg);

  syncVersionCards();
  syncApiUrl();
}

function syncVersionCards() {
  elements.versionCards.forEach((card) => {
    const input = card.querySelector('input[name="version"]');
    card.classList.toggle("version-card-active", input && input.value === state.draftVersion);
  });
}

function buildApiUrl(handle, version, options = {}) {
  if (!handle) return "";

  const { download = false, cacheBust = false } = options;
  const url = new URL(API_BASE);

  url.searchParams.set("handle", handle);
  url.searchParams.set("v", version);

  if (download) {
    url.searchParams.set("download", "1");
  }

  if (cacheBust) {
    url.searchParams.set("_preview", Date.now().toString());
  }

  return url.toString();
}

function buildDownloadFilename() {
  const safeHandle = (state.submittedHandle || "card")
    .trim()
    .replace(/[^a-z0-9_-]+/gi, "-")
    .replace(/^-+|-+$/g, "") || "card";

  return `solvedac-${safeHandle}-v${state.submittedVersion}.svg`;
}

function syncApiUrl() {
  const nextUrl = buildApiUrl(state.draftHandle, state.draftVersion);

  if (!nextUrl) {
    elements.apiUrl.textContent = "Enter a handle to generate the API URL.";
    elements.openSvgLink.href = "#";
    elements.openSvgLink.setAttribute("aria-disabled", "true");
    return;
  }

  elements.apiUrl.textContent = nextUrl;
  elements.openSvgLink.href = nextUrl;
  elements.openSvgLink.removeAttribute("aria-disabled");
}

function renderCard() {
  const nextHandle = state.draftHandle.trim();
  if (!nextHandle) {
    elements.downloadButton.disabled = true;
    hidePreview();
    setStatus("error");
    setMessage(
      "Please enter a solved.ac handle. / solved.ac handle을 입력해 주세요.",
      true
    );
    return;
  }

  state.submittedHandle = nextHandle;
  state.submittedVersion = state.draftVersion;
  state.previewUrl = buildApiUrl(nextHandle, state.draftVersion, { cacheBust: true });

  elements.downloadButton.disabled = true;
  setStatus("loading");
  setMessage(
    "Preview is loading... / 미리보기를 불러오는 중입니다.",
    false
  );

  showPreview(state.previewUrl);
  syncApiUrl();
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
    setMessage(
      "Render a card before downloading. / 다운로드 전에 먼저 카드를 렌더링해 주세요.",
      true
    );
    return;
  }

  const downloadUrl = buildApiUrl(state.submittedHandle, state.submittedVersion, {
    download: true,
    cacheBust: true,
  });

  const link = document.createElement("a");
  link.href = downloadUrl;
  link.download = buildDownloadFilename();
  document.body.appendChild(link);
  link.click();
  link.remove();

  setStatus("ready");
  setMessage(
    "SVG download started. / SVG 다운로드가 시작되었습니다.",
    false
  );
}

function setStatus(status) {
  elements.statusPill.textContent = status;
  elements.statusPill.dataset.status = status;
}

function setMessage(message, isError) {
  elements.messageCard.textContent = message;
  elements.messageCard.classList.toggle("is-error", Boolean(isError));
}
