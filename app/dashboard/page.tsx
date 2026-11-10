"use client";

import { useState } from "react";
import Link from "next/link";
import { useUserProgress } from "@/hooks/useUserProgress";
import { ALL_CHARACTERS_BY_SET } from "@/data";
import { SET_DISPLAY, LANGUAGE_DISPLAY } from "@/lib/route-map";
import { CharacterSetCode } from "@/types/flashcard";
import { AuthModal } from "@/components/AuthModal";
import {
  Flame,
  Clock,
  CheckCircle2,
  HelpCircle,
  ArrowRight,
  User,
  Trash2,
  AlertTriangle,
  Loader2,
  Sparkles,
} from "lucide-react";

export default function DashboardPage() {
  const { user, isGuest, streakCount, progressMap, loading } = useUserProgress();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);

  const now = new Date();

  // Aggregate stats across all sets
  let totalCardsCount = 0;
  let totalMasteredCount = 0;
  let totalLearningCount = 0;
  let dueReviewCount = 0;

  const setProgressBreakdown = (
    Object.keys(ALL_CHARACTERS_BY_SET) as CharacterSetCode[]
  ).map((setCode) => {
    const characters = ALL_CHARACTERS_BY_SET[setCode];
    const meta = SET_DISPLAY[setCode];
    const lang = LANGUAGE_DISPLAY[meta.languageCode];

    let mastered = 0;
    let learning = 0;
    let due = 0;

    characters.forEach((char) => {
      const p = progressMap[char.id];
      if (p) {
        if (p.status === "mastered") mastered++;
        if (p.status === "learning") learning++;

        if (p.next_review_at && new Date(p.next_review_at) <= now) {
          due++;
        }
      }
    });

    totalCardsCount += characters.length;
    totalMasteredCount += mastered;
    totalLearningCount += learning;
    dueReviewCount += due;

    const percent = Math.round((mastered / characters.length) * 100);

    return {
      code: setCode,
      name: meta.name,
      langName: lang.name,
      langSlug: lang.slug,
      total: characters.length,
      mastered,
      learning,
      due,
      percent,
    };
  });

  const overallMasteryPercent =
    totalCardsCount > 0 ? Math.round((totalMasteredCount / totalCardsCount) * 100) : 0;

  const handleDeleteAccount = async () => {
    setIsDeleting(true);
    setDeleteError(null);

    try {
      const res = await fetch("/api/account/delete", { method: "POST" });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Gagal menghapus akun.");
      }

      window.location.href = "/";
    } catch (err: unknown) {
      setDeleteError(err instanceof Error ? err.message : "Terjadi kesalahan.");
      setIsDeleting(false);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8 sm:py-12 space-y-8">
      {/* Header Profile / Guest Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-2xl shadow-inner">
            {user ? (
              user.user_metadata?.full_name ? (
                user.user_metadata.full_name.charAt(0).toUpperCase()
              ) : (
                <User className="w-7 h-7" />
              )
            ) : (
              "👤"
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-slate-900 dark:text-slate-50">
                {user
                  ? user.user_metadata?.full_name || user.email?.split("@")[0]
                  : "Pengguna Tamu"}
              </h1>
              {isGuest && (
                <span className="text-[10px] font-bold px-2 py-0.5 bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 rounded-md">
                  Mode Tamu
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {user
                ? user.email
                : "Progres tersimpan di browser Anda. Daftarkan akun untuk sinkronisasi cloud."}
            </p>
          </div>
        </div>

        {isGuest && (
          <button
            type="button"
            onClick={() => setShowAuthModal(true)}
            className="py-2.5 px-4 font-bold text-xs text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-sm active:scale-95 transition-all self-start sm:self-center"
          >
            Hubungkan Akun
          </button>
        )}
      </div>

      {/* Main Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Streak */}
        <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Streak Harian</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950/50 flex items-center justify-center text-amber-500">
              <Flame className="w-4 h-4 fill-amber-500" />
            </div>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl font-extrabold text-slate-900 dark:text-slate-50">
              {streakCount}
            </span>
            <span className="text-xs font-semibold text-slate-500">hari aktif</span>
          </div>
          <p className="text-[11px] text-slate-400">
            WIB (min. 10 kartu direview/hari)
          </p>
        </div>

        {/* Due For Review */}
        <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Perlu Direview</span>
            <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 flex items-center justify-center text-indigo-500">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400">
              {dueReviewCount}
            </span>
            <span className="text-xs font-semibold text-slate-500">kartu</span>
          </div>
          <p className="text-[11px] text-slate-400">
            Sesuai jadwal interval waktu
          </p>
        </div>

        {/* Mastered */}
        <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Sudah Dihafal</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 flex items-center justify-center text-emerald-500">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">
              {totalMasteredCount}
            </span>
            <span className="text-xs font-semibold text-slate-500">/ {totalCardsCount}</span>
          </div>
          <p className="text-[11px] text-slate-400">
            {overallMasteryPercent}% dari total aksara
          </p>
        </div>

        {/* Learning */}
        <div className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Masih Belajar</span>
            <div className="w-8 h-8 rounded-xl bg-rose-50 dark:bg-rose-950/50 flex items-center justify-center text-rose-500">
              <HelpCircle className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl font-extrabold text-rose-600 dark:text-rose-400">
              {totalLearningCount}
            </span>
            <span className="text-xs font-semibold text-slate-500">kartu</span>
          </div>
          <p className="text-[11px] text-slate-400">
            Perlu latihan berulang
          </p>
        </div>
      </div>

      {/* Progress Breakdown per Character Set */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-50">
            Penguasaan Tiap Character Set
          </h2>
          <span className="text-xs text-slate-500">
            5 modul aktif
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {setProgressBreakdown.map((item) => (
            <div
              key={item.code}
              className="p-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl space-y-4 hover:border-indigo-300 dark:hover:border-indigo-800 transition-colors shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider block">
                    {item.langName}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
                    {item.name}
                  </h3>
                </div>
                <span className="text-lg font-extrabold text-slate-800 dark:text-slate-200">
                  {item.percent}%
                </span>
              </div>

              {/* Progress bar */}
              <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden p-0.5">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full transition-all duration-300"
                  style={{ width: `${item.percent}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500 pt-1">
                <div className="flex items-center gap-3">
                  <span>
                    <strong className="text-emerald-600 dark:text-emerald-400">
                      {item.mastered}
                    </strong>{" "}
                    hafal
                  </span>
                  <span>
                    <strong className="text-rose-600 dark:text-rose-400">
                      {item.learning}
                    </strong>{" "}
                    belajar
                  </span>
                  <span>
                    <strong>{item.total}</strong> total
                  </span>
                </div>

                <Link
                  href={`/${item.langSlug}/${item.code}`}
                  className="inline-flex items-center gap-1 font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700"
                >
                  <span>Belajar</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Account Deletion / UU PDP section */}
      {user && (
        <div className="p-6 bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 rounded-3xl space-y-3">
          <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200 font-bold text-sm">
            <Trash2 className="w-4 h-4 text-rose-500" />
            <span>Manajemen Data Pribadi (UU PDP No. 27/2022)</span>
          </div>
          <p className="text-xs text-slate-500 leading-relaxed max-w-2xl">
            Sesuai hak subjek data pribadi, Anda dapat menghapus akun beserta seluruh riwayat progres belajar secara permanen dari server Supabase.
          </p>

          {!showDeleteConfirm ? (
            <button
              type="button"
              onClick={() => setShowDeleteConfirm(true)}
              className="py-2 px-3 text-xs font-semibold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 dark:text-rose-300 rounded-xl transition-colors"
            >
              Hapus Akun Saya
            </button>
          ) : (
            <div className="p-4 bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900 rounded-2xl space-y-3 max-w-md">
              <div className="flex items-start gap-2 text-rose-800 dark:text-rose-200 text-xs font-bold">
                <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-rose-600" />
                <span>Konfirmasi Penghapusan Akun Permanen</span>
              </div>
              <p className="text-xs text-rose-700 dark:text-rose-300">
                Tindakan ini tidak dapat dibatalkan. Profil dan progres flashcard Anda akan langsung dihapus.
              </p>
              {deleteError && (
                <p className="text-xs font-bold text-rose-900">{deleteError}</p>
              )}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleDeleteAccount}
                  disabled={isDeleting}
                  className="py-1.5 px-3 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl flex items-center gap-1.5"
                >
                  {isDeleting && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>Ya, Hapus Akun Sekarang</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowDeleteConfirm(false)}
                  disabled={isDeleting}
                  className="py-1.5 px-3 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-xl"
                >
                  Batal
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {showAuthModal && (
        <AuthModal
          isOpen={showAuthModal}
          onClose={() => setShowAuthModal(false)}
        />
      )}
    </div>
  );
}
