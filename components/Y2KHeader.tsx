"use client";
import Link from "next/link";
import dynamic from "next/dynamic";
import '@fortawesome/fontawesome-free/css/all.min.css';

const ThemeToggle = dynamic(() => import("./ThemeToggle"), { ssr: false });

interface Y2KHeaderProps {
  currentPage?: string;
}

export default function Y2KHeader({ currentPage }: Y2KHeaderProps) {
  const linkClasses = (page: string) =>
    `y2k-nav-link ${currentPage === page ? "y2k-nav-link--active" : ""}`;

  return (
    <header className="y2k-header">
      <div className="y2k-title-bar">
        <span className="y2k-title-bar__title">Amor&apos;s Blog</span>
        <ThemeToggle />
      </div>

      <nav className="y2k-nav">
        <Link href="/"        className={linkClasses("home")}>Home</Link>
        <Link href="/blog"    className={linkClasses("blog")}>Blog</Link>
        <Link href="/album"   className={linkClasses("album")}>Album</Link>
        <Link href="/archive" className={linkClasses("archive")}>Archive</Link>
        <Link href="/about"   className={linkClasses("about")}>About</Link>
      </nav>
    </header>
  );
}
