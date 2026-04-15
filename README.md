# solvedac-readme-stats

![Status](https://img.shields.io/badge/status-early%20access-orange)
![License](https://img.shields.io/badge/license-MIT-blue)
![Next.js](https://img.shields.io/badge/Next.js-16-black)
![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178C6)

> Dynamic SVG solved.ac stat cards for GitHub README profiles.  
> This project fetches public solved.ac profile data and renders it as an image that can be embedded directly into your README.
>
> GitHub README 프로필에 바로 넣을 수 있는 solved.ac 동적 SVG 카드입니다.  
> solved.ac 공개 프로필 데이터를 불러와 README에 붙여 넣기 좋은 카드 이미지로 렌더링합니다.

## A Small Keepsake
 solved.ac에서의 시간을 작은 기념 카드로 남기고 싶다면, 이 프로젝트로 지금의 프로필을 카드로 만들어 간직할 수 있습니다.  

티어, 스트릭, 랭크, 뱃지, 배경처럼 지금 이 순간의 기록을 하나의 스냅샷으로 남겨 두고 나중에 다시 꺼내볼 수 있게 하자는 마음으로 만들었습니다.

 최근 BOJ 자체가 끝을 향해 갈 수 있다는 소식을 보고, 이 프로젝트를 조금 더 마지막 선물 같은 느낌으로 남기고 싶었습니다. 이 시기의 내 프로필, 랭크, 스트릭, 뱃지, 배경을 기억하고 싶다면 카드 한 장으로 만들어 간직해 두면 좋겠다는 마음입니다.

## Web Studio

Use the GitHub Pages web tool to choose `v1` or `v2`, enter any solved.ac handle, preview the card, and download the exact SVG that is rendered on screen.  
It works especially well if you want to keep one clean profile card as a small souvenir of your solved.ac memories.

GitHub Pages 웹에서 `v1`, `v2`를 고르고 solved.ac handle을 입력한 뒤, 화면에 렌더링된 카드를 그대로 SVG로 다운로드할 수 있습니다.  
지금의 프로필을 작은 기념품처럼 남기고 싶은 사람에게 특히 잘 맞는 방식입니다.

- Web Studio: [https://kookjd7759.github.io/solvedac-readme-stats/](https://kookjd7759.github.io/solvedac-readme-stats/)
- API Base: [https://solvedac-readme-stats.vercel.app/api](https://solvedac-readme-stats.vercel.app/api)

## Preview

<table>
  <tr>
    <td align="center">
      <strong>v1</strong><br />
      Classic layout
    </td>
  </tr>
  <tr>
    <td align="center">
      <a href="https://solved.ac/en/profile/kookjd7759">
        <img src="https://solvedac-readme-stats.vercel.app/api?handle=kookjd7759&v=1" alt="solved.ac stats v1" />
      </a>
    </td>
  </tr>
  <tr>
    <td align="center">
      <strong>v2</strong><br />
      Minimal layout
    </td>
  </tr>
  <tr>
    <td align="center">
      <a href="https://solved.ac/en/profile/kookjd7759">
        <img src="https://solvedac-readme-stats.vercel.app/api?handle=kookjd7759&v=2" alt="solved.ac stats v2" />
      </a>
    </td>
  </tr>
</table>

## Usage

Replace `{username}` with your solved.ac handle.  
`{username}` 자리에 본인의 solved.ac handle을 넣어 사용하세요.

```markdown
[![solved.ac stats](https://solvedac-readme-stats.vercel.app/api?handle={username})](https://github.com/kookjd7759/solvedac-readme-stats)
```

## Card Versions

### v1

Classic card layout.  
If you omit the version parameter, `v=1` is used by default.

기본 카드 레이아웃입니다.  
버전 파라미터를 생략하면 기본값으로 `v=1`이 사용됩니다.

```markdown
[![solved.ac stats](https://solvedac-readme-stats.vercel.app/api?handle={username})](https://github.com/kookjd7759/solvedac-readme-stats)
```

Explicit `v=1` example.

```markdown
[![solved.ac stats](https://solvedac-readme-stats.vercel.app/api?handle={username}&v=1)](https://github.com/kookjd7759/solvedac-readme-stats)
```

### v2

Minimal border layout with the solved background area applied to the top section.

상단 배경 영역이 적용된 미니멀 보더 레이아웃입니다.

```markdown
[![solved.ac stats v2](https://solvedac-readme-stats.vercel.app/api?handle={username}&v=2)](https://github.com/kookjd7759/solvedac-readme-stats)
```

## Example URLs

Ready-to-test example URLs.

- `v=1`: `https://solvedac-readme-stats.vercel.app/api?handle={username}&v=1`
- `v=2`: `https://solvedac-readme-stats.vercel.app/api?handle={username}&v=2`

## Query Parameters

Available query parameters.

- `handle`: solved.ac handle
- `v`: card version (`1` or `2`)
- `download`: return the SVG as an attachment when set to `1`, `true`, or `yes`
- `debug`: return JSON debug output with `1`, `true`, or `json`

## GitHub Pages

This repository includes a static GitHub Pages app in [`docs/`](./docs) and a deployment workflow in [`.github/workflows/deploy-pages.yml`](./.github/workflows/deploy-pages.yml).

The Pages app uses the deployed Vercel API to render cards and download the exact SVG response.

이 저장소에는 [`docs/`](./docs) 기반의 GitHub Pages 웹 앱과 [`.github/workflows/deploy-pages.yml`](./.github/workflows/deploy-pages.yml) 배포 워크플로우가 포함되어 있습니다.  
Pages 앱은 배포된 Vercel API를 사용해 카드를 렌더링하고, 보이는 그대로 SVG를 다운로드합니다.

## Deploy Your Own

Fork this repository and deploy the API to Vercel.

이 저장소를 포크한 뒤, API를 Vercel에 직접 배포해서 사용할 수도 있습니다.

1. Fork this repository.
2. Deploy the Next.js app to Vercel.
3. Enable GitHub Pages with GitHub Actions for the web studio.
4. Use your own deployed `/api` endpoint if you want a separate API base.

## Development

Run the development server.

개발 서버 실행:

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

Example local test URLs:

- `http://localhost:3000/`
- `http://localhost:3000/api?handle={username}&v=1`
- `http://localhost:3000/api?handle={username}&v=2`

## About solved.ac

solved.ac is a competitive programming profile service built around Baekjoon Online Judge (BOJ).  
This project uses solved.ac public profile data to generate dynamic README cards.

solved.ac는 백준 온라인 저지(BOJ)를 중심으로 만들어진 알고리즘 프로필 서비스입니다.  
이 프로젝트는 solved.ac 공개 프로필 데이터를 이용해 동적인 README 카드를 생성합니다.

## License

Distributed under the MIT License. See `LICENSE` for more information.
