# Lok Baintan Explorer — Laravel + Blade

Migrasi aplikasi Lok Baintan Explorer dari React 19 + Vite + TypeScript ke Laravel 12 + Blade. Tampilan, konten, aset multimedia, dan perilaku utama dipertahankan; React tidak lagi menjadi frontend utama. Vite hanya membangun CSS Tailwind dan JavaScript vanilla.

## Persyaratan

- PHP 8.2 atau lebih baru
- Composer 2
- Node.js dan pnpm
- XAMPP dapat digunakan untuk PHP/Apache; MySQL tidak diperlukan

## Menjalankan di Windows PowerShell

```powershell
composer install
Copy-Item .env.example .env
php artisan key:generate
pnpm.cmd install
pnpm.cmd dev
```

Pada terminal PowerShell kedua:

```powershell
php artisan serve
```

Buka `http://127.0.0.1:8000`. Untuk build produksi, jalankan `pnpm.cmd build`. Jika kebijakan PowerShell memblokir `pnpm.ps1`, gunakan `pnpm.cmd` seperti contoh di atas.

## Struktur penting

```text
app/Http/Controllers/PageController.php  Data dan alur seluruh halaman publik
resources/views/layouts/app.blade.php    Layout HTML utama
resources/views/components/              Header, footer, hero, card, ikon, planner
resources/views/pages/                   Enam halaman Blade
resources/css/app.css                    Gaya asli yang dimigrasikan
resources/js/app.js                      Interaktivitas vanilla JavaScript
resources/data/media-credits.json        Kredit multimedia
routes/web.php                            Named routes Laravel
public/                                   Gambar, video, branding, ornamen
legacy-react/                             Salinan source React sebelum migrasi
tests/Feature/SitePagesTest.php           Pengujian seluruh halaman publik
```

## Halaman dan route

| Halaman Blade | URL | Named route | Controller |
|---|---|---|---|
| `pages.home` | `/` | `home` | `PageController::home` |
| `pages.about` | `/tentang-lok-baintan` | `about` | `PageController::about` |
| `pages.explore` | `/jelajah-wisata` | `explore` | `PageController::explore` |
| `pages.wetlands` | `/pesona-lahan-basah` | `wetlands` | `PageController::wetlands` |
| `pages.gallery` | `/galeri` | `gallery` | `PageController::gallery` |
| `pages.guide` | `/panduan-berkunjung` | `guide` | `PageController::guide` |

`PageController` menyediakan data gambar, aktivitas, galeri, tujuan peta, dan kredit media kepada view. Tidak ada logika aplikasi yang ditanam sebagai aplikasi React tersembunyi.

## Komponen Blade

- `header` dan `footer`: navigasi bersama dengan named routes
- `page-hero`, `section-head`, dan `eyebrow`: elemen editorial berulang
- `activity-card`: kartu pengalaman wisata
- `icon`: ikon SVG internal
- `travel-planner`: dialog perencana perjalanan yang tidak mengirim atau menyimpan data

## Interaktivitas yang dimigrasikan

- dialog perencana perjalanan, validasi, ringkasan, dan tautan arah Google Maps
- tab detail aktivitas dan deep-link melalui parameter `?aktivitas=1..4`
- filter galeri, lightbox foto, dan pemutar video
- pemilih lokasi serta pembaruan Google Maps pada halaman panduan
- fallback peta, FAQ accordion, modal Escape/backdrop, dan state checkbox

Semua interaksi berada di `resources/js/app.js` dan tidak membutuhkan React, localStorage, sessionStorage, atau API aplikasi.

## Database

Database tidak diperlukan. Aplikasi bersifat informasional dan formulir planner hanya diproses di browser. Model `User` dan migration bawaan Laravel sengaja tidak digunakan. `.env.example` memakai session/cache berbasis file dan queue sinkron.

## Aset

Aset tetap berada di `public/media`, `public/branding`, dan `public/ornaments`. Kredit dan lisensi dibaca dari `resources/data/media-credits.json`. Aset React asli tidak dihapus; salinannya tersedia di `legacy-react` sampai hasil migrasi disetujui dan diverifikasi lebih lanjut.

## Validasi

```powershell
php artisan route:list
php artisan view:cache
php artisan test
pnpm.cmd build
```

Pengujian fitur memeriksa keenam route, heading utama, layout bersama, dan named route. Build Vite memvalidasi CSS dan JavaScript. Peta Google dan font Google memerlukan koneksi internet; bila sematan peta diblokir, antarmuka menyediakan tautan langsung dan fallback.

## Perbedaan arsitektur

Sebelumnya navigasi memakai hash dan seluruh halaman dirender melalui satu komponen React. Sekarang setiap URL ditangani Laravel, setiap halaman memiliki file Blade sendiri, bagian bersama menggunakan komponen Blade, data tampilan disiapkan controller, dan interaksi lokal ditangani JavaScript vanilla. Tidak ada commit, push, atau merge otomatis dalam proses migrasi ini.
