import { Plus } from "lucide-react";
import { Link } from "react-router-dom";

export const AddNoteButton = () => {
  return (
    <Link to="/create" className="inline-flex items-center justify-center rounded-md text-sm font-medium bg-zinc-900 text-zinc-50 hover:bg-zinc-900/90 h-10 px-4 py-2">
      <Plus className="mr-2 h-4 w-4" />
      Add
    </Link>
  );
};
