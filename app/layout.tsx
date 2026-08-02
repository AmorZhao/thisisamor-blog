import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import "@/styles/globals.css";
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: {
    template: "%s | Amor's Blog",
    default: "Amor's Blog",
  },
  description: "Amor's personal blog",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel='shortcut icon' type='image/x-icon' href='icons/A.jfif' />
      </head>
      <body >
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="light"
          themes={["light", "dark"]}
          storageKey="site-theme"
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}