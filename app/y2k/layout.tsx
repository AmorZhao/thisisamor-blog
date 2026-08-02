"use client";
import { usePathname } from "next/navigation";
import { getCurrentPage } from "@/lib/currentPage";
import { ReactNode } from "react";
import Y2KFooter from '@/components/y2k/Y2KFooter';
import Y2KHeader from '@/components/y2k/Y2KHeader';

export default function Y2KGroupLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const currentPage = getCurrentPage(pathname, "/y2k");

  return (
    <div data-theme="y2k" className="min-h-screen flex justify-center items-center">
      <div className="w-full max-w-420  md:w-full lg:w-3/4 flex flex-col h-screen">
        <Y2KHeader currentPage={currentPage} />
        <div className="flex-1 y2k-content">
          {children}
        </div>
        <Y2KFooter />
      </div>
    </div>
  );
}
