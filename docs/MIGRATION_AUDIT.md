# Audit Migrasi React ke Laravel

## Inventaris aplikasi lama

- Enam halaman: Beranda, Tentang Lok Baintan, Jelajah Wisata, Pesona Lahan Basah, Galeri, dan Panduan Berkunjung.
- Navigasi lama memakai hash (`#/beranda`, dan seterusnya) tanpa React Router.
- Komponen bersama: header, footer, logo, hero, section heading, activity card, modal, custom select, dan travel planner.
- State React: halaman aktif, dialog planner, tab aktivitas, filter/lightbox galeri, pemutar video, tujuan peta, status peta, dan FAQ.
- Data lokal: daftar destinasi TypeScript dan kredit media JSON.
- Penyimpanan: tidak ada localStorage, sessionStorage, database, login, autentikasi, atau API backend.
- Integrasi eksternal: Google Maps search/embed dan Google Fonts.
- Aset: 14 gambar WebP, satu video MP4 beserta poster, branding PNG, favicon, dan tiga ornamen SVG.

## Pemetaan migrasi

| React | Laravel/Blade |
|---|---|
| `App.tsx` dan hash state | `routes/web.php`, `PageController`, enam view Blade |
| `Header` / `Footer` | `components/header.blade.php`, `footer.blade.php` |
| `PageHero`, `SectionHead`, `ActivityCard`, `Icon` | Anonymous Blade components |
| `TravelPlanner.tsx` | `travel-planner.blade.php` + `resources/js/app.js` |
| `Modal.tsx` | Native `<dialog>` dengan event vanilla JavaScript |
| `Select.tsx` | Elemen select native yang aksesibel |
| Hooks dan event React | Event listener dan DOM state lokal |
| `src/index.css` | `resources/css/app.css` |
| `src/data/media-credits.json` | `resources/data/media-credits.json` |

Source lama disalin ke `legacy-react`; aset publik dipakai langsung tanpa duplikasi atau placeholder.
