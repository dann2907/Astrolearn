# Astrolearn

Astrolearn adalah platform edukasi astronomi gratis yang menggabungkan kurikulum terstruktur dengan gamifikasi RPG ringan dan minigame space shooter.

## Struktur Monorepo

```text
├── apps/
│   ├── api/          # Backend Hono.js (Port 3001)
│   │   └── src/      # Auth Middleware, RPG Services, Quiz Logic
│   └── web/          # Frontend Next.js 15 (Port 3000)
│       ├── app/      # App Router & Server Actions
│       ├── components/ # UI (Framer Motion + Tailwind)
│       └── content/   # Kurikulum MDX (Hierarchical)
├── docs/             # Dokumentasi Sprint & PRD
└── supabase/         # Migrasi Database (PostgreSQL)
```

## Teknologi Utama

- **Frontend**: Next.js 15, React 19, Tailwind CSS, Framer Motion.
- **Backend**: Hono.js (Node.js runtime).
- **Database & Auth**: Supabase.
- **Konten**: Local MDX dengan dukungan metadata (XP reward, slug).
- **Game Engine**: Phaser.js 4 (Eskadron Penjelajah).

## Persiapan Lingkungan

### 1. Database
Jalankan migrasi di `supabase/migrations/` ke instance Supabase Anda melalui SQL Editor.

### 2. Environment Variables
- **Web (`apps/web/.env.local`)**:
  - `NEXT_PUBLIC_SUPABASE_URL`
  - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - `NEXT_PUBLIC_GEMINI_API_KEY` (untuk Oracle Kosmik)
- **API (`apps/api/.env`)**:
  - `SUPABASE_URL`
  - `SUPABASE_ANON_KEY`
  - `SUPABASE_SERVICE_ROLE_KEY` (Wajib untuk sistem XP/Admin)

## Cara Menjalankan

Gunakan `pnpm` untuk menjalankan aplikasi secara lokal:

```bash
# Install dependensi
pnpm install

# Jalankan Web App (Dashboard & Akademi)
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
