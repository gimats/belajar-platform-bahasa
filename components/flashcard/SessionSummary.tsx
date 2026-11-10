"use client";

import { useEffect } from "react";
import Link from "next/link";
import confetti from "canvas-confetti";
import { SessionStats } from "@/types/flashcard";
import { Trophy, RefreshCw, ArrowRight, UserPlus, Sparkles } from "lucide-react";

interface SessionSummaryProps {
  stats: SessionStats;
  isGuest: boolean;
  setName: string;
  onRestart: () => void;
  onOpenAuthModal?: () => void;
}

export function SessionSummary({
  stats,
  isGuest,
  setName,
  onRestart,
  onOpenAuthModal,
}: SessionSummaryProps) {
  const percentage =
    stats.totalReviewed > 0
      ? Math.round((stats.masteredCount / stats.totalReviewed) * 100)
      : 0;

  useEffect(() => {
    if (stats.masteredCount > 0) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
        });
      } catch {
        // Confetti is an optional visual flourish
      }
    }
  }, [stats.masteredCount]);

  return (
    <div className="w-full max-w-md mx-auto bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-3xl shadow-xl p-6 sm:p-8 text-center space-y-6">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-amber-50 dark:bg-amber-950/50 text-amber-500 border border-amber-200 dark:border-amber-800/80 shadow-inner">
        <Trophy className="w-8 h-8" />
      </div>

      <div className="space-y-1">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-50">
          Sesi Belajar Selesai!
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Set: <span className="font-semibold text-slate-700 dark:text-slate-300">{setName}</span>
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-3 gap-2.5">
        <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-100 dark:border-slate-800">
          <span className="block text-2xl font-bold text-slate-900 dark:text-slate-100">
            {stats.totalReviewed}
          </span>
          <span className="text-[11px] font-medium text-slate-500">Direview</span>
        </div>

        <div className="p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-2xl border border-emerald-100 dark:border-emerald-900/50">
          <span className="block text-2xl font-bold text-emerald-600 dark:text-emerald-400">
            {stats.masteredCount}
          </span>
          <span className="text-[11px] font-medium text-emerald-700 dark:text-emerald-300">
            Sudah Hafal
          </span>
        </div>

        <div className="p-3 bg-rose-50 dark:bg-rose-950/40 rounded-2xl border border-rose-100 dark:border-rose-900/50">
          <span className="block text-2xl font-bold text-rose-600 dark:text-rose-400">
            {stats.learningCount}
          </span>
          <span className="text-[11px] font-medium text-rose-700 dark:text-rose-300">
            Masih Belajar
          </span>
        </div>
      </div>

      <div className="p-4 bg-indigo-50/70 dark:bg-indigo-950/40 rounded-2xl border border-indigo-100 dark:border-indigo-900/40 flex items-center justify-between text-left">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
          <span className="text-xs font-semibold text-indigo-900 dark:text-indigo-200">
            Akurasi Hafalan Sesi Ini
          </span>
        </div>
        <span className="text-lg font-bold text-indigo-700 dark:text-indigo-300">
          {percentage}%
        </span>
      </div>

      {/* Guest Mode Call to Action */}
      {isGuest && (
        <div className="p-4 bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-300/80 dark:border-amber-700/60 rounded-2xl text-left space-y-2">
          <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300 font-semibold text-xs">
            <UserPlus className="w-4 h-4" />
            <span>Simpan Progres Anda</span>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Anda sedang belajar dalam mode tamu. Buat akun gratis untuk menyimpan streak harian dan sinkronisasi lintas perangkat.
          </p>
          <button
            type="button"
            onClick={onOpenAuthModal}
            className="w-full py-2 px-3 text-xs font-bold text-white bg-amber-600 hover:bg-amber-700 rounded-xl transition-colors shadow-sm"
          >
            Daftar / Masuk Sekarang
          </button>
        </div>
      )}

      {/* Actions */}
      <div className="space-y-2.5 pt-2">
        <button
          type="button"
          onClick={onRestart}
          className="w-full flex items-center justify-center gap-2 py-3.5 px-4 font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-2xl shadow-md transition-all active:scale-95"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Ulangi Sesi Belajar</span>
        </button>

        <Link
          href="/dashboard"
          className="w-full flex items-center justify-center gap-2 py-3 px-4 font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-2xl transition-all"
        >
          <span>Ke Halaman Dashboard</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
