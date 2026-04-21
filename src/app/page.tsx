'use client';

import { useMemo, useState } from 'react';

type CardVersion = '1' | '2';

const cardVersions: { value: CardVersion; label: string; note: string }[] = [
  { value: '1', label: 'v1', note: '클래식 카드' },
  { value: '2', label: 'v2', note: '미니멀 카드' },
];

const exampleHandles = ['koosaga', 'utilforever', 'kookjd7759'];

function buildApiUrl(
  handle: string,
  version: CardVersion,
  options?: { download?: boolean; cacheKey?: string; streak?: boolean }
) {
  const nextHandle = handle.trim();
  if (!nextHandle) return '';

  const params = new URLSearchParams({ handle: nextHandle, v: version });
  params.set('streak', options?.streak ? 'true' : 'false');

  if (options?.download) {
    params.set('download', '1');
  }

  if (options?.cacheKey) {
    params.set('_preview', options.cacheKey);
  }

  return `/api?${params.toString()}`;
}

function buildDownloadFilename(handle: string, version: CardVersion, streak: boolean) {
  const safeHandle =
    handle
      .trim()
      .replace(/[^a-z0-9_-]+/gi, '-')
      .replace(/^-+|-+$/g, '') || 'card';

  return `solvedac-${safeHandle}-v${version}${streak ? '-streak' : ''}.svg`;
}

function buildMarkdownSnippet(handle: string, version: CardVersion, streak: boolean) {
  const apiUrl = buildApiUrl(handle, version, { streak });
  if (!apiUrl) {
    return '이미지 마크다운을 바로 복사할 수 있습니다.';
  }

  return `![solved.ac 카드](${apiUrl})`;
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
    'solved.ac 핸들을 입력하면 카드 미리보기를 만들 수 있습니다.'
  );
  const [statusTone, setStatusTone] = useState<'neutral' | 'error'>('neutral');

  const draftPreviewUrl = useMemo(
    () => buildApiUrl(draftHandle, draftVersion, { streak: draftShowStreak }),
    [draftHandle, draftVersion, draftShowStreak]
  );

  const draftMarkdown = useMemo(
    () => buildMarkdownSnippet(draftHandle, draftVersion, draftShowStreak),
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

  async function copyText(text: string, successMessage: string) {
    if (!text || text.includes('입력하면')) {
      setStatusTone('error');
      setStatusMessage('복사할 내용이 아직 준비되지 않았습니다.');
      return;
    }

    try {
      await navigator.clipboard.writeText(text);
      setStatusTone('neutral');
      setStatusMessage(successMessage);
    } catch {
      setStatusTone('error');
      setStatusMessage('클립보드 복사에 실패했습니다.');
    }
  }

  function handleSubmit() {
    const nextHandle = draftHandle.trim();
    if (!nextHandle) {
      setSubmittedHandle('');
      setImageLoaded(false);
      setStatusTone('error');
      setStatusMessage('solved.ac 핸들을 먼저 입력해 주세요.');
      return;
    }

    setImageLoaded(false);
    setStatusTone('neutral');
    setStatusMessage('카드를 불러오는 중입니다...');
    setSubmittedHandle(nextHandle);
    setSubmittedVersion(draftVersion);
    setSubmittedShowStreak(draftShowStreak);
    setRenderToken(Date.now().toString());
  }

  function handleDownloadSvg() {
    if (!submittedHandle) {
      setStatusTone('error');
      setStatusMessage('카드를 먼저 렌더링한 뒤 다운로드해 주세요.');
      return;
    }

    const downloadUrl = buildApiUrl(submittedHandle, submittedVersion, {
      download: true,
      cacheKey: Date.now().toString(),
      streak: submittedShowStreak,
    });

    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = buildDownloadFilename(submittedHandle, submittedVersion, submittedShowStreak);
    document.body.appendChild(link);
    link.click();
    link.remove();

    setStatusTone('neutral');
    setStatusMessage('SVG 다운로드를 시작했습니다.');
  }

  const canSubmit = draftHandle.trim().length > 0;
  const downloadReady = imageLoaded && submittedHandle.length > 0;
  const previewSummary = submittedHandle
    ? `${submittedHandle} · v${submittedVersion}${submittedShowStreak ? ' · 연속 풀이 포함' : ''}`
    : '아직 렌더링한 카드가 없습니다.';

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f4fbff_0%,#eef6ff_48%,#fff8ee_100%)] px-5 py-8 text-slate-950 sm:px-8 lg:px-10">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6">
        <section className="relative overflow-hidden rounded-[32px] border border-sky-100/80 bg-white/90 p-6 shadow-[0_22px_80px_rgba(15,23,42,0.12)] backdrop-blur sm:p-8">
          <div className="pointer-events-none absolute inset-y-0 right-0 w-[42%] bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.16),_transparent_48%),radial-gradient(circle_at_bottom,_rgba(16,185,129,0.12),_transparent_52%)]" />
          <div className="relative grid gap-5 lg:grid-cols-[minmax(0,1.45fr)_320px]">
            <div className="flex flex-col gap-4">
              <span className="inline-flex w-fit rounded-full bg-sky-50 px-3 py-1 text-xs font-black tracking-[0.18em] text-sky-700">
                실시간 스튜디오
              </span>
              <div className="space-y-3">
                <h1 className="text-4xl font-black tracking-[-0.06em] text-slate-950 sm:text-5xl">
                  실시간으로 만들고, 바로 SVG로 저장하세요
                </h1>
                <p className="max-w-2xl text-sm font-bold leading-7 text-slate-600 sm:text-base">
                  solved.ac 핸들을 넣으면 README 카드 미리보기, API 주소 복사, 이미지 마크다운 복사까지 한 번에 처리할 수 있습니다.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {['solved.ac', '깃허브 README', 'v1 / v2', '연속 풀이 옵션'].map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex min-h-9 items-center rounded-full border border-sky-100 bg-white/80 px-3 text-sm font-extrabold text-slate-800"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <aside className="grid gap-3 rounded-[26px] border border-slate-200/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.94),rgba(248,250,252,0.96))] p-4">
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-500">
                  빠른 흐름
                </p>
                <div className="mt-3 grid gap-2">
                  {['핸들 입력', '미리보기 확인', '복사 또는 저장'].map((step) => (
                    <div
                      key={step}
                      className="rounded-2xl bg-white px-4 py-3 text-sm font-black text-slate-800"
                    >
                      {step}
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-3">
                <a
                  href="https://kookjd7759.github.io/solvedac-readme-stats/platinum-snapshot/"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#0f172a,#075985)] px-4 text-sm font-black text-white"
                >
                  플래티넘 아카이브
                </a>
                <a
                  href="https://github.com/kookjd7759/solvedac-readme-stats"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-12 items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 text-sm font-black text-slate-900"
                >
                  GitHub 저장소
                </a>
              </div>
            </aside>
          </div>
        </section>

        <section className="grid gap-6 lg:grid-cols-[390px_minmax(0,1fr)]">
          <div className="rounded-[30px] border border-slate-200/80 bg-white/92 p-5 shadow-[0_16px_50px_rgba(15,23,42,0.1)] backdrop-blur sm:p-6">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-2xl font-black tracking-[-0.04em] text-slate-950">
                  카드 설정
                </h2>
                <p className="mt-2 text-sm font-bold text-slate-500">
                  핸들을 넣고 바로 결과를 확인하세요.
                </p>
              </div>
                <div className="rounded-full bg-slate-100 px-3 py-1 text-xs font-black text-slate-500">
                  실시간
                </div>
            </div>

            <div className="mt-6 space-y-5">
              <div className="space-y-2">
                <label className="text-sm font-black text-slate-700">solved.ac 핸들</label>
                <input
                  value={draftHandle}
                  onChange={(event) => setDraftHandle(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter') {
                      event.preventDefault();
                      handleSubmit();
                    }
                  }}
                  placeholder="예: koosaga"
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-base font-extrabold text-slate-900 outline-none transition focus:border-sky-300 focus:bg-white focus:ring-4 focus:ring-sky-100"
                />
                <div className="flex flex-wrap gap-2">
                  {exampleHandles.map((handle) => (
                    <button
                      key={handle}
                      type="button"
                      onClick={() => setDraftHandle(handle)}
                      className="rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-black text-slate-700 transition hover:border-sky-200 hover:bg-sky-50"
                    >
                      {handle}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-sm font-black text-slate-700">카드 버전</span>
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
                        <div className="text-base font-black text-slate-950">{version.label}</div>
                        <div className="mt-1 text-sm font-bold text-slate-500">{version.note}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <label className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-extrabold text-slate-700">
                <input
                  type="checkbox"
                  checked={draftShowStreak}
                  onChange={(event) => setDraftShowStreak(event.target.checked)}
                  className="h-4 w-4 rounded border-slate-300 text-sky-500 focus:ring-sky-200"
                />
                <span>연속 풀이 섹션 포함</span>
              </label>

              <div className="grid gap-3 sm:grid-cols-2">
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={!canSubmit}
                  className="inline-flex items-center justify-center rounded-2xl bg-[linear-gradient(135deg,#0f172a,#075985)] px-4 py-3 text-sm font-black text-white transition hover:translate-y-[-1px] disabled:cursor-not-allowed disabled:bg-slate-300"
                >
                  미리보기
                </button>
                <button
                  type="button"
                  onClick={handleDownloadSvg}
                  disabled={!downloadReady}
                  className="inline-flex items-center justify-center rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-black text-slate-800 transition hover:border-slate-300 hover:bg-slate-50 disabled:cursor-not-allowed disabled:border-slate-200 disabled:bg-slate-100 disabled:text-slate-400"
                >
                  SVG 다운로드
                </button>
              </div>

              <div className="grid gap-3">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">
                      API 주소
                    </div>
                    <button
                      type="button"
                      onClick={() => copyText(draftPreviewUrl, 'API 주소를 복사했습니다.')}
                      disabled={!draftPreviewUrl}
                      className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-black text-slate-600 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      복사
                    </button>
                  </div>
                  <code className="mt-2 block break-all text-sm font-bold text-slate-700">
                    {draftPreviewUrl || '핸들을 입력하면 주소가 생성됩니다.'}
                  </code>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4">
                  <div className="flex items-center justify-between gap-3">
                    <div className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">
                      README 코드
                    </div>
                    <button
                      type="button"
                      onClick={() => copyText(draftMarkdown, 'README 코드를 복사했습니다.')}
                      disabled={!draftPreviewUrl}
                      className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-black text-slate-600 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      복사
                    </button>
                  </div>
                  <code className="mt-2 block break-all text-sm font-bold text-slate-700">
                    {draftMarkdown}
                  </code>
                </div>
              </div>

              <div
                className={`rounded-2xl px-4 py-3 text-sm font-bold ${
                  statusTone === 'error'
                    ? 'border border-rose-200 bg-rose-50 text-rose-700'
                    : 'border border-slate-200 bg-slate-50 text-slate-700'
                }`}
              >
                {statusMessage}
              </div>
            </div>
          </div>

          <div className="rounded-[32px] border border-slate-200/80 bg-[linear-gradient(180deg,rgba(255,255,255,0.96)_0%,rgba(246,250,255,0.96)_100%)] p-5 shadow-[0_18px_56px_rgba(15,23,42,0.12)] sm:p-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <h2 className="text-2xl font-black tracking-[-0.04em] text-slate-950">
                  미리보기
                </h2>
                <p className="mt-2 text-sm font-bold text-slate-500">{previewSummary}</p>
              </div>
              <a
                href={previewUrl || '#'}
                target="_blank"
                rel="noreferrer"
                className={`inline-flex w-fit items-center justify-center rounded-full border px-4 py-2 text-xs font-black ${
                  previewUrl
                    ? 'border-slate-200 bg-white text-slate-700'
                    : 'pointer-events-none border-slate-200 bg-slate-100 text-slate-400'
                }`}
              >
                새 탭에서 열기
              </a>
            </div>

            <div className="mt-5 rounded-[28px] border border-slate-200 bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.08),_transparent_42%),linear-gradient(180deg,#f8fbff_0%,#ffffff_100%)] p-4 sm:p-6">
              <div className="flex min-h-[380px] items-center justify-center rounded-[24px] border border-dashed border-slate-200 bg-white/90 p-3 sm:p-6">
                {previewUrl ? (
                  <img
                    key={previewUrl}
                    src={previewUrl}
                    alt={`solved.ac 카드 미리보기 ${submittedHandle}`}
                    onLoad={() => {
                      setImageLoaded(true);
                      setStatusTone('neutral');
                      setStatusMessage(
                        '카드 미리보기가 준비되었습니다. 지금 보이는 상태 그대로 SVG로 저장할 수 있습니다.'
                      );
                    }}
                    onError={() => {
                      setImageLoaded(false);
                      setStatusTone('error');
                      setStatusMessage('카드 이미지를 불러오지 못했습니다.');
                    }}
                    className="h-auto w-full max-w-[760px] rounded-[22px]"
                  />
                ) : (
                  <div className="text-center text-slate-500">
                    <p className="text-3xl font-black text-slate-700">
                      카드를 만들어 보세요
                    </p>
                    <p className="mt-3 text-sm font-bold">
                      핸들을 입력하고 <strong>미리보기</strong>를 누르면 바로 결과가 나타납니다.
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
