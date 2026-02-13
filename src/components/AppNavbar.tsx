import { Link } from "react-router-dom";
import { SignOutButton } from "./Buttons";
import type { User } from "../types/types";

const AppNavbar = ({ user }: { user: User }) => {
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-zinc-900 rounded-lg flex items-center justify-center text-white font-bold">
            T
          </div>
          <Link to="/" className="font-semibold text-lg tracking-tight">
            ThinkNote
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <Link className="font-semibold hover:underline" to="/archived">
            Archived
          </Link>
          <div className="flex items-center gap-3 pl-4 border-zinc-200">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium leading-none">{user.name}</p>
              <p className="text-xs text-zinc-500 mt-1">{user.email}</p>
            </div>
            <div className="h-9 w-9 rounded-full bg-zinc-200 border border-zinc-300 flex items-center justify-center overflow-hidden">
              <span className="font-medium text-zinc-600">
                {user.name ? user.name.charAt(0).toUpperCase() : "U"}
              </span>
            </div>
          </div>
          <SignOutButton />
        </div>
      </div>
    </nav>
  );
};

export default AppNavbar;
