import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "solved.ac README 카드 스튜디오",
  description: "solved.ac README 카드를 미리보고 SVG로 저장할 수 있는 웹 스튜디오입니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="antialiased">{children}</body>
    </html>
  );
}
