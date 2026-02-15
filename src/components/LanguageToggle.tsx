import { useLanguage } from "../contexts/LanguageContexts";

export const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex items-center border border-zinc-200 dark:border-zinc-700 rounded-md overflow-hidden">
      <button
        onClick={() => setLanguage("id")}
        className={`
          px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer
          ${
            language === "id"
              ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
              : "bg-white text-zinc-600 hover:bg-zinc-50 dark:bg-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-900"
          }
        `}
      >
        ID
      </button>
      <button
        onClick={() => setLanguage("en")}
        className={`
          px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer
          ${
            language === "en"
              ? "bg-zinc-900 text-white dark:bg-zinc-100 dark:text-zinc-900"
              : "bg-white text-zinc-600 hover:bg-zinc-50 dark:bg-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-900"
          }
        `}
      >
        EN
      </button>
    </div>
  );
};
