import { Plus, LogOut } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

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
