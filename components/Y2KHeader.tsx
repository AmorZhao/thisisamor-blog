"use client";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  Icons1400,
  Windows95TextFile,
  WindowsFile,
  WindowsSticpl1,
  WindowsXPNetworkSetupWizard,
} from 'react-old-icons';

const ThemeToggle = dynamic(() => import("./ThemeToggle"), { ssr: false });

interface Y2KHeaderProps {
  currentPage?: string;
}

const btnBase = [
  "flex flex-col items-center justify-center",
  "min-w-14 px-2 py-[5px] gap-1",
  "bg-[#c0c0c0] text-black no-underline select-none",
  "border-t-2 border-l-2 border-b-2 border-r-2",
  "border-t-white border-l-white border-b-[#404040] border-r-[#404040]",
  "shadow-[inset_1px_1px_0_#dfdfdf,inset_-1px_-1px_0_#808080]",
].join(" ");

const btnActive = [
  "flex flex-col items-center justify-center",
  "min-w-14 pt-[6px] pr-[7px] pb-1 pl-[9px] gap-1",
  "bg-[#c0c0c0] text-black no-underline select-none",
  "border-t-2 border-l-2 border-b-2 border-r-2",
  "border-t-[#404040] border-l-[#404040] border-b-white border-r-white",
  "shadow-[inset_1px_1px_0_#808080,inset_-1px_-1px_0_#dfdfdf]",
].join(" ");

export default function Y2KHeader({ currentPage }: Y2KHeaderProps) {
  const btn = (page: string) => currentPage === page ? btnActive : btnBase;

  return (
    <header className="bg-[#c0c0c0] border-b-2 border-b-[#808080] p-0">
      <div className="flex items-center justify-between bg-[#000080] text-white px-1.5 py-0.5 text-[0.7rem]">
        <span className="font-bold tracking-[0.05em]">thisisamor.blog</span>
      </div>
      <div className="flex items-center">
        <nav className="flex flex-row gap-0.5 px-[6px] py-1">
          <Link href="/" className={btn("home")}>
            <WindowsXPNetworkSetupWizard size={20} />
            <span className="text-[0.6rem] leading-none text-center">Home</span>
          </Link>
          <Link href="/blog" className={btn("blog")}>
            <Windows95TextFile size={20} />
            <span className="text-[0.6rem] leading-none text-center">Blog</span>
          </Link>
          <Link href="/album" className={btn("album")}>
            <WindowsSticpl1 size={20} />
            <span className="text-[0.6rem] leading-none text-center">Album</span>
          </Link>
          <Link href="/archive" className={btn("archive")}>
            <WindowsFile size={20} />
            <span className="text-[0.6rem] leading-none text-center">Archive</span>
          </Link>
          <Link href="/about" className={btn("about")}>
            <Icons1400 size={20} />
            <span className="text-[0.6rem] leading-none text-center">About</span>
          </Link>
        </nav>
        <ThemeToggle />
      </div>
    </header>
  );
}
