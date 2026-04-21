# solvedac-readme-stats  

<p align="center">
  GitHub README에 바로 넣을 수 있는 <code>solved.ac</code> 프로필 SVG 카드를 만들고,<br />
  실시간 생성기와 정적 기록 보관소까지 함께 제공하는 프로젝트입니다.
</p>

<p align="center">
  <a href="https://kookjd7759.github.io/solvedac-readme-stats/">실시간 웹 스튜디오</a>
  ·
  <a href="https://kookjd7759.github.io/solvedac-readme-stats/platinum-snapshot/">플래티넘 기록 보관소</a>
  ·
  <a href="https://solvedac-readme-stats.vercel.app/api">Vercel API</a>
</p>

<img width="100%" align="center" alt="top" src="https://github.com/user-attachments/assets/785e8cb0-113b-4933-8f16-d563a2205129" />
<img width="100%" align="center" alt="rank_1" src="https://github.com/user-attachments/assets/cc3035f3-36fa-4b0f-b8e0-f8f91247a759" />
<img width="100%" align="center" alt="rank_2" src="https://github.com/user-attachments/assets/4cfa7a00-685f-4346-85af-adba0c39fe30" />

## 1. README 프로젝트

이 프로젝트의 시작점은 아주 분명합니다.  
`solved.ac` 핸들만 넣으면 GitHub README에 붙일 수 있는 SVG 카드를 만들고, 웹에서 미리보면서 바로 써먹을 수 있게 하는 것입니다.

- `v1`, `v2` 두 가지 카드 버전을 지원합니다.
- `streak=true` 옵션으로 최대 연속 풀이와 최근 1년 잔디를 카드에 넣을 수 있습니다.
- 웹 스튜디오에서 API 주소 복사, README 마크다운 복사, SVG 다운로드까지 한 번에 처리할 수 있습니다.

| 항목 | 주소 | 설명 |
| --- | --- | --- |
| 실시간 웹 스튜디오 | [kookjd7759.github.io/solvedac-readme-stats](https://kookjd7759.github.io/solvedac-readme-stats/) | 핸들을 넣고 바로 카드 미리보기 |
| API | `https://solvedac-readme-stats.vercel.app/api` | README용 SVG 응답 |
| Pages 메인 앱 | `docs/` | GitHub Pages에서 배포되는 실시간 화면 |

가장 기본적인 사용 예시는 아래와 같습니다.

```markdown
![solved.ac 카드](https://solvedac-readme-stats.vercel.app/api?handle={handle})
```

버전을 지정하고 싶다면:

```markdown
![solved.ac 카드](https://solvedac-readme-stats.vercel.app/api?handle={handle}&v=2)
```

연속 풀이 섹션까지 포함하고 싶다면:

```markdown
![solved.ac 카드](https://solvedac-readme-stats.vercel.app/api?handle={handle}&v=2&streak=true)
```

## 2. 다운로드 가능한 SVG로 확장

이제 이 프로젝트는 단순히 “README에 링크로 넣는 카드”에서 끝나지 않습니다.  
실시간 웹 스튜디오와 API 모두 **다운로드 가능한 SVG**를 기준으로 사용할 수 있게 구성되어 있습니다.

- 웹 스튜디오에서 미리본 카드를 바로 SVG로 저장할 수 있습니다.
- API에 `download=1`을 주면 첨부 파일처럼 내려받는 응답으로 바뀝니다.
- 즉, README 삽입용 링크와 별개로 “파일로 보관하는 카드”도 함께 다룰 수 있습니다.

| 방식 | 예시 | 용도 |
| --- | --- | --- |
| 웹에서 다운로드 | 실시간 스튜디오의 `SVG 다운로드` 버튼 | 즉시 저장 |
| API 다운로드 | `https://solvedac-readme-stats.vercel.app/api?handle={handle}&v=2&download=1` | 직접 파일 받기 |
| README 삽입 | `![card](.../api?handle={handle})` | README에 바로 표시 |

다운로드 응답 예시는 아래처럼 사용할 수 있습니다.

```text
https://solvedac-readme-stats.vercel.app/api?handle={handle}&v=2&download=1
```

지원하는 주요 쿼리 파라미터:

- `handle`: solved.ac 핸들
- `v`: 카드 버전, `1` 또는 `2`
- `streak`: `true`이면 연속 풀이 섹션 추가
- `download`: `1`, `true`, `yes` 중 하나면 SVG 파일 다운로드 응답
- `debug`: `1`, `true`, `json` 중 하나면 디버그 JSON 응답

## 3. 백준 플래티넘 V 이상 기록 보관소

실시간 요청이 어려워지는 이후까지 생각해서, 이 프로젝트에는 별도의 정적 보관소도 함께 들어 있습니다.  
여기는 **백준 플래티넘 V 이상 유저 저장본**만 대상으로, 실시간 요청 없이도 카드와 랭크를 다시 열람할 수 있도록 만든 아카이브입니다.

- 기준 시점: `2026-04-21 09:00 KST`
- 대상 범위: **백준 플래티넘 V 이상**
- 동작 방식: 저장된 JSON + 저장된 이미지 자산만 사용
- 특징: 실시간 solved.ac / BOJ 프로필 API를 직접 호출하지 않음
- 추가 기능: 순위별 열람, 상위권 빠른 이동, 선택한 유저 카드 즉시 SVG 다운로드

| 항목 | 주소 | 설명 |
| --- | --- | --- |
| 플래티넘 기록 보관소 | [kookjd7759.github.io/solvedac-readme-stats/platinum-snapshot](https://kookjd7759.github.io/solvedac-readme-stats/platinum-snapshot/) | 정적 저장본 기반 아카이브 |
| Pages 아카이브 앱 | `docs/platinum-snapshot/` | 순위 보관소 + 카드 생성 |
| 스냅샷 데이터 | `docs/platinum-snapshot/user_data.js` | 브라우저에서 직접 쓰는 저장본 |

이 보관소는 “상위권부터 순위별로 쭉 열람하고, 그 시점의 카드를 다시 SVG로 내려받는 화면”까지 포함합니다.

<p align="center">
  <img width="90%" alt="플래티넘 기록 보관소 미리보기" src="https://github.com/user-attachments/assets/f9b62a2a-8f5c-4657-b921-7c0ab7cfed85" />
</p>

## 카드 예시

<table>
  <tr>
    <td align="center" width="50%"><strong>v1 / streak 없음</strong></td>
    <td align="center" width="50%"><strong>v1 / streak 포함</strong></td>
  </tr>
  <tr>
    <td align="center" width="50%">
      <img src="https://github.com/kookjd7759/solvedac-readme-stats/blob/main/svg/solvedac-kookjd7759-v1.svg" alt="v1 카드 예시" />
    </td>
    <td align="center" width="50%">
      <img src="https://github.com/kookjd7759/solvedac-readme-stats/blob/main/svg/solvedac-kookjd7759-v1_streak.svg" alt="v1 streak 카드 예시" />
    </td>
  </tr>
  <tr>
    <td align="center" width="50%"><strong>v2 / streak 없음</strong></td>
    <td align="center" width="50%"><strong>v2 / streak 포함</strong></td>
  </tr>
  <tr>
    <td align="center" width="50%">
      <img src="https://github.com/kookjd7759/solvedac-readme-stats/blob/main/svg/solvedac-kookjd7759-v2.svg" alt="v2 카드 예시" />
    </td>
    <td align="center" width="50%">
      <img src="https://github.com/kookjd7759/solvedac-readme-stats/blob/main/svg/solvedac-kookjd7759-v2_streak.svg" alt="v2 streak 카드 예시" />
    </td>
  </tr>
</table>

## 실시간 스튜디오와 기록 보관소 차이

| 구분 | 실시간 스튜디오 | 플래티넘 기록 보관소 |
| --- | --- | --- |
| 데이터 원천 | 실시간 API | 저장된 스냅샷 |
| 대상 | 일반 solved.ac 핸들 | 백준 플래티넘 V 이상 저장본 |
| 랭크 열람 | 없음 | 있음 |
| 다운로드 | 가능 | 가능 |
| 실시간 의존성 | 있음 | 없음 |

## 개발과 배포

개발 서버 실행:

```bash
npm run dev
```

주요 경로:

- Next.js 앱: `src/`
- 실시간 Pages 화면: `docs/`
- 플래티넘 기록 보관소: `docs/platinum-snapshot/`
- Pages 배포 워크플로: `.github/workflows/deploy-pages.yml`

로컬에서 확인할 수 있는 예시:

- `http://localhost:3000/`
- `http://localhost:3000/api?handle={handle}&v=1`
- `http://localhost:3000/api?handle={handle}&v=2`
- `http://localhost:3000/api?handle={handle}&v=2&streak=true`

## 라이선스

MIT License를 따릅니다. 자세한 내용은 [`LICENSE`](./LICENSE)를 확인해 주세요.
