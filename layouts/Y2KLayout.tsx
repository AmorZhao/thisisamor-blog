"use client";
import Y2KHeader from "@/components/Y2KHeader";

interface Y2KLayoutProps {
  currentPage?: string;
  children: React.ReactNode;
}

export default function Y2KLayout({ currentPage, children }: Y2KLayoutProps) {
  return (
    <div>
      <Y2KHeader currentPage={currentPage} />

      <div>
        {children}
      </div>
    </div>
  );
}
