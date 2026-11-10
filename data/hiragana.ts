import { Character } from "@/types/flashcard";

export const HIRAGANA_CHARACTERS: Character[] = [
  // Vowels
  { id: "h-01", character_set_id: "hiragana", symbol: "あ", romanization: "a", meaning: "Bunyi vokal 'a'", example_word: "あさ (asa)", example_meaning: "Pagi", display_order: 1 },
  { id: "h-02", character_set_id: "hiragana", symbol: "い", romanization: "i", meaning: "Bunyi vokal 'i'", example_word: "いぬ (inu)", example_meaning: "Anjing", display_order: 2 },
  { id: "h-03", character_set_id: "hiragana", symbol: "う", romanization: "u", meaning: "Bunyi vokal 'u' (bibir rileks)", example_word: "うみ (umi)", example_meaning: "Laut", display_order: 3 },
  { id: "h-04", character_set_id: "hiragana", symbol: "え", romanization: "e", meaning: "Bunyi vokal 'e'", example_word: "えき (eki)", example_meaning: "Stasiun", display_order: 4 },
  { id: "h-05", character_set_id: "hiragana", symbol: "お", romanization: "o", meaning: "Bunyi vokal 'o'", example_word: "おかね (okane)", example_meaning: "Uang", display_order: 5 },

  // K-line
  { id: "h-06", character_set_id: "hiragana", symbol: "か", romanization: "ka", meaning: "Konsonan k + a", example_word: "かさ (kasa)", example_meaning: "Payung", display_order: 6 },
  { id: "h-07", character_set_id: "hiragana", symbol: "き", romanization: "ki", meaning: "Konsonan k + i", example_word: "き (ki)", example_meaning: "Pohon", display_order: 7 },
  { id: "h-08", character_set_id: "hiragana", symbol: "く", romanization: "ku", meaning: "Konsonan k + u", example_word: "くるま (kuruma)", example_meaning: "Mobil", display_order: 8 },
  { id: "h-09", character_set_id: "hiragana", symbol: "け", romanization: "ke", meaning: "Konsonan k + e", example_word: "けさ (kesa)", example_meaning: "Pagi ini", display_order: 9 },
  { id: "h-10", character_set_id: "hiragana", symbol: "こ", romanization: "ko", meaning: "Konsonan k + o", example_word: "こども (kodomo)", example_meaning: "Anak-anak", display_order: 10 },

  // S-line
  { id: "h-11", character_set_id: "hiragana", symbol: "さ", romanization: "sa", meaning: "Konsonan s + a", example_word: "さかな (sakana)", example_meaning: "Ikan", display_order: 11 },
  { id: "h-12", character_set_id: "hiragana", symbol: "し", romanization: "shi", meaning: "Konsonan sh + i (mirip 'syi')", example_word: "しろ (shiro)", example_meaning: "Putih", display_order: 12 },
  { id: "h-13", character_set_id: "hiragana", symbol: "す", romanization: "su", meaning: "Konsonan s + u", example_word: "すし (sushi)", example_meaning: "Sushi", display_order: 13 },
  { id: "h-14", character_set_id: "hiragana", symbol: "せ", romanization: "se", meaning: "Konsonan s + e", example_word: "せんせい (sensei)", example_meaning: "Guru", display_order: 14 },
  { id: "h-15", character_set_id: "hiragana", symbol: "そ", romanization: "so", meaning: "Konsonan s + o", example_word: "そら (sora)", example_meaning: "Langit", display_order: 15 },

  // T-line
  { id: "h-16", character_set_id: "hiragana", symbol: "た", romanization: "ta", meaning: "Konsonan t + a", example_word: "たまご (tamago)", example_meaning: "Telur", display_order: 16 },
  { id: "h-17", character_set_id: "hiragana", symbol: "ち", romanization: "chi", meaning: "Konsonan ch + i ('ci')", example_word: "ちず (chizu)", example_meaning: "Peta", display_order: 17 },
  { id: "h-18", character_set_id: "hiragana", symbol: "つ", romanization: "tsu", meaning: "Konsonan ts + u ('tsu')", example_word: "つき (tsuki)", example_meaning: "Bulan", display_order: 18 },
  { id: "h-19", character_set_id: "hiragana", symbol: "て", romanization: "te", meaning: "Konsonan t + e", example_word: "て (te)", example_meaning: "Tangan", display_order: 19 },
  { id: "h-20", character_set_id: "hiragana", symbol: "と", romanization: "to", meaning: "Konsonan t + o", example_word: "ともだち (tomodachi)", example_meaning: "Teman", display_order: 20 },

  // N-line
  { id: "h-21", character_set_id: "hiragana", symbol: "な", romanization: "na", meaning: "Konsonan n + a", example_word: "なつ (natsu)", example_meaning: "Musim panas", display_order: 21 },
  { id: "h-22", character_set_id: "hiragana", symbol: "に", romanization: "ni", meaning: "Konsonan n + i", example_word: "にほん (nihon)", example_meaning: "Jepang", display_order: 22 },
  { id: "h-23", character_set_id: "hiragana", symbol: "ぬ", romanization: "nu", meaning: "Konsonan n + u", example_word: "いぬ (inu)", example_meaning: "Anjing", display_order: 23 },
  { id: "h-24", character_set_id: "hiragana", symbol: "ね", romanization: "ne", meaning: "Konsonan n + e", example_word: "ねこ (neko)", example_meaning: "Kucing", display_order: 24 },
  { id: "h-25", character_set_id: "hiragana", symbol: "の", romanization: "no", meaning: "Konsonan n + o", example_word: "のみもの (nomimono)", example_meaning: "Minuman", display_order: 25 },

  // H-line
  { id: "h-26", character_set_id: "hiragana", symbol: "は", romanization: "ha", meaning: "Konsonan h + a", example_word: "はな (hana)", example_meaning: "Bunga", display_order: 26 },
  { id: "h-27", character_set_id: "hiragana", symbol: "ひ", romanization: "hi", meaning: "Konsonan h + i", example_word: "ひと (hito)", example_meaning: "Orang", display_order: 27 },
  { id: "h-28", character_set_id: "hiragana", symbol: "ふ", romanization: "fu", meaning: "Konsonan f/h + u (tiupan bibir)", example_word: "ふね (fune)", example_meaning: "Kapal laut", display_order: 28 },
  { id: "h-29", character_set_id: "hiragana", symbol: "へ", romanization: "he", meaning: "Konsonan h + e", example_word: "へや (heya)", example_meaning: "Kamar", display_order: 29 },
  { id: "h-30", character_set_id: "hiragana", symbol: "ほ", romanization: "ho", meaning: "Konsonan h + o", example_word: "ほん (hon)", example_meaning: "Buku", display_order: 30 },

  // M-line
  { id: "h-31", character_set_id: "hiragana", symbol: "ま", romanization: "ma", meaning: "Konsonan m + a", example_word: "まち (machi)", example_meaning: "Kota", display_order: 31 },
  { id: "h-32", character_set_id: "hiragana", symbol: "み", romanization: "mi", meaning: "Konsonan m + i", example_word: "みず (mizu)", example_meaning: "Air", display_order: 32 },
  { id: "h-33", character_set_id: "hiragana", symbol: "む", romanization: "mu", meaning: "Konsonan m + u", example_word: "むし (mushi)", example_meaning: "Serangga", display_order: 33 },
  { id: "h-34", character_set_id: "hiragana", symbol: "め", romanization: "me", meaning: "Konsonan m + e", example_word: "め (me)", example_meaning: "Mata", display_order: 34 },
  { id: "h-35", character_set_id: "hiragana", symbol: "も", romanization: "mo", meaning: "Konsonan m + o", example_word: "もり (mori)", example_meaning: "Hutan", display_order: 35 },

  // Y-line
  { id: "h-36", character_set_id: "hiragana", symbol: "や", romanization: "ya", meaning: "Semi-vokal y + a", example_word: "やま (yama)", example_meaning: "Gunung", display_order: 36 },
  { id: "h-37", character_set_id: "hiragana", symbol: "ゆ", romanization: "yu", meaning: "Semi-vokal y + u", example_word: "ゆき (yuki)", example_meaning: "Salju", display_order: 37 },
  { id: "h-38", character_set_id: "hiragana", symbol: "よ", romanization: "yo", meaning: "Semi-vokal y + o", example_word: "よる (yoru)", example_meaning: "Malam", display_order: 38 },

  // R-line
  { id: "h-39", character_set_id: "hiragana", symbol: "ら", romanization: "ra", meaning: "Konsonan r/l + a (sentuhan ujung lidah)", example_word: "らいねん (rainen)", example_meaning: "Tahun depan", display_order: 39 },
  { id: "h-40", character_set_id: "hiragana", symbol: "り", romanization: "ri", meaning: "Konsonan r/l + i", example_word: "りんご (ringo)", example_meaning: "Apel", display_order: 40 },
  { id: "h-41", character_set_id: "hiragana", symbol: "る", romanization: "ru", meaning: "Konsonan r/l + u", example_word: "よる (yoru)", example_meaning: "Malam", display_order: 41 },
  { id: "h-42", character_set_id: "hiragana", symbol: "れ", romanization: "re", meaning: "Konsonan r/l + e", example_word: "れきし (rekishi)", example_meaning: "Sejarah", display_order: 42 },
  { id: "h-43", character_set_id: "hiragana", symbol: "ろ", romanization: "ro", meaning: "Konsonan r/l + o", example_word: "ろうそく (rousoku)", example_meaning: "Lilin", display_order: 43 },

  // W-line and N
  { id: "h-44", character_set_id: "hiragana", symbol: "わ", romanization: "wa", meaning: "Semi-vokal w + a", example_word: "わたし (watashi)", example_meaning: "Saya", display_order: 44 },
  { id: "h-45", character_set_id: "hiragana", symbol: "を", romanization: "wo / o", meaning: "Partikel penanda objek", example_word: "みずをのむ (mizu o nomu)", example_meaning: "Minum air", display_order: 45 },
  { id: "h-46", character_set_id: "hiragana", symbol: "ん", romanization: "n", meaning: "Konsonan nasal sengau akhir", example_word: "ほん (hon)", example_meaning: "Buku", display_order: 46 },
];
