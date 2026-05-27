"use client";
import Y2KHeader from "@/components/Y2KHeader";
import { ReactNode } from 'react';

interface Y2KLayoutProps {
  currentPage?: string;
  children: ReactNode;
}

export default function Y2KLayout({ currentPage, children }: Y2KLayoutProps) {
  return (
    <div className="flex flex-col h-screen">
      <Y2KHeader currentPage={currentPage} />
      <div className="flex-1 y2k-content">
        {children}
      </div>
    </div>
  );
}
