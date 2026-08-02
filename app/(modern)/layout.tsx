"use client";
import { usePathname } from "next/navigation";
import { getCurrentPage } from "@/lib/currentPage";
import { ReactNode } from "react";
import Header from '@/components/modern/Header';
import Footer from '@/components/modern/Footer';

export default function ModernGroupLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const currentPage = getCurrentPage(pathname);

  return (
    <div data-theme="modern" className="min-h-screen flex justify-center items-center">
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
