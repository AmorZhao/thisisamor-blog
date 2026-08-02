"use client";
import { useRouter, usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import {
  VisualStudioLighton,
  VisualStudioLightoff,
  WindowsMy,
} from 'react-old-icons';

const Y2K_PREFIX = "/y2k";

function toggleY2KPath(pathname: string): string {
  if (pathname === Y2K_PREFIX || pathname.startsWith(`${Y2K_PREFIX}/`)) {
    const rest = pathname.slice(Y2K_PREFIX.length);
    return rest === "" ? "/" : rest;
  }
  return pathname === "/" ? Y2K_PREFIX : `${Y2K_PREFIX}${pathname}`;
}

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const router = useRouter();

  if (!theme) {
    return null;
  }

  const isY2K = pathname.startsWith(Y2K_PREFIX);
  const isDark = theme === "dark";

  const toggleStyle = () => router.push(toggleY2KPath(pathname));
  const toggleDark = () => setTheme(isDark ? "light" : "dark");

  if (!isY2K) {
    return (
      <div className="flex items-center gap-2">
        <button type="button" onClick={toggleStyle} className="theme-toggle-button">
          <i className="fa-solid fa-computer" />
        </button>
        <button type="button" onClick={toggleDark} className="theme-toggle-button">
          { isDark
            ? <i className="fa-solid fa-moon" />
            : <i className="fa-solid fa-sun" />
          }
        </button>
      </div>
    )
  }

  return (
    <div className="flex items-center gap-2">
      <button type="button" onClick={toggleStyle} className="theme-toggle-button">
        <WindowsMy size={20} />
      </button>
      <button type="button" onClick={toggleDark} className="theme-toggle-button">
        { isDark
          ? <VisualStudioLightoff size={20} />
          : <VisualStudioLighton size={20} />
        }
      </button>
    </div>
  );
};

export default ThemeToggle;
