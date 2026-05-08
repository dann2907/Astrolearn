🚀 GAME DESIGN DOCUMENT (GDD) – ESKADRON PENJELAJAH
Versi: 1.0
Tanggal: 8 Mei 2026
Platform: Web (HTML5, Phaser.js 3) – bagian dari AstroLearn
Genre: Top-down arcade space shooter / edutainment
Target Pemain: Pengguna AstroLearn level 3 ke atas

1. DESKRIPSI SINGKAT
Eskadron Penjelajah adalah minigame tembak-menembak luar angkasa top-down scroller yang memadukan aksi arcade dengan kuis astronomi. Pemain mengendalikan pesawat, menembak rintangan, dan secara berkala menjawab soal astronomi untuk mendapatkan power-up atau menghindari debuff. Skor akhir dikonversi menjadi XP dan Stardust untuk progres RPG pemain di AstroLearn.

2. GAMEPLAY LOOP INTI
Persiapan: Pilih pesawat (skin) dari koleksi.

Terbang & Tembak: Gulir vertikal otomatis. Pemain menghindari asteroid/musuh dan menembak untuk menghancurkannya.

Jeda Kuis: Setiap interval waktu tertentu (30 detik), game berhenti (pause), muncul soal astronomi pilihan ganda.

Efek Jawaban:

Benar → Aktifkan power-up segera.

Salah → Kena debuff sementara.

Game Over: Nyawa (HP) habis atau pemain menabrak rintangan terlalu banyak. Skor akhir ditampilkan.

Reward: Skor dikonversi ke XP & Stardust otomatis.

3. KONTROL & INTERAKSI
Aksi	Desktop	Mobile
Gerak pesawat	Mouse / Panah keyboard	Sentuh + seret (drag) atau joystick virtual di kiri layar
Tembak	Klik kiri / Spasi (hold auto-fire)	Otomatis menembak (mobile-friendly)
Jawab soal	Klik opsi (A/B/C/D)	Tap opsi
Catatan: Mobile menggunakan auto-fire untuk mengurangi kesulitan kontrol.

4. MEKANIK GAME DETAIL
4.1. Kontrol Pesawat
Pergerakan bebas 2D dalam batas layar.

Kecepatan gerak dasar dipengaruhi oleh Level RPG pemain (lihat bagian 5).

4.2. Proyektil & Menembak
Peluru standar: laser lurus, kecepatan konstan.

Cooldown tembakan: 0.25 detik.

Jumlah peluru per tembakan bisa bertambah dengan power-up.

4.3. Musuh & Rintangan
Tipe	Perilaku	Poin Dasar
Asteroid kecil	Gerak lurus vertikal/acak, hancur sekali tembak	10
Asteroid besar	Butuh 3 tembakan, pecah jadi 2 asteroid kecil	30 + (2x10)
Kapal musuh	Menembak balik (peluru lambat), bergerak zigzag	50
Boss (setiap 3 menit)	Pola serangan kompleks, banyak HP	200
4.4. Nyawa (HP) & Damage
HP awal: 5 (ditampilkan sebagai ikon hati/bintang).

Damage: tabrakan asteroid kecil = 1 HP, asteroid besar = 2 HP, peluru musuh = 1 HP.

HP habis → Game Over.

Bonus HP: Level RPG pemain menambah maksimum HP (lihat bagian 5).

Tidak ada regenerasi HP kecuali oleh power-up.

4.5. Kesulitan Progresif
Setiap 60 detik:

Kecepatan gulir bertambah 5%.

Frekuensi kemunculan musuh bertambah.

Skor per musuh naik 10% (sebagai kompensasi).

5. INTEGRASI LEVEL RPG ASTROLEARN
Level RPG pemain (Kadet → Laksamana) memengaruhi statistik dasar pesawat. Ini membuat progres belajar terasa signifikan di game.

Level RPG	HP Maks	Damage Multiplier	Kecepatan Gerak	Keterangan
Level 1-3 (Kadet)	5	1x	100%	Mulai
Level 4-6 (Navigator)	6	1.1x	105%	Akses game dibuka
Level 7-9 (Kapten)	7	1.2x	110%	
Level 10+ (Laksamana)	8	1.3x	115%	Maksimum
Pengambilan data: Saat game dimulai, client query API /api/users/me untuk level RPG, lalu set stat.

6. SISTEM POWER-UP & DEBUFF (via Kuis)
Setiap 30 detik game pause. Overlay soal muncul. Tidak ada batas waktu menjawab (tapi delay menjawab lama merusak ritme).

6.1. Power-Up (Jawaban Benar)
Nama	Efek	Durasi	Visual
Tembakan Ganda	Menembak 2 peluru paralel	15 detik	Peluru biru bercabang
Perisai Energi	Menyerap 1 damage tanpa kehilangan HP	Sampai kena	Lingkaran transparan berkedip
Laser Cepat	Cooldown tembakan 0.1 detik	10 detik	Peluru merah cepat
Pemulihan	Pulihkan 1 HP (tidak melebihi maks)	Sekali langsung	Kilatan hijau
6.2. Debuff (Jawaban Salah)
Nama	Efek	Durasi	Visual
Gangguan Mesin	Kecepatan gerak -30%	8 detik	Asap hitam dari mesin
Radar Kabur	Musuh muncul transparan (sulit dilihat)	10 detik	Musuh agak transparan
Peluru Lemah	Damage tembakan 0.5x	10 detik	Peluru lebih kecil
Aturan: Jika pemain tidak menjawab dalam 15 detik, dianggap salah dan debuff diterapkan (tidak boleh idle).

7. SISTEM SOAL & BANK SOAL
Soal diambil dari bank soal AstroLearn (sesuai bab yang sudah dibuka pemain).

API memilih acak 1 soal pilihan ganda (4 opsi) dengan difficulty menyesuaikan level RPG.

Setelah jawab, tampilan feedback singkat (0.5 detik) menunjukkan benar/salah sebelum game lanjut.

Riwayat jawaban dalam sesi game dicatat untuk analisis rekomendasi belajar di dashboard.

Endpoint Integrasi:

GET /api/questions/random?topics=bintang,tata_surya (berdasarkan bab terbuka)

Game client menyimpan jawaban lokal, akhir game kirim array jawaban ke server.

8. SKOR & KONVERSI REWARD
8.1. Formula Skor
text
Skor = (Σ Poin Musuh) + (Σ Jawaban Benar × 50) + (Waktu Bertahan dalam detik × 2)
Jawaban salah tidak kurangi skor (hanya debuff).

8.2. Konversi ke XP & Stardust (dihitung server)
Properti	Rumus
XP	round(Skor / 10)
Stardust	round(Skor / 20)
Cap reward per sesi: Maksimal 500 XP dan 250 Stardust per permainan (anti-farm).

9. SKIN PESAWAT (Kosmetik)
Skin TIDAK memengaruhi stat.

Skin dibeli dengan Stardust dari Toko (di dashboard) atau diberikan sebagai hadiah pencapaian.

Beberapa contoh skin:

Kadet Polos (default)

Komet Merah (1000 Stardust)

Galaksi Ungu (2500 Stardust)

Legenda Laksamana (Prestasi: capai level Laksamana)

Implementasi: Sprite sheet berbeda, dipilih saat preload berdasarkan data pengguna.

10. ANTARMUKA PENGGUNA (HUD)
Posisi	Elemen	Keterangan
Kiri atas	HP (ikon hati)	Mulai 5, berkurang saat kena damage
Kanan atas	Skor saat ini	Update real-time
Tengah atas	Timer mundur ke kuis berikutnya	"Soal dalam 12 detik..."
Tengah (overlay)	Panel soal (saat pause)	Soal + 4 tombol jawaban
Kiri bawah	Tombol gas/rem (mobile) / kosong	-
Kanan bawah	Indikator power-up aktif	Ikon kecil + sisa durasi
Layar Game Over:

Skor akhir, jumlah jawaban benar, XP & Stardust didapat.

Tombol: "Main Lagi", "Kembali ke Dashboard".

11. TEKNIS IMPLEMENTASI (Phaser.js)
11.1. Struktur Scene
Scene	Fungsi
BootScene	Load aset dasar, konfigurasi
PreloadScene	Progress bar loading sprite, JSON
MenuScene	Tombol "Mulai", pilih skin (jika ada)
GameScene	Gameplay utama, pause, soal overlay
GameOverScene	Tampil skor, konversi reward
11.2. Komunikasi dengan Backend
Saat GameScene start: GET /api/users/me (ambil level, skin aktif).

Saat jeda kuis: GET /api/questions/random (params bab yang di-unlock).

Akhir game (GameOverScene): POST /api/games/shooter/result dengan payload:

json
{
  "score": 15400,
  "duration": 180,
  "answers": [
    { "questionId": "q1", "correct": true },
    { "questionId": "q2", "correct": false }
  ]
}
Response berisi XP dan Stardust yang diberikan, dikirim ke sistem RPG via event.

11.3. Asset Pipeline
Sprite: Format .webp untuk ukuran kecil, atlas untuk animasi (ledakan).

Audio: .ogg, musik latar looping, efek tembakan, ledakan, power-up, soal muncul.

Semua asset di-hosting di Cloudflare R2.

12. AUDIO & EFEK VISUAL
Musik latar: Retro elektronik tempo cepat, volume rendah agar tidak mengganggu membaca soal.

SFX: Tembakan laser, ledakan asteroid, suara power-up naik, suara alarm saat debuff.

Efek partikel saat ledakan dan saat power-up aktif.

Soal overlay hadir dengan efek slow-motion singkat pada game (waktu melambat 0.3 detik).

13. PENGUJIAN & KESEIMBANGAN
Uji coba dengan level RPG berbeda untuk pastikan tidak terlalu mudah/sulit.

Pastikan soal tidak menghentikan aksi terlalu lama.

Leaderboard shooter terpisah: skor tertinggi mingguan dilihat di dashboard.

14. CATATAN PENTING
Game tidak memiliki pay-to-win, semua power-up berasal dari kuis.

Progres XP dan Stardust tidak bisa di-farm pasif karena harus menjawab soal.

Anti-cheat: Skor max tidak melebihi perhitungan realistis; validasi server.