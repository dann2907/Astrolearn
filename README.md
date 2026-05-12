# Astrolearn

Astrolearn adalah platform edukasi astronomi gratis yang menggabungkan kurikulum terstruktur dengan gamifikasi RPG ringan dan minigame space shooter. Platform ini dirancang khusus untuk anak-anak agar belajar luar angkasa menjadi petualangan yang seru! 🚀✨

## Struktur Monorepo

```text
├── apps/
│   ├── api/          # Backend Hono.js (Port 3001)
│   │   └── src/      # Auth Middleware, RPG Services, Quiz Logic
│   └── web/          # Frontend Next.js 15 (Port 3000)
│       ├── app/      # (app) Group untuk Rute Terproteksi, Landing Page di Root
│       ├── components/ # UI (Framer Motion + Tailwind + Three.js)
│       ├── content/   # Kurikulum MDX (Hierarchical)
│       └── store/     # State Management (Zustand)
├── docs/             # Dokumentasi Sprint, PRD & User Guide
└── supabase/         # Migrasi Database (PostgreSQL)
```

## Teknologi Utama

- **Frontend**: Next.js 15, React 19, Tailwind CSS, Framer Motion.
- **Interaktivitas**: Three.js + React Three Fiber (R3F) untuk simulasi tata surya.
- **Backend**: Hono.js (Node.js runtime).
- **Database & Auth**: Supabase (@supabase/ssr).
- **Konten**: Local MDX dengan metadata terstruktur (XP reward, slug).
- **Game Engine**: Phaser.js 4 (Eskadron Penjelajah).

## Persiapan Lingkungan

### 1. Database

Jalankan migrasi di `supabase/migrations/` ke instance Supabase Anda melalui SQL Editor.

### 2. Environment Variables

- **Web (`apps/web/.env.local`)**:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `NEXT_PUBLIC_SITE_URL` (Opsional, untuk metadataBase)
- **API (`apps/api/.env`)**:
  - `SUPABASE_URL`
  - `SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY` (Wajib untuk pemberian XP otomatis)

## Cara Menjalankan

Gunakan `pnpm` untuk menjalankan aplikasi secara lokal:

```bash
# Install dependensi
pnpm install

# Jalankan Web App (Landing Page, Dashboard & Akademi)
pnpm --filter web dev

# Jalankan Backend API (Sistem Kuis & XP)
pnpm --filter api dev
```

## Fitur Saat Ini (Sprint 1)

- [x] Sistem Login & Profil (Supabase).
- [x] Akademi Kosmik dengan materi MDX terstruktur.
- [x] Kuis mini dengan validasi server-side dan anti-cheat.
- [x] Sistem RPG: Akumulasi XP, Level-up, dan Pangkat (Kadet -> Laksamana).
- [x] Dashboard interaktif dengan ringkasan progres.
- [x] Eskadron Penjelajah (Phaser foundation & basic loop).
