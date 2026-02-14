import { Moon, Sun } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

export const ThemeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="
        p-2 rounded-full transition-all duration-300
        bg-gray-200 hover:bg-gray-300 text-gray-800
        dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-yellow-400
        cursor-pointer border border-transparent dark:border-slate-600
      "
      aria-label="Toggle Theme"
      title={theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
    >
      {theme === "light" ? (
        <Moon
          size={20}
          className="transition-transform duration-300 hover:rotate-12"
        />
      ) : (
        <Sun
          size={20}
          className="transition-transform duration-300 hover:rotate-90"
        />
      )}
    </button>
  );
};
