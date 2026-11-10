import { notFound } from "next/navigation";
import { resolveLanguage, resolveSet, isValidLanguageSet, SET_DISPLAY, LANGUAGE_DISPLAY } from "@/lib/route-map";
import { fetchCharacters } from "@/lib/supabase/queries";
import { FlashcardDeck } from "@/components/flashcard/FlashcardDeck";
import type { Metadata } from "next";

interface FlashcardPageProps {
  params: {
    lang: string;
    set: string;
  };
}

export async function generateMetadata({ params }: FlashcardPageProps): Promise<Metadata> {
  const langCode = resolveLanguage(params.lang);
  const setCode = resolveSet(params.set);

  if (!langCode || !setCode || !isValidLanguageSet(langCode, setCode)) {
    return { title: "Set Tidak Ditemukan" };
  }

  const setMeta = SET_DISPLAY[setCode];
  const langMeta = LANGUAGE_DISPLAY[langCode];

  return {
    title: `Flashcard ${setMeta.name} — ${langMeta.name} | Belajar Aksara`,
    description: `Pelajari dan hafalkan aksara ${setMeta.name} (${langMeta.name}) dengan metode flashcard dan audio asli.`,
  };
}

export default async function FlashcardPage({ params }: FlashcardPageProps) {
  const langCode = resolveLanguage(params.lang);
  const setCode = resolveSet(params.set);

  if (!langCode || !setCode || !isValidLanguageSet(langCode, setCode)) {
    notFound();
  }

  const characters = await fetchCharacters(setCode);

  return (
    <div className="flex-1 flex flex-col justify-center items-center py-4 sm:py-8">
      <FlashcardDeck
        characters={characters}
        languageCode={langCode}
        characterSetCode={setCode}
      />
    </div>
  );
}
