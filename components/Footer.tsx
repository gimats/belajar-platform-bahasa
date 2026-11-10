import Link from "next/link";

export function Footer() {
  return (
    <footer className="w-full border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-10 mt-auto">
      <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-6 text-xs text-slate-500 dark:text-slate-400">
        <div className="space-y-1 text-center sm:text-left">
          <p className="font-semibold text-slate-700 dark:text-slate-300">
            Belajar Aksara — Platform Flashcard Bahasa untuk Pembelajar Indonesia
          </p>
          <p className="text-[11px]">
            Data karakter bersumber dari repositori terbuka (EDRDG/KANJIDIC, Unihan, IPA). Kepatuhan UU No. 27/2022 (PDP).
          </p>
        </div>

        <div className="flex items-center gap-5">
          <Link href="/about" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
            Tentang & Atribusi
          </Link>
          <Link href="/privacy" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
            Kebijakan Privasi
          </Link>
          <Link href="/dashboard" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
            Dashboard
          </Link>
        </div>
      </div>
    </footer>
  );
}
