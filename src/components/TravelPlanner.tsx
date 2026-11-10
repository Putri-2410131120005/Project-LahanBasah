import { useRef, useState, type FormEvent } from "react";
import { destinations } from "../data/destinations";
import { Modal } from "./Modal";
import { Select } from "./Select";

type Field = "date" | "visitors" | "departure" | "activities";

const activityOptions = [
  "Menyaksikan aktivitas pasar terapung",
  "Menyusuri sungai dengan jukung",
  "Mengenal kuliner khas Banjar",
  "Menikmati suasana pagi dan fotografi",
];
const departures = [
  destinations[2],
  destinations[1],
  {
    id: "banjarbaru",
    name: "Pusat Kota Banjarbaru",
    query: "Lapangan Murjani, Banjarbaru, Kalimantan Selatan",
  },
];

function localToday() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}

export function TravelPlanner({ onClose }: { onClose: () => void }) {
  const [date, setDate] = useState("");
  const [visitors, setVisitors] = useState("1");
  const [departure, setDeparture] = useState("");
  const [activities, setActivities] = useState<string[]>([]);
  const [notes, setNotes] = useState("");
  const [generated, setGenerated] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<Field, string>>>({});
  const summaryRef = useRef<HTMLHeadingElement>(null);
  const departureLocation = departures.find((item) => item.id === departure);
  const dateLabel = date
    ? new Intl.DateTimeFormat("id-ID", { dateStyle: "full" }).format(new Date(`${date}T12:00:00`))
    : "";
  const preparation = [
    "Periksa cuaca dan kondisi akses sebelum berangkat; aktivitas pasar mengikuti keadaan setempat.",
    "Bawa uang tunai pecahan kecil, air minum, pelindung hujan, dan tas tahan percikan.",
    "Minta izin sebelum memotret, beri ruang untuk pedagang, dan bawa kembali sampah.",
    ...(Number(visitors) > 1
      ? ["Sepakati titik berkumpul dan perhatikan kebutuhan setiap anggota rombongan."]
      : []),
    ...(activities.includes(activityOptions[1])
      ? [
          "Jika ingin mencoba jukung, tanyakan kemungkinan pengalaman tersebut kepada warga atau pendamping setempat. Pastikan perlengkapan keselamatan dan ikuti arahan pendamping; aktivitas ini bukan layanan transportasi terjadwal dan ketersediaannya tidak dijamin.",
        ]
      : []),
    ...(activities.includes(activityOptions[2])
      ? [
          "Tanyakan bahan makanan kepada pedagang jika memiliki alergi; pilihan kuliner mengikuti sajian yang tersedia.",
        ]
      : []),
  ];
  const sequence = [
    "Datang pada pagi hari setelah memeriksa cuaca dan akses terakhir ke tepian sungai.",
    ...activityOptions
      .filter((item) => activities.includes(item))
      .map((item) =>
        item === activityOptions[1]
          ? `${item}, hanya jika kondisi aman dan pengalaman tersebut sudah dikonfirmasi dengan warga atau pendamping setempat.`
          : `${item} dengan santun, mengikuti ritme masyarakat dan tanpa menghalangi perdagangan.`,
      ),
    "Sebelum pulang, periksa barang bawaan dan bawa kembali sampahmu.",
  ];
  const directions = departureLocation
    ? `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(departureLocation.query)}&destination=${encodeURIComponent(destinations[0].query)}&travelmode=driving`
    : null;

  function generate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors: Partial<Record<Field, string>> = {};
    if (!date) nextErrors.date = "Pilih tanggal kunjungan.";
    else if (date < localToday()) nextErrors.date = "Tanggal kunjungan tidak boleh tanggal lampau.";
    if (
      !visitors ||
      !Number.isInteger(Number(visitors)) ||
      Number(visitors) < 1 ||
      Number(visitors) > 999
    ) {
      nextErrors.visitors = "Masukkan jumlah pengunjung antara 1–999 orang, tanpa desimal.";
    }
    if (!departureLocation) nextErrors.departure = "Pilih lokasi keberangkatan.";
    if (!activities.length) nextErrors.activities = "Pilih setidaknya satu aktivitas wisata.";
    setErrors(nextErrors);
    const firstError = Object.keys(nextErrors)[0] as Field | undefined;
    if (firstError) {
      document.getElementById(`plan-${firstError}`)?.focus();
      return;
    }
    setGenerated(true);
    requestAnimationFrame(() => summaryRef.current?.focus());
  }

  function clearError(field: Field) {
    setErrors((previous) => ({ ...previous, [field]: undefined }));
  }

  return (
    <Modal titleId="planner-title" onClose={onClose} className="planner-modal">
      <div className="planner-heading">
        <span className="planner-kicker">ASISTEN PERSIAPAN KUNJUNGAN</span>
        <h2 id="planner-title">
          Rencanakan pagi <i>yang berkesan.</i>
        </h2>
        <p>
          Pilih pengalamanmu dan siapkan kebutuhan perjalanan dengan panduan pribadi.
          Ini bukan pemesanan; isian tidak dikirim ke layanan lain.
        </p>
        <div
          className="planner-steps"
          aria-label={
            generated ? "Langkah 2: Rencana perjalanan" : "Langkah 1: Preferensi kunjungan"
          }
        >
          <span className={!generated ? "current" : ""}>01 · Preferensi kunjungan</span>
          <span className={generated ? "current" : ""}>02 · Rencana perjalanan</span>
        </div>
      </div>
      {!generated ? (
        <form className="planner-form" onSubmit={generate} noValidate>
          <p className="form-required">Semua isian wajib diisi, kecuali catatan.</p>
          <div className="form-grid">
            <label>
              Tanggal kunjungan
              <input
                id="plan-date"
                aria-invalid={!!errors.date}
                aria-describedby={errors.date ? "plan-date-error" : undefined}
                type="date"
                required
                min={localToday()}
                value={date}
                onChange={(event) => {
                  setDate(event.target.value);
                  clearError("date");
                }}
              />
              {errors.date && (
                <span className="field-error" id="plan-date-error" role="alert">
                  {errors.date}
                </span>
              )}
            </label>
            <label>
              Jumlah pengunjung
              <input
                id="plan-visitors"
                aria-invalid={!!errors.visitors}
                aria-describedby={errors.visitors ? "plan-visitors-error" : "plan-visitors-hint"}
                type="number"
                required
                min="1"
                max="999"
                step="1"
                value={visitors}
                onChange={(event) => {
                  setVisitors(event.target.value);
                  clearError("visitors");
                }}
              />
              <small id="plan-visitors-hint">Termasuk anak-anak dalam rombongan.</small>
              {errors.visitors && (
                <span className="field-error" id="plan-visitors-error" role="alert">
                  {errors.visitors}
                </span>
              )}
            </label>
            <div className="departure-field">
              <label htmlFor="plan-departure">Lokasi keberangkatan</label>
              <Select
                id="plan-departure"
                label="Lokasi keberangkatan"
                required
                invalid={!!errors.departure}
                describedBy={errors.departure ? "plan-departure-error" : undefined}
                value={departure}
                onChange={(value) => {
                  setDeparture(value);
                  clearError("departure");
                }}
                placeholder="Pilih titik keberangkatan"
                options={departures.map((item) => ({ value: item.id, label: item.name }))}
              />
              {errors.departure && (
                <span className="field-error" id="plan-departure-error" role="alert">
                  {errors.departure}
                </span>
              )}
            </div>
          </div>
          <fieldset
            className="activity-options"
            aria-describedby={errors.activities ? "activity-error" : undefined}
          >
            <legend>
              Pilihan aktivitas wisata <small>Pilih minimal satu</small>
            </legend>
            {activityOptions.map((item, index) => (
              <label key={item} className={activities.includes(item) ? "selected" : ""}>
                <input
                  id={index === 0 ? "plan-activities" : undefined}
                  type="checkbox"
                  checked={activities.includes(item)}
                  onChange={(event) => {
                    setActivities(
                      event.target.checked
                        ? [...activities, item]
                        : activities.filter((value) => value !== item),
                    );
                    clearError("activities");
                  }}
                />
                <span>{item}</span>
              </label>
            ))}
          </fieldset>
          {errors.activities && (
            <p id="activity-error" className="form-error" role="alert">
              {errors.activities}
            </p>
          )}
          <label className="notes-label">
            Catatan persiapan <small>Opsional</small>
            <textarea
              rows={3}
              maxLength={1000}
              placeholder="Misalnya: membawa anak, kebutuhan akses, atau perlengkapan pribadi…"
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
            />
          </label>
          <div className="planner-actions">
            <p>
              Tujuan: <b>Pasar Terapung Lok Baintan</b>
            </p>
            <button className="button primary" type="submit">
              Buat Rencana Perjalanan
            </button>
          </div>
        </form>
      ) : (
        <div className="plan-result">
          <div className="plan-result-top">
            <span>RENCANA PRIBADI ANDA</span>
            <h3 ref={summaryRef} tabIndex={-1}>
              Rencana Kunjunganmu ke Lok Baintan
            </h3>
            <p>
              {dateLabel} · {visitors} pengunjung
            </p>
          </div>
          <dl className="plan-facts">
            <div>
              <dt>Berangkat dari</dt>
              <dd>{departureLocation?.name}</dd>
            </div>
            <div>
              <dt>Tujuan</dt>
              <dd>Pasar Terapung Lok Baintan</dd>
            </div>
            <div>
              <dt>Waktu kunjungan disarankan</dt>
              <dd>Pagi hari, sesuai kondisi setempat</dd>
            </div>
          </dl>
          <h4>Pengalaman pilihanmu</h4>
          <ol className="plan-activities">
            {activities.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
          <h4>Urutan aktivitas yang disarankan</h4>
          <ol className="plan-sequence">
            {sequence.map((item, index) => (
              <li key={item}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{item}</p>
              </li>
            ))}
          </ol>
          <h4>Siapkan sebelum berangkat</h4>
          <ul className="plan-tips">
            {preparation.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          {notes.trim() && (
            <div className="plan-notes">
              <h4>Catatan pribadi</h4>
              <p>{notes}</p>
            </div>
          )}
          <p className="planner-notice">
            Petunjuk arah Google Maps hanya untuk jalur darat, bukan rute jukung. Periksa kondisi
            jalan dan akses terakhir ke sungai di lokasi. Pengalaman jukung perlu dikonfirmasi
            dengan warga atau pendamping setempat, bukan layanan yang telah dipesan.
          </p>
          <div className="result-actions">
            {directions && (
              <a className="button primary" href={directions} target="_blank" rel="noreferrer">
                Lihat Rute di Google Maps
              </a>
            )}
            <button
              className="button planner-outline"
              onClick={() => {
                setGenerated(false);
                requestAnimationFrame(() => document.getElementById("plan-date")?.focus());
              }}
            >
              Ubah Rencana
            </button>
          </div>
          <p className="plan-disclaimer">
            Ini panduan pribadi, bukan pemesanan. Tidak ada jadwal, harga, atau ketersediaan yang
            dijamin. Isian tidak disimpan setelah asisten ditutup.
          </p>
        </div>
      )}
    </Modal>
  );
}
