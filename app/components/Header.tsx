import Link from "next/link";

const Header = () => {
  return (
    <header className="flex justify-between items-center p-4 font-lora-weight-bold font-weight-bold">
      <nav className="flex gap-4">
        <Link href="/">Home</Link>
        <Link href="/blog">Blog</Link>
        <Link href="/about">About</Link>
      </nav>
    </header>
  );
};

export default Header;