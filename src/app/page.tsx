'use client';

import { useMemo, useState } from 'react';

type CardVersion = '1' | '2';

const cardVersions: { value: CardVersion; label: string; note: string }[] = [
  { value: '1', label: 'v1', note: 'Classic layout' },
  { value: '2', label: 'v2', note: 'Minimal layout' },
];

function buildApiUrl(
  handle: string,
  version: CardVersion,
  options?: { download?: boolean; cacheKey?: string; streak?: boolean }
) {
  const nextHandle = handle.trim();
  if (!nextHandle) return '';

  const params = new URLSearchParams({ handle: nextHandle, v: version });

  if (options?.download) {
    params.set('download', '1');
  }

  params.set('streak', options?.streak ? 'true' : 'false');

  if (options?.cacheKey) {
    params.set('_preview', options.cacheKey);
  }

  return `/api?${params.toString()}`;
}

function buildDownloadFilename(handle: string, version: CardVersion) {
  const safeHandle =
    handle
      .trim()
      .replace(/[^a-z0-9_-]+/gi, '-')
      .replace(/^-+|-+$/g, '') || 'card';

  return `solvedac-${safeHandle}-v${version}.svg`;
}

export default function Home() {
  const [draftHandle, setDraftHandle] = useState('');
  const [draftVersion, setDraftVersion] = useState<CardVersion>('2');
  const [draftShowStreak, setDraftShowStreak] = useState(false);
  const [submittedHandle, setSubmittedHandle] = useState('');
  const [submittedVersion, setSubmittedVersion] = useState<CardVersion>('2');
  const [submittedShowStreak, setSubmittedShowStreak] = useState(false);
  const [renderToken, setRenderToken] = useState('');
  const [imageLoaded, setImageLoaded] = useState(false);
  const [statusMessage, setStatusMessage] = useState(
    'Enter your solved.ac handle to render a card preview.'
  );
  const [statusTone, setStatusTone] = useState<'neutral' | 'error'>('neutral');

  const draftPreviewUrl = useMemo(
    () => buildApiUrl(draftHandle, draftVersion, { streak: draftShowStreak }),
    [draftHandle, draftVersion, draftShowStreak]
  );

  const previewUrl = useMemo(
    () =>
      buildApiUrl(submittedHandle, submittedVersion, {
        cacheKey: renderToken || undefined,
        streak: submittedShowStreak,
      }),
    [submittedHandle, submittedVersion, renderToken, submittedShowStreak]
  );

  function handleSubmit() {
    const nextHandle = draftHandle.trim();
    if (!nextHandle) {
      setSubmittedHandle('');
      setImageLoaded(false);
      setStatusTone('error');
      setStatusMessage('Please enter a solved.ac handle.');
      return;
    }

    setImageLoaded(false);
    setStatusTone('neutral');
    setStatusMessage('Preview is loading...');
    setSubmittedHandle(nextHandle);
    setSubmittedVersion(draftVersion);
    setSubmittedShowStreak(draftShowStreak);
    setRenderToken(Date.now().toString());
  }

  function handleDownloadSvg() {
    if (!submittedHandle) {
      setStatusTone('error');
      setStatusMessage('Render a card before downloading.');
      return;
    }

    const downloadUrl = buildApiUrl(submittedHandle, submittedVersion, {
      download: true,
      cacheKey: Date.now().toString(),
      streak: submittedShowStreak,
    });

    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = buildDownloadFilename(submittedHandle, submittedVersion);
    document.body.appendChild(link);
    link.click();
    link.remove();

    setStatusTone('neutral');
    setStatusMessage('SVG download started.');
  }

  const canSubmit = draftHandle.trim().length > 0;
  const downloadReady = imageLoaded && submittedHandle.length > 0;

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
                Preview the card, then download the exact SVG.
              </h1>
              <p className="max-w-2xl text-sm font-medium leading-7 text-slate-600 sm:text-base">
                Choose version 1 or 2, enter any solved.ac handle, and render the card directly in the browser.
              </p>
              <p className="max-w-2xl text-sm font-medium leading-7 text-slate-500 sm:text-base">
                Turn on `streak=true` to add a `Max Streak` row and a compact recent 1-year grass section below it.
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
                  Pick a version, enter a handle, then press OK.
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
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      event.preventDefault();
                      handleSubmit();
                    }
                  }}
                  placeholder="your-solved-handle"
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

              <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700">
                <input
                  type="checkbox"
                  checked={draftShowStreak}
                  onChange={(event) => setDraftShowStreak(event.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-sky-500 focus:ring-sky-200"
                />
                <span>Include Max Streak + yearly grass</span>
              </label>

              <div className="grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={!canSubmit}
                  className="inline-flex items-center justify-center rounded-2xl bg-slate-950 px-4 py-3 text-sm font-bold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300"
                >
                  OK
                </button>
                <button
                  type="button"
                  onClick={handleDownloadSvg}
                  disabled={!downloadReady}
                  className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-800 transition hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400"
                >
                  Download SVG
                </button>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
                <div className="text-xs font-bold uppercase tracking-[0.18em] text-slate-400">
                  preview url
                </div>
                <code className="mt-2 block break-all text-sm font-semibold text-slate-700">
                  {draftPreviewUrl || 'Enter a handle to generate the API URL.'}
                </code>
              </div>

              <div
                className={`rounded-2xl px-4 py-3 text-sm font-semibold ${
                  statusTone === 'error'
                    ? 'border border-rose-200 bg-rose-50 text-rose-700'
                    : 'border border-slate-200 bg-slate-50 text-slate-700'
                }`}
              >
                {statusMessage}
              </div>
            </div>
          </div>

          <div className="rounded-[32px] border border-slate-200/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.96)_0%,rgba(246,250,255,0.96)_100%)] p-5 shadow-[0_16px_50px_rgba(148,163,184,0.18)] sm:p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-xl font-black tracking-tight text-slate-950">
                  Preview
                </h2>
                <p className="mt-1 text-sm font-medium text-slate-500">
                  The rendered card appears on the right.
                </p>
              </div>
              <div className="inline-flex w-fit rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold uppercase tracking-[0.18em] text-emerald-700">
                {submittedHandle
                  ? `${submittedHandle} / v${submittedVersion}${submittedShowStreak ? ' / max streak' : ''}`
                  : 'ready'}
              </div>
            </div>

            <div className="mt-5 rounded-[28px] border border-slate-200 bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.08),_transparent_42%),linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)] p-4 sm:p-6">
              <div className="flex min-h-[360px] items-center justify-center rounded-[24px] border border-dashed border-slate-200 bg-white/90 p-3 sm:p-6">
                {previewUrl ? (
                  <img
                    key={previewUrl}
                    src={previewUrl}
                    alt={`solved.ac card preview for ${submittedHandle}`}
                    onLoad={() => {
                      setImageLoaded(true);
                      setStatusTone('neutral');
                      setStatusMessage(
                        'Preview updated. Download SVG saves the exact card you see on screen.'
                      );
                    }}
                    onError={() => {
                      setImageLoaded(false);
                      setStatusTone('error');
                      setStatusMessage('Failed to load the preview image.');
                    }}
                    className="h-auto w-full max-w-[760px] rounded-[22px]"
                  />
                ) : (
                  <div className="text-center text-slate-500">
                    <p className="text-2xl font-black text-slate-700">No preview yet</p>
                    <p className="mt-3 text-sm font-medium">
                      Enter a handle and press OK to render the card.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
