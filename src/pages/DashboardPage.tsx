import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Search, Calendar, Loader2 } from "lucide-react";
import { getNotes } from "../lib/data";
import type { Note } from "../types/types";
import { formatDate } from "../lib/utils";
import { AddNoteButton } from "../components/Buttons";
import AppNavbar from "../components/AppNavbar";
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
  const { user } = useAuth();

  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setLoading(true);
        const response = await getNotes();
        setNotes(response.data);
      } catch (_err) {
        setError("Failed to fetch notes");
      } finally {
        setLoading(false);
      }
    };
    fetchNotes();
  }, []);

  if (!user) {
    return null;
  }

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.body.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-zinc-50 font-sans text-zinc-900 dark:bg-black dark:text-zinc-50 transition-colors duration-300">
      <AppNavbar user={user} />
      <main className="container mx-auto px-6 pb-8 pt-4">
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
              Welcome back, {user?.name}
            </h1>
            <p className="text-zinc-500 dark:text-zinc-400 transition-colors">
              {loading
                ? "Load note..."
                : `You have ${notes.length} active note.`}
            </p>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500 dark:text-zinc-400" />
              <input
                type="text"
                placeholder="Find note..."
                className="flex h-10 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 pl-9 text-sm outline-none transition-colors 
                focus-visible:ring-2 focus-visible:ring-zinc-950 
                dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-100 dark:focus-visible:ring-zinc-500 dark:placeholder-zinc-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <AddNoteButton />
          </div>
        </div>
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="h-10 w-10 animate-spin text-zinc-400 dark:text-zinc-600 mb-4" />
            <p className="text-zinc-500 dark:text-zinc-400">
              Load note data...
            </p>
          </div>
        ) : error ? (
          <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-900 text-red-600 dark:text-red-400 p-4 rounded-lg text-center transition-colors">
            <p>{error}</p>
          </div>
        ) : filteredNotes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredNotes.map((note) => (
              <div
                onClick={() => navigate(`/note/${note.id}`)}
                key={note.id}
                className="group relative rounded-xl border border-zinc-200 bg-white text-zinc-950 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col overflow-hidden h-62.5 cursor-pointer
                dark:bg-zinc-900 dark:border-zinc-800 dark:text-zinc-50 dark:hover:border-zinc-700"
              >
                <div className="p-6 flex flex-col h-full">
                  <h3 className="font-semibold leading-none tracking-tight mb-1 pb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-1">
                    {note.title}
                  </h3>

                  <p className="text-sm text-zinc-500 dark:text-zinc-400 line-clamp-4 mb-4 grow transition-colors">
                    {note.body}
                  </p>

                  <div className="flex items-center text-xs text-zinc-400 dark:text-zinc-500 mt-auto pt-4 border-t border-zinc-100 dark:border-zinc-800 transition-colors">
                    <Calendar className="mr-1 h-3 w-3" />
                    {formatDate(note.createdAt)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center border border-dashed border-zinc-300 dark:border-zinc-700 rounded-xl bg-zinc-50/50 dark:bg-zinc-900/50 transition-colors">
            <div className="bg-zinc-100 dark:bg-zinc-800 p-3 rounded-full mb-3 transition-colors">
              <Search className="h-6 w-6 text-zinc-400 dark:text-zinc-500" />
            </div>
            <h3 className="font-medium text-zinc-900 dark:text-zinc-100">
              No note found
            </h3>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm mt-1">
              {searchQuery ? "Try other keywords" : "Make your first note now!"}
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default DashboardPage;
