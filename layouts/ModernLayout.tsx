"use client";
import Header from "@/components/Header";
import { ReactNode } from 'react';
import Footer from '@/components/Footer';

interface ModernLayoutProps {
  currentPage: string;
  children: ReactNode;
}

export default function ModernLayout({ currentPage, children }: ModernLayoutProps) {
  return (
    <div className="flex justify-center items-center">
      <div className="w-full max-w-225  md:w-full lg:w-2/3 flex flex-col mb-auto content-wrap h-screen">
        <Header currentPage={currentPage} />
        <div className="flex flex-1">
          {children}
        </div>
        <Footer />
      </div>
    </div>
  );
}
