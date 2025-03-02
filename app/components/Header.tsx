"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import DropdownMenu from "./DropdownMenu";
import { Menu, X } from "lucide-react"; 
import '@fortawesome/fontawesome-free/css/all.min.css';
import ThemeToggle from "./ThemeToggle";

interface HeaderProps {
  currentPage?: string;
}
const Header = ({ currentPage }: HeaderProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [blogDropdownOpen, setBlogDropdownOpen] = useState(false);

  const linkClasses = (page: string) =>
    `hover:underline ${currentPage === page ? "underline text-blue-300" : ""}`;

return (
    <header className="flex justify-between items-center p-3 px-4 font-lora font-bold shadow-md">
      <nav className="hidden md:flex items-center gap-6">
      <Link href="/" className={linkClasses("home")}>Home</Link>
      <DropdownMenu 
        title="Blog" 
        items={[
        { label: "Engineering", href: "/blog/engipost" },
        { label: "Life journal", href: "/blog/diary" },
        ]}
        currentPage={currentPage}
      />
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
      />
      </Link>

      <button 
      className="md:hidden p-2" 
      onClick={() => setMenuOpen(!menuOpen)}
      >
      {menuOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {menuOpen && (
      <div className="absolute top-16 left-0 w-full shadow-lg flex flex-col items-center p-4 md:hidden">
        <Link href="/" className="py-2" onClick={() => setMenuOpen(false)}>Home</Link>
        <div className="relative"></div>
        <Link href="/" className="py-2" onClick={() => setBlogDropdownOpen(!blogDropdownOpen)}>Blog</Link>
        {blogDropdownOpen && (
        <div className="w-full flex flex-col items-center p-4 text-sm font-light ">
          <Link href="/blog/engipost" className="py-2" onClick={() => setMenuOpen(false)}>Engineering</Link>
          <Link href="/blog/diary" className="py-2" onClick={() => setMenuOpen(false)}>Life journal</Link>
        </div>
        )}
        <Link href="/album" className="hover:underline">Album</Link>
        <Link href="/about" className="py-2" onClick={() => setMenuOpen(false)}>About</Link>
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
      </div>
      )}
    </header>
  );
};

export default Header;
