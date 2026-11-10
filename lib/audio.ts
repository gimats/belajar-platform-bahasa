export type SpeechLocale = "ja-JP" | "zh-CN" | "en-US";

let cachedVoices: SpeechSynthesisVoice[] = [];

function loadVoices(): Promise<SpeechSynthesisVoice[]> {
  return new Promise((resolve) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      resolve([]);
      return;
    }

    const immediate = window.speechSynthesis.getVoices();
    if (immediate.length > 0) {
      cachedVoices = immediate;
      resolve(immediate);
      return;
    }

    const onVoicesChanged = () => {
      const voices = window.speechSynthesis.getVoices();
      cachedVoices = voices;
      window.speechSynthesis.removeEventListener("voiceschanged", onVoicesChanged);
      resolve(voices);
    };

    window.speechSynthesis.addEventListener("voiceschanged", onVoicesChanged);

    // Fallback if voiceschanged never fires (some browsers)
    setTimeout(() => {
      resolve(window.speechSynthesis.getVoices());
    }, 500);
  });
}

export async function speakText(
  text: string,
  locale: SpeechLocale,
  onStart?: () => void,
  onEnd?: () => void
): Promise<{ success: boolean; message?: string }> {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    return {
      success: false,
      message: "Browser Anda tidak mendukung Web Speech API untuk pelafalan suara.",
    };
  }

  try {
    window.speechSynthesis.cancel();

    const voices = cachedVoices.length > 0 ? cachedVoices : await loadVoices();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = locale;

    // Find preferred voice matching the language prefix (e.g. 'ja', 'zh', 'en')
    const langPrefix = locale.split("-")[0];
    const matchingVoice =
      voices.find((v) => v.lang.toLowerCase() === locale.toLowerCase()) ||
      voices.find((v) => v.lang.toLowerCase().startsWith(langPrefix));

    if (matchingVoice) {
      utterance.voice = matchingVoice;
    }

    utterance.rate = 0.85; // slightly slower for language learners
    utterance.pitch = 1.0;

    return new Promise((resolve) => {
      utterance.onstart = () => {
        onStart?.();
      };

      utterance.onend = () => {
        onEnd?.();
        resolve({ success: true });
      };

      utterance.onerror = (event) => {
        onEnd?.();
        // Ignore interrupted speech caused by user fast-clicking
        if (event.error === "interrupted" || event.error === "canceled") {
          resolve({ success: true });
          return;
        }
        resolve({
          success: false,
          message: `Gagal memutar audio (${event.error}). Pastikan paket suara ${locale} aktif di perangkat.`,
        });
      };

      window.speechSynthesis.speak(utterance);
    });
  } catch (err) {
    onEnd?.();
    return {
      success: false,
      message: err instanceof Error ? err.message : "Terjadi kesalahan audio.",
    };
  }
}
