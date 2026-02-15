import { Plus, LogOut, Trash2, Archive } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import type { MouseEventHandler } from "react";

export const AddNoteButton = ({ label }: { label: string }) => {
  return (
    <Link
      to="/create"
      className="
        inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-4 py-2 transition-colors
        bg-zinc-900 text-zinc-50 hover:bg-zinc-900/90
        dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200
      "
    >
      <Plus className="mr-2 h-4 w-4" />
      {label}
    </Link>
  );
};

export const DeleteNoteButton = ({
  onClickHandler,
  title,
}: {
  onClickHandler: MouseEventHandler<HTMLButtonElement>;
  title: string;
}) => {
  return (
    <button
      onClick={onClickHandler}
      className="
        p-2 rounded-md transition-colors cursor-pointer
        text-red-500 hover:bg-red-50 hover:text-red-600
        dark:text-red-400 dark:hover:bg-red-900/20 dark:hover:text-red-300
      "
      title={title}
    >
      <Trash2 className="h-5 w-5" />
    </button>
  );
};

export const ArchiveNoteButton = ({
  onClickHandler,
  title,
}: {
  onClickHandler: MouseEventHandler<HTMLButtonElement>;
  title: string;
}) => {
  return (
    <button
      onClick={onClickHandler}
      className="
        p-2 rounded-md transition-colors cursor-pointer
        text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900
        dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-50
      "
      title={title}
    >
      <Archive className="h-5 w-5" />
    </button>
  );
};

export const SignOutButton = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const onClickHandler = () => {
    logout();
    navigate("/login");
  };

  return (
    <button
      onClick={onClickHandler}
      className="
        inline-flex items-center justify-center rounded-md text-sm font-medium h-10 px-4 py-2 cursor-pointer transition-colors
        bg-zinc-900 text-zinc-50 hover:bg-zinc-900/90
        dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200
      "
    >
      Sign Out
      <LogOut className="ml-2 h-4 w-4" />
    </button>
  );
};
