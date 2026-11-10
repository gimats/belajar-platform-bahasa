import Link from "next/link";
import { ArrowLeft, BookCheck, ShieldCheck, Database } from "lucide-react";

export const metadata = {
  title: "Tentang & Atribusi Dataset — Belajar Aksara",
  description: "Dokumentasi sumber data terbuka, lisensi, dan metodologi kurasi konten aksara.",
};

export default function AboutPage() {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 sm:py-12 space-y-8">
      <Link
        href="/"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Kembali ke Beranda</span>
      </Link>

      <div className="space-y-2">
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-50">
          Tentang &amp; Atribusi Dataset
        </h1>
        <p className="text-sm text-slate-500 max-w-2xl leading-relaxed">
          Belajar Aksara adalah platform flashcard edukatif mandiri untuk membantu pembelajar bahasa asal Indonesia menguasai simbol aksara dan fonetik dasar tanpa biaya.
        </p>
      </div>

      <div className="space-y-6">
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold">
            <Database className="w-5 h-5" />
            <h2 className="text-lg">Sumber Terbuka &amp; Lisensi Dataset</h2>
          </div>

          <div className="space-y-4 text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-1">
              <strong className="text-slate-900 dark:text-slate-100 block text-sm">
                1. Bahasa Jepang (Hiragana, Katakana, &amp; Kanji N5)
              </strong>
              <p>
                Data kanji dan bacaan on&apos;yomi/kun&apos;yomi mengacu pada Electronic Dictionary Research and Development Group (EDRDG) melalui file <em>KANJIDIC2</em> dan <em>RADKFILE</em>. Penggunaan berlisensi <strong>Creative Commons Attribution-ShareAlike 3.0 (CC BY-SA 3.0)</strong>. Seluruh terjemahan arti dan contoh kata telah diterjemahkan dan diverifikasi ke dalam Bahasa Indonesia.
              </p>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-1">
              <strong className="text-slate-900 dark:text-slate-100 block text-sm">
                2. Bahasa Mandarin (Pinyin &amp; 4 Nada)
              </strong>
              <p>
                Sistem Pinyin mengacu pada skema Hanyu Pinyin resmi ISO 7098:2015 dan database Unihan Unicode Consortium. Nada dianalisis berdasarkan 4 kontur nada standar Mandarin (5-5, 3-5, 2-1-4, 5-1) dengan panduan artikulasi praktis untuk penutur Bahasa Indonesia.
              </p>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-100 dark:border-slate-800 space-y-1">
              <strong className="text-slate-900 dark:text-slate-100 block text-sm">
                3. Bahasa Inggris (Phonics &amp; Simbol Fonetik IPA)
              </strong>
              <p>
                Alfabet fonetik menggunakan standar International Phonetic Alphabet (IPA) yang disesuaikan untuk mengatasi hambatan fonetik umum penutur Indonesia (seperti pembedaan vokal pendek/panjang, voiceless /θ/ vs voiced /ð/, dan konsonan bisu).
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-3 shadow-sm">
          <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400 font-bold">
            <BookCheck className="w-5 h-5" />
            <h2 className="text-lg">Prinsip Audio Web Speech API</h2>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Audio pelafalan diproduksi langsung melalui mesin sintesis ucapan bawaan perangkat Anda (Web Speech API) dengan locale <code>ja-JP</code> untuk Jepang, <code>zh-CN</code> untuk Mandarin, dan <code>en-US</code> untuk English. Tanpa ketergantungan server audio pihak ketiga yang lambat.
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-3 shadow-sm">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold">
            <ShieldCheck className="w-5 h-5" />
            <h2 className="text-lg">Kepatuhan Privasi Data</h2>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Kami menghormati hak privasi Anda sesuai UU No. 27 Tahun 2022 (PDP). Pengguna tamu tidak pernah dimintai data pribadi. Bagi pengguna terdaftar, data hanya digunakan untuk menyimpan riwayat hafalan kartu dan streak belajar. Anda berhak menghapus akun kapan saja melalui halaman Dashboard.
          </p>
          <div className="pt-2">
            <Link
              href="/privacy"
              className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              Baca Kebijakan Privasi Lengkap &rarr;
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
