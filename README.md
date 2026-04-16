# solvedac-readme-stats

![Status](https://img.shields.io/badge/status-early%20access-orange)
![License](https://img.shields.io/badge/license-MIT-blue)
![Next.js](https://img.shields.io/badge/Next.js-16-black)
![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178C6)

> Dynamic SVG solved.ac stat cards for GitHub README profiles.  
> GitHub README profile can use these dynamic solved.ac SVG cards directly.
>
> GitHub README 프로필에 바로 붙일 수 있는 solved.ac 동적 SVG 카드 프로젝트입니다.  
> solved.ac 공개 프로필 데이터를 가져와 카드 이미지로 렌더링합니다.

## A Small Keepsake

This project started as a README stats card generator, and now also works as a small keepsake card maker.

원래는 README stats 용도로 만들던 프로젝트였고, 지금은 기록을 남기는 작은 카드 메이커로도 쓸 수 있게 정리했습니다.

If you want, you can turn on `streak=true` to add a `Max Streak` row and a compact recent 1-year grass section below it.

필요하면 `streak=true` 옵션으로 `Max Streak` 행과 최근 1년 잔디 섹션도 함께 넣을 수 있습니다.

## Web Studio

<p align="center">
  <a href="https://kookjd7759.github.io/solvedac-readme-stats/">
    <img alt="Open Web Studio" src="https://img.shields.io/badge/Open-Web%20Studio-0f172a?style=for-the-badge&logo=githubpages&logoColor=white" />
  </a>
</p>

Open the web studio here: [https://kookjd7759.github.io/solvedac-readme-stats/](https://kookjd7759.github.io/solvedac-readme-stats/)

Choose `v1` or `v2`, enter any solved.ac handle, preview the rendered card in the browser, and download the exact SVG.

`v1`, `v2` 중 하나를 고르고 solved.ac handle을 입력하면 브라우저에서 바로 미리보기를 확인하고 SVG를 그대로 내려받을 수 있습니다.

Enable `streak=true` in the studio if you want the `Max Streak` row and the recent 1-year grass panel.

웹 스튜디오에서 `streak=true`를 켜면 `Max Streak` 행과 최근 1년 잔디 패널이 추가됩니다.

## Preview

`streak=true` adds a `Max Streak` row and a compact recent 1-year grass section.

`streak=true`를 쓰면 `Max Streak` 행과 최근 1년 잔디 섹션이 추가됩니다.

<table>
  <tr>
    <td align="center" width="50%">
      <strong>v=1, streak=false</strong><br />
      <a href="https://solved.ac/en/profile/kookjd7759">
        <img src="https://solvedac-readme-stats.vercel.app/api?handle=kookjd7759&v=1&streak=false" alt="solved.ac stats v1 without streak" />
      </a>
    </td>
    <td align="center" width="50%">
      <strong>v=1, streak=true</strong><br />
      <a href="https://solved.ac/en/profile/kookjd7759">
        <img src="https://solvedac-readme-stats.vercel.app/api?handle=kookjd7759&v=1&streak=true" alt="solved.ac stats v1 with streak" />
      </a>
    </td>
  </tr>
  <tr>
    <td align="center" width="50%">
      <strong>v=2, streak=false</strong><br />
      <a href="https://solved.ac/en/profile/kookjd7759">
        <img src="https://solvedac-readme-stats.vercel.app/api?handle=kookjd7759&v=2&streak=false" alt="solved.ac stats v2 without streak" />
      </a>
    </td>
    <td align="center" width="50%">
      <strong>v=2, streak=true</strong><br />
      <a href="https://solved.ac/en/profile/kookjd7759">
        <img src="https://solvedac-readme-stats.vercel.app/api?handle=kookjd7759&v=2&streak=true" alt="solved.ac stats v2 with streak" />
      </a>
    </td>
  </tr>
</table>

## Usage

Replace `{username}` with your solved.ac handle.

`{username}` 자리에 본인의 solved.ac handle을 넣어서 사용하세요.

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

### v2

Minimal border layout with the solved background area applied to the top section.  
If you add `streak=true`, the card also renders a `Max Streak` row and a compact recent 1-year grass section.

상단 배경 영역이 적용된 미니멀 보더 레이아웃입니다.  
`streak=true`를 추가하면 `Max Streak` 행과 최근 1년 잔디 섹션도 함께 렌더링됩니다.

```markdown
[![solved.ac stats v2](https://solvedac-readme-stats.vercel.app/api?handle={username}&v=2)](https://github.com/kookjd7759/solvedac-readme-stats)
```

Streak-enabled example:

```markdown
[![solved.ac stats v2 streak](https://solvedac-readme-stats.vercel.app/api?handle={username}&v=2&streak=true)](https://github.com/kookjd7759/solvedac-readme-stats)
```

## Example URLs

Ready-to-test example URLs.

- `v=1`: `https://solvedac-readme-stats.vercel.app/api?handle={username}&v=1`
- `v=2`: `https://solvedac-readme-stats.vercel.app/api?handle={username}&v=2`
- `v=2 + streak=true`: `https://solvedac-readme-stats.vercel.app/api?handle={username}&v=2&streak=true`
  This adds the `Max Streak` row and recent 1-year grass section.
- `v=2 + streak=false`: `https://solvedac-readme-stats.vercel.app/api?handle={username}&v=2&streak=false`
  This keeps the basic card without the streak section.

## Query Parameters

Available query parameters.

- `handle`: solved.ac handle
- `v`: card version (`1` or `2`)
- `streak`: use `true` to add the `Max Streak` row and recent 1-year grass panel, or `false` to keep the basic card
- `download`: return the SVG as an attachment when set to `1`, `true`, or `yes`
- `debug`: return JSON debug output with `1`, `true`, or `json`

## GitHub Pages

This repository includes a static GitHub Pages app in [`docs/`](./docs) and a deployment workflow in [`.github/workflows/deploy-pages.yml`](./.github/workflows/deploy-pages.yml).

The Pages app uses the deployed Vercel API to render cards and download the exact SVG response.

## Deploy Your Own

Fork this repository and deploy the API to Vercel.

1. Fork this repository.
2. Deploy the Next.js app to Vercel.
3. Enable GitHub Pages with GitHub Actions for the web studio.
4. Use your own deployed `/api` endpoint if you want a separate API base.

## Development

Run the development server.

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

Example local test URLs:

- `http://localhost:3000/`
- `http://localhost:3000/api?handle={username}&v=1`
- `http://localhost:3000/api?handle={username}&v=2`
- `http://localhost:3000/api?handle={username}&v=2&streak=true`

## About solved.ac

solved.ac is a competitive programming profile service built around Baekjoon Online Judge (BOJ).  
This project uses solved.ac public profile data to generate dynamic README cards.

## License

Distributed under the MIT License. See `LICENSE` for more information.
