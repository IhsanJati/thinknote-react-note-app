import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { createNoteSchema, type CretaNoteValues } from "../lib/zod";
import { createNote } from "../lib/data";
import { Loader2, Save } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContexts";

const CreateNoteForm = () => {
  const { language } = useLanguage();

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CretaNoteValues>({
    resolver: zodResolver(createNoteSchema),
  });

  const onSubmit = async (values: CretaNoteValues) => {
    try {
      await createNote({ title: values.title, body: values.body });
      navigate("/");
    } catch {
      alert("Create note failed");
    }
  };

  const baseInputStyles =
    "block w-full rounded-md border text-sm shadow-sm transition-colors focus:outline-none focus:ring-2 disabled:cursor-not-allowed disabled:opacity-50";

  const normalInputStyles =
    "border-zinc-200 bg-white text-zinc-900 placeholder:text-zinc-400 focus:border-zinc-900 focus:ring-zinc-900/10 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-100 dark:placeholder:text-zinc-600 dark:focus:border-zinc-100 dark:focus:ring-zinc-100/20";

  const errorInputStyles =
    "border-red-500 bg-red-50 text-red-900 placeholder:text-red-400 focus:border-red-500 focus:ring-red-500/20 dark:bg-red-950/30 dark:border-red-900 dark:text-red-200";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label
          htmlFor="title"
          className="block text-sm font-medium mb-2 text-zinc-700 dark:text-zinc-300 transition-colors"
        >
          {language === "en" ? "Title" : "Judul"}
        </label>
        <input
          id="title"
          type="text"
          {...register("title")}
          className={`h-10 px-3 py-2 ${baseInputStyles} ${
            errors.title ? errorInputStyles : normalInputStyles
          }`}
          placeholder={
            language === "en" ? "Example: Jarkom Task" : "Contoh: Tugas Jarkom"
          }
          disabled={isSubmitting}
        />
        {errors.title && (
          <p className="mt-1.5 text-xs font-medium text-red-600 dark:text-red-400 animate-in slide-in-from-top-1">
            {errors.title.message}
          </p>
        )}
      </div>
      <div>
        <label
          htmlFor="body"
          className="block text-sm font-medium mb-2 text-zinc-700 dark:text-zinc-300 transition-colors"
        >
          {language === "en" ? "Body" : "Isi catatan"}
        </label>
        <textarea
          id="body"
          rows={6}
          {...register("body")}
          className={`p-3 resize-none ${baseInputStyles} ${
            errors.body ? errorInputStyles : normalInputStyles
          }`}
          placeholder={
            language === "en"
              ? "Write your note here..."
              : "Tulis catatanmu di sini..."
          }
          disabled={isSubmitting}
        />
        {errors.body && (
          <p className="mt-1.5 text-xs font-medium text-red-600 dark:text-red-400 animate-in slide-in-from-top-1">
            {errors.body.message}
          </p>
        )}
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="
          w-full flex items-center justify-center py-2.5 px-4 rounded-md shadow-sm text-sm font-medium transition-all cursor-pointer
          text-zinc-50 bg-zinc-900 hover:bg-zinc-800
          dark:text-zinc-900 dark:bg-zinc-50 dark:hover:bg-zinc-200
          disabled:opacity-70 disabled:cursor-not-allowed
          focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-900 dark:focus:ring-zinc-100 dark:ring-offset-zinc-900
        "
      >
        {isSubmitting ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            {language === "en" ? "Saving..." : "Menyimpan..."}
          </>
        ) : (
          <>
            <Save className="mr-2 h-4 w-4" />
            {language === "en" ? "Save Note" : "Simpan Catatan"}
          </>
        )}
      </button>
    </form>
  );
};

export default CreateNoteForm;
