"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { Character, MasteryStatus, SessionStats } from "@/types/flashcard";

interface UseFlashcardSessionOptions {
  characters: Character[];
  onUpdateProgress: (characterId: string, status: MasteryStatus) => Promise<void> | void;
  sessionSize?: number;
}

export function useFlashcardSession({
  characters,
  onUpdateProgress,
  sessionSize,
}: UseFlashcardSessionOptions) {
  const [deck, setDeck] = useState<Character[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [reviewMap, setReviewMap] = useState<Map<string, MasteryStatus>>(new Map());

  // Shuffle deck on client mount once to prevent hydration mismatch
  useEffect(() => {
    if (characters.length === 0) {
      setDeck([]);
      return;
    }

    const shuffled = [...characters].sort(() => Math.random() - 0.5);
    const selected = sessionSize ? shuffled.slice(0, sessionSize) : shuffled;

    setDeck(selected);
    setCurrentIndex(0);
    setIsFlipped(false);
    setIsFinished(false);
    setReviewMap(new Map());
  }, [characters, sessionSize]);

  const currentCard: Character | null = deck[currentIndex] ?? null;

  const flipCard = useCallback(() => {
    setIsFlipped((prev) => !prev);
  }, []);

  const markCard = useCallback(
    async (status: MasteryStatus) => {
      if (!currentCard || isFinished) return;

      const cardId = currentCard.id;

      // Update session statistics map
      setReviewMap((prev) => {
        const next = new Map(prev);
        next.set(cardId, status);
        return next;
      });

      // Optimistic update call
      try {
        await onUpdateProgress(cardId, status);
      } catch (err) {
        console.error("Failed to persist progress:", err);
      }

      if (currentIndex + 1 < deck.length) {
        setCurrentIndex((prev) => prev + 1);
        setIsFlipped(false);
      } else {
        setIsFinished(true);
      }
    },
    [currentCard, isFinished, currentIndex, deck.length, onUpdateProgress]
  );

  const previousCard = useCallback(() => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setIsFlipped(false);
      setIsFinished(false);
    }
  }, [currentIndex]);

  const restartSession = useCallback(() => {
    const shuffled = [...characters].sort(() => Math.random() - 0.5);
    const selected = sessionSize ? shuffled.slice(0, sessionSize) : shuffled;

    setDeck(selected);
    setCurrentIndex(0);
    setIsFlipped(false);
    setIsFinished(false);
    setReviewMap(new Map());
  }, [characters, sessionSize]);

  const sessionStats: SessionStats = useMemo(() => {
    let masteredCount = 0;
    let learningCount = 0;

    reviewMap.forEach((status) => {
      if (status === "mastered") masteredCount++;
      if (status === "learning") learningCount++;
    });

    return {
      totalReviewed: reviewMap.size,
      masteredCount,
      learningCount,
    };
  }, [reviewMap]);

  return {
    deck,
    currentCard,
    currentIndex,
    totalCards: deck.length,
    isFlipped,
    isFinished,
    flipCard,
    markCard,
    previousCard,
    restartSession,
    sessionStats,
  };
}
