<?php

namespace App\Http\Controllers;

use Illuminate\View\View;

class PageController extends Controller
{
    public function home(): View
    {
        return $this->page('pages.home', 'beranda');
    }

    public function about(): View
    {
        return $this->page('pages.about', 'tentang');
    }

    public function explore(): View
    {
        return $this->page('pages.explore', 'jelajah');
    }

    public function wetlands(): View
    {
        return $this->page('pages.wetlands', 'lahan-basah');
    }

    public function gallery(): View
    {
        return $this->page('pages.gallery', 'galeri');
    }

    public function guide(): View
    {
        return $this->page('pages.guide', 'panduan');
    }

    private function page(string $view, string $page): View
    {
        $data = $this->siteData();
        $data['page'] = $page;

        return view($view, $data);
    }

    private function siteData(): array
    {
        $images = [
            'hero' => '/media/market-aerial.webp',
            'river' => '/media/martapura-klotok.webp',
            'boats' => '/media/market-boats.webp',
            'canoe' => '/media/market-riverside.webp',
            'morning' => '/media/market-dawn.webp',
            'klotok' => '/media/martapura-klotok.webp',
            'vendor' => '/media/market-vendors.webp',
            'village' => '/media/river-houses.webp',
            'woman' => '/media/banjar-traders.webp',
            'fruit' => '/media/local-bananas.webp',
            'tropical' => '/media/martapura-palms.webp',
            'panorama' => '/media/market-panorama.webp',
            'port' => '/media/market-port.webp',
            'bridge' => '/media/martapura-bridge.webp',
            'dawn' => '/media/martapura-dawn.webp',
        ];

        $activities = [
            [
                'title' => 'Menyaksikan Aktivitas Pasar Terapung',
                'short' => 'Lihat para pedagang mengayuh jukung berisi hasil kebun dan kuliner Banjar di tengah riuh pagi.',
                'image' => $images['hero'], 'tag' => 'Budaya & Tradisi', 'time' => 'Pagi hari',
                'experience' => 'Melihat hasil kebun berpindah dari jukung ke jukung, mendengar tawar-menawar, dan menyapa pedagang dengan santun.',
                'preparation' => 'Siapkan uang tunai pecahan kecil dan minta izin sebelum memotret. Jangan menghalangi perahu yang sedang berdagang.',
            ],
            [
                'title' => 'Menyusuri Sungai dengan Klotok',
                'short' => 'Rasakan perjalanan menyusuri Martapura, melintasi rumah panggung dan kehidupan tepian sungai.',
                'image' => $images['klotok'], 'tag' => 'Susur Sungai', 'time' => 'Pagi–siang',
                'experience' => 'Mengamati rumah tepian sungai, perahu warga, dan pepohonan dari klotok yang menyusuri aliran Martapura.',
                'preparation' => 'Konfirmasikan titik berangkat dan rute dengan operator setempat. Ikuti arahan awak, jaga keseimbangan, dan gunakan pelampung bila tersedia.',
            ],
            [
                'title' => 'Mengenal Kuliner Khas Banjar',
                'short' => 'Temukan wadai tradisional, buah segar, dan cita rasa lokal yang dijajakan langsung dari jukung.',
                'image' => $images['fruit'], 'tag' => 'Kuliner', 'time' => 'Pagi hari',
                'experience' => 'Mengenali wadai Banjar, bertanya tentang sajian yang tersedia, serta melihat buah dan hasil kebun yang dibawa pedagang.',
                'preparation' => 'Bawa uang tunai secukupnya. Tanyakan bahan makanan bila memiliki alergi dan bawa wadah guna ulang bila memungkinkan.',
            ],
            [
                'title' => 'Menikmati Suasana Pagi di Sungai Martapura',
                'short' => 'Saksikan kabut tipis dan cahaya keemasan membingkai aktivitas sungai yang perlahan terbangun.',
                'image' => $images['morning'], 'tag' => 'Fotografi', 'time' => 'Fajar',
                'experience' => 'Menikmati perubahan cahaya di permukaan air dan menyaksikan kehidupan sungai berangsur ramai menjelang pagi.',
                'preparation' => 'Periksa cuaca sebelum berangkat, lindungi kamera dari percikan air, dan gunakan pakaian yang nyaman untuk perjalanan pagi.',
            ],
        ];

        $gallery = [
            ['src' => $images['hero'], 'title' => 'Pagi di Lok Baintan', 'cat' => 'Pasar Terapung', 'tall' => true],
            ['src' => $images['woman'], 'title' => 'Cerita dari Atas Jukung', 'cat' => 'Budaya Banjar'],
            ['src' => $images['morning'], 'title' => 'Cahaya Pertama Martapura', 'cat' => 'Sungai & Alam'],
            ['src' => $images['fruit'], 'title' => 'Warna Hasil Kebun', 'cat' => 'Pasar Terapung', 'tall' => true],
            ['src' => $images['canoe'], 'title' => 'Kayuhan Kehidupan', 'cat' => 'Budaya Banjar'],
            ['src' => $images['tropical'], 'title' => 'Tepian Hijau Martapura', 'cat' => 'Sungai & Alam', 'tall' => true],
            ['src' => $images['village'], 'title' => 'Permukiman Tepian Air', 'cat' => 'Sungai & Alam'],
            ['src' => $images['port'], 'title' => 'Pertemuan di Pasar Pagi', 'cat' => 'Pasar Terapung'],
            ['src' => $images['boats'], 'title' => 'Jukung-Jukung yang Bertemu', 'cat' => 'Pasar Terapung', 'tall' => true],
            ['src' => $images['bridge'], 'title' => 'Menyeberangi Martapura', 'cat' => 'Budaya Banjar'],
        ];

        $destinations = [
            ['id' => 'pasar', 'name' => 'Pasar Terapung Lok Baintan', 'query' => 'Pasar Terapung Lok Baintan, Sungai Tabuk, Kabupaten Banjar, Kalimantan Selatan', 'area' => 'Kabupaten Banjar, Kalimantan Selatan', 'description' => 'Ruang perdagangan di atas jukung di Sungai Martapura. Datang pada pagi hari dan konfirmasikan akses tepian sungai dengan warga atau operator setempat.'],
            ['id' => 'desa', 'name' => 'Desa Lok Baintan', 'query' => 'Desa Lok Baintan, Sungai Tabuk, Kabupaten Banjar, Kalimantan Selatan', 'area' => 'Kabupaten Banjar, Kalimantan Selatan', 'description' => 'Desa tepian Sungai Martapura yang menjadi bagian dari kehidupan pasar terapung. Hormati ruang tinggal warga; akses desa tidak selalu sama dengan titik naik perahu.'],
            ['id' => 'siring', 'name' => 'Siring Menara Pandang Banjarmasin', 'query' => 'Siring Menara Pandang, Jalan Kapten Piere Tendean, Banjarmasin, Kalimantan Selatan', 'area' => 'Jalan Piere Tendean, Banjarmasin', 'description' => 'Kawasan wisata tepian sungai di pusat Banjarmasin, terpisah dari Lok Baintan. Jika ingin melanjutkan dengan klotok, pastikan titik naik dan ketersediaannya langsung kepada operator.'],
        ];

        $creditsPath = resource_path('data/media-credits.json');
        $credits = json_decode(file_get_contents($creditsPath), true, flags: JSON_THROW_ON_ERROR);

        return compact('images', 'activities', 'gallery', 'destinations', 'credits');
    }
}
