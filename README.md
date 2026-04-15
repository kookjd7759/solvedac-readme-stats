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

## Preview

<table>
  <tr>
    <td align="center" width="50%">
      <strong>v1</strong><br />
      Classic layout<br />
      <a href="https://solved.ac/en/profile/kookjd7759">
        <img src="https://solvedac-readme-stats.vercel.app/api?handle=kookjd7759&v=1" alt="solved.ac stats v1" />
      </a>
    </td>
    <td align="center" width="50%">
      <strong>v2</strong><br />
      Minimal layout<br /><br />
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
[![solved.ac stats](https://solvedac-readme-stats.vercel.app/api?handle={username})](https://solved.ac/en/profile/{username})
```

## Card Versions

### v1

Classic card layout.  
If you omit the version parameter, `v=1` is used by default.  

```markdown
[![solved.ac stats](https://solvedac-readme-stats.vercel.app/api?handle={username})](https://solved.ac/en/profile/{username})
```

Explicit `v=1` example.  

```markdown
[![solved.ac stats](https://solvedac-readme-stats.vercel.app/api?handle={username}&v=1)](https://solved.ac/en/profile/{username})
```

### v2

Minimal border layout with the solved background area applied to the top section.  

```markdown
[![solved.ac stats v2](https://solvedac-readme-stats.vercel.app/api?handle={username}&v=2)](https://solved.ac/en/profile/{username})
```

## Example URLs

Ready-to-test example URLs.  

- `v=1`: `https://solvedac-readme-stats.vercel.app/api?handle=kookjd7759`
- `v=2`: `https://solvedac-readme-stats.vercel.app/api?handle=kookjd7759&v=2`

## Query Parameters

Available query parameters.  

- `handle`: solved.ac handle  
- `v`: card version (`1` or `2`)  
- `debug`: return JSON debug output with `1`, `true`, or `json`  

## Deploy Your Own

Fork this repository and deploy it to Vercel.  

1. Fork this repository.  
2. Deploy it to Vercel.  
3. Use your own deployed `/api` endpoint in your README.  

## Development

Run the development server.  

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).  

Example local test URLs.  

- `http://localhost:3000/api?handle=kookjd7759`
- `http://localhost:3000/api?handle=kookjd7759&v=2`

## About solved.ac

solved.ac is a competitive programming profile service built around Baekjoon Online Judge (BOJ).  

This project uses solved.ac public profile data to generate dynamic README cards.  

## License

Distributed under the MIT License. See `LICENSE` for more information.  
MIT License로 배포되며, 자세한 내용은 `LICENSE`를 참고하세요.
