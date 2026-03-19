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
      </head>
      <body>{children}</body>
    </html>
  );
}
