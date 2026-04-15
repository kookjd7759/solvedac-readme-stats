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
  versionInputs: Array.from(document.querySelectorAll('input[name="version"]')),
};

const state = {
  handle: "kookjd7759",
  version: "2",
  svgText: "",
  previewObjectUrl: "",
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

function buildApiUrl() {
  const handle = state.handle || "kookjd7759";
  const url = new URL(API_BASE);
  url.searchParams.set("handle", handle);
  url.searchParams.set("v", state.version);
  return url.toString();
}

function syncApiUrl() {
  const apiUrl = buildApiUrl();
  elements.apiUrl.textContent = apiUrl;
  elements.openSvgLink.href = apiUrl;
}

async function renderCard() {
  if (!state.handle) {
    setMessage("Please enter a solved.ac handle. / solved.ac 핸들을 입력해 주세요.", true);
    return;
  }

  setStatus("loading");
  setMessage("Rendering card... / 카드를 렌더링하는 중입니다.", false);
  elements.downloadButton.disabled = true;

  try {
    const apiUrl = buildApiUrl();
    const response = await fetch(apiUrl, { mode: "cors", cache: "no-store" });

    if (!response.ok) {
      throw new Error("The card API did not return a successful response.");
    }

    const svgText = await response.text();
    state.svgText = svgText;
    showPreview(svgText);
    elements.downloadButton.disabled = false;
    setStatus("ready");
    setMessage("Preview updated. You can now download it as PNG. / 미리보기가 갱신되었습니다. 이제 PNG로 다운로드할 수 있습니다.", false);
  } catch (error) {
    hidePreview();
    setStatus("error");
    setMessage(
      error instanceof Error
        ? `${error.message} / 카드 미리보기를 불러오지 못했습니다.`
        : "Preview rendering failed. / 카드 미리보기 렌더링에 실패했습니다.",
      true
    );
  }
}

function showPreview(svgText) {
  clearPreviewObjectUrl();

  const svgBlob = new Blob([svgText], {
    type: "image/svg+xml;charset=utf-8",
  });

  state.previewObjectUrl = URL.createObjectURL(svgBlob);
  elements.previewImage.src = state.previewObjectUrl;
  elements.previewImage.hidden = false;
  elements.previewEmpty.hidden = true;
}

function hidePreview() {
  clearPreviewObjectUrl();
  elements.previewImage.hidden = true;
  elements.previewImage.removeAttribute("src");
  elements.previewEmpty.hidden = false;
  elements.downloadButton.disabled = true;
}

async function downloadPng() {
  if (!state.svgText) {
    setMessage("Render a card first. / 먼저 카드를 렌더링해 주세요.", true);
    return;
  }

  try {
    setStatus("loading");
    setMessage("Preparing PNG download... / PNG 다운로드를 준비하는 중입니다.", false);

    const svgBlob = new Blob([state.svgText], {
      type: "image/svg+xml;charset=utf-8",
    });

    const svgUrl = URL.createObjectURL(svgBlob);

    try {
      const image = await loadImage(svgUrl);
      const canvas = document.createElement("canvas");
      const scale = 2;
      canvas.width = image.naturalWidth * scale;
      canvas.height = image.naturalHeight * scale;

      const context = canvas.getContext("2d");
      if (!context) {
        throw new Error("Canvas is not available in this browser.");
      }

      context.scale(scale, scale);
      context.drawImage(image, 0, 0);

      const pngBlob = await canvasToBlob(canvas);
      const downloadUrl = URL.createObjectURL(pngBlob);

      try {
        const link = document.createElement("a");
        link.href = downloadUrl;
        link.download = `solvedac-${state.handle}-v${state.version}.png`;
        document.body.appendChild(link);
        link.click();
        link.remove();
      } finally {
        URL.revokeObjectURL(downloadUrl);
      }
    } finally {
      URL.revokeObjectURL(svgUrl);
    }

    setStatus("ready");
    setMessage("PNG download started. / PNG 다운로드가 시작되었습니다.", false);
  } catch (error) {
    setStatus("error");
    setMessage(
      error instanceof Error
        ? `${error.message} / PNG 다운로드에 실패했습니다.`
        : "PNG download failed. / PNG 다운로드에 실패했습니다.",
      true
    );
  }
}

function clearPreviewObjectUrl() {
  if (!state.previewObjectUrl) return;
  URL.revokeObjectURL(state.previewObjectUrl);
  state.previewObjectUrl = "";
}

function setStatus(status) {
  elements.statusPill.textContent = status;
  elements.statusPill.dataset.status = status;
}

function setMessage(message, isError) {
  elements.messageCard.textContent = message;
  elements.messageCard.classList.toggle("is-error", Boolean(isError));
}

function loadImage(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Unable to load the rendered SVG."));
    image.src = src;
  });
}

function canvasToBlob(canvas) {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        reject(new Error("Unable to export PNG."));
        return;
      }

      resolve(blob);
    }, "image/png");
  });
}
