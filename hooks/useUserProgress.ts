"use client";

import { useState, useEffect, useCallback } from "react";
import { MasteryStatus } from "@/types/flashcard";
import { isSupabaseConfigured, createClient } from "@/lib/supabase/client";
import {
  getGuestProgressMap,
  saveGuestProgress,
  mergeGuestProgressToUser,
} from "@/lib/guest-storage";
import { saveUserProgress } from "@/lib/supabase/queries";
import { User } from "@supabase/supabase-js";

interface ProgressItemSummary {
  status: MasteryStatus;
  review_count: number;
  last_reviewed_at?: string;
  next_review_at?: string;
}

export function useUserProgress() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [progressMap, setProgressMap] = useState<Record<string, ProgressItemSummary>>({});
  const [streakCount, setStreakCount] = useState<number>(0);

  const loadProgress = useCallback(async (currentUser: User | null) => {
    if (!currentUser || !isSupabaseConfigured()) {
      const guestMap = getGuestProgressMap();
      const summaryMap: Record<string, ProgressItemSummary> = {};
      Object.entries(guestMap).forEach(([id, item]) => {
        summaryMap[id] = {
          status: item.status,
          review_count: item.review_count,
          last_reviewed_at: item.last_reviewed_at,
          next_review_at: item.next_review_at,
        };
      });
      setProgressMap(summaryMap);
      return;
    }

    const supabase = createClient();

    // Fetch user profile for streak
    const { data: profile } = await supabase
      .from("profiles")
      .select("streak_count")
      .eq("id", currentUser.id)
      .maybeSingle();

    if (profile) {
      setStreakCount(profile.streak_count || 0);
    }

    // Fetch user progress
    const { data: rows } = await supabase
      .from("user_progress")
      .select("character_id, status, review_count, last_reviewed_at, next_review_at")
      .eq("user_id", currentUser.id);

    if (rows) {
      const dbMap: Record<string, ProgressItemSummary> = {};
      rows.forEach((r) => {
        dbMap[r.character_id] = {
          status: r.status as MasteryStatus,
          review_count: r.review_count,
          last_reviewed_at: r.last_reviewed_at,
          next_review_at: r.next_review_at,
        };
      });
      setProgressMap(dbMap);
    }
  }, []);

  useEffect(() => {
    let mounted = true;

    async function initAuth() {
      if (!isSupabaseConfigured()) {
        loadProgress(null);
        setLoading(false);
        return;
      }

      const supabase = createClient();
      const {
        data: { session },
      } = await supabase.auth.getSession();

      const currentUser = session?.user ?? null;
      if (mounted) {
        setUser(currentUser);
      }

      if (currentUser) {
        await mergeGuestProgressToUser(currentUser.id);
      }

      if (mounted) {
        await loadProgress(currentUser);
        setLoading(false);
      }

      const {
        data: { subscription },
      } = supabase.auth.onAuthStateChange(async (_event, newSession) => {
        const u = newSession?.user ?? null;
        if (!mounted) return;
        setUser(u);
        if (u) {
          await mergeGuestProgressToUser(u.id);
        }
        await loadProgress(u);
      });

      return () => {
        subscription.unsubscribe();
      };
    }

    initAuth();

    return () => {
      mounted = false;
    };
  }, [loadProgress]);

  const updateProgress = useCallback(
    async (characterId: string, status: MasteryStatus) => {
      const prev = progressMap[characterId];
      const newReviewCount = (prev?.review_count ?? 0) + 1;

      // Optimistic state update
      setProgressMap((curr) => ({
        ...curr,
        [characterId]: {
          status,
          review_count: newReviewCount,
          last_reviewed_at: new Date().toISOString(),
        },
      }));

      if (!user || !isSupabaseConfigured()) {
        saveGuestProgress(characterId, status);
        return;
      }

      try {
        await saveUserProgress(user.id, characterId, status);

        // Ping streak RPC endpoint after recording review
        fetch("/api/streak", { method: "POST" }).catch(() => {});
      } catch (err) {
        // Rollback on remote failure
        if (prev) {
          setProgressMap((curr) => ({ ...curr, [characterId]: prev }));
        }
        throw err;
      }
    },
    [user, progressMap]
  );

  return {
    user,
    isGuest: !user,
    loading,
    progressMap,
    streakCount,
    updateProgress,
    refreshProgress: () => loadProgress(user),
  };
}
