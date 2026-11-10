import { Character } from "@/types/flashcard";

export const KATAKANA_CHARACTERS: Character[] = [
  // Vowels
  { id: "k-01", character_set_id: "katakana", symbol: "ア", romanization: "a", meaning: "Katakana vokal 'a'", example_word: "アイス (aisu)", example_meaning: "Es krim", display_order: 1 },
  { id: "k-02", character_set_id: "katakana", symbol: "イ", romanization: "i", meaning: "Katakana vokal 'i'", example_word: "インドネシア (indoneshia)", example_meaning: "Indonesia", display_order: 2 },
  { id: "k-03", character_set_id: "katakana", symbol: "ウ", romanization: "u", meaning: "Katakana vokal 'u'", example_word: "ウール (uuru)", example_meaning: "Wol", display_order: 3 },
  { id: "k-04", character_set_id: "katakana", symbol: "エ", romanization: "e", meaning: "Katakana vokal 'e'", example_word: "エレベーター (erebeetaa)", example_meaning: "Lift / Elevator", display_order: 4 },
  { id: "k-05", character_set_id: "katakana", symbol: "オ", romanization: "o", meaning: "Katakana vokal 'o'", example_word: "オレンジ (orenji)", example_meaning: "Jeruk", display_order: 5 },

  // K-line
  { id: "k-06", character_set_id: "katakana", symbol: "カ", romanization: "ka", meaning: "Katakana k + a", example_word: "カメラ (kamera)", example_meaning: "Kamera", display_order: 6 },
  { id: "k-07", character_set_id: "katakana", symbol: "キ", romanization: "ki", meaning: "Katakana k + i", example_word: "キッチン (kicchin)", example_meaning: "Dapur", display_order: 7 },
  { id: "k-08", character_set_id: "katakana", symbol: "ク", romanization: "ku", meaning: "Katakana k + u", example_word: "クラス (kurasu)", example_meaning: "Kelas", display_order: 8 },
  { id: "k-09", character_set_id: "katakana", symbol: "ケ", romanization: "ke", meaning: "Katakana k + e", example_word: "ケーキ (keeki)", example_meaning: "Kue / Cake", display_order: 9 },
  { id: "k-10", character_set_id: "katakana", symbol: "コ", romanization: "ko", meaning: "Katakana k + o", example_word: "コーヒー (koohii)", example_meaning: "Kopi", display_order: 10 },

  // S-line
  { id: "k-11", character_set_id: "katakana", symbol: "サ", romanization: "sa", meaning: "Katakana s + a", example_word: "サラダ (sarada)", example_meaning: "Salad", display_order: 11 },
  { id: "k-12", character_set_id: "katakana", symbol: "シ", romanization: "shi", meaning: "Katakana sh + i ('syi')", example_word: "シャツ (shatsu)", example_meaning: "Kemeja / Kaos", display_order: 12 },
  { id: "k-13", character_set_id: "katakana", symbol: "ス", romanization: "su", meaning: "Katakana s + u", example_word: "スポーツ (supootsu)", example_meaning: "Olahraga", display_order: 13 },
  { id: "k-14", character_set_id: "katakana", symbol: "セ", romanization: "se", meaning: "Katakana s + e", example_word: "セーター (seetaa)", example_meaning: "Sweter", display_order: 14 },
  { id: "k-15", character_set_id: "katakana", symbol: "ソ", romanization: "so", meaning: "Katakana s + o", example_word: "ソファ (sofa)", example_meaning: "Sofa", display_order: 15 },

  // T-line
  { id: "k-16", character_set_id: "katakana", symbol: "タ", romanization: "ta", meaning: "Katakana t + a", example_word: "タクシー (takushii)", example_meaning: "Taksi", display_order: 16 },
  { id: "k-17", character_set_id: "katakana", symbol: "チ", romanization: "chi", meaning: "Katakana ch + i ('ci')", example_word: "チーズ (chiizu)", example_meaning: "Keju", display_order: 17 },
  { id: "k-18", character_set_id: "katakana", symbol: "ツ", romanization: "tsu", meaning: "Katakana ts + u ('tsu')", example_word: "ツアー (tsuaa)", example_meaning: "Tur / Wisata", display_order: 18 },
  { id: "k-19", character_set_id: "katakana", symbol: "テ", romanization: "te", meaning: "Katakana t + e", example_word: "テレビ (terebi)", example_meaning: "Televisi", display_order: 19 },
  { id: "k-20", character_set_id: "katakana", symbol: "ト", romanization: "to", meaning: "Katakana t + o", example_word: "トマト (tomato)", example_meaning: "Tomat", display_order: 20 },

  // N-line
  { id: "k-21", character_set_id: "katakana", symbol: "ナ", romanization: "na", meaning: "Katakana n + a", example_word: "ナイフ (naifu)", example_meaning: "Pisau", display_order: 21 },
  { id: "k-22", character_set_id: "katakana", symbol: "ニ", romanization: "ni", meaning: "Katakana n + i", example_word: "ニュース (nyuusu)", example_meaning: "Berita", display_order: 22 },
  { id: "k-23", character_set_id: "katakana", symbol: "ヌ", romanization: "nu", meaning: "Katakana n + u", example_word: "ヌードル (nuudoru)", example_meaning: "Mi", display_order: 23 },
  { id: "k-24", character_set_id: "katakana", symbol: "ネ", romanization: "ne", meaning: "Katakana n + e", example_word: "ネクタイ (nekutai)", example_meaning: "Dasi", display_order: 24 },
  { id: "k-25", character_set_id: "katakana", symbol: "ノ", romanization: "no", meaning: "Katakana n + o", example_word: "ノート (nooto)", example_meaning: "Buku catatan", display_order: 25 },

  // H-line
  { id: "k-26", character_set_id: "katakana", symbol: "ハ", romanization: "ha", meaning: "Katakana h + a", example_word: "ハンバーガー (hanbaagaa)", example_meaning: "Hamburger", display_order: 26 },
  { id: "k-27", character_set_id: "katakana", symbol: "ヒ", romanization: "hi", meaning: "Katakana h + i", example_word: "ヒーター (hiitaa)", example_meaning: "Pemanas ruangan", display_order: 27 },
  { id: "k-28", character_set_id: "katakana", symbol: "フ", romanization: "fu", meaning: "Katakana f/h + u", example_word: "フォーク (fooku)", example_meaning: "Garpu", display_order: 28 },
  { id: "k-29", character_set_id: "katakana", symbol: "ヘ", romanization: "he", meaning: "Katakana h + e", example_word: "ヘルメット (herumetto)", example_meaning: "Helm", display_order: 29 },
  { id: "k-30", character_set_id: "katakana", symbol: "ホ", romanization: "ho", meaning: "Katakana h + o", example_word: "ホテル (hoteru)", example_meaning: "Hotel", display_order: 30 },

  // M-line
  { id: "k-31", character_set_id: "katakana", symbol: "マ", romanization: "ma", meaning: "Katakana m + a", example_word: "マスク (masuku)", example_meaning: "Masker", display_order: 31 },
  { id: "k-32", character_set_id: "katakana", symbol: "ミ", romanization: "mi", meaning: "Katakana m + i", example_word: "ミルク (miruku)", example_meaning: "Susu", display_order: 32 },
  { id: "k-33", character_set_id: "katakana", symbol: "ム", romanization: "mu", meaning: "Katakana m + u", example_word: "ムービー (muubii)", example_meaning: "Film / Movie", display_order: 33 },
  { id: "k-34", character_set_id: "katakana", symbol: "メ", romanization: "me", meaning: "Katakana m + e", example_word: "メニュー (menyuu)", example_meaning: "Menu", display_order: 34 },
  { id: "k-35", character_set_id: "katakana", symbol: "モ", romanization: "mo", meaning: "Katakana m + o", example_word: "モデル (moderu)", example_meaning: "Model", display_order: 35 },

  // Y-line
  { id: "k-36", character_set_id: "katakana", symbol: "ヤ", romanization: "ya", meaning: "Katakana y + a", example_word: "ヤシ (yashi)", example_meaning: "Pohon kelapa", display_order: 36 },
  { id: "k-37", character_set_id: "katakana", symbol: "ユ", romanization: "yu", meaning: "Katakana y + u", example_word: "ユーザー (yuuzaa)", example_meaning: "Pengguna / User", display_order: 37 },
  { id: "k-38", character_set_id: "katakana", symbol: "ヨ", romanization: "yo", meaning: "Katakana y + o", example_word: "ヨーグルト (yooguruto)", example_meaning: "Yogurt", display_order: 38 },

  // R-line
  { id: "k-39", character_set_id: "katakana", symbol: "ラ", romanization: "ra", meaning: "Katakana r + a", example_word: "ラジオ (rajio)", example_meaning: "Radio", display_order: 39 },
  { id: "k-40", character_set_id: "katakana", symbol: "リ", romanization: "ri", meaning: "Katakana r + i", example_word: "リモコン (rimokon)", example_meaning: "Remot kontrol", display_order: 40 },
  { id: "k-41", character_set_id: "katakana", symbol: "ル", romanization: "ru", meaning: "Katakana r + u", example_word: "ルール (ruuru)", example_meaning: "Peraturan / Rule", display_order: 41 },
  { id: "k-42", character_set_id: "katakana", symbol: "レ", romanization: "re", meaning: "Katakana r + e", example_word: "レストラン (resutoran)", example_meaning: "Restoran", display_order: 42 },
  { id: "k-43", character_set_id: "katakana", symbol: "ロ", romanization: "ro", meaning: "Katakana r + o", example_word: "ロボット (robotto)", example_meaning: "Robot", display_order: 43 },

  // W-line and N
  { id: "k-44", character_set_id: "katakana", symbol: "ワ", romanization: "wa", meaning: "Katakana w + a", example_word: "ワイン (wain)", example_meaning: "Anggur / Wine", display_order: 44 },
  { id: "k-45", character_set_id: "katakana", symbol: "ヲ", romanization: "wo / o", meaning: "Katakana partikel objek", example_word: "ヲ (wo)", example_meaning: "Penanda objek", display_order: 45 },
  { id: "k-46", character_set_id: "katakana", symbol: "ン", romanization: "n", meaning: "Katakana sengau 'n'", example_word: "パン (pan)", example_meaning: "Roti", display_order: 46 },
];
