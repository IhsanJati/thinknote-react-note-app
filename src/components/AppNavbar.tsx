import { useState } from "react";
import { Link } from "react-router-dom";
import { SignOutButton } from "./Buttons";
import { Menu, X, Archive, User as UserIcon } from "lucide-react";
import type { User } from "../types/types";
import { ThemeToggle } from "./ThemeToggle";

const AppNavbar = ({ user }: { user: User }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-950/80 backdrop-blur-md transition-colors duration-300">
      <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">
        {/* --- Logo Section --- */}
        <div className="flex items-center gap-2">
          {/* Logo Box: Hitam di Light, Putih di Dark agar kontras */}
          <div className="w-8 h-8 bg-zinc-900 dark:bg-zinc-50 rounded-lg flex items-center justify-center text-white dark:text-zinc-900 font-bold shadow-sm transition-colors">
            T
          </div>
          <Link
            to="/"
            className="font-semibold text-lg tracking-tight text-zinc-900 dark:text-zinc-50 transition-colors"
          >
            ThinkNote
          </Link>
        </div>

        {/* --- Desktop Menu --- */}
        <div className="hidden md:flex items-center gap-6">
          <Link
            className="text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50 transition-colors hover:underline underline-offset-4"
            to="/archived"
          >
            Archived
          </Link>

          <ThemeToggle />

          <div className="flex items-center gap-3 pl-4 border-l border-zinc-200 dark:border-zinc-800 transition-colors">
            <div className="text-right">
              <p className="text-sm font-medium leading-none text-zinc-900 dark:text-zinc-50 transition-colors">
                {user.name}
              </p>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1 transition-colors">
                {user.email}
              </p>
            </div>
            <div className="h-9 w-9 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center overflow-hidden transition-colors">
              <span className="font-medium text-zinc-600 dark:text-zinc-300">
                {user.name ? user.name.charAt(0).toUpperCase() : "U"}
              </span>
            </div>
          </div>
          <SignOutButton />
        </div>

        {/* --- Mobile Menu Button --- */}
        <button
          className="md:hidden p-2 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-md transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* --- Mobile Dropdown Menu --- */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-950 absolute w-full left-0 shadow-lg animate-in slide-in-from-top-2 duration-200">
          <div className="p-4 space-y-4">
            {/* User Info Mobile */}
            <div className="flex items-center gap-3 pb-4 border-b border-zinc-100 dark:border-zinc-800 transition-colors">
              <div className="h-10 w-10 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 flex items-center justify-center">
                <span className="font-bold text-zinc-700 dark:text-zinc-300 text-lg">
                  {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                </span>
              </div>
              <div>
                <p className="font-medium text-zinc-900 dark:text-zinc-50 transition-colors">
                  {user.name}
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 transition-colors">
                  {user.email}
                </p>
              </div>
            </div>

            {/* Navigation Links Mobile */}
            <div className="flex flex-col gap-2">
              <Link
                to="/"
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <UserIcon className="w-4 h-4" />
                Dashboard
              </Link>
              <Link
                to="/archived"
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-zinc-700 dark:text-zinc-300 rounded-md hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                <Archive className="w-4 h-4" />
                Archived Notes
              </Link>
            </div>

            {/* Actions Footer Mobile */}
            <div className="pt-2 px-3 flex justify-between items-center">
              <SignOutButton />
              <ThemeToggle />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default AppNavbar;
