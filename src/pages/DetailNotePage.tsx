import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import AppNavbar from "../components/AppNavbar";
import { deleteNote, getNoteById } from "../lib/data";
import type { Note } from "../types/types";
import { Loader2, ArrowLeft, Calendar, Archive } from "lucide-react";
import { formatDate } from "../lib/utils";
import { DeleteNoteButton } from "../components/Buttons";

const DetailNotePage = () => {
  const { user } = useAuth();
  const { id } = useParams<{ id: string }>();

  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchNoteDetail = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const response = await getNoteById(id);
        if (response && response.data) {
          setNote(response.data);
        } else {
          throw new Error("Data not found");
        }
      } catch (_err) {
        setError("Failed to fetch note");
      } finally {
        setLoading(false);
      }
    };

    fetchNoteDetail();
  }, [id]);

  if (!user) {
    return null;
  }

  const onDeleteHandler = async () => {
    try {
      if (!id) return;

      await deleteNote(id);
      navigate("/");
    } catch (_err) {
      setError("Failed to delete note");
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 font-sans text-zinc-900">
      <AppNavbar user={user} />

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <button
          onClick={() => navigate(-1)}
          className="group mb-6 flex items-center text-sm font-medium text-zinc-500 hover:text-zinc-900 transition-colors"
        >
          <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Kembali
        </button>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 min-h-[50vh]">
            <Loader2 className="h-10 w-10 animate-spin text-zinc-400 mb-4" />
            <p className="text-zinc-500">Sedang mengambil catatan...</p>
          </div>
        ) : error ? (
          <div className="rounded-xl border border-red-200 bg-red-50 p-8 text-center">
            <h3 className="text-lg font-semibold text-red-700 mb-2">
              Terjadi Kesalahan
            </h3>
            <p className="text-red-600 mb-6">{error}</p>
            <button
              onClick={() => navigate("/")}
              className="px-4 py-2 bg-white border border-red-200 text-red-700 rounded-md font-medium hover:bg-red-100 transition-colors"
            >
              Kembali ke Dashboard
            </button>
          </div>
        ) : note ? (
          <article className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <header className="mb-8 border-b border-zinc-200 pb-8">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="space-y-4">
                  <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-zinc-900 leading-tight">
                    {note.title}
                  </h1>

                  <div className="flex items-center gap-4 text-sm text-zinc-500">
                    <div className="flex items-center gap-1.5 bg-zinc-100 px-3 py-1 rounded-full">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(note.createdAt)}</span>
                    </div>
                    {note.archived && (
                      <span className="flex items-center gap-1.5 bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full border border-yellow-200">
                        <Archive className="h-3 w-3" />
                        Arsip
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    className="p-2 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 rounded-md transition-colors"
                    title="Arsipkan"
                  >
                    <Archive className="h-5 w-5" />
                  </button>
                  <DeleteNoteButton onClickHandler={onDeleteHandler} />
                </div>
              </div>
            </header>

            <div className="prose prose-zinc prose-lg max-w-none text-zinc-700">
              <p className="whitespace-pre-wrap leading-relaxed">{note.body}</p>
            </div>
          </article>
        ) : null}
      </main>
    </div>
  );
};

export default DetailNotePage;
