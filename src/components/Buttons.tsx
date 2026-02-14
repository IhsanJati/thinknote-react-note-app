import { Plus, LogOut, Trash2, Archive } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import type { MouseEventHandler } from "react";

export const AddNoteButton = () => {
  return (
    <Link
      to="/create"
      className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-zinc-900 text-zinc-50 hover:bg-zinc-900/90 h-10 px-4 py-2"
    >
      <Plus className="mr-2 h-4 w-4" />
      Add
    </Link>
  );
};

export const DeleteNoteButton = ({
  onClickHandler,
}: {
  onClickHandler: MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <button
      onClick={onClickHandler}
      className="p-2 text-red-400 hover:bg-red-50 hover:text-red-600 rounded-md transition-colors cursor-pointer"
      title="Delete"
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
      className="p-2 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 rounded-md transition-colors cursor-pointer"
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
      className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-zinc-900 text-zinc-50 hover:bg-zinc-900/90 h-10 px-4 py-2 cursor-pointer"
    >
      Sign Out
      <LogOut className="ml-2 h-4 w-4" />
    </button>
  );
};
