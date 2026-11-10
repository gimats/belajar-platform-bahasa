export type LanguageCode = "ja" | "zh" | "en";
export type CharacterSetCode = "hiragana" | "katakana" | "kanji" | "pinyin" | "alphabet";
export type MasteryStatus = "new" | "learning" | "mastered";

export interface Language {
  id: string;
  code: LanguageCode;
  name: string;
}

export interface CharacterSet {
  id: string;
  language_id: string;
  code: CharacterSetCode;
  name: string;
  display_order: number;
}

export interface Character {
  id: string;
  character_set_id: string;
  symbol: string;
  romanization?: string;
  reading_on?: string;
  reading_kun?: string;
  tone?: string;
  meaning?: string;
  example_word?: string;
  example_reading?: string;
  example_meaning?: string;
  audio_url?: string;
  stroke_order_url?: string;
  level?: string;
  display_order: number;
}

export interface UserProgress {
  id: string;
  user_id: string;
  character_id: string;
  status: MasteryStatus;
  review_count: number;
  last_reviewed_at?: string;
  next_review_at?: string;
  ease_factor: number;
  interval_days: number;
}

export interface Profile {
  id: string;
  display_name?: string;
  avatar_url?: string;
  streak_count: number;
  last_active_at?: string;
}

export interface SessionStats {
  totalReviewed: number;
  masteredCount: number;
  learningCount: number;
}

export interface LanguageOverview {
  code: LanguageCode;
  name: string;
  flag: string;
  description: string;
  sets: {
    code: CharacterSetCode;
    name: string;
    totalCount: number;
    description: string;
  }[];
}
