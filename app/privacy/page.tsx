import Link from "next/link";
import { ArrowLeft, Shield } from "lucide-react";

export const metadata = {
  title: "Kebijakan Privasi — Belajar Aksara",
  description: "Kebijakan perlindungan data pribadi pengguna sesuai UU No. 27 Tahun 2022.",
};

export default function PrivacyPage() {
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
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 text-xs font-semibold rounded-full">
          <Shield className="w-3.5 h-3.5" />
          <span>Kepatuhan UU No. 27 Tahun 2022</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-slate-50">
          Kebijakan Privasi &amp; Perlindungan Data Pribadi
        </h1>
        <p className="text-xs text-slate-400">
          Terakhir diperbarui: 11 November 2026
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 space-y-6 text-xs text-slate-600 dark:text-slate-400 leading-relaxed shadow-sm">
        <section className="space-y-2">
          <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100">
            1. Prinsip Pengumpulan Data
          </h2>
          <p>
            Belajar Aksara berkomitmen melindungi data pribadi pengguna sesuai ketentuan Undang-Undang Republik Indonesia Nomor 27 Tahun 2022 tentang Pelindungan Data Pribadi (UU PDP).
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong>Mode Tamu (Guest Mode):</strong> Kami tidak mengumpulkan nama, email, maupun data identitas apa pun. Riwayat belajar Anda disimpan secara eksklusif di memori lokal peramban (localStorage) perangkat Anda.
            </li>
            <li>
              <strong>Pengguna Terdaftar:</strong> Kami hanya mengumpulkan alamat email dan nama tampilan opsional untuk tujuan pembuatan kredensial login dan sinkronisasi progres belajar.
            </li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100">
            2. Tujuan Pemrosesan Data
          </h2>
          <p>Data pribadi yang diproses hanya digunakan untuk:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Menyimpan status hafalan karakter (new, learning, mastered).</li>
            <li>Menghitung jumlah review, interval pengulangan kartu, dan streak harian aktif.</li>
            <li>Mengamankan akses akun melalui Row Level Security (RLS) di database PostgreSQL.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100">
            3. Hak Subjek Data Pribadi (Penghapusan Akun)
          </h2>
          <p>
            Sesuai Pasal 8 dan Pasal 9 UU PDP, Anda memiliki hak penuh untuk mengakses, memperbarui, dan menghapus seluruh data pribadi Anda kapan saja.
          </p>
          <p>
            Tersedia tombol <strong>&ldquo;Hapus Akun Saya&rdquo;</strong> di halaman Dashboard. Saat Anda mengonfirmasi penghapusan, akun autentikasi beserta profil dan seluruh riwayat progres flashcard akan dihapus secara permanen dari server Supabase menggunakan mekanisme cascading deletion.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100">
            4. Keamanan Data &amp; Penyimpanan
          </h2>
          <p>
            Koneksi data diamankan menggunakan protokol enkripsi TLS/HTTPS. Kebijakan Row Level Security (RLS) memastikan bahwa setiap pengguna hanya dapat membaca dan memperbarui data miliknya sendiri. Kunci rahasia server (service role key) tidak pernah diekspos ke sisi klien.
          </p>
        </section>
      </div>
    </div>
  );
}
