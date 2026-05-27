"use client";
import { useTheme } from "next-themes";
import {
  VisualStudioLighton,
  VisualStudioLightoff,
  WindowsMy,
} from 'react-old-icons';

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  if (!theme) {
    return null;
  }

  const isY2K = theme.includes("y2k");
  const isDark = theme.includes("dark");

  const toggleStyle = () => {
    switch (theme) {
      case "light-modern":
        return setTheme("light-y2k");
      case "dark-modern":
        return setTheme("dark-y2k");
      case "light-y2k":
        return setTheme("light-modern");
      case "dark-y2k":
        return setTheme("dark-modern");
      default:
        return setTheme("light-modern");
    }
  };

  const toggleDark = () => {
    switch (theme) {
      case "light-modern":
        return setTheme("dark-modern");
      case "dark-modern":
        return setTheme("light-modern");
      case "light-y2k":
        return setTheme("dark-y2k");
      case "dark-y2k":
        return setTheme("light-y2k");
      default:
        return setTheme("light-modern");
    }
  };

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
