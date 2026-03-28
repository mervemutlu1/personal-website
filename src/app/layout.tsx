import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Merve — Notes, thoughts & things I'm figuring out.",
  description: "A personal digital garden by Merve. Product designer, AI explorer, vibe coder.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.cdnfonts.com" />
        <link href="https://fonts.cdnfonts.com/css/w95fa" rel="stylesheet" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;1,400&family=IBM+Plex+Mono:wght@400&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  );
}
