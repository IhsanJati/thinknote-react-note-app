import { useState } from "react";
import { Link } from "react-router-dom";
import { SignOutButton } from "./Buttons";
import { Menu, X, Archive, User as UserIcon } from "lucide-react";
import type { User } from "../types/types";

const AppNavbar = ({ user }: { user: User }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4 md:px-6 h-16 flex items-center justify-between">

        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-zinc-900 rounded-lg flex items-center justify-center text-white font-bold shadow-sm">
            T
          </div>
          <Link
            to="/"
            className="font-semibold text-lg tracking-tight text-zinc-900"
          >
            ThinkNote
          </Link>
        </div>
        <div className="hidden md:flex items-center gap-6">
          <Link
            className="text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors hover:underline underline-offset-4"
            to="/archived"
          >
            Archived
          </Link>
          <div className="flex items-center gap-3 pl-4 border-l border-zinc-200">
            <div className="text-right">
              <p className="text-sm font-medium leading-none text-zinc-900">
                {user.name}
              </p>
              <p className="text-xs text-zinc-500 mt-1">{user.email}</p>
            </div>
            <div className="h-9 w-9 rounded-full bg-zinc-100 border border-zinc-200 flex items-center justify-center overflow-hidden">
              <span className="font-medium text-zinc-600">
                {user.name ? user.name.charAt(0).toUpperCase() : "U"}
              </span>
            </div>
          </div>
          <SignOutButton />
        </div>
        <button
          className="md:hidden p-2 text-zinc-600 hover:bg-zinc-100 rounded-md transition-colors"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden border-t border-zinc-200 bg-white absolute w-full left-0 shadow-lg animate-in slide-in-from-top-2 duration-200">
          <div className="p-4 space-y-4">
            <div className="flex items-center gap-3 pb-4 border-b border-zinc-100">
              <div className="h-10 w-10 rounded-full bg-zinc-100 border border-zinc-200 flex items-center justify-center">
                <span className="font-bold text-zinc-700 text-lg">
                  {user.name ? user.name.charAt(0).toUpperCase() : "U"}
                </span>
              </div>
              <div>
                <p className="font-medium text-zinc-900">{user.name}</p>
                <p className="text-xs text-zinc-500">{user.email}</p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <Link
                to="/"
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-zinc-700 rounded-md hover:bg-zinc-100"
                onClick={() => setIsMenuOpen(false)}
              >
                <UserIcon className="w-4 h-4" />
                Dashboard
              </Link>
              <Link
                to="/archived"
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-zinc-700 rounded-md hover:bg-zinc-100"
                onClick={() => setIsMenuOpen(false)}
              >
                <Archive className="w-4 h-4" />
                Archived Notes
              </Link>
            </div>
            <div className="pt-2">
              <SignOutButton />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default AppNavbar;
