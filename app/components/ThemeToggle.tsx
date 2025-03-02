"use client";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";


const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div>
      <button
        type="button"
        onClick={() => {setTheme(theme === "dark" ? "light" : "dark"); 
          console.log(theme);
        }}
        className="theme-toggle-button"
      >
        {theme === "dark" ? (
          <i className="fa-solid fa-moon"></i>
        ) : (
          <i className="fa-solid fa-sun"></i>
        )}
      </button>
    </div>
  );
};

export default ThemeToggle;
