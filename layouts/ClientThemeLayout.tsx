"use client";
import dynamic from "next/dynamic";
import type { ReactNode } from "react";

const ThemeLayout = dynamic(() => import("./ThemeLayout"), { ssr: false });

interface ClientThemeLayoutProps {
  currentPage?: string;
  children: ReactNode;
}

export default function ClientThemeLayout({ currentPage, children }: ClientThemeLayoutProps) {
  return <ThemeLayout currentPage={currentPage}>{children}</ThemeLayout>;
}
