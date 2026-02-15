import { useEffect, useState } from "react";
import { useParams, useNavigate, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import AppNavbar from "../components/AppNavbar";
import {
  archiveNote,
  deleteNote,
  getNoteById,
  unarchiveNote,
} from "../lib/data";
import type { Note } from "../types/types";
import { Loader2, ArrowLeft, Calendar, Archive } from "lucide-react";
import { formatDate } from "../lib/utils";
import { ArchiveNoteButton, DeleteNoteButton } from "../components/Buttons";
import { useLanguage } from "../contexts/LanguageContexts";

const DetailNotePage = () => {
  const { user } = useAuth();
  const { language } = useLanguage();
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

  if (!user || !id) {
    return <Navigate to="/" replace />;
  }

  const onDeleteHandler = async () => {
    try {
      await deleteNote(id);
      navigate("/");
    } catch (_err) {
      setError("Failed to delete note");
    }
  };

  const onArchiveHandler = async () => {
    try {
      await archiveNote(id);
      navigate("/archived");
    } catch (_err) {
      setError("Failed to archive note");
    }
  };

  const onUnarchiveHandler = async () => {
    try {
      await unarchiveNote(id);
      navigate("/");
    } catch (_err) {
      setError("Failed to unarchive note");
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 font-sans text-zinc-900 dark:bg-black dark:text-zinc-50 transition-colors duration-300">
      <AppNavbar user={user} />

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <button
          onClick={() => navigate(-1)}
          className="group mb-6 flex items-center text-sm font-medium transition-colors cursor-pointer
          text-zinc-500 hover:text-zinc-900
          dark:text-zinc-400 dark:hover:text-zinc-200"
        >
          <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          {language === "en" ? "Back" : "Kembali"}
        </button>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 min-h-[50vh]">
            <Loader2 className="h-10 w-10 animate-spin text-zinc-400 dark:text-zinc-600 mb-4" />
            <p className="text-zinc-500 dark:text-zinc-400">Load note...</p>
          </div>
        ) : error ? (
          <div className="rounded-xl border border-red-200 bg-red-50 p-8 text-center dark:bg-red-900/10 dark:border-red-900">
            <h3 className="text-lg font-semibold text-red-700 dark:text-red-400 mb-2">
              Something wrong
            </h3>
            <p className="text-red-600 dark:text-red-300 mb-6">{error}</p>
            <button
              onClick={() => navigate("/")}
              className="px-4 py-2 rounded-md font-medium transition-colors
              bg-white border border-red-200 text-red-700 hover:bg-red-100
              dark:bg-zinc-900 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-900/30"
            >
              {language === "en" ? "Back to Dashboard" : "Kembali ke Beranda"}
            </button>
          </div>
        ) : note ? (
          <article className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <header className="mb-8 border-b border-zinc-200 pb-8 dark:border-zinc-800 transition-colors">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="space-y-4">
                  <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-50 leading-tight">
                    {note.title}
                  </h1>

                  <div className="flex items-center gap-4 text-sm text-zinc-500 dark:text-zinc-400">
                    <div className="flex items-center gap-1.5 bg-zinc-100 px-3 py-1 rounded-full dark:bg-zinc-800 transition-colors">
                      <Calendar className="h-4 w-4" />
                      <span>
                        {formatDate(note.createdAt, language === "id")}
                      </span>
                    </div>
                    {note.archived && (
                      <span
                        className="flex items-center gap-1.5 px-3 py-1 rounded-full border transition-colors
                      bg-yellow-100 text-yellow-800 border-yellow-200
                      dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-700/50"
                      >
                        <Archive className="h-3 w-3" />
                        {language === "en" ? "Archived" : "Arsip"}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {note.archived ? (
                    <ArchiveNoteButton
                      title={language === "en" ? "Unarchive" : "Batal Arsip"}
                      onClickHandler={onUnarchiveHandler}
                    />
                  ) : (
                    <ArchiveNoteButton
                      title={language === "en" ? "Archive" : "Arsipkan"}
                      onClickHandler={onArchiveHandler}
                    />
                  )}
                  <DeleteNoteButton
                    title={language === "en" ? "Delete" : "Hapus"}
                    onClickHandler={onDeleteHandler}
                  />
                </div>
              </div>
            </header>
            <div className="prose prose-zinc prose-lg max-w-none dark:prose-invert text-zinc-700 dark:text-zinc-300 transition-colors">
              <p className="whitespace-pre-wrap leading-relaxed">{note.body}</p>
            </div>
          </article>
        ) : null}
      </main>
    </div>
  );
};

export default DetailNotePage;
