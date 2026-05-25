"use client";
import { useTheme } from "next-themes";
import ModernLayout from "./ModernLayout";
import Y2KLayout from "./Y2KLayout";
import React from 'react';

interface ThemeLayoutProps {
  currentPage?: string;
  children: React.ReactNode;
}

export default function ThemeLayout({ currentPage, children }: ThemeLayoutProps) {
  const { theme } = useTheme();

  if (theme?.includes("y2k")) {
    return <Y2KLayout currentPage={currentPage}>{children}</Y2KLayout>;
  }

  return <ModernLayout currentPage={currentPage}>{children}</ModernLayout>;
}
