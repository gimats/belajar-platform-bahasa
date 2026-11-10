import type { Metadata } from "next";
import { Inter, Noto_Sans_JP, Noto_Sans_SC } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-noto-jp",
  weight: ["400", "700"],
  display: "swap",
});

const notoSansSC = Noto_Sans_SC({
  subsets: ["latin"],
  variable: "--font-noto-sc",
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Belajar Aksara — Flashcard Jepang, Mandarin, & English",
  description:
    "Hafalkan aksara dasar Hiragana, Katakana, Kanji N5, Pinyin 4 Nada, dan Fonetik Phonics English secara terstruktur dengan audio pelafalan asli.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="id"
      className={`${inter.variable} ${notoSansJP.variable} ${notoSansSC.variable}`}
    >
      <body className="antialiased flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-1 flex flex-col">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
