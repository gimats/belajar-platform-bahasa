import { LanguageCode, CharacterSetCode } from "@/types/flashcard";

export const LANGUAGE_SLUG_MAP: Record<string, LanguageCode> = {
  japanese: "ja",
  jepang: "ja",
  ja: "ja",
  mandarin: "zh",
  chinese: "zh",
  zh: "zh",
  english: "en",
  inggris: "en",
  en: "en",
};

export const LANGUAGE_DISPLAY: Record<LanguageCode, { name: string; slug: string; speechLocale: string }> = {
  ja: { name: "Jepang", slug: "japanese", speechLocale: "ja-JP" },
  zh: { name: "Mandarin", slug: "mandarin", speechLocale: "zh-CN" },
  en: { name: "English", slug: "english", speechLocale: "en-US" },
};

export const SET_SLUG_MAP: Record<string, CharacterSetCode> = {
  hiragana: "hiragana",
  katakana: "katakana",
  kanji: "kanji",
  pinyin: "pinyin",
  alphabet: "alphabet",
  phonics: "alphabet",
  fonetik: "alphabet",
};

export const SET_DISPLAY: Record<CharacterSetCode, { name: string; languageCode: LanguageCode; description: string }> = {
  hiragana: {
    name: "Hiragana",
    languageCode: "ja",
    description: "Aksara fonetik dasar untuk kata asli bahasa Jepang dan partikel tata bahasa.",
  },
  katakana: {
    name: "Katakana",
    languageCode: "ja",
    description: "Aksara fonetik untuk kata serapan asing, nama negara, dan onomatope.",
  },
  kanji: {
    name: "Kanji Dasar (N5)",
    languageCode: "ja",
    description: "Karakter ideografis tingkat pemula dengan bacaan on'yomi dan kun'yomi.",
  },
  pinyin: {
    name: "Pinyin & Nada",
    languageCode: "zh",
    description: "Sistem fonetik Mandarin (inisial, final, dan 4 nada) beserta contoh kata.",
  },
  alphabet: {
    name: "Fonetik & Phonics",
    languageCode: "en",
    description: "Pasangan huruf-bunyi, konsonan ganda, vokal panjang, dan simbol fonetik IPA.",
  },
};

export function resolveLanguage(slug: string): LanguageCode | null {
  return LANGUAGE_SLUG_MAP[slug.toLowerCase()] ?? null;
}

export function resolveSet(slug: string): CharacterSetCode | null {
  return SET_SLUG_MAP[slug.toLowerCase()] ?? null;
}

export function isValidLanguageSet(lang: LanguageCode, set: CharacterSetCode): boolean {
  return SET_DISPLAY[set]?.languageCode === lang;
}
