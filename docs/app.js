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
  svgText: "",
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
    elements.previewImage.hidden = false;
    elements.previewEmpty.hidden = true;
  });

  elements.previewImage.addEventListener("error", () => {
    hidePreview();
    setStatus("error");
    setMessage(
      "The preview image could not be loaded. Check the handle and open the SVG link once. / " +
        "미리보기 이미지를 불러오지 못했습니다. handle 값을 확인하고 Open SVG 링크를 한 번 열어 주세요.",
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

function buildApiUrl() {
  const handle = state.handle || "kookjd7759";
  const url = new URL(API_BASE);
  url.searchParams.set("handle", handle);
  url.searchParams.set("v", state.version);
  return url.toString();
}

function buildPreviewUrl() {
  const url = new URL(buildApiUrl());
  url.searchParams.set("_preview", Date.now().toString());
  return url.toString();
}

function syncApiUrl() {
  const apiUrl = buildApiUrl();
  elements.apiUrl.textContent = apiUrl;
  elements.openSvgLink.href = apiUrl;
}

async function renderCard() {
  if (!state.handle) {
    state.svgText = "";
    hidePreview();
    elements.downloadButton.disabled = true;
    setStatus("error");
    setMessage(
      "Please enter a solved.ac handle. / solved.ac handle을 입력해 주세요.",
      true
    );
    return;
  }

  const apiUrl = buildApiUrl();
  const previewUrl = buildPreviewUrl();

  state.svgText = "";
  elements.downloadButton.disabled = true;
  setStatus("loading");
  setMessage(
    "Preview is loading. PNG download will unlock after the SVG fetch succeeds. / " +
      "미리보기를 불러오는 중입니다. SVG fetch가 성공하면 PNG 다운로드가 활성화됩니다.",
    false
  );

  showRemotePreview(previewUrl);

  try {
    const response = await fetch(apiUrl, { mode: "cors", cache: "no-store" });

    if (!response.ok) {
      throw new Error("The card API did not return a successful response.");
    }

    state.svgText = await response.text();
    elements.downloadButton.disabled = false;
    setStatus("ready");
    setMessage(
      "Preview updated. You can now download it as PNG. / 미리보기가 갱신되었습니다. 이제 PNG로 다운로드할 수 있습니다.",
      false
    );
  } catch (error) {
    setStatus("preview");
    setMessage(
      (error instanceof Error ? error.message : "Failed to fetch the SVG for PNG export.") +
        " / 미리보기는 표시될 수 있지만 PNG 다운로드는 아직 준비되지 않았습니다. " +
        "Vercel API에 CORS 헤더가 반영되도록 다시 배포한 뒤 다시 시도해 주세요.",
      false
    );
  }
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

async function downloadPng() {
  if (!state.svgText) {
    setStatus("error");
    setMessage(
      "PNG download is not ready yet. The preview can still show, but PNG export needs a successful SVG fetch first. / " +
        "아직 PNG 다운로드를 준비하지 못했습니다. 미리보기는 보여도 PNG 내보내기는 SVG fetch가 먼저 성공해야 합니다.",
      true
    );
    return;
  }

  try {
    setStatus("loading");
    setMessage(
      "Preparing PNG download... / PNG 다운로드를 준비하는 중입니다.",
      false
    );

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
    setMessage(
      "PNG download started. / PNG 다운로드가 시작되었습니다.",
      false
    );
  } catch (error) {
    setStatus("error");
    setMessage(
      (error instanceof Error ? error.message : "PNG download failed.") +
        " / PNG 다운로드에 실패했습니다.",
      true
    );
  }
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
