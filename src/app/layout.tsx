import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "solvedac-readme-stats",
  description: "Preview solved.ac README cards and export them as PNG.",
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
