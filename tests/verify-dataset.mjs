import assert from "node:assert";

import { HIRAGANA_CHARACTERS } from "../data/hiragana.ts";
import { KATAKANA_CHARACTERS } from "../data/katakana.ts";
import { KANJI_CHARACTERS } from "../data/kanji.ts";
import { PINYIN_CHARACTERS } from "../data/pinyin.ts";
import { PHONICS_CHARACTERS } from "../data/phonics.ts";

console.log("Verifying dataset counts and uniqueness...");

// Verify Hiragana
assert.strictEqual(HIRAGANA_CHARACTERS.length, 46, "Hiragana must contain 46 base characters");
const hiraganaSymbols = new Set(HIRAGANA_CHARACTERS.map((c) => c.symbol));
assert.strictEqual(hiraganaSymbols.size, 46, "All Hiragana symbols must be unique");

// Verify Katakana
assert.strictEqual(KATAKANA_CHARACTERS.length, 46, "Katakana must contain 46 base characters");
const katakanaSymbols = new Set(KATAKANA_CHARACTERS.map((c) => c.symbol));
assert.strictEqual(katakanaSymbols.size, 46, "All Katakana symbols must be unique");

// Verify Kanji
assert.strictEqual(KANJI_CHARACTERS.length, 100, "Kanji must contain exactly 100 characters");
const kanjiSymbols = new Set(KANJI_CHARACTERS.map((c) => c.symbol));
assert.strictEqual(kanjiSymbols.size, 100, "All Kanji symbols must be unique");
KANJI_CHARACTERS.forEach((k) => {
  assert(k.meaning, `Kanji ${k.symbol} must have Indonesian meaning`);
  assert(k.reading_on || k.reading_kun, `Kanji ${k.symbol} must have on'yomi or kun'yomi reading`);
});

// Verify Pinyin
assert(PINYIN_CHARACTERS.length >= 20, "Pinyin must contain tones and initials");
const pinyinSymbols = new Set(PINYIN_CHARACTERS.map((c) => c.symbol));
assert.strictEqual(pinyinSymbols.size, PINYIN_CHARACTERS.length, "All Pinyin symbols must be unique");

// Verify Phonics
assert(PHONICS_CHARACTERS.length >= 20, "Phonics must contain English sound pairs");
const phonicsSymbols = new Set(PHONICS_CHARACTERS.map((c) => c.symbol));
assert.strictEqual(phonicsSymbols.size, PHONICS_CHARACTERS.length, "All Phonics symbols must be unique");

console.log("All dataset integrity assertions passed successfully!");
