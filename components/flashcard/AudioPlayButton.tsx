"use client";

import { useState } from "react";
import { Volume2, VolumeX, Loader2 } from "lucide-react";
import { speakText, SpeechLocale } from "@/lib/audio";

interface AudioPlayButtonProps {
  text: string;
  locale: SpeechLocale;
  size?: "sm" | "md" | "lg";
  className?: string;
  label?: string;
}

export function AudioPlayButton({
  text,
  locale,
  size = "md",
  className = "",
  label,
}: AudioPlayButtonProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handlePlay = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setErrorMessage(null);

    const result = await speakText(
      text,
      locale,
      () => setIsPlaying(true),
      () => setIsPlaying(false)
    );

    if (!result.success && result.message) {
      setErrorMessage(result.message);
      setTimeout(() => setErrorMessage(null), 3000);
    }
  };

  const sizeClasses = {
    sm: "p-1.5 text-xs",
    md: "p-2.5 text-sm",
    lg: "p-3.5 text-base",
  }[size];

  return (
    <div className="relative inline-flex items-center">
      <button
        type="button"
        onClick={handlePlay}
        disabled={isPlaying}
        aria-label={`Dengarkan pelafalan ${text}`}
        className={`inline-flex items-center gap-1.5 rounded-full font-medium transition-all shadow-sm ${
          isPlaying
            ? "bg-indigo-600 text-white ring-2 ring-indigo-300"
            : "bg-indigo-50 text-indigo-700 hover:bg-indigo-100 dark:bg-indigo-950/60 dark:text-indigo-300 dark:hover:bg-indigo-900/60"
        } ${sizeClasses} ${className}`}
      >
        {isPlaying ? (
          <Loader2 className="w-4 h-4 animate-spin text-white" />
        ) : errorMessage ? (
          <VolumeX className="w-4 h-4 text-rose-500" />
        ) : (
          <Volume2 className={`w-4 h-4 ${isPlaying ? "animate-pulse" : ""}`} />
        )}
        {label && <span>{label}</span>}
      </button>

      {errorMessage && (
        <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2.5 py-1 text-xs text-rose-700 bg-rose-50 border border-rose-200 rounded-lg shadow-md whitespace-nowrap z-50 animate-fade-in">
          {errorMessage}
        </div>
      )}
    </div>
  );
}
