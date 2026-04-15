# solvedac-readme-stats

![Status](https://img.shields.io/badge/status-early%20access-orange)
![License](https://img.shields.io/badge/license-MIT-blue)
![Next.js](https://img.shields.io/badge/Next.js-16-black)
![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178C6)

Dynamic SVG solved.ac stat cards for GitHub README profiles.  
GitHub README 프로필에 넣을 수 있는 solved.ac 동적 SVG 카드입니다.

This project fetches public solved.ac profile data and renders it as an image that can be embedded directly into your README.  
solved.ac 공개 프로필 데이터를 불러와 README에 바로 넣을 수 있는 이미지 카드로 렌더링합니다.

## Preview

Compare both versions at a glance.  
두 버전을 처음부터 한눈에 비교해서 볼 수 있습니다.

<table>
  <tr>
    <td align="center" width="50%">
      <strong>v1</strong><br />
      Classic layout<br />
      클래식 레이아웃<br /><br />
      <a href="https://solved.ac/en/profile/kookjd7759">
        <img src="https://solvedac-readme-stats.vercel.app/api?handle=kookjd7759&v=1" alt="solved.ac stats v1" />
      </a>
    </td>
    <td align="center" width="50%">
      <strong>v2</strong><br />
      Minimal layout<br />
      미니멀 레이아웃<br /><br />
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
기본 클래식 카드 레이아웃입니다.

If you omit the version parameter, `v=1` is used by default.  
버전 파라미터를 생략하면 기본값으로 `v=1`이 적용됩니다.

```markdown
[![solved.ac stats](https://solvedac-readme-stats.vercel.app/api?handle={username})](https://solved.ac/en/profile/{username})
```

Explicit `v=1` example.  
`v=1`을 명시적으로 적는 예시입니다.

```markdown
[![solved.ac stats](https://solvedac-readme-stats.vercel.app/api?handle={username}&v=1)](https://solved.ac/en/profile/{username})
```

### v2

Minimal border layout with the solved background area applied to the top section.  
상단 solved 배경 영역이 적용된 미니멀 보더 레이아웃입니다.

```markdown
[![solved.ac stats v2](https://solvedac-readme-stats.vercel.app/api?handle={username}&v=2)](https://solved.ac/en/profile/{username})
```

## Example URLs

Ready-to-test example URLs.  
바로 테스트해볼 수 있는 예시 URL입니다.

- `v=1`: `https://solvedac-readme-stats.vercel.app/api?handle=kookjd7759`
- `v=2`: `https://solvedac-readme-stats.vercel.app/api?handle=kookjd7759&v=2`

## Query Parameters

Available query parameters.  
사용 가능한 쿼리 파라미터입니다.

- `handle`: solved.ac handle  
  `handle`: solved.ac 핸들
- `v`: card version (`1` or `2`)  
  `v`: 카드 버전 (`1` 또는 `2`)
- `debug`: return JSON debug output with `1`, `true`, or `json`  
  `debug`: `1`, `true`, `json`일 때 JSON 디버그 정보를 반환

## Deploy Your Own

Fork this repository and deploy it to Vercel.  
이 저장소를 Fork한 뒤 Vercel에 배포해서 사용할 수 있습니다.

1. Fork this repository.  
   이 저장소를 Fork합니다.
2. Deploy it to Vercel.  
   Vercel에 배포합니다.
3. Use your own deployed `/api` endpoint in your README.  
   배포한 `/api` 엔드포인트를 README에 사용합니다.

## Development

Run the development server.  
개발 서버를 실행합니다.

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).  
그 다음 [http://localhost:3000](http://localhost:3000) 을 열어 확인하세요.

Example local test URLs.  
로컬 테스트용 예시 URL입니다.

- `http://localhost:3000/api?handle=kookjd7759`
- `http://localhost:3000/api?handle=kookjd7759&v=2`

## About solved.ac

solved.ac is a competitive programming profile service built around Baekjoon Online Judge (BOJ).  
solved.ac는 백준 온라인 저지(BOJ) 기반의 알고리즘 프로필 서비스입니다.

This project uses solved.ac public profile data to generate dynamic README cards.  
이 프로젝트는 solved.ac 공개 프로필 데이터를 사용해 동적 README 카드를 생성합니다.

## License

Distributed under the MIT License. See `LICENSE` for more information.  
MIT License로 배포되며, 자세한 내용은 `LICENSE`를 참고하세요.
