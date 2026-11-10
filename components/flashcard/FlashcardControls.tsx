"use client";

import { MasteryStatus } from "@/types/flashcard";
import { RotateCw, CheckCircle2, HelpCircle, ChevronLeft } from "lucide-react";

interface FlashcardControlsProps {
  isFlipped: boolean;
  onFlip: () => void;
  onMark: (status: MasteryStatus) => void;
  onPrevious: () => void;
  canGoPrevious: boolean;
  disabled?: boolean;
}

export function FlashcardControls({
  isFlipped,
  onFlip,
  onMark,
  onPrevious,
  canGoPrevious,
  disabled = false,
}: FlashcardControlsProps) {
  return (
    <div className="w-full max-w-md mx-auto space-y-3">
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => onMark("learning")}
          disabled={disabled}
          className="flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 dark:bg-rose-950/40 dark:text-rose-300 dark:border-rose-900 shadow-sm active:scale-95 transition-all outline-none focus-visible:ring-2 focus-visible:ring-rose-400"
        >
          <HelpCircle className="w-5 h-5 text-rose-500" />
          <span>Masih Belajar</span>
          <kbd className="hidden sm:inline-block ml-1 px-1.5 py-0.5 text-[10px] font-mono text-rose-600 bg-rose-200/60 dark:bg-rose-900/60 rounded">
            1
          </kbd>
        </button>

        <button
          type="button"
          onClick={() => onMark("mastered")}
          disabled={disabled}
          className="flex items-center justify-center gap-2 py-3.5 px-4 rounded-2xl font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-900 shadow-sm active:scale-95 transition-all outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
        >
          <CheckCircle2 className="w-5 h-5 text-emerald-500" />
          <span>Sudah Hafal</span>
          <kbd className="hidden sm:inline-block ml-1 px-1.5 py-0.5 text-[10px] font-mono text-emerald-600 bg-emerald-200/60 dark:bg-emerald-900/60 rounded">
            2
          </kbd>
        </button>
      </div>

      <div className="flex items-center justify-between gap-2 pt-1">
        <button
          type="button"
          onClick={onPrevious}
          disabled={!canGoPrevious || disabled}
          className="inline-flex items-center gap-1 px-3 py-2 text-xs font-medium text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 disabled:opacity-30 disabled:pointer-events-none rounded-xl transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Sebelumnya</span>
        </button>

        <button
          type="button"
          onClick={onFlip}
          disabled={disabled}
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-950/50 rounded-xl transition-colors"
        >
          <RotateCw className="w-3.5 h-3.5" />
          <span>{isFlipped ? "Tutup Balik" : "Balik Kartu"}</span>
          <kbd className="hidden sm:inline-block px-1.5 py-0.5 text-[10px] font-mono bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 rounded">
            Spasi
          </kbd>
        </button>
      </div>
    </div>
  );
}
