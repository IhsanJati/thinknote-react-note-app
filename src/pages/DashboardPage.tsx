import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Search, MoreVertical, Calendar, Loader2 } from "lucide-react";
import { getNotes } from "../lib/data";
import type { Note } from "../types/types";
import { formatDate } from "../lib/utils";
import { AddNoteButton } from "../components/Buttons";
import AppNavbar from "../components/AppNavbar";

const DashboardPage = () => {
  const { user } = useAuth();

  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

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
    return;
  }

  const filteredNotes = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.body.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-zinc-50 font-sans text-zinc-900">
      <AppNavbar user={user} />

      <main className="container mx-auto px-6 pb-8 pt-4">
        <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-zinc-900">
              Welcome back, {user?.name}
            </h1>
            <p className="text-zinc-500">
              {loading
                ? "Memuat catatan..."
                : `Anda memiliki ${notes.length} catatan aktif.`}
            </p>
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-500" />
              <input
                type="text"
                placeholder="Cari catatan..."
                className="flex h-10 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 pl-9 text-sm focus-visible:ring-2 focus-visible:ring-zinc-950 outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <AddNoteButton />
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <Loader2 className="h-10 w-10 animate-spin text-zinc-400 mb-4" />
            <p className="text-zinc-500">Sedang mengambil data...</p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-lg text-center">
            <p>{error}</p>
          </div>
        ) : filteredNotes.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredNotes.map((note) => (
              <div
                key={note.id}
                className="group relative rounded-xl border border-zinc-200 bg-white text-zinc-950 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col overflow-hidden h-62.5"
              >
                <div className="p-6 flex flex-col h-full">
                  <div className="flex justify-end mb-2">
                    <button className="text-zinc-400 hover:text-zinc-900 transition-colors">
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </div>

                  <h3 className="font-semibold leading-none tracking-tight mb-1 pb-1 group-hover:text-blue-600 transition-colors line-clamp-1">
                    {note.title}
                  </h3>

                  <p className="text-sm text-zinc-500 line-clamp-4 mb-4 grow">
                    {note.body}
                  </p>

                  <div className="flex items-center text-xs text-zinc-400 mt-auto pt-4 border-t border-zinc-100">
                    <Calendar className="mr-1 h-3 w-3" />
                    {formatDate(note.createdAt)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-center border border-dashed border-zinc-300 rounded-xl bg-zinc-50/50">
            <div className="bg-zinc-100 p-3 rounded-full mb-3">
              <Search className="h-6 w-6 text-zinc-400" />
            </div>
            <h3 className="font-medium text-zinc-900">
              Tidak ada catatan ditemukan
            </h3>
            <p className="text-zinc-500 text-sm mt-1">
              {searchQuery
                ? "Coba kata kunci lain."
                : "Buat catatan pertamamu sekarang!"}
            </p>
          </div>
        )}
      </main>
    </div>
  );
};

export default DashboardPage;
