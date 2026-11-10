import Link from "next/link";
import { LANGUAGE_OVERVIEWS } from "@/data";
import { Sparkles, ArrowRight, Volume2, ShieldCheck, Zap, Layers } from "lucide-react";

export default function HomePage() {
  return (
    <div className="w-full flex-1 flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full max-w-5xl mx-auto px-4 pt-12 pb-16 sm:pt-20 sm:pb-24 text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-xs font-semibold text-indigo-700 dark:text-indigo-300">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Website Flashcard Aksara Bahasa untuk Pemula Indonesia</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-slate-50 max-w-3xl mx-auto leading-tight">
          Kuasai Aksara Dasar <span className="text-indigo-600 dark:text-indigo-400">Jepang</span>,{" "}
          <span className="text-rose-600 dark:text-rose-400">Mandarin</span>, &amp;{" "}
          <span className="text-emerald-600 dark:text-emerald-400">English</span> dari Nol.
        </h1>

        <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Metode flashcard interaktif dengan audio pelafalan asli, animasi balik kartu 3D, dan pelacakan progres otomatis tanpa wajib mendaftar di awal.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link
            href="/japanese/hiragana"
            className="px-6 py-3.5 font-bold text-sm text-white bg-indigo-600 hover:bg-indigo-700 rounded-2xl shadow-lg shadow-indigo-600/20 active:scale-95 transition-all flex items-center gap-2"
          >
            <span>Mulai Belajar Hiragana</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/dashboard"
            className="px-6 py-3.5 font-bold text-sm text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-sm transition-all"
          >
            Lihat Dashboard
          </Link>
        </div>
      </section>

      {/* Language Selection Grid */}
      <section className="w-full max-w-5xl mx-auto px-4 pb-20 space-y-10">
        <div className="text-center space-y-1">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-50">
            Pilih Modul Aksara
          </h2>
          <p className="text-xs sm:text-sm text-slate-500">
            Setiap karakter dilengkapi simbol, cara baca, arti Bahasa Indonesia, contoh kata, dan audio suara.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {LANGUAGE_OVERVIEWS.map((lang) => {
            const langSlug = lang.code === "ja" ? "japanese" : lang.code === "zh" ? "mandarin" : "english";

            return (
              <div
                key={lang.code}
                className="bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-7 shadow-sm hover:border-indigo-400 dark:hover:border-indigo-600 hover:shadow-lg transition-all flex flex-col justify-between space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-4xl">{lang.flag}</span>
                    <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-full uppercase">
                      {lang.code.toUpperCase()}
                    </span>
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-slate-50">
                      {lang.name}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                      {lang.description}
                    </p>
                  </div>

                  <div className="space-y-2 pt-2">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                      Character Sets
                    </span>
                    <div className="space-y-2">
                      {lang.sets.map((set) => (
                        <Link
                          key={set.code}
                          href={`/${langSlug}/${set.code}`}
                          className="group p-3 bg-slate-50 dark:bg-slate-800/60 hover:bg-indigo-50 dark:hover:bg-indigo-950/40 border border-slate-200 dark:border-slate-700/60 hover:border-indigo-300 dark:hover:border-indigo-800 rounded-2xl flex items-center justify-between transition-all"
                        >
                          <div>
                            <span className="text-sm font-bold text-slate-800 dark:text-slate-200 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                              {set.name}
                            </span>
                            <span className="block text-[11px] text-slate-500 dark:text-slate-400">
                              {set.totalCount} Karakter
                            </span>
                          </div>
                          <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-600 group-hover:translate-x-0.5 transition-all" />
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    href={`/${langSlug}/${lang.sets[0].code}`}
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 font-bold text-xs text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 rounded-xl transition-colors"
                  >
                    <span>Mulai {lang.sets[0].name}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Feature Highlights */}
      <section className="w-full bg-slate-100/60 dark:bg-slate-900/40 border-y border-slate-200 dark:border-slate-800 py-16">
        <div className="max-w-5xl mx-auto px-4 space-y-8">
          <div className="text-center space-y-1">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50">
              Dirancang Khusus untuk Pemula
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              Pengalaman belajar ringan, terstruktur, dan tidak membingungkan.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5">
            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 flex items-center justify-center">
                <Volume2 className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                Audio Asli Web Speech
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Dengarkan pelafalan bahasa target (ja-JP, zh-CN, en-US) langsung dari kartu flashcard.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center">
                <Zap className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                Mode Tamu Instan
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Langsung belajar tanpa login. Progres disimpan di browser dan bisa digabung saat register.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 flex items-center justify-center">
                <Layers className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                Streak Server-Side
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Hitungan streak harian adil di zona waktu WIB (Asia/Jakarta) dengan minimal 10 kartu direview.
              </p>
            </div>

            <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-sm text-slate-900 dark:text-slate-100">
                Privasi &amp; Kontrol Penuh
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Kepatuhan UU PDP No. 27/2022, termasuk opsi penghapusan akun dan pembersihan data permanen.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
