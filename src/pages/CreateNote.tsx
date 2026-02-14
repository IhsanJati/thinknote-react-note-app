import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import CreateNoteForm from "../components/CreateNoteForm";
import AppNavbar from "../components/AppNavbar";
import { useAuth } from "../contexts/AuthContext";

const CreateNotePage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  return (
    <div className="min-h-screen bg-zinc-50 font-sans text-zinc-900 dark:bg-black dark:text-zinc-50 transition-colors duration-300">
      <AppNavbar user={user} />

      <main className="container mx-auto px-4 py-8 max-w-2xl">
        <button
          onClick={() => navigate(-1)}
          className="group mb-6 flex items-center text-sm font-medium text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200 transition-colors cursor-pointer"
        >
          <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Batal & Kembali
        </button>

        <div
          className="
          bg-white border border-zinc-200 rounded-xl shadow-sm p-6 md:p-8
          dark:bg-zinc-900 dark:border-zinc-800 transition-colors duration-300
        "
        >
          <div className="mb-8 border-b border-zinc-100 dark:border-zinc-800 pb-6">
            <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 mb-2">
              Buat Catatan Baru
            </h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Tuangkan idemu. Jangan khawatir, kamu bisa mengeditnya nanti.
            </p>
          </div>

          <CreateNoteForm />
        </div>
      </main>
    </div>
  );
};

export default CreateNotePage;
