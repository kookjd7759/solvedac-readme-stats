# solvedac-readme-stats

![Status](https://img.shields.io/badge/status-early%20access-orange)
![License](https://img.shields.io/badge/license-MIT-blue)
![Next.js](https://img.shields.io/badge/Next.js-16-black)
![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178C6)

> Dynamic SVG solved.ac stat cards for GitHub README profiles.  
> This project fetches public solved.ac profile data and renders it as an image that can be embedded directly into your README.  
>
> GitHub README 프로필에 넣을 수 있는 solved.ac 동적 SVG 카드입니다.
> solved.ac 공개 프로필 데이터를 불러와 README에 바로 넣을 수 있는 이미지 카드로 렌더링합니다.

## Web Studio

Use the GitHub Pages web tool to choose `v1` or `v2`, enter any solved.ac handle, preview the card, and download the exact SVG that is rendered on screen.  
GitHub Pages 웹에서 `v1`, `v2`를 고르고 solved.ac 핸들을 입력한 뒤, 화면에 렌더링된 카드를 그대로 SVG로 다운로드할 수 있습니다.

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
`{username}` 자리에 본인의 solved.ac 핸들을 넣어서 사용하세요.

```markdown
[![solved.ac stats](https://solvedac-readme-stats.vercel.app/api?handle={username})](https://github.com/kookjd7759/solvedac-readme-stats)
```

## Card Versions

### v1

Classic card layout.  
If you omit the version parameter, `v=1` is used by default.  

```markdown
[![solved.ac stats](https://solvedac-readme-stats.vercel.app/api?handle={username})](https://github.com/kookjd7759/solvedac-readme-stats)
```

Explicit `v=1` example.  

```markdown
[![solved.ac stats](https://solvedac-readme-stats.vercel.app/api?handle={username}&v=1)](https://github.com/kookjd7759/solvedac-readme-stats)
```

### v2

Minimal border layout with the solved background area applied to the top section.  

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

Example local test URLs.  

- `http://localhost:3000/`
- `http://localhost:3000/api?handle={username}&v=1`
- `http://localhost:3000/api?handle={username}&v=2`

## About solved.ac

solved.ac is a competitive programming profile service built around Baekjoon Online Judge (BOJ).  
This project uses solved.ac public profile data to generate dynamic README cards.  

## License

Distributed under the MIT License. See `LICENSE` for more information.  
