# Sprint 1 — Foundation Learning Loop

## Sprint Goal

> Pengguna baru bisa mendaftar, membaca Bab 1 Sub-bab 1, mengerjakan kuis mini, dan melihat XP bertambah di dashboard sederhana.

---

# Fokus Sprint

## Epic yang Dikerjakan

### Epic 1 — Akademi Kosmik
Minimum Viable Learning System

### Epic 2 — Sistem RPG
XP & Leveling Dasar

### Dashboard Komando
Versi minimal untuk menampilkan progres pengguna

---

# Informasi Sprint

| Item | Detail |
|---|---|
| Tipe Sprint | Foundation Sprint |
| Fokus Utama | Core Learning Loop |
| Status Game Shooter | Belum masuk Sprint 1 |

---

# Sprint Backlog

## User Stories Prioritas

| ID | User Story | Story Points | Prioritas |
|---|---|---|---|
| AK-01 | Daftar bab & sub-bab terstruktur | 5 SP | P0 |
| AK-04 | Kuis mini di akhir sub-bab | 8 SP | P0 |
| RP-01 | XP & Leveling dasar | 8 SP | P0 |
| DB-01 | Dashboard ringkasan minimal | 5 SP | P0 |

---

# Catatan Scope

## DB-01 Dipotong Scope

Pada Sprint 1, dashboard hanya mencakup:

- XP Bar
- Level pengguna
- Progress bab aktif
- CTA “Lanjutkan Belajar”

Belum termasuk:

- Badge/Lencana
- Activity Feed
- AI Recommendation
- Statistik Shooter
- Social Features

---

# Task Breakdown

---

# AK-01 — Daftar Bab & Sub-bab

## Backend Tasks

### API Endpoint

Buat endpoint:

```http
GET /api/chapters
GET /api/chapters/:id/subchapters
```

### Data Source

- Ambil data dari Strapi CMS atau PostgreSQL
- Pastikan struktur urutan bab konsisten

### Response Requirements

Response wajib memiliki:

```json
{
  "id": "",
  "judul": "",
  "urutan": 1,
  "status": "locked | unlocked"
}
```

---

## Frontend Tasks

### Halaman Akademi

Buat halaman:

```txt
/akademi
```

### Komponen

- `ChapterTree`
- Nested subchapter list
- Child indentation

### Interaction

- Klik sub-bab → navigasi ke detail materi
- Halaman materi masih placeholder

### UX

- Skeleton loading state
- Empty state
- Error state

---

# AK-04 — Kuis Mini Akhir Sub-bab

## Backend Tasks

### API Endpoint

```http
GET /api/questions?subChapterId=xxx
POST /api/quiz-results
```

### Rules

#### GET Questions

- Ambil 5 soal random
- Berdasarkan subChapterId

#### POST Quiz Results

- Validasi jawaban
- Hitung skor
- Return:
  - skor
  - kunci jawaban
  - penjelasan singkat

### RPG Integration

Setelah hasil kuis tersimpan:

```ts
awardXP(userId, amount, source)
```

dipanggil otomatis.

---

## Frontend Tasks

### Komponen

Buat:

```txt
QuizWidget
```

### Flow

- Render 5 soal pilihan ganda
- Bisa sequential atau scroll mode
- Submit jawaban
- Tampilkan:
  - skor
  - jawaban benar/salah
  - koreksi

### State/Event

Setelah kuis selesai:

```txt
xp-updated
```

ditrigger ke dashboard/UI state.

---

# RP-01 — XP & Leveling

## Backend Tasks

### Fungsi Core

Buat service:

```ts
awardXP(userId, amount, source)
```

### Responsibility

Fungsi harus:

1. Menambah XP user
2. Mengecek threshold level
3. Naik level bila threshold tercapai
4. Mengirim event realtime

---

## Leveling Rule

Contoh:

| Level | Required XP |
|---|---|
| 1 | 300 XP |
| 2 | 600 XP |
| 3 | 1000 XP |

---

## Realtime

Jika level-up:

- Broadcast via Supabase Realtime
- Trigger notification frontend

---

## API Endpoint

```http
GET /api/users/me
```

Return:

```json
{
  "xp": 0,
  "level": 1,
  "rank": "Navigator",
  "stardust": 0
}
```

---

## Frontend Tasks

### XPBar Component

Gunakan:
- Framer Motion
- Count-up animation

### Notification

Toast realtime:

```txt
Level Up!
```

### Header Personalization

Contoh:

```txt
Navigator Ryou
```

---

# DB-01 — Dashboard Minimal

## Frontend Tasks

### Halaman

```txt
/dashboard
```

### Widget Minimal

Tampilkan:

- XP Bar
- Level User
- Progress Bab Aktif
- CTA “Lanjutkan Belajar”

### CTA Behaviour

Tombol harus redirect ke:

```txt
last-accessed-subchapter
```

---

## Backend Tasks

### API Endpoint

```http
GET /api/progress
```

### Response

```json
{
  "lastChapterId": "",
  "lastSubchapterId": "",
  "progressPercentage": 20
}
```

---

# Definition of Done (DoD)

## Backend

- API deployed ke staging
- Unit test lulus
- Response time < 300ms

---

## Frontend

- Responsive desktop & mobile
- Loading state tersedia
- Error state tersedia
- UX flow berjalan tanpa dead-end

---

## QA

Manual test case lulus:

- Daftar bab muncul
- Sub-bab bisa dibuka
- Kuis dapat diselesaikan
- XP bertambah
- Dashboard terupdate

---

## Integrasi

XP hasil kuis harus:

- langsung muncul di dashboard
- tanpa reload manual
- menggunakan realtime atau refetch otomatis

---

# Sprint Review Readiness

Tim harus dapat mendemokan alur berikut secara utuh:

```txt
Register
→ Masuk Dashboard
→ Buka Akademi
→ Baca Sub-bab
→ Kerjakan Kuis
→ Dapat XP
→ Dashboard Terupdate
```

Tanpa flow yang terputus atau mock interaction palsu.
