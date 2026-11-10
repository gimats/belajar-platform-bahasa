"use client";

import { Character } from "@/types/flashcard";
import { AudioPlayButton } from "./AudioPlayButton";
import { SpeechLocale } from "@/lib/audio";
import { RotateCw, Volume2 } from "lucide-react";

interface FlashcardProps {
  character: Character;
  isFlipped: boolean;
  onFlip: () => void;
  locale: SpeechLocale;
  langCode: "ja" | "zh-CN" | "en";
}

export function Flashcard({
  character,
  isFlipped,
  onFlip,
  locale,
  langCode,
}: FlashcardProps) {
  const isSymbolLong = character.symbol.length > 3;

  return (
    <div className="w-full max-w-md mx-auto aspect-[4/5] sm:aspect-[1/1] max-h-[460px] perspective-1000 select-none">
      <div
        role="button"
        tabIndex={0}
        aria-label={`Kartu flashcard: ${character.symbol}. Tekan Spasi atau Enter untuk membalik.`}
        onClick={onFlip}
        onKeyDown={(e) => {
          if (e.key === " " || e.key === "Enter") {
            e.preventDefault();
            onFlip();
          }
        }}
        className={`relative w-full h-full cursor-pointer transition-transform duration-500 transform-style-3d outline-none focus-visible:ring-4 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 rounded-3xl ${
          isFlipped ? "rotate-y-180" : ""
        }`}
      >
        {/* Front side */}
        <div className="absolute inset-0 w-full h-full backface-hidden bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-3xl shadow-xl flex flex-col justify-between p-6 sm:p-8 hover:border-indigo-400 dark:hover:border-indigo-600 transition-colors">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold px-2.5 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-full uppercase tracking-wider">
              {character.level || character.character_set_id}
            </span>
            <AudioPlayButton
              text={character.example_word ? character.symbol : character.symbol}
              locale={locale}
              size="sm"
            />
          </div>

          <div className="flex-1 flex flex-col items-center justify-center my-4">
            <span
              lang={langCode}
              className={`font-bold tracking-tight text-slate-900 dark:text-slate-50 transition-all ${
                isSymbolLong ? "text-4xl sm:text-5xl" : "text-7xl sm:text-8xl"
              }`}
            >
              {character.symbol}
            </span>
            {character.tone && (
              <span className="mt-3 text-sm font-medium px-2.5 py-0.5 bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 rounded-full border border-amber-200 dark:border-amber-800">
                {character.romanization}
              </span>
            )}
          </div>

          <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400 dark:text-slate-500 font-medium">
            <RotateCw className="w-3.5 h-3.5" />
            <span>Klik atau tekan Spasi untuk membalik</span>
          </div>
        </div>

        {/* Back side */}
        <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 bg-gradient-to-br from-indigo-50/50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-900 dark:to-indigo-950/30 border-2 border-indigo-200 dark:border-indigo-900 rounded-3xl shadow-xl flex flex-col justify-between p-6 sm:p-8 overflow-y-auto">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <span lang={langCode} className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
                {character.symbol}
              </span>
              {character.romanization && (
                <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  {character.romanization}
                </span>
              )}
            </div>
            <AudioPlayButton
              text={character.example_word || character.symbol}
              locale={locale}
              size="sm"
            />
          </div>

          <div className="flex-1 py-3 space-y-3 text-left">
            {/* Kanji Readings */}
            {(character.reading_on || character.reading_kun) && (
              <div className="grid grid-cols-2 gap-2 text-xs">
                {character.reading_on && (
                  <div className="bg-indigo-50/80 dark:bg-indigo-950/50 p-2.5 rounded-xl border border-indigo-100 dark:border-indigo-900/40">
                    <span className="block text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
                      On&apos;yomi (Cina)
                    </span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      {character.reading_on}
                    </span>
                  </div>
                )}
                {character.reading_kun && (
                  <div className="bg-emerald-50/80 dark:bg-emerald-950/50 p-2.5 rounded-xl border border-emerald-100 dark:border-emerald-900/40">
                    <span className="block text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                      Kun&apos;yomi (Jepang)
                    </span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      {character.reading_kun}
                    </span>
                  </div>
                )}
              </div>
            )}

            {/* Meaning */}
            {character.meaning && (
              <div>
                <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
                  Arti / Bunyi
                </span>
                <p className="text-base font-semibold text-slate-900 dark:text-slate-100 leading-snug">
                  {character.meaning}
                </p>
              </div>
            )}

            {/* Example Word */}
            {character.example_word && (
              <div className="bg-slate-50 dark:bg-slate-800/60 p-3 rounded-2xl border border-slate-100 dark:border-slate-800">
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                  Contoh Penggunaan
                </span>
                <div className="flex items-center justify-between mt-1">
                  <div>
                    <span lang={langCode} className="text-base font-bold text-slate-900 dark:text-slate-100">
                      {character.example_word}
                    </span>
                    {character.example_meaning && (
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                        {character.example_meaning}
                      </p>
                    )}
                  </div>
                  <AudioPlayButton
                    text={character.example_word}
                    locale={locale}
                    size="sm"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="pt-2 text-center text-xs text-slate-400 dark:text-slate-500 font-medium border-t border-slate-100 dark:border-slate-800">
            Tandai status kartu di tombol bawah
          </div>
        </div>
      </div>
    </div>
  );
}
