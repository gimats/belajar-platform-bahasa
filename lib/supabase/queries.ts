import { Character, CharacterSetCode, MasteryStatus, UserProgress } from "@/types/flashcard";
import { getCharactersForSet } from "@/data";
import { createClient, isSupabaseConfigured } from "./client";

export async function fetchCharacters(setCode: CharacterSetCode): Promise<Character[]> {
  const localCharacters = getCharactersForSet(setCode);

  if (!isSupabaseConfigured()) {
    return localCharacters;
  }

  try {
    const supabase = createClient();
    const { data: setData } = await supabase
      .from("character_sets")
      .select("id")
      .eq("code", setCode)
      .maybeSingle();

    if (!setData?.id) {
      return localCharacters;
    }

    const { data, error } = await supabase
      .from("characters")
      .select("*")
      .eq("character_set_id", setData.id)
      .order("display_order", { ascending: true });

    if (error || !data || data.length === 0) {
      return localCharacters;
    }

    return data as Character[];
  } catch {
    return localCharacters;
  }
}

export function calculateNextReviewDate(status: MasteryStatus, currentReviewCount: number): string {
  const now = new Date();
  const daysToAdd = status === "mastered" ? Math.max(3, currentReviewCount * 2) : 1;
  now.setDate(now.getDate() + daysToAdd);
  return now.toISOString();
}

export async function saveUserProgress(
  userId: string,
  characterId: string,
  status: MasteryStatus,
  existingProgress?: UserProgress
): Promise<UserProgress> {
  const reviewCount = (existingProgress?.review_count ?? 0) + 1;
  const nextReviewAt = calculateNextReviewDate(status, reviewCount);
  const now = new Date().toISOString();

  const progressRecord: Partial<UserProgress> = {
    user_id: userId,
    character_id: characterId,
    status,
    review_count: reviewCount,
    last_reviewed_at: now,
    next_review_at: nextReviewAt,
    ease_factor: existingProgress?.ease_factor ?? 2.5,
    interval_days: status === "mastered" ? Math.max(3, reviewCount * 2) : 1,
  };

  const supabase = createClient();
  const { data, error } = await supabase
    .from("user_progress")
    .upsert(progressRecord, { onConflict: "user_id,character_id" })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data as UserProgress;
}
