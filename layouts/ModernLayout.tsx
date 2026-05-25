"use client";
import Header from "@/components/Header";
import React from 'react';

interface ModernLayoutProps {
  currentPage?: string;
  children: React.ReactNode;
}

export default function ModernLayout({ currentPage, children }: ModernLayoutProps) {
  return (
    <div>
      <Header currentPage={currentPage} />
      <div className="flex flex-1">
        {children}
      </div>
    </div>
  );
}
