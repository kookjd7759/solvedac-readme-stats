# solvedac-readme-stats

![Status](https://img.shields.io/badge/status-early%20access-orange)
![License](https://img.shields.io/badge/license-MIT-blue)
![Next.js](https://img.shields.io/badge/Next.js-16-black)
![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178C6)

Dynamic SVG solved.ac stat cards for GitHub README profiles.

This project fetches public solved.ac profile data and renders it as an image that can be embedded directly into a GitHub README.

[![Donggyun's solved.ac stats](https://solvedac-readme-stats.vercel.app/api?handle=kookjd7759)](https://solved.ac/en/profile/kookjd7759)

## Usage

Replace `{username}` with your solved.ac handle.

```markdown
[![solved.ac stats](https://solvedac-readme-stats.vercel.app/api?handle={username})](https://solved.ac/en/profile/{username})
```

## Card Versions

### v1

Classic layout.

If you omit the version parameter, `v=1` is used by default.

```markdown
[![solved.ac stats](https://solvedac-readme-stats.vercel.app/api?handle={username})](https://solved.ac/en/profile/{username})
```

Explicit `v=1` example:

```markdown
[![solved.ac stats](https://solvedac-readme-stats.vercel.app/api?handle={username}&v=1)](https://solved.ac/en/profile/{username})
```

### v2

Minimal border layout with the solved background area applied to the top section.

```markdown
[![solved.ac stats v2](https://solvedac-readme-stats.vercel.app/api?handle={username}&v=2)](https://solved.ac/en/profile/{username})
```

## Example URLs

- `v=1`: `https://solvedac-readme-stats.vercel.app/api?handle=kookjd7759`
- `v=2`: `https://solvedac-readme-stats.vercel.app/api?handle=kookjd7759&v=2`

## Query Parameters

- `handle`: solved.ac handle
- `v`: card version (`1` or `2`)
- `debug`: return JSON debug output with `1`, `true`, or `json`

## Deploy Your Own

1. Fork this repository.
2. Deploy it to Vercel.
3. Use your own deployed `/api` endpoint in your README.

## Development

Run the development server:

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

Example local test URLs:

- `http://localhost:3000/api?handle=kookjd7759`
- `http://localhost:3000/api?handle=kookjd7759&v=2`

## About solved.ac

solved.ac is a competitive programming profile service built around Baekjoon Online Judge (BOJ).

This project uses solved.ac public profile data to generate dynamic README cards.

## License

Distributed under the MIT License. See `LICENSE` for more information.
