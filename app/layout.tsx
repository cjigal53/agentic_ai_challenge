import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Todo App - Agentic AI Challenge",
  description: "A modern todo application built with agentic AI workflow using Claude Code",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script dangerouslySetInnerHTML={{__html: `
          (function() {
            try {
              const theme = localStorage.getItem('theme-preference') || 'system';
              const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
              const resolved = theme === 'system' ? systemTheme : theme;
              if (resolved === 'dark') {
                document.documentElement.classList.add('dark');
              }
            } catch (e) {}
          })();
        `}} />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
