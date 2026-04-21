# solvedac-readme-stats

GitHub README에 바로 넣을 수 있는 `solved.ac` 프로필 SVG 카드를 만드는 프로젝트입니다.  
실시간 카드 생성기와, 백준 플래티넘 V 이상 저장본만으로 동작하는 아카이브 생성기를 함께 제공합니다.

## 바로가기

- 실시간 웹 스튜디오: [https://kookjd7759.github.io/solvedac-readme-stats/](https://kookjd7759.github.io/solvedac-readme-stats/)
- 플래티넘 아카이브 스튜디오: [https://kookjd7759.github.io/solvedac-readme-stats/platinum-snapshot/](https://kookjd7759.github.io/solvedac-readme-stats/platinum-snapshot/)
- API 기본 주소: `https://solvedac-readme-stats.vercel.app/api`

<img width="100%" align="center" alt="top" src="https://github.com/user-attachments/assets/4cdd7abc-70dd-4506-b4f4-b969cf010eef" />
<img width="100%" align="center" alt="rank_1" src="https://github.com/user-attachments/assets/f9b62a2a-8f5c-4657-b921-7c0ab7cfed85" />
<img width="100%" align="center" alt="rank_2" src="https://github.com/user-attachments/assets/19b6af9d-8f28-48b7-9ada-773b8cda067e" />

## 무엇을 할 수 있나요?

- `solved.ac` 핸들만 넣고 카드 미리보기를 바로 확인할 수 있습니다.
- `v1`, `v2` 두 가지 카드 버전을 지원합니다.
- `streak=true` 옵션으로 최대 연속 풀이와 최근 1년 잔디 섹션을 추가할 수 있습니다.
- 웹 스튜디오에서 API 주소와 README용 마크다운을 바로 복사할 수 있습니다.
- 플래티넘 아카이브 스튜디오는 `2026-04-21 09:00 KST` 기준 백준 플래티넘 V 이상 저장본만으로 독립형 SVG를 만듭니다.

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

## 기본 사용법

README에 가장 간단하게 넣으려면 아래처럼 사용하면 됩니다.

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

## 쿼리 파라미터

- `handle`: solved.ac 핸들
- `v`: 카드 버전, `1` 또는 `2`
- `streak`: `true`이면 최대 연속 풀이와 최근 1년 잔디 섹션을 추가
- `download`: `1`, `true`, `yes` 중 하나면 SVG를 첨부 파일로 응답
- `debug`: `1`, `true`, `json` 중 하나면 디버그 JSON 응답

## 웹 스튜디오

GitHub Pages의 실시간 웹 스튜디오는 배포된 Vercel API를 호출해 카드를 미리보고 SVG를 저장하는 용도입니다.

- 핸들 입력
- 카드 버전 선택
- `streak` 옵션 토글
- 미리보기 확인
- API 주소 복사 / README 코드 복사 / SVG 다운로드

## 플래티넘 아카이브 스튜디오

플래티넘 아카이브 스튜디오는 실시간 프로필 요청이 어려워진 이후를 대비한 페이지입니다.

- 기준 시점: `2026-04-21 09:00 KST`
- 대상 범위: **백준 플래티넘 V 이상**
- 동작 방식: 저장된 JSON과 저장된 이미지 자산을 이용해 브라우저 안에서 독립형 SVG 생성
- 특징: solved.ac / BOJ 라이브 프로필 API를 직접 호출하지 않음

## GitHub Pages 구성

- 메인 Pages 앱: [`docs/`](./docs)
- 플래티넘 아카이브 앱: [`docs/platinum-snapshot/`](./docs/platinum-snapshot)
- Pages 배포 워크플로: [`.github/workflows/deploy-pages.yml`](./.github/workflows/deploy-pages.yml)

## 직접 배포하기

1. 이 저장소를 포크합니다.
2. Next.js 앱을 Vercel에 배포합니다.
3. GitHub Pages를 GitHub Actions 기반으로 활성화합니다.
4. 필요하면 자신의 `/api` 주소를 기준으로 웹 스튜디오를 연결합니다.

## 개발

개발 서버 실행:

```bash
npm run dev
```

실행 후 확인할 주소:

- `http://localhost:3000/`
- `http://localhost:3000/api?handle={handle}&v=1`
- `http://localhost:3000/api?handle={handle}&v=2`
- `http://localhost:3000/api?handle={handle}&v=2&streak=true`

## solved.ac / 백준

`solved.ac`는 백준 온라인 저지(BOJ) 기록을 바탕으로 한 프로필 서비스입니다.  
이 프로젝트는 공개 프로필 데이터를 이용해 GitHub README용 동적 카드를 생성합니다.

## 라이선스

MIT License를 따릅니다. 자세한 내용은 [`LICENSE`](./LICENSE)를 확인해 주세요.
