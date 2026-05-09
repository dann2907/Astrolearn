# Sprint 2 (Tim 1) – Core Experience Enhancement

**Tanggal:** 23 Mei – 5 Juni 2026  
**Tim:** Tim 1 (Core Learning & RPG)  
**Status:** Final, disetujui Project Manager

---

## 1. Objective

Memperkaya pengalaman belajar inti dengan visualisasi interaktif, fitur catatan, penyempurnaan dashboard (learning path map, AI rekomendasi), dan fondasi Skill Tree. Semua modul independen dari Tim 2.

---

## 2. Key Files & Context

- `docs/PRD.md`: Product Requirements Document final.
- `docs/SPRINT1.md`: Hasil Sprint 1 (endpoint progres, chapters, questions, users/me).
- `apps/web/`: Frontend Next.js (halaman Akademi, Dashboard).
- `apps/api/`: Backend Hono.js (tambah endpoint kecil jika perlu).
- `supabase/migrations/`: Tabel `user_notes`, `skill_tree_selections`, `stardust_shop` (jika RP-03 dikerjakan).

---

## 3. Sprint Backlog

| ID | Story / Tugas | SP | Prioritas |
| :--- | :--- | :--- | :--- |
| **AK-02** | Visualisasi Interaktif (Three.js/R3F) – Orbit Planet | 13 | P0 |
| **AK-03** | Catatan Astro (Highlight & Simpan) | 5 | P1 |
| **DB-02** | Dashboard: Learning Path Map Interaktif | 8 | P0 |
| **DB-03** | Dashboard: AI Recommended Review (logic + UI) | 5 | P1 |
| **RP-02** | Skill Tree – Pilih Spesialisasi | 5 | P1 |
| **RP-03** | Toko Kosmetik (Stardust Shop) – UI & Backend | 8 | P2 (opsional) |

**Total Story Points:** 36 (tanpa RP-03) / 44 (dengan RP-03)

---

## 4. Detail Per Story

### AK-02 – Visualisasi Interaktif: Orbit Planet
**Tujuan:** Menampilkan simulasi 3D orbit planet di halaman sub-bab Tata Surya menggunakan Three.js + React Three Fiber (R3F).

**Backend:** Tidak ada perubahan.

**Frontend:**
- [ ] Buat komponen `<OrbitSimulation />` yang menerima parameter (kecepatan orbit, jumlah planet, dsb.) dari frontmatter MDX atau props.
- [ ] Implementasi Three.js dasar: matahari di tengah, 1-2 planet mengorbit elips.
- [ ] Kamera bisa di-rotate (orbit controls) dan zoom.
- [ ] Tambahkan tooltip saat kursor di atas planet (nama, jarak, periode orbit).
- [ ] Responsif: canvas resize saat window di-resize. Mobile touch-friendly (cubit zoom, drag rotasi).
- [ ] Fallback: jika WebGL tidak didukung, tampilkan gambar statis atau animasi CSS.

**Acceptance:**
- FPS stabil ≥30 di mobile, ≥60 di desktop.
- Simulasi termuat dalam 3 detik.
- Tidak crash saat sub-bab dibuka/ditutup.

---

### AK-03 – Catatan Astro (Highlight & Simpan)
**Tujuan:** Pengguna bisa menyorot teks di halaman materi MDX, menyimpannya, dan melihat daftar catatan nanti.

**Backend:**
- [ ] Buat endpoint `POST /api/notes` (simpan: userId, subChapterId, teks yang disorot, timestamp).
- [ ] Buat endpoint `GET /api/notes` (ambil semua catatan user, filter by subChapterId opsional).
- [ ] Buat endpoint `DELETE /api/notes/:id`.

**Frontend:**
- [ ] Di halaman materi sub-bab, teks bisa di-highlight (mouse selection), lalu muncul tooltip "Simpan Catatan".
- [ ] Klik tooltip → catatan tersimpan, muncul toast "Catatan disimpan!".
- [ ] Di dashboard, widget "Catatan Astro" menampilkan daftar catatan terbaru dengan link ke sub-bab asal.
- [ ] Bisa hapus catatan dari dashboard.

**Acceptance:**
- Highlight berfungsi di desktop dan mobile.
- Catatan tersimpan persisten setelah refresh.
- Daftar catatan muncul di dashboard.

---

### DB-02 – Dashboard: Learning Path Map Interaktif
**Tujuan:** Mengubah teks statis "Learning Path" di dashboard (Sprint 1) menjadi node-map interaktif.

**Backend:** Tidak ada perubahan. Gunakan endpoint `GET /api/chapters` yang sudah ada (tambah field `status` dan `progress` di response jika belum).

**Frontend:**
- [ ] Buat komponen `<LearningPathMap />` tampil di dashboard (gantikan teks lama).
- [ ] Visual: 3 node (Tata Surya, Bintang, Galaksi) terhubung garis horizontal.
  - Selesai: lingkaran hijau + centang.
  - Sedang dipelajari: lingkaran kuning berdenyut pulse.
  - Terkunci: lingkaran abu-abu + ikon gembok.
- [ ] Klik node aktif: tampilkan tooltip (persentase, sub-bab terakhir diakses, tombol "Lanjutkan").
- [ ] Klik node terkunci: tooltip "Selesaikan bab sebelumnya dulu".
- [ ] Animasi transisi antar node.
- [ ] Responsif: di mobile, node-map bisa di-scroll horizontal.

**Acceptance:**
- Data progres real-time dari API.
- Interaksi klik berfungsi, tooltip muncul.
- Animasi halus (Framer Motion).

---

### DB-03 – Dashboard: AI Recommended Review
**Tujuan:** Menampilkan rekomendasi sub-bab untuk diulang berdasarkan error rate kuis.

**Backend:**
- [ ] Buat endpoint `GET /api/recommendations/review` yang:
  - Query hasil kuis user (`quiz_results` table).
  - Hitung error rate per sub-bab (soal salah / total soal).
  - Kembalikan top 1 sub-bab dengan error rate > 50% yang belum diulang minggu ini.
  - Jika tidak ada, return empty atau pesan "Kamu sudah menguasai semua topik minggu ini!".

**Frontend:**
- [ ] Tambahkan komponen `<ReviewRecommendation />` di dashboard (bawah Learning Path Map).
- [ ] Tampilkan kartu dengan latar kuning lembut, ikon otak, teks: "Topik [nama sub-bab] perlu kamu ulang. Siap tingkatkan akurasi?"
- [ ] Tombol "Pelajari Ulang" → arahkan ke halaman sub-bab tersebut.
- [ ] Jika tidak ada rekomendasi, tampilkan pesan positif.
- [ ] Kartu bisa di-dismiss (×), tapi muncul lagi jika error rate tetap tinggi di minggu berikutnya.

**Acceptance:**
- Rekomendasi berbasis data nyata (bukan mock).
- Kartu muncul hanya jika ada topik dengan error rate > threshold.
- Dismiss berfungsi, tidak mengganggu UX.

---

### RP-02 – Skill Tree: Pilih Spesialisasi
**Tujuan:** Pemain level 4+ bisa memilih satu dari tiga jalur spesialisasi (Observasi, Fisika Teoretis, Eksoplanet) yang membuka lore tambahan.

**Backend:**
- [ ] Buat endpoint `POST /api/skill-tree/select` (userId, jalur: `observation`, `theoretical_physics`, `exoplanet`).
- [ ] Cek syarat: user harus level ≥ 4. Jika belum, tolak dengan pesan "Kamu harus mencapai Level 4 (Navigator) dulu."
- [ ] Simpan pilihan di tabel `skill_tree_selections`.
- [ ] Tambahkan field `specialization` di response `GET /api/users/me`.

**Frontend:**
- [ ] Halaman `/skill-tree` menampilkan tiga jalur dengan deskripsi dan ikon.
  - Observasi: fokus ke teknik pengamatan, teleskop.
  - Fisika Teoretis: fokus ke rumus, relativitas, kosmologi.
  - Eksoplanet: fokus ke pencarian planet baru, habitabilitas.
- [ ] Klik jalur → konfirmasi modal "Pilih jalur ini? Tidak bisa diubah nanti."
- [ ] Setelah dipilih, jalur lain terkunci. Tampilkan pesan sukses dan konten lore terbuka di sub-bab tertentu.
- [ ] Jika user belum level 4, tampilkan progress bar menuju level 4.

**Acceptance:**
- Hanya bisa pilih satu jalur, tidak bisa ganti setelah konfirmasi.
- Respons spesialisasi muncul di dashboard (`/api/users/me`).
- Lore tambahan terlihat di sub-bab relevan (misal: Observasi buka konten ekstra tentang Hubble).

---

### RP-03 (Opsional) – Toko Kosmetik (Stardust Shop)
**Tujuan:** Pengguna bisa membelanjakan Stardust untuk item kosmetik (skin pesawat, tema dashboard).

**Backend:**
- [ ] Buat endpoint `GET /api/shop/items` (daftar item, harga, kategori).
- [ ] Buat endpoint `POST /api/shop/purchase` (userId, itemId). Validasi saldo Stardust cukup, kurangi Stardust, simpan kepemilikan di tabel `user_owned_items`.

**Frontend:**
- [ ] Halaman `/koleksi` atau `/shop` menampilkan grid item.
- [ ] Setiap item: gambar, nama, harga Stardust, tombol "Beli".
- [ ] Jika sudah dimiliki, tombol jadi "Dimiliki" (disabled).
- [ ] Toast sukses/gagal saat pembelian.
- [ ] Skin yang dimiliki bisa dipilih di halaman game (jika Tim 2 sudah siap).

**Acceptance:**
- Stardust berkurang sesuai harga.
- Item muncul di koleksi.
- Tidak bisa beli dua kali.

---

## 5. Definition of Done (DoD)

- [ ] Semua endpoint baru sudah di-deploy ke staging, lolos unit test.
- [ ] Komponen frontend responsif di desktop & mobile.
- [ ] Animasi berjalan halus (FPS ≥ 30).
- [ ] QA manual test untuk alur bahagia dan edge case (WebGL fallback, skill tree syarat level, rekomendasi kosong).
- [ ] Tidak ada regresi di fitur Sprint 1.

---

## 6. Koordinasi dengan Tim 2

- **Tidak ada tumpang tindih.** Tim 2 fokus ke Arena, Game, Leaderboard. Tim 1 tidak menyentuh domain itu.
- Jika butuh endpoint baru, tambahkan di Hono.js tanpa mengubah kontrak API yang sudah ada.
- Daily sync 15 menit antar TL untuk update progres.

---

## 7. Jadwal Singkat (2 Minggu)

| Hari | Fokus |
| :--- | :--- |
| 1-3 | AK-02 (simulasi orbit), AK-03 (catatan) |
| 4-6 | DB-02 (Learning Path Map) |
| 7-9 | DB-03 (AI rekomendasi), RP-02 (Skill Tree) |
| 10-12 | RP-03 (toko) – jika dikerjakan. Polish, bug fixing. |
| 13-14 | Integration test, demo preparation. |

---

## 8. Risiko & Mitigasi

| Risiko | Mitigasi |
| :--- | :--- |
| Three.js lambat di mobile low-end | Sediakan fallback gambar statis; optimasi geometri (low-poly). |
| Data error rate belum cukup (user baru) | Fallback: tampilkan "Lakukan kuis dulu untuk dapat rekomendasi." |
| User salah pilih spesialisasi | Konfirmasi modal tegas "Tidak bisa diubah". Evaluasi fitur reset di sprint depan. |

---

**Pengesahan:**  
Disetujui oleh Project Manager, 22 Mei 2026.  
Tim 1 mulai 23 Mei 2026.