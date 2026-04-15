'use client';

import { useMemo, useState, useTransition } from 'react';

type CardVersion = '1' | '2';

const defaultHandle = 'kookjd7759';
const cardVersions: { value: CardVersion; label: string; note: string }[] = [
  { value: '1', label: 'v1', note: 'Classic layout' },
  { value: '2', label: 'v2', note: 'Minimal layout' },
];

function buildPreviewUrl(handle: string, version: CardVersion) {
  const params = new URLSearchParams({ handle: handle.trim(), v: version });
  return `/api?${params.toString()}`;
}

export default function Home() {
  const [draftHandle, setDraftHandle] = useState(defaultHandle);
  const [draftVersion, setDraftVersion] = useState<CardVersion>('2');
  const [submittedHandle, setSubmittedHandle] = useState(defaultHandle);
  const [submittedVersion, setSubmittedVersion] = useState<CardVersion>('2');
  const [imageLoaded, setImageLoaded] = useState(false);
  const [downloadError, setDownloadError] = useState<string>('');
  const [isPending, startTransition] = useTransition();

  const previewUrl = useMemo(
    () => buildPreviewUrl(submittedHandle, submittedVersion),
    [submittedHandle, submittedVersion]
  );

  function handleSubmit() {
    const nextHandle = draftHandle.trim();
    if (!nextHandle) return;

    setDownloadError('');
    setImageLoaded(false);

    startTransition(() => {
      setSubmittedHandle(nextHandle);
      setSubmittedVersion(draftVersion);
    });
  }

  async function handleDownloadPng() {
    try {
      setDownloadError('');

      const response = await fetch(previewUrl, { cache: 'no-store' });
      if (!response.ok) {
        throw new Error('Failed to fetch card image.');
      }

      const svgText = await response.text();
      const svgBlob = new Blob([svgText], { type: 'image/svg+xml;charset=utf-8' });
      const svgUrl = URL.createObjectURL(svgBlob);

      try {
        const image = await loadImage(svgUrl);
        const scale = 2;
        const canvas = document.createElement('canvas');
        canvas.width = image.naturalWidth * scale;
        canvas.height = image.naturalHeight * scale;

        const context = canvas.getContext('2d');
        if (!context) {
          throw new Error('Canvas is not available in this browser.');
        }

        context.scale(scale, scale);
        context.drawImage(image, 0, 0);

        const pngBlob = await canvasToBlob(canvas);
        const downloadUrl = URL.createObjectURL(pngBlob);

        try {
          const link = document.createElement('a');
          link.href = downloadUrl;
          link.download = `solvedac-${submittedHandle}-v${submittedVersion}.png`;
          document.body.appendChild(link);
          link.click();
          link.remove();
        } finally {
          URL.revokeObjectURL(downloadUrl);
        }
      } finally {
        URL.revokeObjectURL(svgUrl);
      }
    } catch (error) {
      setDownloadError(
        error instanceof Error ? error.message : 'PNG download failed.'
      );
    }
  }

  const canSubmit = draftHandle.trim().length > 0;

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f8fbff_0%,#eef5ff_48%,#fdf8f0_100%)] px-5 py-8 text-slate-950 sm:px-8 lg:px-10">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        <section className="relative overflow-hidden rounded-[28px] border border-sky-100/80 bg-white/88 p-6 shadow-[0_20px_80px_rgba(148,163,184,0.18)] backdrop-blur sm:p-8">
          <div className="pointer-events-none absolute inset-y-0 right-0 w-[42%] bg-[radial-gradient(circle_at_top,_rgba(34,197,94,0.12),_transparent_52%),radial-gradient(circle_at_bottom,_rgba(14,165,233,0.12),_transparent_55%)]" />
          <div className="relative flex flex-col gap-4">
            <span className="inline-flex w-fit rounded-full border border-sky-100 bg-sky-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.22em] text-sky-700">
              solved.ac readme studio
            </span>
            <div className="flex flex-col gap-3 lg:max-w-3xl">
              <h1 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
                Build a solved.ac card and export it as PNG
              </h1>
              <p className="max-w-2xl text-sm font-medium leading-7 text-slate-600 sm:text-base">
                Version 1 and 2 can be previewed from the web page, and the generated card can be saved as a PNG in one click.
              </p>
              <p className="max-w-2xl text-sm font-medium leading-7 text-slate-500 sm:text-base">
                웹에서 바로 버전을 선택하고 solved.ac 핸들을 입력한 뒤, 미리보기 확인과 PNG 다운로드까지 한 번에 할 수 있습니다.
              </p>
            </div>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[380px_minmax(0,1fr)]">
          <div className="rounded-[28px] border border-slate-200/80 bg-white/92 p-5 shadow-[0_14px_40px_rgba(148,163,184,0.16)] backdrop-blur sm:p-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-black tracking-tight text-slate-950">
                  Card Controls
                </h2>
                <p className="mt-1 text-sm font-medium text-slate-500">
                  버전과 핸들을 선택한 뒤 오른쪽에서 결과를 확인하세요.
                </p>
              </div>
              <div className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
                live preview
              </div>
            </div>

            <div className="mt-6 space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">
                  solved.ac handle
                </label>
                <input
                  value={draftHandle}
                  onChange={(event) => setDraftHandle(event.target.value)}
                  placeholder="kookjd7759"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-base font-semibold text-slate-900 outline-none transition focus:border-sky-300 focus:bg-white focus:ring-4 focus:ring-sky-100"
                />
              </div>

              <div className="space-y-2">
                <span className="text-sm font-bold text-slate-700">version</span>
                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                  {cardVersions.map((version) => {
                    const isActive = draftVersion === version.value;
                    return (
                      <button
                        key={version.value}
                        type="button"
                        onClick={() => setDraftVersion(version.value)}
                        className={`rounded-2xl border px-4 py-4 text-left transition ${
                          isActive
                            ? 'border-sky-300 bg-sky-50 shadow-[inset_0_0_0_1px_rgba(56,189,248,0.22)]'
                            : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                        }`}
                      >
                        <div className="text-base font-black text-slate-950">
                          {version.label}
                        </div>
                        <div className="mt-1 text-sm font-medium text-slate-500">
                          {version.note}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={!canSubmit || isPending}
                  className="inline-flex items-center justify-center rounded-2xl bg-slate-950 px-4 py-3 text-sm font-bold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300"
                >
                  {isPending ? 'Loading...' : 'OK'}
                </button>
                <button
                  type="button"
                  onClick={handleDownloadPng}
                  disabled={!imageLoaded}
                  className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-800 transition hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400"
                >
                  Download PNG
                </button>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
                <div className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
                  preview url
                </div>
                <code className="mt-2 block break-all text-sm font-semibold text-slate-700">
                  {previewUrl}
                </code>
              </div>

              {downloadError ? (
                <div className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700">
                  {downloadError}
                </div>
              ) : null}
            </div>
          </div>

          <div className="rounded-[32px] border border-slate-200/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.96)_0%,rgba(246,250,255,0.96)_100%)] p-5 shadow-[0_16px_50px_rgba(148,163,184,0.18)] sm:p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-black tracking-tight text-slate-950">
                  Preview
                </h2>
                <p className="mt-1 text-sm font-medium text-slate-500">
                  오른쪽 카드 이미지는 선택한 버전과 핸들로 다시 렌더링됩니다.
                </p>
              </div>
              <div className="inline-flex w-fit rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-emerald-700">
                {submittedHandle} / v{submittedVersion}
              </div>
            </div>

            <div className="mt-5 rounded-[28px] border border-slate-200 bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.08),_transparent_42%),linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)] p-4 sm:p-6">
              <div className="flex min-h-[360px] items-center justify-center rounded-[24px] border border-dashed border-slate-200 bg-white/90 p-3 sm:p-6">
                <img
                  key={previewUrl}
                  src={previewUrl}
                  alt={`solved.ac card preview for ${submittedHandle}`}
                  onLoad={() => setImageLoaded(true)}
                  onError={() => setImageLoaded(false)}
                  className="h-auto w-full max-w-[760px] rounded-[22px]"
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function loadImage(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error('Unable to load SVG preview.'));
    image.src = src;
  });
}

function canvasToBlob(canvas: HTMLCanvasElement) {
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) {
        reject(new Error('Unable to export PNG.'));
        return;
      }

      resolve(blob);
    }, 'image/png');
  });
}
