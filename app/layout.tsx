import type { Metadata } from "next";
import { Playfair_Display, DM_Sans } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  weight: ["400", "700", "900"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Todo App by CJI - Agentic AI Challenge",
  description: "A brutalist editorial todo application built with agentic AI workflow using Claude Code",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <script dangerouslySetInnerHTML={{__html: `
          (function() {
            try {
              const theme = localStorage.getItem('theme-preference') || 'dark';
              const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
              const resolved = theme === 'system' ? systemTheme : theme;
              if (resolved === 'dark') {
                document.documentElement.classList.add('dark');
              } else {
                document.documentElement.classList.remove('dark');
              }
            } catch (e) {
              document.documentElement.classList.add('dark');
            }
          })();
        `}} />
      </head>
      <body className={`${playfair.variable} ${dmSans.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
