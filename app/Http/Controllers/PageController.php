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

    public function wetlandDetail(string $slug): View
    {
        $data = $this->siteData();
        $lesson = collect($data['wetlandLessons'])->firstWhere('slug', $slug);

        abort_if($lesson === null, 404);

        $index = array_search($slug, array_column($data['wetlandLessons'], 'slug'), true);
        $data['page'] = 'lahan-basah';
        $data['lesson'] = $lesson;
        $data['previousLesson'] = $index > 0 ? $data['wetlandLessons'][$index - 1] : null;
        $data['nextLesson'] = $index < count($data['wetlandLessons']) - 1 ? $data['wetlandLessons'][$index + 1] : null;

        return view('pages.wetland-detail', $data);
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

        $wetlandOrganisms = [
            [
                'name' => 'Nipah',
                'category' => 'Flora pesisir & tepian perairan',
                'image' => $images['tropical'],
                'description' => 'Nipah merupakan tumbuhan beradaptasi pada lingkungan berair atau payau. Pola pertumbuhannya menggambarkan hubungan vegetasi pesisir dengan aliran air, namun kehadirannya di Lok Baintan perlu konfirmasi lapangan.',
                'details' => [
                    'Nipah adalah palma yang tumbuh pada lingkungan basah, terutama wilayah tepian air yang dipengaruhi genangan atau kadar garam tertentu. Daunnya panjang dan tumbuh berumpun.',
                    'Vegetasi seperti nipah dapat membantu menyediakan tempat berlindung bagi organisme kecil dan menjaga hubungan antara tanah, air, serta tumbuhan di tepian. Manfaat bagi manusia dapat berupa bahan kerajinan atau bagian tanaman yang dimanfaatkan secara lokal, bergantung pada pengetahuan dan aturan setempat.',
                    'Perubahan habitat, pencemaran, dan pengambilan yang tidak terkendali dapat memengaruhi keberlanjutan tumbuhan ini. Keberadaan nipah secara khusus di Lok Baintan tetap perlu diverifikasi melalui observasi lapangan atau sumber ilmiah.',
                ],
            ],
            [
                'name' => 'Ikan air tawar',
                'category' => 'Fauna sungai',
                'image' => $images['river'],
                'description' => 'Ikan dan organisme air menjadi bagian dari jaring kehidupan sungai. Identitas spesies setempat sebaiknya dikonfirmasi melalui observasi atau sumber ilmiah sebelum dicantumkan sebagai fakta lokasi.',
                'details' => [
                    'Ikan air tawar bergantung pada kualitas air, ketersediaan makanan, tempat berlindung, dan kondisi tepian sungai. Setiap perubahan pada habitat perairan dapat memengaruhi cara organisme tumbuh dan mencari makan.',
                    'Dalam rantai makanan, ikan dapat berperan sebagai pemakan tumbuhan atau hewan kecil sekaligus menjadi sumber makanan bagi organisme lain. Bagi masyarakat, ikan juga dapat berkaitan dengan pangan dan mata pencaharian, tanpa berarti semua spesies memiliki peran atau nilai yang sama.',
                    'Sampah, pencemaran, perubahan aliran, dan hilangnya habitat dapat mengurangi kualitas lingkungan ikan. Spesies tertentu di Lok Baintan tidak dicantumkan di sini karena memerlukan data pendukung.',
                ],
            ],
            [
                'name' => 'Burung air',
                'category' => 'Fauna lahan basah',
                'image' => $images['panorama'],
                'description' => 'Burung yang mencari makan di tepian dapat menunjukkan kesehatan habitat dan ketersediaan makanan. Penampakan spesies berbeda mengikuti musim, cuaca, dan kondisi sungai.',
                'details' => [
                    'Burung air adalah kelompok burung yang bergantung pada perairan, tepian, rawa, atau habitat basah untuk mencari makan, beristirahat, atau berkembang biak. Bentuk paruh dan kaki pada beberapa jenis membantu mereka beradaptasi dengan lingkungan tersebut.',
                    'Kehadiran burung dapat berkaitan dengan ketersediaan ikan kecil, serangga, tumbuhan, atau hewan air lainnya. Karena itu, perubahan habitat dan sumber makanan dapat memengaruhi pola kemunculan burung dari waktu ke waktu.',
                    'Menjaga tepian sungai, mengurangi gangguan, dan tidak membuang sampah membantu mempertahankan habitat. Spesies burung tertentu di Lok Baintan tetap perlu dikonfirmasi melalui pengamatan atau referensi yang dapat dipertanggungjawabkan.',
                ],
            ],
        ];

        $wetlandLessons = [
            [
                'number' => '01', 'slug' => 'sungai-martapura-dan-lingkungan-lahan-basah',
                'eyebrow' => 'Bentang Air', 'title' => 'Sungai Martapura dan lingkungan lahan basah',
                'intro' => 'Memahami sungai sebagai bagian dari ekosistem yang menyimpan air, mendukung kehidupan, dan membentuk ruang hidup masyarakat.',
                'image' => $images['panorama'], 'image_alt' => 'Bentang hijau di sepanjang Sungai Martapura',
                'sections' => [
                    ['title' => 'Apa yang dimaksud lahan basah?', 'body' => 'Lahan basah adalah wilayah yang dipengaruhi keberadaan air, baik secara tetap maupun musiman. Rawa, tepian sungai, genangan, dan dataran banjir memiliki tanah, tumbuhan, serta hewan yang beradaptasi dengan kondisi basah.'],
                    ['title' => 'Satu sistem yang saling terhubung', 'body' => 'Sungai Martapura tidak berdiri sendiri. Alirannya berhubungan dengan tepian, vegetasi, permukiman, kebun, dan jalur air lain di Kalimantan Selatan. Ketika air membawa sedimen atau sampah, dampaknya dapat dirasakan oleh bagian ekosistem yang lain.'],
                    ['title' => 'Fungsi bagi masyarakat', 'body' => 'Lahan basah membantu menyimpan air, menyediakan ruang bagi organisme, dan mendukung kegiatan ekonomi di tepian sungai. Di Lok Baintan, hubungan itu terlihat dari pasar terapung, kebun, transportasi air, serta permukiman yang mengikuti karakter sungai.'],
                ],
                'insight' => 'Air yang terlihat tenang tetap bekerja sebagai bagian dari sistem: menghubungkan habitat, membawa material, dan menyediakan ruang bagi aktivitas manusia.',
                'connection' => 'Pasar Terapung Lok Baintan tumbuh di atas sungai yang menjadi ruang pertemuan. Jukung pedagang, perjalanan menuju pasar, dan hasil kebun menunjukkan bahwa kesehatan Sungai Martapura berhubungan langsung dengan kehidupan ekonomi dan budaya Banjar.',
                'challenge' => 'Perubahan tata guna lahan, sampah, dan pencemaran dapat mengurangi kualitas tepian serta mengganggu organisme air. Pengamatan lokal perlu dilengkapi data lapangan sebelum kondisi tertentu disimpulkan sebagai fakta kawasan.',
                'conclusion' => 'Sungai Martapura adalah bagian dari lingkungan lahan basah sekaligus ruang hidup. Menjaganya berarti menjaga habitat, jalur mobilitas, dan keberlanjutan kehidupan masyarakat Lok Baintan.',
            ],
            [
                'number' => '02', 'slug' => 'sungai-sebagai-jalur-kehidupan',
                'eyebrow' => 'Mobilitas', 'title' => 'Sungai sebagai jalur kehidupan',
                'intro' => 'Bagi masyarakat sungai, perjalanan di atas air bukan sekadar pengalaman wisata, tetapi bagian dari cara bekerja, bertemu, dan mengakses kebutuhan sehari-hari.',
                'image' => $images['klotok'], 'image_alt' => 'Klotok melintas di Sungai Martapura',
                'sections' => [
                    ['title' => 'Jalur transportasi yang beradaptasi', 'body' => 'Jukung dan klotok menyesuaikan diri dengan karakter perairan. Keduanya dapat digunakan untuk membawa orang, barang, dan hasil kebun melalui jalur yang menghubungkan kampung-kampung tepian sungai.'],
                    ['title' => 'Ruang sosial dan perdagangan', 'body' => 'Perjalanan sungai mempertemukan warga, pedagang, keluarga, dan pengunjung. Pasar terapung memperlihatkan bagaimana fungsi transportasi dan perdagangan dapat berlangsung dalam ruang yang sama.'],
                    ['title' => 'Perubahan dan keberlanjutan', 'body' => 'Jalan darat dan kendaraan modern memperluas pilihan mobilitas, tetapi tidak menghapus nilai sungai bagi kawasan tepian air. Keselamatan pelayaran, akses yang adil, dan kualitas lingkungan perlu dijaga bersama.'],
                ],
                'insight' => 'Satu perjalanan dengan perahu dapat menghubungkan beberapa kebutuhan sekaligus: berpindah, mengantar barang, bertemu orang, dan menjaga relasi antarkampung.',
                'connection' => 'Di Lok Baintan, sungai menjadi penghubung antara permukiman, kebun, dan Pasar Terapung. Aktivitas jual beli di jukung juga merupakan peristiwa sosial yang memperkuat budaya sungai masyarakat Banjar.',
                'challenge' => 'Perairan yang padat, cuaca berubah, sampah terapung, dan berkurangnya minat generasi muda terhadap transportasi tradisional menjadi tantangan. Pengunjung perlu mengikuti arahan operator dan tidak mengganggu jalur perahu warga.',
                'conclusion' => 'Sungai tetap menjadi jalur kehidupan ketika fungsi transportasi, perdagangan, dan ruang sosialnya dihormati. Keberlanjutan peran itu bergantung pada sungai yang aman, bersih, dan dapat diakses masyarakat.',
            ],
            [
                'number' => '03', 'slug' => 'kehidupan-ekonomi-masyarakat',
                'eyebrow' => 'Mata Pencaharian', 'title' => 'Kehidupan ekonomi masyarakat',
                'intro' => 'Ekonomi di tepian sungai tumbuh dari hubungan antara hasil kebun, keterampilan berdagang, jaringan antarkampung, dan ruang pasar yang bergerak di atas air.',
                'image' => $images['vendor'], 'image_alt' => 'Pedagang membawa hasil kebun di atas jukung',
                'sections' => [
                    ['title' => 'Ekonomi yang dekat dengan lingkungan', 'body' => 'Hasil kebun dan olahan rumahan dapat dibawa menggunakan jukung menuju titik pertemuan. Pola ini memanfaatkan akses sungai sekaligus mengandalkan pengetahuan lokal tentang waktu, arus, dan kebutuhan pembeli.'],
                    ['title' => 'Pasar sebagai jaringan sosial', 'body' => 'Transaksi di pasar terapung bukan hanya pertukaran barang. Sapaan, kepercayaan, dan hubungan antarpedagang membentuk jaringan sosial yang membuat ekonomi lokal tetap lentur dan berakar pada komunitas.'],
                    ['title' => 'Wisata dan dampak lokal', 'body' => 'Kunjungan yang bertanggung jawab dapat mendukung pedagang setempat ketika dilakukan dengan wajar: membeli produk lokal, menghormati ruang kerja, dan tidak menawar secara tidak pantas atau mengganggu aktivitas perdagangan.'],
                ],
                'insight' => 'Pasar terapung menunjukkan bahwa ruang ekonomi tidak selalu berupa bangunan tetap; ia dapat bergerak mengikuti ritme air, waktu, dan hubungan antarwarga.',
                'connection' => 'Sungai Martapura menyediakan akses bagi pedagang Lok Baintan untuk membawa hasil kebun dan bertemu pembeli. Aktivitas itu mempertemukan transportasi, budaya Banjar, dan mata pencaharian dalam satu ruang lahan basah.',
                'challenge' => 'Sampah, kualitas air yang menurun, perubahan akses, dan wisata yang tidak tertib dapat menambah beban bagi pedagang. Pengembangan wisata perlu memastikan manfaatnya kembali kepada masyarakat serta tidak mengganggu pasar sebagai ruang kerja.',
                'conclusion' => 'Kehidupan ekonomi Lok Baintan dibangun dari sungai, keterampilan, dan kepercayaan. Melindungi lingkungan sungai adalah bagian dari melindungi keberlanjutan mata pencaharian masyarakat.',
            ],
        ];

        return compact('images', 'activities', 'gallery', 'destinations', 'credits', 'wetlandOrganisms', 'wetlandLessons');
    }
}
