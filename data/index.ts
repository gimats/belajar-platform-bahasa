import { Character, CharacterSetCode, LanguageCode, LanguageOverview } from "@/types/flashcard";
import { HIRAGANA_CHARACTERS } from "./hiragana";
import { KATAKANA_CHARACTERS } from "./katakana";
import { KANJI_CHARACTERS } from "./kanji";
import { PINYIN_CHARACTERS } from "./pinyin";
import { PHONICS_CHARACTERS } from "./phonics";

export const ALL_CHARACTERS_BY_SET: Record<CharacterSetCode, Character[]> = {
  hiragana: HIRAGANA_CHARACTERS,
  katakana: KATAKANA_CHARACTERS,
  kanji: KANJI_CHARACTERS,
  pinyin: PINYIN_CHARACTERS,
  alphabet: PHONICS_CHARACTERS,
};

export const LANGUAGE_OVERVIEWS: LanguageOverview[] = [
  {
    code: "ja",
    name: "Bahasa Jepang",
    flag: "🇯🇵",
    description: "Kuasai ketiga sistem aksara Jepang dari nol: Hiragana, Katakana, dan 100 Kanji dasar JLPT N5.",
    sets: [
      {
        code: "hiragana",
        name: "Hiragana",
        totalCount: HIRAGANA_CHARACTERS.length,
        description: "46 aksara silabel dasar untuk kata asli Jepang dan partikel tata bahasa.",
      },
      {
        code: "katakana",
        name: "Katakana",
        totalCount: KATAKANA_CHARACTERS.length,
        description: "46 aksara silabel untuk kata serapan asing, nama negara, dan istilah modern.",
      },
      {
        code: "kanji",
        name: "Kanji Dasar (N5)",
        totalCount: KANJI_CHARACTERS.length,
        description: "100 huruf kanji frekuensi tertinggi untuk ujian JLPT N5 dengan bacaan on & kun.",
      },
    ],
  },
  {
    code: "zh",
    name: "Bahasa Mandarin",
    flag: "🇨🇳",
    description: "Fondasi pelafalan Mandarin standar: kuasai inisial, final khusus, dan variasi 4 nada pinyin.",
    sets: [
      {
        code: "pinyin",
        name: "Pinyin & 4 Nada",
        totalCount: PINYIN_CHARACTERS.length,
        description: "Inisial beraspirasi vs tidak beraspirasi, retrofleks (zh, ch, sh, r), dan 4 kontur nada.",
      },
    ],
  },
  {
    code: "en",
    name: "Bahasa Inggris",
    flag: "🇬🇧",
    description: "Perbaiki pelafalan dan pemahaman bunyi kata dengan phonics dan fonetik IPA sederhana.",
    sets: [
      {
        code: "alphabet",
        name: "Phonics & Fonetik",
        totalCount: PHONICS_CHARACTERS.length,
        description: "Vokal pendek vs panjang, konsonan ganda (th, sh, ch), dan huruf bisu (silent letters).",
      },
    ],
  },
];

export function getCharactersForSet(set: CharacterSetCode): Character[] {
  return ALL_CHARACTERS_BY_SET[set] || [];
}

export function getAllCharacters(): Character[] {
  return [
    ...HIRAGANA_CHARACTERS,
    ...KATAKANA_CHARACTERS,
    ...KANJI_CHARACTERS,
    ...PINYIN_CHARACTERS,
    ...PHONICS_CHARACTERS,
  ];
}
