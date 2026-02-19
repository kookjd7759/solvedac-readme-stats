
# 🚀 solvedac-readme-stats  
![Status](https://img.shields.io/badge/status-early%20access-orange)
![License](https://img.shields.io/badge/license-MIT-blue)
![Next.js](https://img.shields.io/badge/Next.js-13+-black)
![TypeScript](https://img.shields.io/badge/TypeScript-Ready-3178C6)
  
solved.ac 공개 API를 기반으로 GitHub README용 동적 SVG 통계 카드를 생성하는 프로젝트입니다.  
알고리즘 활동을 직관적으로 시각화하기 위한 확장형 카드 시스템을 목표로 개발 중입니다.  
  
📊 Display your solved.ac stats beautifully in your GitHub README  
Inspired by github-readme-stats, powered by the solved.ac API  
> ⚠️ This project is currently in early development (Demo / Experimental).
> Features and API may change.

[![Donggyun's solved ac stats](https://solvedac-readme-stats.vercel.app/api?handle=kookjd7759)](https://solved.ac/en/profile/kookjd7759)

## 📌 About This Project
solvedac-readme-stats is a dynamic GitHub README card generator  
that fetches real-time data from solved.ac and renders it as an SVG image.  

It allows developers to showcase their algorithm-solving achievements  
directly inside their GitHub profile.  

This project was built to create a customizable and aesthetic alternative to existing solved.ac badges.  

## 🛠 Usage  
Add this to your GitHub README:  
> Replace `{username}` with your solved.ac (BOJ) handle(ID).  

```markdown
[![Donggyun's solved ac stats](https://solvedac-readme-stats.vercel.app/api?handle={username})](https://github.com/kookjd7759/solvedac-readme-stats)
```
Example:
```markdown
[![Donggyun's solved ac stats](https://solvedac-readme-stats.vercel.app/api?handle=kookjd7759)](https://github.com/kookjd7759/solvedac-readme-stats)
```

## 🚀 Deploy Your Own  
- Fork  
- Deploy to Vercel  
- Use your own endpoint

## 🧠 About solved.ac  
solved.ac is a competitive programming profile service built on  
Baekjoon Online Judge (BOJ).  
  
It analyzes solved problems and assigns a tier rating (Bronze → Ruby)  
to measure problem-solving skills.  
  
This project uses the solved.ac public API to render those stats  
as dynamic SVG cards for GitHub READMEs.  
  
## 🧑‍💻 Development

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## 📄 License

Distributed under the MIT License.  
See `LICENSE` for more information.
