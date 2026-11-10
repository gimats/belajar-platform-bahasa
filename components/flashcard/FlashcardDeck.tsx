"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { Character, CharacterSetCode, LanguageCode } from "@/types/flashcard";
import { useFlashcardSession } from "@/hooks/useFlashcardSession";
import { useUserProgress } from "@/hooks/useUserProgress";
import { Flashcard } from "./Flashcard";
import { FlashcardControls } from "./FlashcardControls";
import { ProgressBar } from "./ProgressBar";
import { SessionSummary } from "./SessionSummary";
import { SetSelector } from "./SetSelector";
import { LANGUAGE_DISPLAY, SET_DISPLAY } from "@/lib/route-map";
import { speakText, SpeechLocale } from "@/lib/audio";
import { ArrowLeft, Sparkles } from "lucide-react";
import { AuthModal } from "@/components/AuthModal";

interface FlashcardDeckProps {
  characters: Character[];
  languageCode: LanguageCode;
  characterSetCode: CharacterSetCode;
}

export function FlashcardDeck({
  characters,
  languageCode,
  characterSetCode,
}: FlashcardDeckProps) {
  const { isGuest, updateProgress } = useUserProgress();
  const [showAuthModal, setShowAuthModal] = useState(false);

  const {
    currentCard,
    currentIndex,
    totalCards,
    isFlipped,
    isFinished,
    flipCard,
    markCard,
    previousCard,
    restartSession,
    sessionStats,
  } = useFlashcardSession({
    characters,
    onUpdateProgress: updateProgress,
  });

  const langMeta = LANGUAGE_DISPLAY[languageCode];
  const setMeta = SET_DISPLAY[characterSetCode];
  const locale = (langMeta?.speechLocale || "en-US") as SpeechLocale;
  const langTag = languageCode === "ja" ? "ja" : languageCode === "zh" ? "zh-CN" : "en";

  const playCurrentAudio = useCallback(() => {
    if (!currentCard) return;
    const textToSpeak = currentCard.example_word || currentCard.symbol;
    speakText(textToSpeak, locale);
  }, [currentCard, locale]);

  // Global keyboard shortcuts for flashcards
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if user is typing in an input or textarea
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA"
      ) {
        return;
      }

      if (isFinished) return;

      if (e.code === "Space") {
        e.preventDefault();
        flipCard();
      } else if (e.key === "1" || e.code === "ArrowLeft") {
        e.preventDefault();
        markCard("learning");
      } else if (e.key === "2" || e.code === "ArrowRight") {
        e.preventDefault();
        markCard("mastered");
      } else if (e.key.toLowerCase() === "a" || e.key.toLowerCase() === "p") {
        e.preventDefault();
        playCurrentAudio();
      } else if (e.code === "ArrowUp") {
        e.preventDefault();
        previousCard();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFinished, flipCard, markCard, playCurrentAudio, previousCard]);

  return (
    <div className="w-full max-w-xl mx-auto px-4 py-6 sm:py-8 space-y-6">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali</span>
        </Link>

        <SetSelector currentLang={languageCode} currentSet={characterSetCode} />

        <div className="flex items-center gap-1 text-[11px] font-medium text-slate-400">
          <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block animate-pulse" />
          <span>{locale}</span>
        </div>
      </div>

      {isFinished ? (
        <SessionSummary
          stats={sessionStats}
          isGuest={isGuest}
          setName={setMeta?.name || characterSetCode}
          onRestart={restartSession}
          onOpenAuthModal={() => setShowAuthModal(true)}
        />
      ) : (
        <>
          <ProgressBar current={currentIndex + 1} total={totalCards} />

          {currentCard ? (
            <div className="space-y-6">
              <Flashcard
                key={currentCard.id}
                character={currentCard}
                isFlipped={isFlipped}
                onFlip={flipCard}
                locale={locale}
                langCode={langTag}
              />

              <FlashcardControls
                isFlipped={isFlipped}
                onFlip={flipCard}
                onMark={markCard}
                onPrevious={previousCard}
                canGoPrevious={currentIndex > 0}
              />
            </div>
          ) : (
            <div className="p-8 text-center text-slate-500 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
              Tidak ada kartu tersedia untuk set ini.
            </div>
          )}

          {/* Keyboard hints footer */}
          <div className="hidden sm:flex items-center justify-center gap-4 text-[11px] text-slate-400 dark:text-slate-500 font-medium pt-2">
            <span>
              <kbd className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 rounded font-mono">
                Spasi
              </kbd>{" "}
              Balik
            </span>
            <span>
              <kbd className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 rounded font-mono">
                1
              </kbd>{" "}
              Belajar
            </span>
            <span>
              <kbd className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 rounded font-mono">
                2
              </kbd>{" "}
              Hafal
            </span>
            <span>
              <kbd className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 rounded font-mono">
                A
              </kbd>{" "}
              Audio
            </span>
          </div>
        </>
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
