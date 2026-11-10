# Platform Belajar Bahasa — Web Flashcard (MVP v1.1)

Aplikasi web flashcard modern untuk membantu pembelajar asal Indonesia menghafal aksara dasar bahasa Jepang, Mandarin, dan fonetik English secara terstruktur, dilengkapi audio pelafalan asli (Web Speech API) dan pelacakan progres per akun.

---

## Fitur Utama

1. **Flashcard 3D Interaktif**:
   - Animasi balik kartu (CSS 3D flip transform).
   - Aksesibilitas penuh via keyboard:
     - `Spasi` / `Enter`: Balik kartu
     - `1` / `Panah Kiri`: Tandai *Masih Belajar*
     - `2` / `Panah Kanan`: Tandai *Sudah Hafal*
     - `A` / `P`: Putar audio pelafalan
     - `Panah Atas`: Kembali ke kartu sebelumnya
   - Dukungan kartu khusus:
     - **Kanji**: Menampilkan bacaan *on'yomi* dan *kun'yomi*, arti Bahasa Indonesia, serta contoh kata.
     - **Pinyin**: Menampilkan 4 kontur nada, simbol nada, panduan artikulasi, dan contoh karakter Hanzi.
     - **English**: Menampilkan pasangan huruf-bunyi, simbol fonetik IPA, dan panduan pelafalan bagi penutur Indonesia.

2. **Audio Pelafalan Asli**:
   - Berbasis Web Speech API native tanpa ketergantungan API pihak ketiga.
   - Pemetaan locale otomatis: `ja-JP` (Jepang), `zh-CN` (Mandarin), `en-US` (English).

3. **Dual-Mode (Mode Tamu & Mode Akun Supabase)**:
   - **Mode Tamu (Guest Mode)**: Pengunjung langsung bisa belajar tanpa registrasi. Progres disimpan di `localStorage`.
   - **Penggabungan Otomatis**: Saat mendaftar atau login, progres tamu otomatis dimerge ke database Supabase `user_progress`.

4. **Dashboard & Streak Server-Side**:
   - Pelacakan streak harian adil di zona waktu WIB (`Asia/Jakarta`) dengan ambang batas minimal 10 kartu direview per hari.
   - Persentase penguasaan kartu per bahasa dan per character set.
   - Penghitung kartu yang perlu direview berdasarkan interval pengulangan.

5. **Kepatuhan Privasi (UU PDP No. 27/2022)**:
   - Fitur penghapusan akun mandiri di dashboard dengan penghapusan permanen data secara bertingkat (*cascading delete*).
   - Atribusi lengkap untuk sumber terbuka dataset (KANJIDIC, Unihan, IPA).

---

## Cakupan Dataset Karakter

| Bahasa | Modul / Set | Jumlah Karakter | Keterangan |
| --- | --- | --- | --- |
| 🇯🇵 Jepang | Hiragana | 46 Karakter | Lengkap gojūon dasar (a-n) |
| 🇯🇵 Jepang | Katakana | 46 Karakter | Lengkap gojūon dasar serapan asing |
| 🇯🇵 Jepang | Kanji Dasar (N5) | 100 Karakter | Kanji level N5 terverifikasi dengan on'yomi & kun'yomi |
| 🇨🇳 Mandarin | Pinyin & 4 Nada | 26 Modul | 4 kontur nada + inisial beraspirasi/retrofleks |
| 🇬🇧 English | Phonics & Fonetik | 23 Modul | Vokal pendek/panjang, konsonan ganda (th, sh, ch), silent letters |

---

## Struktur Folder

```text
├── app/
│   ├── [lang]/[set]/page.tsx      # Halaman dynamic flashcard session
│   ├── api/
│   │   ├── account/delete/        # Endpoint server hapus akun (service role)
│   │   └── streak/                # Endpoint server hitung streak (Asia/Jakarta)
│   ├── dashboard/page.tsx         # Dashboard metrik & streak
│   ├── about/page.tsx             # Halaman atribusi dataset & lisensi
│   ├── privacy/page.tsx           # Kebijakan privasi UU PDP
│   ├── layout.tsx                 # Root layout dengan font Google Noto CJK
│   └── page.tsx                   # Landing page
├── components/
│   ├── flashcard/                 # FlashcardDeck, Flashcard, Controls, Audio, dll.
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   └── AuthModal.tsx
├── data/                          # Dataset 5 set karakter terverifikasi
├── hooks/
│   ├── useFlashcardSession.ts     # State machine sesi belajar
│   └── useUserProgress.ts         # Hook progres akun & mode tamu
├── lib/
│   ├── supabase/                  # client, server, queries, service-role
│   ├── audio.ts                   # Web Speech API engine
│   ├── guest-storage.ts           # LocalStorage engine mode tamu
│   └── route-map.ts               # Pemetaan bahasa & slug URL
└── supabase/
    ├── migrations/                # Migration SQL PostgreSQL + RLS + Triggers
    └── seed.sql                   # Seed SQL bahasa & set
```

---

## Cara Menjalankan

### 1. Jalankan Development Server
Aplikasi dapat langsung dijalankan dan dicoba dalam **Mode Tamu** tanpa konfigurasi database awal:

```bash
npm run dev
```

Buka peramban di `http://localhost:3000`.

### 2. (Opsional) Menghubungkan ke Supabase
Untuk mengaktifkan autentikasi email dan penyimpanan cloud:

1. Buat project baru di [Supabase](https://supabase.com).
2. Buka menu **SQL Editor** di dashboard Supabase Anda, lalu salin dan jalankan skrip migrasi:
   - `supabase/migrations/20261111000000_initial_schema.sql`
   - `supabase/seed.sql`
3. Salin file `.env.example` menjadi `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
4. Masukkan URL dan Key project Supabase Anda ke dalam `.env.local`.
