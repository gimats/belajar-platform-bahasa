"use client";

import Link from "next/link";
import { CharacterSetCode, LanguageCode } from "@/types/flashcard";
import { LANGUAGE_DISPLAY, SET_DISPLAY } from "@/lib/route-map";

interface SetSelectorProps {
  currentLang: LanguageCode;
  currentSet: CharacterSetCode;
}

export function SetSelector({ currentLang, currentSet }: SetSelectorProps) {
  const availableSets = Object.entries(SET_DISPLAY).filter(
    ([, meta]) => meta.languageCode === currentLang
  ) as [CharacterSetCode, (typeof SET_DISPLAY)[CharacterSetCode]][];

  const langSlug = LANGUAGE_DISPLAY[currentLang]?.slug || currentLang;

  return (
    <div className="flex items-center justify-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-2xl w-fit mx-auto border border-slate-200 dark:border-slate-700/60 shadow-inner">
      {availableSets.map(([code, meta]) => {
        const isActive = code === currentSet;
        return (
          <Link
            key={code}
            href={`/${langSlug}/${code}`}
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-all ${
              isActive
                ? "bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm"
                : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200"
            }`}
          >
            {meta.name}
          </Link>
        );
      })}
    </div>
  );
}
