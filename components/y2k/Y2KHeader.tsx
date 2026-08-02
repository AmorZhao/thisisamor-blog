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

const ThemeToggle = dynamic(() => import("../ThemeToggle"), { ssr: false });

interface Y2KHeaderProps {
  currentPage?: string;
}

const buttonBase = [
  "flex flex-col items-center justify-center",
  "min-w-14 px-2 py-1 gap-1",
  "bg-win95-face text-black no-underline select-none",
  "border-t-2 border-l-2 border-b-2 border-r-2",
  "border-t-white border-l-white border-b-win95-shadow-dark border-r-win95-shadow-dark",
  "shadow-[inset_1px_1px_0_var(--color-win95-highlight),inset_-1px_-1px_0_var(--color-win95-shadow)]",
].join(" ");

const buttonActive = [
  "flex flex-col items-center justify-center",
  "min-w-14 pt-[6px] pr-[7px] pb-1 pl-[9px] gap-1",
  "bg-win95-face text-black no-underline select-none",
  "border-t-2 border-l-2 border-b-2 border-r-2",
  "border-t-win95-shadow-dark border-l-win95-shadow-dark border-b-white border-r-white",
  "shadow-[inset_1px_1px_0_var(--color-win95-shadow),inset_-1px_-1px_0_var(--color-win95-highlight)]",
].join(" ");

export default function Y2KHeader({ currentPage }: Y2KHeaderProps) {
  const getButtonClassName = (page: string) => currentPage === page ? buttonActive : buttonBase;

  return (
    <header
      className={[
        "p-1 border-b-2",
        "border-b-win95-shadow-dark",
        "shadow-[inset_1px_1px_0_var(--color-win95-highlight),inset_-1px_-1px_0_var(--color-win95-shadow)]",
        "dark:bg-y2k-dark-bg dark:border-b-y2k-dark-cyan",
        "dark:shadow-[inset_1px_1px_0_var(--color-y2k-dark-panel),inset_-1px_-1px_0_var(--color-black),0_0_6px_#00e5ff40]",
      ].join(" ")}
    >
      <div className="flex items-center">
        <nav className="flex flex-row gap-0.5 px-1.5 py-1 ml-4">
          <Link href="/y2k" className={getButtonClassName("home")}>
            <WindowsXPNetworkSetupWizard size={20} />
            <span className="text-[0.6rem] leading-none text-center">Home</span>
          </Link>
          <Link href="/y2k/blog" className={getButtonClassName("blog")}>
            <Windows95TextFile size={20} />
            <span className="text-[0.6rem] leading-none text-center">Blog</span>
          </Link>
          <Link href="/y2k/album" className={getButtonClassName("album")}>
            <WindowsSticpl1 size={20} />
            <span className="text-[0.6rem] leading-none text-center">Album</span>
          </Link>
          <Link href="/y2k/archive" className={getButtonClassName("archive")}>
            <WindowsFile size={20} />
            <span className="text-[0.6rem] leading-none text-center">Archive</span>
          </Link>
          <Link href="/y2k/about" className={getButtonClassName("about")}>
            <Icons1400 size={20} />
            <span className="text-[0.6rem] leading-none text-center">
              About</span>
          </Link>
        </nav>
        <div className="ml-auto mr-4">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
