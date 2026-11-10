import { useEffect, useMemo, useRef, useState } from "react";
import mediaCredits from "./data/media-credits.json";
import { TravelPlanner } from "./components/TravelPlanner";
import { Modal } from "./components/Modal";
import { Select } from "./components/Select";
import { destinations, mapsEmbed, mapsSearch } from "./data/destinations";

type Page = "beranda" | "tentang" | "jelajah" | "lahan-basah" | "galeri" | "panduan";
type IconName =
  | "boat"
  | "clock"
  | "compass"
  | "leaf"
  | "map"
  | "play"
  | "quote"
  | "river"
  | "spark"
  | "sun"
  | "wallet"
  | "camera"
  | "chevron"
  | "route"
  | "people";

const IMG = {
  hero: "/media/market-aerial.webp",
  river: "/media/martapura-klotok.webp",
  boats: "/media/market-boats.webp",
  canoe: "/media/market-riverside.webp",
  morning: "/media/market-dawn.webp",
  klotok: "/media/martapura-klotok.webp",
  vendor: "/media/market-vendors.webp",
  village: "/media/river-houses.webp",
  woman: "/media/banjar-traders.webp",
  fruit: "/media/local-bananas.webp",
  tropical: "/media/martapura-palms.webp",
  panorama: "/media/market-panorama.webp",
  port: "/media/market-port.webp",
  bridge: "/media/martapura-bridge.webp",
  dawn: "/media/martapura-dawn.webp",
};

const nav: { id: Page; label: string }[] = [
  { id: "beranda", label: "Beranda" },
  { id: "tentang", label: "Tentang Lok Baintan" },
  { id: "jelajah", label: "Jelajah Wisata" },
  { id: "lahan-basah", label: "Pesona Lahan Basah" },
  { id: "galeri", label: "Galeri" },
  { id: "panduan", label: "Panduan Berkunjung" },
];

function Icon({ name, size = 20 }: { name: IconName; size?: number }) {
  const paths: Record<IconName, React.ReactNode> = {
    boat: (
      <>
        <path d="M3 15h18l-3 4H7l-4-4Z" />
        <path d="M7 15V8h10v7M12 8V4l4 2" />
      </>
    ),
    clock: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M12 7v5l3 2" />
      </>
    ),
    compass: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="m15 9-2 4-4 2 2-4 4-2Z" />
      </>
    ),
    leaf: (
      <>
        <path d="M20 4C11 4 5 8 5 15c0 2 1 4 3 5 0-7 5-10 9-12-4 3-7 7-8 12 7 0 11-6 11-16Z" />
      </>
    ),
    map: (
      <>
        <path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3V6Z" />
        <path d="M9 3v15M15 6v15" />
      </>
    ),
    play: (
      <>
        <circle cx="12" cy="12" r="10" />
        <path d="m10 8 6 4-6 4V8Z" />
      </>
    ),
    quote: (
      <>
        <path d="M5 11h5v7H3v-6c0-4 2-6 5-7M16 11h5v7h-7v-6c0-4 2-6 5-7" />
      </>
    ),
    river: (
      <>
        <path d="M3 6c3 2 5 2 8 0s5-2 10 0M3 12c3 2 5 2 8 0s5-2 10 0M3 18c3 2 5 2 8 0s5-2 10 0" />
      </>
    ),
    spark: (
      <>
        <path d="m12 2 1.6 5.2L19 9l-5.4 1.8L12 16l-1.6-5.2L5 9l5.4-1.8L12 2Z" />
        <path d="m19 15 .7 2.3L22 18l-2.3.7L19 21l-.7-2.3L16 18l2.3-.7L19 15Z" />
      </>
    ),
    sun: (
      <>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </>
    ),
    wallet: (
      <>
        <path d="M4 6h14a2 2 0 0 1 2 2v10H4a2 2 0 0 1-2-2V6a3 3 0 0 1 3-3h12" />
        <path d="M15 11h5v4h-5a2 2 0 0 1 0-4Z" />
      </>
    ),
    camera: (
      <>
        <path d="M4 7h4l2-3h4l2 3h4v13H4V7Z" />
        <circle cx="12" cy="13" r="4" />
      </>
    ),
    chevron: (
      <>
        <path d="m7 10 5 5 5-5" />
      </>
    ),
    route: (
      <>
        <circle cx="6" cy="18" r="2" />
        <circle cx="18" cy="6" r="2" />
        <path d="M8 18h3a3 3 0 0 0 0-6H9a3 3 0 0 1 0-6h7" />
      </>
    ),
    people: (
      <>
        <circle cx="9" cy="8" r="3" />
        <circle cx="17" cy="9" r="2" />
        <path d="M3 20c0-4 2-7 6-7s6 3 6 7M15 14c4 0 6 2 6 6" />
      </>
    ),
  };
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}

function Logo() {
  return (
    <button
      className="logo"
      onClick={() => go("beranda")}
      aria-label="Lok Baintan Explorer — Ke Beranda"
    >
      <img
        className="logo-artwork"
        src="/branding/lok-baintan-explorer.png"
        alt="Lok Baintan Explorer"
        width="2172"
        height="724"
      />
    </button>
  );
}

let navigate: (page: Page) => void = () => {};
let openPlanner: () => void = () => {};
function go(page: Page) {
  navigate(page);
}

function Header({ page }: { page: Page }) {
  return (
    <header className="header">
      <div className="nav-shell">
        <Logo />
        <nav aria-label="Navigasi utama">
          {nav.map((n) => (
            <button
              key={n.id}
              className={page === n.id ? "active" : ""}
              aria-current={page === n.id ? "page" : undefined}
              onClick={() => go(n.id)}
            >
              {n.label}
            </button>
          ))}
        </nav>
        <button className="nav-cta" onClick={() => openPlanner()}>
          Rencanakan Kunjungan
        </button>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer>
      <div className="footer-dark">
        <div className="footer-invitation shell">
          <span>LOK BAINTAN EXPLORER</span>
          <p>
            Satu sungai. <i>Ribuan cerita.</i>
          </p>
          <button onClick={() => openPlanner()}>Rencanakan Kunjungan</button>
        </div>
        <div className="footer-top shell">
          <div className="footer-brand">
            <Logo />
            <p>Jelajahi pesona sungai, rasakan budaya Banjar.</p>
            <div className="footer-loc">
              <Icon name="map" /> Banjarmasin, Kalimantan Selatan
              <br />
              Kalimantan Selatan, Indonesia
            </div>
          </div>
          <div>
            <h4>Jelajahi</h4>
            {nav.slice(0, 3).map((n) => (
              <button key={n.id} onClick={() => go(n.id)}>
                {n.label}
              </button>
            ))}
          </div>
          <div>
            <h4>Temukan</h4>
            {nav.slice(3).map((n) => (
              <button key={n.id} onClick={() => go(n.id)}>
                {n.label}
              </button>
            ))}
          </div>
          <div className="footer-note">
            <span>Waktu terbaik berkunjung</span>
            <strong>
              <Icon name="sun" /> Pagi hari
            </strong>
            <p>
              Datang sebelum matahari meninggi untuk menyaksikan pasar terapung yang paling hidup.
            </p>
          </div>
        </div>
        <details className="media-credits shell">
          <summary>Kredit fotografi & film</summary>
          <p>
            Dokumentasi Lok Baintan dan Sungai Martapura dari Wikimedia Commons. Foto diubah ukuran,
            dikonversi, dan dipotong dalam tampilan; video dikonversi ke MP4. Materi tetap mengikuti
            lisensi masing-masing.
          </p>
          <div>
            {mediaCredits.map((media) => (
              <p key={media.file}>
                <a href={media.source} target="_blank" rel="noreferrer">
                  {media.label}
                </a>
                <span>
                  {media.author} ·{" "}
                  <a href={media.licenseUrl} target="_blank" rel="noreferrer">
                    {media.license}
                  </a>
                </span>
              </p>
            ))}
          </div>
        </details>
        <div className="footer-bottom shell">
          <span>© 2025 Lok Baintan Explorer</span>
          <span>Merayakan sungai & budaya Banjar.</span>
        </div>
      </div>
    </footer>
  );
}

function Button({
  children,
  variant = "primary",
  onClick,
}: {
  children: React.ReactNode;
  variant?: "primary" | "light" | "outline";
  onClick?: () => void;
}) {
  return (
    <button className={`button ${variant}`} onClick={onClick}>
      {children}
    </button>
  );
}

function Eyebrow({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <div className={`eyebrow ${light ? "light" : ""}`}>
      <span />
      {children}
    </div>
  );
}

function SectionHead({
  eyebrow,
  title,
  text,
  centered = false,
}: {
  eyebrow: string;
  title: string;
  text?: string;
  centered?: boolean;
}) {
  return (
    <div className={`section-head ${centered ? "centered" : ""}`}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  );
}

function PageHero({
  title,
  text,
  image,
  label,
}: {
  title: string;
  text: string;
  image: string;
  label: string;
}) {
  return (
    <section className="page-hero" style={{ backgroundImage: `url(${image})` }}>
      <div className="page-hero-overlay" />
      <img className="hero-foliage" src="/ornaments/nipah.svg" alt="" />
      <div className="shell page-hero-content">
        <div className="crumb">
          <button onClick={() => go("beranda")}>Beranda</button>
          <span>/</span>
          <span>{label}</span>
        </div>
        <Eyebrow light>Lok Baintan Explorer</Eyebrow>
        <h1>{title}</h1>
        <p>{text}</p>
      </div>
      <div className="hero-river-edge" aria-hidden="true" />
    </section>
  );
}

const features = [
  {
    icon: "boat" as IconName,
    title: "Keunikan Pasar Terapung",
    text: "Transaksi di atas jukung yang telah menjadi denyut kehidupan masyarakat sungai selama lintas generasi.",
    image: IMG.vendor,
  },
  {
    icon: "people" as IconName,
    title: "Budaya Masyarakat Banjar",
    text: "Keramahan, bahasa, kuliner, dan tradisi yang tumbuh bersama aliran Sungai Martapura.",
    image: IMG.woman,
  },
  {
    icon: "river" as IconName,
    title: "Keindahan Sungai Martapura",
    text: "Bentang lahan basah tropis dengan cahaya pagi, riak air, dan permukiman tepian sungai.",
    image: IMG.river,
  },
];

const activities = [
  {
    title: "Menyaksikan Aktivitas Pasar Terapung",
    short:
      "Lihat para pedagang mengayuh jukung berisi hasil kebun dan kuliner Banjar di tengah riuh pagi.",
    image: IMG.hero,
    tag: "Budaya & Tradisi",
    time: "Pagi hari",
    experience:
      "Melihat hasil kebun berpindah dari jukung ke jukung, mendengar tawar-menawar, dan menyapa pedagang dengan santun.",
    preparation:
      "Siapkan uang tunai pecahan kecil dan minta izin sebelum memotret. Jangan menghalangi perahu yang sedang berdagang.",
  },
  {
    title: "Menyusuri Sungai dengan Klotok",
    short:
      "Rasakan perjalanan menyusuri Martapura, melintasi rumah panggung dan kehidupan tepian sungai.",
    image: IMG.klotok,
    tag: "Susur Sungai",
    time: "Pagi–siang",
    experience:
      "Mengamati rumah tepian sungai, perahu warga, dan pepohonan dari klotok yang menyusuri aliran Martapura.",
    preparation:
      "Konfirmasikan titik berangkat dan rute dengan operator setempat. Ikuti arahan awak, jaga keseimbangan, dan gunakan pelampung bila tersedia.",
  },
  {
    title: "Mengenal Kuliner Khas Banjar",
    short:
      "Temukan wadai tradisional, buah segar, dan cita rasa lokal yang dijajakan langsung dari jukung.",
    image: IMG.fruit,
    tag: "Kuliner",
    time: "Pagi hari",
    experience:
      "Mengenali wadai Banjar, bertanya tentang sajian yang tersedia, serta melihat buah dan hasil kebun yang dibawa pedagang.",
    preparation:
      "Bawa uang tunai secukupnya. Tanyakan bahan makanan bila memiliki alergi dan bawa wadah guna ulang bila memungkinkan.",
  },
  {
    title: "Menikmati Suasana Pagi di Sungai Martapura",
    short:
      "Saksikan kabut tipis dan cahaya keemasan membingkai aktivitas sungai yang perlahan terbangun.",
    image: IMG.morning,
    tag: "Fotografi",
    time: "Fajar",
    experience:
      "Menikmati perubahan cahaya di permukaan air dan menyaksikan kehidupan sungai berangsur ramai menjelang pagi.",
    preparation:
      "Periksa cuaca sebelum berangkat, lindungi kamera dari percikan air, dan gunakan pakaian yang nyaman untuk perjalanan pagi.",
  },
];

function ActivityCard({
  item,
  onDetail,
}: {
  item: (typeof activities)[number];
  onDetail?: () => void;
}) {
  return (
    <article className="activity-card">
      <div className="activity-image">
        <img src={item.image} alt={item.title} loading="lazy" />
        <span>{item.tag}</span>
      </div>
      <div className="activity-body">
        <div className="activity-time">
          <Icon name="clock" size={16} /> {item.time}
        </div>
        <h3>{item.title}</h3>
        <p>{item.short}</p>
        <button onClick={onDetail} aria-label={`Lihat detail: ${item.title}`}>
          Lihat Detail
        </button>
      </div>
    </article>
  );
}

function Home({ onActivity }: { onActivity: (index: number) => void }) {
  return (
    <>
      <section className="home-hero" style={{ backgroundImage: `url(${IMG.hero})` }}>
        <div className="hero-shade" />
        <img className="hero-foliage" src="/ornaments/nipah.svg" alt="" />
        <div className="shell hero-inner">
          <div className="hero-location">
            <Icon name="map" size={17} /> Banjarmasin · Kalimantan Selatan
          </div>
          <div className="hero-copy">
            <Eyebrow light>Permata Sungai Kalimantan Selatan</Eyebrow>
            <h1>
              Jelajahi Pesona
              <br />
              <i>Pasar Terapung</i>
              <br />
              Lok Baintan
            </h1>
            <p>
              Temukan keindahan Sungai Martapura, tradisi perdagangan di atas jukung, dan kekayaan
              budaya Banjar dalam satu perjalanan.
            </p>
            <div className="button-row">
              <Button variant="light" onClick={() => go("jelajah")}>
                Mulai Jelajah
              </Button>
              <Button variant="outline" onClick={() => go("panduan")}>
                Panduan Berkunjung
              </Button>
            </div>
          </div>
          <div className="hero-editorial">
            <span>SEBUAH PERJALANAN KE</span>
            <strong>
              Jantung budaya
              <br />
              <i>sungai Banjar.</i>
            </strong>
            <span className="hero-editorial-line" />
            <small>
              Alam yang menghidupi.
              <br />
              Tradisi yang terus mengalir.
            </small>
          </div>
          <div className="hero-facts">
            <div>
              <span>01</span>
              <p>
                <b>Mulai lebih pagi</b>Rasakan suasana terbaik saat fajar menyapa.
              </p>
            </div>
            <div>
              <span>02</span>
              <p>
                <b>Naiki jukung</b>Dekati pasar dari sudut pandang sungai.
              </p>
            </div>
          </div>
        </div>
        <div className="hero-river-edge" aria-hidden="true" />
      </section>
      <section className="destination-ribbon" aria-label="Sekilas destinasi">
        <div className="shell">
          <div>
            <Icon name="boat" size={27} />
            <p>
              <span>Warisan yang hidup</span>
              <b>Pasar di atas jukung</b>
            </p>
          </div>
          <div>
            <Icon name="sun" size={27} />
            <p>
              <span>Waktu untuk menjelajah</span>
              <b>Pagi yang penuh cerita</b>
            </p>
          </div>
          <div>
            <Icon name="leaf" size={27} />
            <p>
              <span>Melangkah dengan bijak</span>
              <b>Rawat sungai, hormati budaya</b>
            </p>
          </div>
        </div>
      </section>

      <section className="intro section shell">
        <div className="intro-collage">
          <img className="intro-main" src={IMG.canoe} alt="Pedagang mendayung jukung di sungai" />
          <img className="intro-small" src={IMG.fruit} alt="Hasil kebun lokal" />
          <div className="intro-badge">
            <Icon name="river" size={32} />
            <span>
              Warisan hidup
              <br />
              sungai Banjar
            </span>
          </div>
        </div>
        <div className="intro-copy">
          <SectionHead eyebrow="Selamat Datang" title="Di sinilah sungai dan tradisi bertemu" />
          <p>
            Di sepanjang aliran Sungai Martapura, pagi dimulai dengan kayuhan dayung dan sapaan
            hangat. Pasar Terapung Lok Baintan bukan sekadar tempat berdagang—ia adalah warisan
            hidup masyarakat Banjar.
          </p>
          <p>
            Saksikan jukung-jukung kayu berkumpul, sarat dengan buah tropis, sayuran, kue
            tradisional, dan kisah yang diwariskan dari generasi ke generasi.
          </p>
          <button className="text-link" onClick={() => go("tentang")}>
            Kenali Lok Baintan
          </button>
        </div>
      </section>

      <section className="features section">
        <div className="shell">
          <SectionHead
            eyebrow="Pesona yang Menanti"
            title="Tiga wajah kehidupan sungai"
            text="Setiap sudut Lok Baintan menyimpan pengalaman yang dekat, hangat, dan sulit dilupakan."
            centered
          />
          <div className="feature-grid">
            {features.map((f, i) => (
              <article className="feature-card" key={f.title}>
                <img src={f.image} alt="" loading="lazy" />
                <div className="feature-overlay" />
                <span className="feature-num">0{i + 1}</span>
                <div className="feature-content">
                  <span className="round-icon">
                    <Icon name={f.icon} />
                  </span>
                  <h3>{f.title}</h3>
                  <p>{f.text}</p>
                  <button
                    className="feature-action"
                    onClick={() => go(i === 2 ? "lahan-basah" : "tentang")}
                  >
                    {i === 0
                      ? "Kenali Pasar Terapung"
                      : i === 1
                        ? "Temukan Budaya Banjar"
                        : "Jelajahi Sungai"}
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section shell">
        <div className="split-head">
          <SectionHead eyebrow="Pengalaman Pilihan" title="Pengalaman yang tak terlupakan" />
          <Button onClick={() => go("jelajah")}>Lihat Semua Pengalaman</Button>
        </div>
        <div className="activity-grid home-activities">
          {activities.slice(0, 3).map((a, i) => (
            <ActivityCard key={a.title} item={a} onDetail={() => onActivity(i)} />
          ))}
        </div>
      </section>

      <section className="wetland-teaser">
        <div className="wetland-photo" style={{ backgroundImage: `url(${IMG.tropical})` }} />
        <div className="wetland-copy">
          <Eyebrow light>Sekilas Pesona Lahan Basah</Eyebrow>
          <h2>Sungai adalah nadi yang menghidupkan segalanya</h2>
          <p>
            Dari jalur transportasi hingga ruang bertemu, Sungai Martapura menopang budaya, ekonomi,
            dan kehidupan sehari-hari. Memahami lahan basah berarti memahami jiwa Lok Baintan.
          </p>
          <div className="wetland-stats">
            <div>
              <strong>4</strong>
              <span>
                Peran utama
                <br />
                sungai
              </span>
            </div>
            <div>
              <strong>1</strong>
              <span>
                Ekosistem yang
                <br />
                saling terhubung
              </span>
            </div>
          </div>
          <Button variant="light" onClick={() => go("lahan-basah")}>
            Jelajahi Lahan Basah
          </Button>
        </div>
      </section>

      <GalleryPreview />
      <section
        className="travel-cta shell"
        style={{
          backgroundImage: `linear-gradient(90deg, #173e34 0%, rgba(23,62,52,.96) 42%, rgba(23,62,52,.12) 100%), url(${IMG.morning})`,
        }}
      >
        <div>
          <Eyebrow light>Mulai Perjalananmu</Eyebrow>
          <h2>
            Siap Menjelajahi
            <br />
            Lok Baintan?
          </h2>
          <p>
            Persiapkan pagi yang berbeda di antara jukung, riak sungai, dan keramahan masyarakat
            Banjar.
          </p>
          <Button variant="light" onClick={() => openPlanner()}>
            Rencanakan Kunjungan
          </Button>
        </div>
        <span className="cta-ornament">BAINTAN</span>
      </section>
    </>
  );
}

const galleryItems = [
  { src: IMG.hero, title: "Pagi di Lok Baintan", cat: "Pasar Terapung", tall: true },
  { src: IMG.woman, title: "Cerita dari Atas Jukung", cat: "Budaya Banjar" },
  { src: IMG.morning, title: "Cahaya Pertama Martapura", cat: "Sungai & Alam" },
  { src: IMG.fruit, title: "Warna Hasil Kebun", cat: "Pasar Terapung", tall: true },
  { src: IMG.canoe, title: "Kayuhan Kehidupan", cat: "Budaya Banjar" },
  { src: IMG.tropical, title: "Tepian Hijau Martapura", cat: "Sungai & Alam", tall: true },
  { src: IMG.village, title: "Permukiman Tepian Air", cat: "Sungai & Alam" },
  { src: IMG.port, title: "Pertemuan di Pasar Pagi", cat: "Pasar Terapung" },
  { src: IMG.boats, title: "Jukung-Jukung yang Bertemu", cat: "Pasar Terapung", tall: true },
  { src: IMG.bridge, title: "Menyeberangi Martapura", cat: "Budaya Banjar" },
];

function GalleryPreview() {
  return (
    <section className="gallery-preview section shell">
      <div className="split-head">
        <SectionHead eyebrow="Galeri Pilihan" title="Momen dari tepian Martapura" />
        <button className="text-link" onClick={() => go("galeri")}>
          Lihat Galeri Lengkap
        </button>
      </div>
      <div className="preview-grid">
        {galleryItems.slice(0, 5).map((g, i) => (
          <article key={g.title} className={`preview-card preview-${i + 1}`}>
            <img src={g.src} alt={g.title} />
            <span className="preview-title">{g.title}</span>
            <button className="gallery-open" onClick={() => go("galeri")}>
              Lihat di Galeri
            </button>
          </article>
        ))}
      </div>
    </section>
  );
}

function About() {
  const facts = [
    {
      icon: "boat" as IconName,
      n: "Jukung",
      t: "Perahu kayu tradisional yang lincah menyusuri sungai.",
      image: IMG.boats,
    },
    {
      icon: "sun" as IconName,
      n: "Pagi",
      t: "Waktu saat aktivitas pasar terasa paling hidup.",
      image: IMG.morning,
    },
    {
      icon: "people" as IconName,
      n: "Acil",
      t: "Sapaan hangat bagi perempuan Banjar yang berdagang.",
      image: IMG.woman,
    },
  ];
  return (
    <>
      <PageHero
        label="Tentang"
        title="Mengenal Lok Baintan Lebih Dekat"
        text="Sebuah warisan sungai yang terus hidup melalui kayuhan jukung, perdagangan tradisional, dan keramahan masyarakat Banjar."
        image={IMG.village}
      />
      <section className="section shell about-lead">
        <div>
          <Eyebrow>Kisah dari Sungai</Eyebrow>
          <h2>Pasar yang tumbuh bersama aliran Martapura</h2>
        </div>
        <div>
          <p>
            Pasar Terapung Lok Baintan berada di Banjarmasin, Kalimantan Selatan. Setiap
            pagi, pedagang dari kampung-kampung sekitar berkumpul dengan jukung penuh hasil kebun
            dan makanan tradisional.
          </p>
          <p>
            Di sini, sungai bukan latar belakang. Sungai adalah ruang kerja, jalur pertemuan,
            sekaligus bagian dari identitas masyarakat Banjar.
          </p>
        </div>
      </section>
      <section className="story-section shell">
        <div className="story-image">
          <img src={IMG.morning} alt="Suasana sungai pada pagi hari" />
          <span>
            Lok Baintan
            <br />
            Kalimantan Selatan
          </span>
        </div>
        <div className="story-copy">
          <span className="story-index">01 — Jejak Waktu</span>
          <h2>Sejarah Pasar Terapung</h2>
          <p>
            Tradisi pasar terapung berakar dari kehidupan masyarakat yang bermukim di tepian dan
            sepanjang anak Sungai Martapura. Sebelum jalan darat menghubungkan banyak kampung,
            sungai menjadi jalur utama perpindahan orang dan barang.
          </p>
          <p>
            Pertemuan antarpedagang di atas air tumbuh secara alami. Sistem barter dahulu dikenal
            dengan istilah <i>bapanduk</i>, kemudian berkembang mengikuti perubahan zaman tanpa
            meninggalkan karakter khasnya.
          </p>
          <blockquote>
            <Icon name="quote" size={28} />
            “Pasar terapung adalah ingatan kolektif tentang bagaimana masyarakat Banjar hidup
            berdampingan dengan sungai.”
          </blockquote>
        </div>
      </section>
      <section className="story-section reverse shell">
        <div className="story-image">
          <img src={IMG.vendor} alt="Pedagang tradisional di atas perahu" />
        </div>
        <div className="story-copy">
          <span className="story-index">02 — Tradisi Hidup</span>
          <h2>Perdagangan di Atas Sungai</h2>
          <p>
            Pedagang—sebagian besar perempuan—mengatur hasil kebun, buah, sayuran, ikan, dan wadai
            di atas jukung. Perahu-perahu saling mendekat dengan cekatan, menciptakan pasar yang
            selalu bergerak mengikuti arus.
          </p>
          <p>
            Transaksi berlangsung akrab dan langsung. Sapaan, tawar-menawar, dan pertukaran cerita
            membuat pengalaman pasar terasa personal, bukan sekadar kegiatan jual beli.
          </p>
          <ul className="check-list">
            <li>Jukung sebagai lapak sekaligus alat transportasi</li>
            <li>Hasil kebun dari kampung-kampung sekitar</li>
            <li>Interaksi spontan yang hangat antarpedagang</li>
          </ul>
        </div>
      </section>
      <section className="culture-band">
        <div className="shell">
          <SectionHead
            eyebrow="Budaya Masyarakat Banjar"
            title="Nilai yang tetap mengalir"
            text="Kehidupan sungai membentuk cara masyarakat berinteraksi, bekerja, dan merawat kebersamaan."
            centered
          />
          <div className="fact-grid">
            {facts.map((f) => (
              <article key={f.n}>
                <img src={f.image} alt={`Kehidupan sungai: ${f.n}`} loading="lazy" />
                <span>
                  <Icon name={f.icon} />
                </span>
                <h3>{f.n}</h3>
                <p>{f.t}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function Explore({
  initialDetail = 0,
  scrollToDetail = false,
}: {
  initialDetail?: number;
  scrollToDetail?: boolean;
}) {
  const [detail, setDetail] = useState(initialDetail);
  useEffect(() => {
    if (scrollToDetail) document.getElementById("detail")?.scrollIntoView({ behavior: "smooth" });
  }, [scrollToDetail]);
  const selected = activities[detail];
  return (
    <>
      <PageHero
        label="Jelajah Wisata"
        title="Jelajahi Pengalaman Wisata Lok Baintan"
        text="Temukan berbagai pengalaman menarik yang menghadirkan keunikan kehidupan masyarakat sungai."
        image={IMG.hero}
      />
      <section className="section shell">
        <SectionHead
          eyebrow="Pilih Pengalamanmu"
          title="Empat cara menikmati Lok Baintan"
          text="Nikmati setiap momen dengan perlahan dan biarkan sungai menunjukkan cerita yang berbeda."
        />
        <div className="activity-grid explore-grid">
          {activities.map((a, i) => (
            <ActivityCard
              key={a.title}
              item={a}
              onDetail={() => {
                setDetail(i);
                document.getElementById("detail")?.scrollIntoView({ behavior: "smooth" });
              }}
            />
          ))}
        </div>
      </section>
      <section className="detail-section" id="detail">
        <div className="shell">
          <div className="detail-tabs">
            {activities.map((a, i) => (
              <button
                className={detail === i ? "active" : ""}
                aria-label={a.title}
                aria-pressed={detail === i}
                onClick={() => setDetail(i)}
                key={a.title}
              >
                <span>0{i + 1}</span> {a.tag}
              </button>
            ))}
          </div>
          <div className="detail-layout">
            <div className="detail-image">
              <img src={selected.image} alt={selected.title} />
              <span>
                <Icon name="camera" /> Pengalaman pilihan
              </span>
            </div>
            <div className="detail-copy">
              <Eyebrow>Detail Aktivitas</Eyebrow>
              <h2>{selected.title}</h2>
              <p>
                {selected.short} Hadir lebih awal memberi waktu untuk mengamati ritme pasar tanpa
                tergesa dan berinteraksi secara santun dengan masyarakat setempat.
              </p>
              <div className="experience-list">
                <div>
                  <Icon name="spark" />
                  <span>
                    <b>Yang dapat dialami</b>
                    {selected.experience}
                  </span>
                </div>
                <div>
                  <Icon name="compass" />
                  <span>
                    <b>Persiapan yang disarankan</b>
                    {selected.preparation}
                  </span>
                </div>
                <div>
                  <Icon name="clock" />
                  <span>
                    <b>Waktu terbaik</b>
                    {selected.time}, ketika cahaya lembut dan kehidupan pasar sedang ramai.
                  </span>
                </div>
              </div>
              <Button onClick={() => go("panduan")}>Baca Panduan Berkunjung</Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Wetlands() {
  return (
    <>
      <PageHero
        label="Pesona Lahan Basah"
        title="Pesona Lahan Basah: Kehidupan yang Mengalir Bersama Sungai"
        text="Menyelami hubungan erat antara Sungai Martapura, budaya Banjar, dan mata pencaharian masyarakat tepian air."
        image={IMG.tropical}
      />
      <section className="section shell wetland-intro">
        <div>
          <span className="big-number">01</span>
          <SectionHead eyebrow="Bentang Air" title="Sungai Martapura dan lingkungan lahan basah" />
          <p>
            Lahan basah Kalimantan Selatan adalah lanskap yang terus berubah bersama pasang, hujan,
            dan musim. Sungai Martapura menghubungkan kampung, kebun, rawa, dan pusat-pusat
            kehidupan masyarakat.
          </p>
        </div>
        <div className="mosaic">
          <img src={IMG.panorama} alt="Bentang hijau di sepanjang sungai" />
          <img src={IMG.river} alt="Perahu di Sungai Martapura" />
        </div>
      </section>
      <section
        className="quote-band"
        style={{
          backgroundImage: `linear-gradient(rgba(16,46,37,.82), rgba(16,46,37,.88)), url(${IMG.dawn})`,
        }}
      >
        <Icon name="quote" size={34} />
        <p>
          “Bagi masyarakat Banjar, sungai bukan batas yang memisahkan. Sungai adalah jalan yang
          mempertemukan.”
        </p>
        <span>— Cerita kehidupan tepian Martapura</span>
      </section>
      <section className="wetland-story shell">
        <div className="vertical-title">
          <span>ALIRAN KEHIDUPAN</span>
        </div>
        <div className="wetland-row">
          <div className="wetland-row-image">
            <img src={IMG.klotok} alt="Klotok melintas di sungai" />
            <b>02</b>
          </div>
          <div>
            <Eyebrow>Mobilitas</Eyebrow>
            <h2>Sungai sebagai jalur kehidupan</h2>
            <p>
              Klotok dan jukung membawa warga melintasi kampung, menuju pasar, kebun, dan kerabat.
              Di beberapa kawasan, sungai tetap menjadi rute yang paling alami untuk bergerak.
            </p>
            <div className="mini-facts">
              <span>
                <Icon name="route" /> Jalur transportasi
              </span>
              <span>
                <Icon name="people" /> Ruang sosial
              </span>
            </div>
          </div>
        </div>
        <div className="wetland-row flip">
          <div className="wetland-row-image">
            <img src={IMG.vendor} alt="Kegiatan ekonomi di atas sungai" />
            <b>03</b>
          </div>
          <div>
            <Eyebrow>Mata Pencaharian</Eyebrow>
            <h2>Kehidupan ekonomi masyarakat</h2>
            <p>
              Hasil kebun dan olahan rumahan berpindah dari jukung ke jukung. Pasar terapung
              memperlihatkan sebuah ekonomi lokal yang lentur, dekat, dan berakar pada hubungan
              antarkampung.
            </p>
            <div className="mini-facts">
              <span>
                <Icon name="boat" /> Perdagangan jukung
              </span>
              <span>
                <Icon name="leaf" /> Hasil kebun lokal
              </span>
            </div>
          </div>
        </div>
      </section>
      <section className="responsible">
        <div className="shell">
          <div>
            <Eyebrow light>Wisata Bertanggung Jawab</Eyebrow>
            <h2>Menjaga keindahan sungai, menghormati kehidupan</h2>
            <p>Kehadiran kita sebaiknya meninggalkan kesan baik, bukan jejak yang merusak.</p>
          </div>
          <div className="responsible-grid">
            {[
              "Bawa kembali sampahmu",
              "Hormati ruang pedagang",
              "Hindari plastik sekali pakai",
              "Minta izin sebelum memotret",
            ].map((x, i) => (
              <article key={x}>
                <span>0{i + 1}</span>
                <Icon name={i === 0 ? "leaf" : i === 1 ? "people" : i === 2 ? "river" : "camera"} />
                <h3>{x}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function VideoFeature() {
  const [failed, setFailed] = useState(false);
  const [playing, setPlaying] = useState(false);
  return (
    <>
      <section className="video-feature" aria-labelledby="film-title">
        <div className="film-player">
          <button
            className="film-launch"
            onClick={() => {
              setFailed(false);
              setPlaying(true);
            }}
            aria-label="Putar film dokumenter Lok Baintan"
          >
            <img
              src="/media/lok-baintan-film-poster.webp"
              alt="Dokumentasi pedagang di Pasar Terapung Lok Baintan"
            />
            <span>
              <Icon name="play" size={52} /> Putar Film
            </span>
          </button>
          <span className="film-duration">DOKUMENTASI ASLI · 1 MENIT 26 DETIK</span>
        </div>
        <div className="film-copy">
          <Eyebrow>Jendela Kehidupan Sungai</Eyebrow>
          <h2 id="film-title">
            Bukan sekadar tempat.
            <br />
            <i>Ini kehidupan.</i>
          </h2>
          <p id="film-description">
            Ikuti gerak jukung, perjumpaan pedagang, dan keseharian pasar terapung dalam rekaman
            langsung dari Lok Baintan.
          </p>
          <div className="film-credit">
            <Icon name="camera" />
            <span>
              Film oleh Midori
              <br />
              <a
                href="https://commons.wikimedia.org/wiki/File:Lok_Baintan_Floating_Market,_South_Kalimantan,_Indonesia.ogv"
                target="_blank"
                rel="noreferrer"
              >
                Wikimedia Commons · CC BY-SA 3.0
              </a>
            </span>
          </div>
        </div>
      </section>
      {playing && (
        <Modal
          titleId="video-modal-title"
          onClose={() => setPlaying(false)}
          className="video-modal"
        >
          <span className="planner-kicker">DOKUMENTASI DARI LOK BAINTAN</span>
          <h2 id="video-modal-title">Kehidupan di atas jukung</h2>
          <video
            controls
            autoPlay
            playsInline
            preload="auto"
            poster="/media/lok-baintan-film-poster.webp"
            onError={() => setFailed(true)}
            aria-label="Film dokumenter Pasar Terapung Lok Baintan"
          >
            <source src="/media/lok-baintan-film.mp4" type="video/mp4" />
            Peramban Anda tidak mendukung pemutaran video.
          </video>
          {failed && (
            <p role="alert">
              Video tidak dapat dimuat. Silakan coba kembali beberapa saat lagi.
            </p>
          )}
          <p>
            Film oleh Midori · Wikimedia Commons · CC BY-SA 3.0. Tutup pemutar untuk menghentikan
            video.
          </p>
        </Modal>
      )}
    </>
  );
}

function Gallery() {
  const cats = ["Semua", "Pasar Terapung", "Budaya Banjar", "Sungai & Alam", "Video"];
  const [cat, setCat] = useState("Semua");
  const [preview, setPreview] = useState<(typeof galleryItems)[number] | null>(null);
  const items = useMemo(
    () => (cat === "Semua" ? galleryItems : galleryItems.filter((x) => x.cat === cat)),
    [cat],
  );
  return (
    <>
      <PageHero
        label="Galeri"
        title="Galeri Pesona Lok Baintan"
        text="Momen-momen yang merekam warna pasar, hangatnya budaya, dan ketenangan Sungai Martapura."
        image={IMG.morning}
      />
      <section className="section shell gallery-page">
        <div className="gallery-toolbar">
          <div>
            <Eyebrow>Kisah dalam Gambar</Eyebrow>
            <h2>Lihat lebih dekat</h2>
          </div>
          <div className="filters">
            {cats.map((c) => (
              <button
                className={cat === c ? "active" : ""}
                aria-pressed={cat === c}
                key={c}
                onClick={() => setCat(c)}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
        <p className="media-note">
          Dokumentasi Lok Baintan dan Sungai Martapura, Kalimantan Selatan. Setiap bingkai menyimpan
          cerita; kredit fotografer dan lisensi tersedia di bagian bawah halaman.
        </p>
        <div className="masonry">
          {items.map((g, i) => (
            <button
              className={`${g.tall ? "tall" : ""}`}
              key={g.title}
              aria-label={`Buka pratinjau foto: ${g.title}`}
              onClick={() => setPreview(g)}
            >
              <img src={g.src} alt={g.title} loading="lazy" />
              <span className="gallery-shade" />
              <span className="gallery-caption">
                <small>{g.cat}</small>
                <b>{g.title}</b>
              </span>
              <span className="gallery-open">Lihat Foto</span>
            </button>
          ))}
        </div>
        {(cat === "Semua" || cat === "Video") && <VideoFeature />}
      </section>
      {preview && (
        <Modal
          titleId="gallery-preview-title"
          onClose={() => setPreview(null)}
          className="gallery-modal"
        >
          <div className="gallery-lightbox-content">
            <img src={preview.src} alt={preview.title} />
            <p>
              <small>{preview.cat}</small>
              <strong id="gallery-preview-title">{preview.title}</strong>
              <span className="photo-credit">
                {mediaCredits.find((media) => media.file === preview.src)?.author} · Wikimedia
                Commons
              </span>
            </p>
          </div>
        </Modal>
      )}
    </>
  );
}

const faqs = [
  [
    "Kapan waktu terbaik berkunjung?",
    "Pagi hari adalah waktu yang paling disarankan. Datanglah sebelum matahari meninggi agar dapat menyaksikan aktivitas pasar yang lebih hidup dan menikmati cahaya pagi di sungai.",
  ],
  [
    "Bagaimana cara menuju Lok Baintan?",
    "Lok Baintan dapat dicapai melalui jalur sungai menggunakan klotok maupun jalur darat dari Banjarmasin. Pilih rute sesuai titik keberangkatan dan kondisi perjalanan.",
  ],
  [
    "Apa saja yang dapat dilakukan di sana?",
    "Anda dapat menyaksikan perdagangan di atas jukung, menyusuri Sungai Martapura, mengenal kuliner Banjar, berinteraksi dengan warga, dan menikmati fotografi suasana pagi.",
  ],
  [
    "Apa yang perlu dipersiapkan?",
    "Kenakan pakaian nyaman, bawa pelindung dari panas atau hujan, siapkan uang tunai secukupnya, dan gunakan tas yang aman dari percikan air.",
  ],
];

function Guide() {
  const [open, setOpen] = useState(0);
  const [destinationId, setDestinationId] = useState("pasar");
  const destination = destinations.find((item) => item.id === destinationId) ?? destinations[0];
  const [mapState, setMapState] = useState<"loading" | "loaded" | "failed">("loading");
  const tips = [
    { i: "sun" as IconName, t: "Datang lebih pagi", p: "Suasana pasar paling hidup saat pagi." },
    { i: "compass" as IconName, t: "Perlengkapan pribadi", p: "Bawa topi dan pelindung cuaca." },
    { i: "people" as IconName, t: "Hormati warga", p: "Minta izin sebelum mengambil foto." },
    { i: "leaf" as IconName, t: "Jaga kebersihan", p: "Jangan meninggalkan sampah di sungai." },
    {
      i: "wallet" as IconName,
      t: "Siapkan uang tunai",
      p: "Memudahkan transaksi dengan pedagang.",
    },
  ];
  return (
    <>
      <PageHero
        label="Panduan Berkunjung"
        title="Panduan Berkunjung ke Lok Baintan"
        text="Persiapkan perjalananmu dan nikmati pengalaman wisata Pasar Terapung Lok Baintan."
        image={IMG.boats}
      />
      <section className="info-strip">
        <div className="shell">
          <div>
            <span>
              <Icon name="boat" />
            </span>
            <p>
              <small>Nama</small>
              <b>Pasar Terapung Lok Baintan</b>
            </p>
          </div>
          <div className="info-location">
            <span>
              <Icon name="map" />
            </span>
            <div className="info-location-content">
              <label htmlFor="destination-location">Lokasi</label>
              <Select
                id="destination-location"
                label="Pilih Lokasi Tujuan"
                variant="bar"
                value={destinationId}
                onChange={(value) => {
                  setDestinationId(value);
                  setMapState("loading");
                }}
                options={destinations.map((item) => ({ value: item.id, label: item.name }))}
              />
            </div>
          </div>
          <div>
            <span>
              <Icon name="river" />
            </span>
            <p>
              <small>Sungai</small>
              <b>Sungai Martapura</b>
            </p>
          </div>
          <div>
            <span>
              <Icon name="clock" />
            </span>
            <p>
              <small>Waktu Disarankan</small>
              <b>Pagi hari</b>
            </p>
          </div>
        </div>
      </section>
      <div className="visitor-note shell">
        <Icon name="leaf" />
        <p>
          <b>Tamu di rumah masyarakat sungai.</b> Nikmati kunjungan dengan santun, beri ruang bagi
          pedagang, dan bawa kembali sampahmu.
        </p>
      </div>
      <section className="section shell map-section">
        <div>
          <SectionHead eyebrow="Lokasi & Peta" title="Lokasi pilihanmu" />
          <div className="destination-description" aria-live="polite">
            <h3>{destination.name}</h3>
            <p>{destination.description}</p>
          </div>
          <a
            className="button primary"
            href={mapsSearch(destination.query)}
            target="_blank"
            rel="noreferrer"
          >
            Lihat di Google Maps
          </a>
          <p className="map-help" role="status">
            {mapState === "loading"
              ? "Memuat peta Google Maps…"
              : mapState === "failed"
                ? "Peta tidak dapat dimuat. Gunakan tautan Google Maps di atas."
                : "Peta disediakan oleh Google Maps."}{" "}
            Jika peta kosong atau diblokir peramban, buka lokasi melalui tautan di atas.
          </p>
          <button
            className="map-retry"
            onClick={() => setMapState(mapState === "failed" ? "loading" : "failed")}
          >
            {mapState === "failed" ? "Coba muat ulang peta" : "Peta tidak tampil?"}
          </button>
        </div>
        <div className="map-visual">
          {mapState === "failed" ? (
            <div className="map-fallback">
              <Icon name="map" size={40} />
              <span>LOKASI PILIHANMU</span>
              <h3>{destination.name}</h3>
              <p>
                Peta sematan tidak tersedia di peramban ini. Buka Google Maps untuk melihat lokasi
                dan menelusuri kawasan.
              </p>
              <a
                className="button light"
                href={mapsSearch(destination.query)}
                target="_blank"
                rel="noreferrer"
              >
                Buka Lokasi di Google Maps
              </a>
            </div>
          ) : (
            <iframe
              key={destination.id}
              title={`Peta Google Maps ${destination.name}`}
              src={mapsEmbed(destination.query)}
              onLoad={() => setMapState("loaded")}
              onError={() => setMapState("failed")}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
            />
          )}
          <div className="map-caption">
            <Icon name="map" />
            <p>
              <b>{destination.name}</b>
              <span>{destination.area}</span>
            </p>
          </div>
        </div>
      </section>
      <section className="guide-planner shell">
        <div>
          <Eyebrow>Lebih Siap, Lebih Berkesan</Eyebrow>
          <h2>Satu pagi, sesuai caramu.</h2>
          <p>
            Pilih tanggal, titik berangkat, dan pengalaman favorit. Bawa ringkasan rencanamu, lalu
            nikmati perjalanan dengan lebih tenang.
          </p>
        </div>
        <Button onClick={() => openPlanner()}>Rencanakan Kunjungan</Button>
      </section>
      <section className="transport section">
        <div className="shell">
          <SectionHead
            eyebrow="Akses Transportasi"
            title="Dua jalur menuju pengalaman sungai"
            centered
          />
          <div className="transport-grid">
            <article>
              <div>
                <Icon name="boat" size={34} />
              </div>
              <span>01</span>
              <h3>Jalur Sungai dengan Klotok</h3>
              <p>
                Perjalanan melalui Sungai Martapura memberi pengalaman utuh sejak awal. Anda dapat
                melihat permukiman tepian air sebelum tiba di area pasar.
              </p>
              <ul>
                <li>Pastikan titik keberangkatan dengan operator setempat</li>
                <li>Gunakan pelampung jika tersedia dan ikuti arahan awak</li>
              </ul>
            </article>
            <article>
              <div>
                <Icon name="route" size={34} />
              </div>
              <span>02</span>
              <h3>Jalur Darat dengan Kendaraan</h3>
              <p>
                Akses darat menuju kawasan Lok Baintan dapat dimulai dari Banjarmasin. Periksa
                kondisi rute dan waktu tempuh sebelum berangkat.
              </p>
              <ul>
                <li>Gunakan navigasi menuju Pasar Terapung Lok Baintan</li>
                <li>Konfirmasikan titik akses tepian sungai setempat</li>
              </ul>
            </article>
          </div>
        </div>
      </section>
      <section className="section shell tips">
        <SectionHead eyebrow="Sebelum Berangkat" title="Tips untuk kunjungan yang nyaman" />
        <div className="tips-grid">
          {tips.map((t, i) => (
            <article key={t.t}>
              <span>0{i + 1}</span>
              <div>
                <Icon name={t.i} size={27} />
              </div>
              <h3>{t.t}</h3>
              <p>{t.p}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="faq-section">
        <div className="shell faq-layout">
          <div>
            <SectionHead eyebrow="Pertanyaan Umum" title="Hal yang sering ditanyakan" />
            <p>Temukan jawaban singkat untuk membantu menyiapkan kunjungan pertamamu.</p>
          </div>
          <div className="faq-list">
            {faqs.map(([q, a], i) => (
              <article className={open === i ? "open" : ""} key={q}>
                <button
                  id={`faq-question-${i}`}
                  aria-expanded={open === i}
                  aria-controls={`faq-answer-${i}`}
                  onClick={() => setOpen(open === i ? -1 : i)}
                >
                  <span>0{i + 1}</span>
                  <b>{q}</b>
                  <i>
                    <Icon name="chevron" />
                  </i>
                </button>
                <div
                  id={`faq-answer-${i}`}
                  role="region"
                  aria-labelledby={`faq-question-${i}`}
                  aria-hidden={open !== i}
                >
                  <p>{a}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default function App() {
  const initial = (location.hash.replace("#/", "") || "beranda") as Page;
  const [page, setPage] = useState<Page>(nav.some((n) => n.id === initial) ? initial : "beranda");
  const [plannerOpen, setPlannerOpen] = useState(false);
  openPlanner = () => setPlannerOpen(true);
  const [activityEntry, setActivityEntry] = useState<{ index: number; scroll: boolean }>({
    index: 0,
    scroll: false,
  });
  navigate = (next) => {
    setActivityEntry({ index: 0, scroll: false });
    setPage(next);
    history.pushState(null, "", `#/${next}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  useEffect(() => {
    const fn = () => {
      const next = location.hash.replace("#/", "") || "beranda";
      setPage(nav.some((item) => item.id === next) ? (next as Page) : "beranda");
      setPlannerOpen(false);
    };
    window.addEventListener("popstate", fn);
    window.addEventListener("hashchange", fn);
    return () => {
      window.removeEventListener("popstate", fn);
      window.removeEventListener("hashchange", fn);
    };
  }, []);
  useEffect(() => {
    document.title = `${nav.find((item) => item.id === page)?.label} · Lok Baintan Explorer`;
  }, [page]);
  const pages: Record<Page, React.ReactNode> = {
    beranda: (
      <Home
        onActivity={(index) => {
          go("jelajah");
          setActivityEntry({ index, scroll: true });
        }}
      />
    ),
    tentang: <About />,
    jelajah: <Explore initialDetail={activityEntry.index} scrollToDetail={activityEntry.scroll} />,
    "lahan-basah": <Wetlands />,
    galeri: <Gallery />,
    panduan: <Guide />,
  };
  return (
    <div className="app" lang="id">
      <Header page={page} />
      <main className={`page-content page-${page}`} key={page}>
        {pages[page]}
      </main>
      <Footer />
      {plannerOpen && <TravelPlanner onClose={() => setPlannerOpen(false)} />}
    </div>
  );
}
