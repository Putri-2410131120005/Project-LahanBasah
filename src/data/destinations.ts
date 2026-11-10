export const destinations = [
  {
    id: "pasar",
    name: "Pasar Terapung Lok Baintan",
    query: "Pasar Terapung Lok Baintan, Sungai Tabuk, Kabupaten Banjar, Kalimantan Selatan",
    area: "Banjarmasin, Kalimantan Selatan",
    description:
      "Ruang perdagangan di atas jukung di Sungai Martapura. Datang pada pagi hari dan konfirmasikan akses tepian sungai dengan warga atau operator setempat.",
  },
  {
    id: "desa",
    name: "Desa Lok Baintan",
    query: "Desa Lok Baintan, Sungai Tabuk, Kabupaten Banjar, Kalimantan Selatan",
    area: "Banjarmasin, Kalimantan Selatan",
    description:
      "Desa tepian Sungai Martapura yang menjadi bagian dari kehidupan pasar terapung. Hormati ruang tinggal warga; akses desa tidak selalu sama dengan titik naik perahu.",
  },
  {
    id: "siring",
    name: "Siring Menara Pandang Banjarmasin",
    query: "Siring Menara Pandang, Jalan Kapten Piere Tendean, Banjarmasin, Kalimantan Selatan",
    area: "Jalan Piere Tendean, Banjarmasin",
    description:
      "Kawasan wisata tepian sungai di pusat Banjarmasin, terpisah dari Lok Baintan. Jika ingin melanjutkan dengan klotok, pastikan titik naik dan ketersediaannya langsung kepada operator.",
  },
] as const;

export function mapsSearch(query: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}

export function mapsEmbed(query: string) {
  return `https://maps.google.com/maps?q=${encodeURIComponent(query)}&z=14&output=embed&hl=id`;
}
