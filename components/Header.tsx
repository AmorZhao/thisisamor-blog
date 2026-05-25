"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { Menu, X } from "lucide-react"; 
import dynamic from "next/dynamic";
import '@fortawesome/fontawesome-free/css/all.min.css';

const ThemeToggle = dynamic(() => import("./ThemeToggle"), { ssr: false });

interface HeaderProps {
  currentPage?: string;
}

const Header = ({ currentPage }: HeaderProps) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const linkClasses = (page: string) =>
    `hover:underline ${currentPage === page ? "underline custom-blue" : ""}`;

return (
    <header className="flex justify-between items-center p-3 px-4 font-lora font-bold shadow-md">
      <nav className="hidden md:flex items-center gap-6 ml-4">
      <Link href="/" className={linkClasses("home")}>Home</Link>
      <Link href="/blog" className={linkClasses("blog")}>Blog</Link>
      <Link href="/album" className={linkClasses("album")}>Album</Link>
      <Link href="/archive" className={linkClasses("archive")}>Archive</Link>
      <Link href="/about" className={linkClasses("about")}>About</Link>
      </nav>

      <div className="hidden md:flex ml-auto space-x-4 mr-4">
      <ThemeToggle />
      </div>

      <Link href="/" className="flex items-center">
      <Image 
        src="/images/avatar.jpg" 
        alt="Profile"
        width={40}
        height={40}
        className="rounded-lg cursor-pointer"
        loading="eager"
        style={{ width: 40, height: 40 }}
      />
      </Link>

      <div className="md:hidden flex items-center space-x-2">
        <ThemeToggle />
        <button 
          className="p-2" 
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {menuOpen && (
      <header className="absolute top-16 left-0 w-full shadow-lg flex flex-col items-center p-4 md:hidden">
        <Link href="/" className="py-4 w-full text-center" onClick={() => setMenuOpen(false)}>Home</Link>
        <Link href="/blog" className="py-4 w-full text-center" onClick={() => setMenuOpen(false)}>Blog</Link>
        <Link href="/album" className="py-4 w-full text-center" onClick={() => setMenuOpen(false)}>Album</Link>
        <Link href="/archive" className="py-4 w-full text-center" onClick={() => setMenuOpen(false)}>Archive</Link>
        <Link href="/about" className="py-4 w-full text-center" onClick={() => setMenuOpen(false)}>About</Link>
        <div className="flex space-x-4 mt-4">
        <a href="https://github.com/AmorZhao" target="_blank" rel="noopener noreferrer" title="GitHub">
          <i className="fab fa-github"></i>
        </a>
        <a href="https://instagram.com/amor.zh39" target="_blank" rel="noopener noreferrer" title="Instagram">
          <i className="fab fa-instagram"></i>
        </a>
        <a href="mailto:amor_7303@163.com" target="_blank" rel="noopener noreferrer" title="Email">
          <i className="far fa-envelope"></i>
        </a>
        </div>
      </header>
      )}
    </header>
  );
};

export default Header;
