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
  handle: "kookjd7759",
  version: "2",
};

boot();

function boot() {
  elements.versionCards.forEach((card) => {
    card.addEventListener("click", () => {
      const input = card.querySelector('input[name="version"]');
      if (!input) return;

      state.version = input.value;
      input.checked = true;
      syncVersionCards();
      syncApiUrl();
    });
  });

  elements.handleInput.addEventListener("input", () => {
    state.handle = elements.handleInput.value.trim();
    syncApiUrl();
  });

  elements.previewImage.addEventListener("load", () => {
    setStatus("ready");
    setMessage(
      "Preview updated. The PNG button now downloads a server-rendered PNG directly. / 미리보기가 갱신되었습니다. 이제 PNG 버튼은 서버에서 렌더링한 PNG를 바로 다운로드합니다.",
      false
    );
  });

  elements.previewImage.addEventListener("error", () => {
    elements.downloadButton.disabled = true;
    hidePreview();
    setStatus("error");
    setMessage(
      "The preview image could not be loaded. Check the handle and open the SVG link once. / 미리보기 이미지를 불러오지 못했습니다. handle 값을 확인하고 Open SVG 링크를 한 번 열어 주세요.",
      true
    );
  });

  elements.renderButton.addEventListener("click", renderCard);
  elements.downloadButton.addEventListener("click", downloadPng);

  syncVersionCards();
  syncApiUrl();
  renderCard();
}

function syncVersionCards() {
  elements.versionCards.forEach((card) => {
    const input = card.querySelector('input[name="version"]');
    card.classList.toggle("version-card-active", input && input.value === state.version);
  });
}

function buildApiUrl(options = {}) {
  const {
    format = "svg",
    download = false,
    cacheBust = false,
  } = options;

  const handle = state.handle || "kookjd7759";
  const url = new URL(API_BASE);
  url.searchParams.set("handle", handle);
  url.searchParams.set("v", state.version);

  if (format === "png") {
    url.searchParams.set("format", "png");
  }

  if (download) {
    url.searchParams.set("download", "1");
  }

  if (cacheBust) {
    url.searchParams.set("_preview", Date.now().toString());
  }

  return url.toString();
}

function syncApiUrl() {
  const apiUrl = buildApiUrl();
  elements.apiUrl.textContent = apiUrl;
  elements.openSvgLink.href = apiUrl;
}

function renderCard() {
  if (!state.handle) {
    elements.downloadButton.disabled = true;
    hidePreview();
    setStatus("error");
    setMessage(
      "Please enter a solved.ac handle. / solved.ac handle을 입력해 주세요.",
      true
    );
    return;
  }

  setStatus("loading");
  setMessage(
    "Preview is loading. The PNG button downloads directly from the server after the card appears. / 미리보기를 불러오는 중입니다. 카드가 보이면 PNG 버튼은 서버에서 직접 다운로드합니다.",
    false
  );

  elements.downloadButton.disabled = false;
  showRemotePreview(buildApiUrl({ cacheBust: true }));
}

function showRemotePreview(previewUrl) {
  elements.previewImage.hidden = false;
  elements.previewEmpty.hidden = true;
  elements.previewImage.src = previewUrl;
}

function hidePreview() {
  elements.previewImage.hidden = true;
  elements.previewImage.removeAttribute("src");
  elements.previewEmpty.hidden = false;
}

function downloadPng() {
  if (!state.handle) {
    setStatus("error");
    setMessage(
      "Please enter a solved.ac handle before downloading. / 다운로드 전에 solved.ac handle을 입력해 주세요.",
      true
    );
    return;
  }

  const pngUrl = buildApiUrl({
    format: "png",
    download: true,
    cacheBust: true,
  });

  const link = document.createElement("a");
  link.href = pngUrl;
  link.rel = "noreferrer";
  document.body.appendChild(link);
  link.click();
  link.remove();

  setStatus("ready");
  setMessage(
    "PNG download requested. If nothing downloads yet, redeploy Vercel so the API can serve format=png. / PNG 다운로드를 요청했습니다. 아직 내려오지 않으면 Vercel을 다시 배포해 format=png를 반영해 주세요.",
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
