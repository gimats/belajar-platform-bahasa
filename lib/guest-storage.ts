import { MasteryStatus } from "@/types/flashcard";
import { calculateNextReviewDate } from "./supabase/queries";
import { createClient, isSupabaseConfigured } from "./supabase/client";

const GUEST_STORAGE_KEY = "pbb_guest_progress_v1";

export interface GuestProgressItem {
  character_id: string;
  status: MasteryStatus;
  review_count: number;
  last_reviewed_at: string;
  next_review_at: string;
}

export function getGuestProgressMap(): Record<string, GuestProgressItem> {
  if (typeof window === "undefined") {
    return {};
  }

  try {
    const raw = localStorage.getItem(GUEST_STORAGE_KEY);
    if (!raw) return {};
    return JSON.parse(raw) as Record<string, GuestProgressItem>;
  } catch {
    return {};
  }
}

export function saveGuestProgress(characterId: string, status: MasteryStatus): GuestProgressItem {
  const currentMap = getGuestProgressMap();
  const existing = currentMap[characterId];
  const count = (existing?.review_count ?? 0) + 1;
  const now = new Date().toISOString();
  const nextReview = calculateNextReviewDate(status, count);

  const updatedItem: GuestProgressItem = {
    character_id: characterId,
    status,
    review_count: count,
    last_reviewed_at: now,
    next_review_at: nextReview,
  };

  currentMap[characterId] = updatedItem;

  try {
    localStorage.setItem(GUEST_STORAGE_KEY, JSON.stringify(currentMap));
  } catch {
    // Storage quota or private browsing exceptions handled silently
  }

  return updatedItem;
}

export function clearGuestProgress(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(GUEST_STORAGE_KEY);
  } catch {
    // Ignore errors on clear
  }
}

export async function mergeGuestProgressToUser(userId: string): Promise<number> {
  if (!isSupabaseConfigured() || typeof window === "undefined") {
    return 0;
  }

  const currentMap = getGuestProgressMap();
  const items = Object.values(currentMap);
  if (items.length === 0) return 0;

  const supabase = createClient();
  const payload = items.map((item) => ({
    user_id: userId,
    character_id: item.character_id,
    status: item.status,
    review_count: item.review_count,
    last_reviewed_at: item.last_reviewed_at,
    next_review_at: item.next_review_at,
    ease_factor: 2.5,
    interval_days: item.status === "mastered" ? 3 : 1,
  }));

  const { error } = await supabase
    .from("user_progress")
    .upsert(payload, { onConflict: "user_id,character_id" });

  if (!error) {
    clearGuestProgress();
    return items.length;
  }

  return 0;
}
