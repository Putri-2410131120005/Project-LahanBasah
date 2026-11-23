@extends('layouts.app')
@section('title', 'Pesona Lahan Basah')
@section('content')
    <x-page-hero label="Pesona Lahan Basah" title="Pesona Lahan Basah: Kehidupan yang Mengalir Bersama Sungai"
        text="Menyelami hubungan erat antara Sungai Martapura, budaya Banjar, dan mata pencaharian masyarakat tepian air."
        :image="$images['tropical']" />
    <section class="section shell wetland-intro">
        <div><span class="big-number">01</span><x-section-head eyebrow="Bentang Air"
                title="Sungai Martapura dan lingkungan lahan basah" />
            <p>Lahan basah Kalimantan Selatan adalah lanskap yang terus berubah bersama pasang, hujan, dan musim. Sungai
                Martapura menghubungkan kampung, kebun, rawa, dan pusat-pusat kehidupan masyarakat.</p>
        </div>
        <div class="mosaic"><img src="{{ $images['panorama'] }}" alt="Bentang hijau di sepanjang sungai"><img
                src="{{ $images['river'] }}" alt="Perahu di Sungai Martapura"></div>
    </section>
    <section class="quote-band"
        style="background-image:linear-gradient(rgba(16,46,37,.82),rgba(16,46,37,.88)),url('{{ $images['dawn'] }}')"><x-icon
            name="quote" :size="34" />
        <p>“Bagi masyarakat Banjar, sungai bukan batas yang memisahkan. Sungai adalah jalan yang mempertemukan.”</p><span>
            Cerita kehidupan tepian Martapura</span>
    </section>
    <section class="wetland-story shell">
        <div class="vertical-title"><span>ALIRAN KEHIDUPAN</span></div>
        <div class="wetland-row">
            <div class="wetland-row-image"><img src="{{ $images['klotok'] }}" alt="Klotok melintas di sungai"><b>02</b>
            </div>
            <div><x-eyebrow>Mobilitas</x-eyebrow>
                <h2>Sungai sebagai jalur kehidupan</h2>
                <p>Klotok dan jukung membawa warga melintasi kampung, menuju pasar, kebun, dan kerabat. Di beberapa kawasan,
                    sungai tetap menjadi rute yang paling alami untuk bergerak.</p>
                <div class="mini-facts"><span><x-icon name="route" /> Jalur transportasi</span><span><x-icon
                            name="people" /> Ruang sosial</span></div>
            </div>
        </div>
        <div class="wetland-row flip">
            <div class="wetland-row-image"><img src="{{ $images['vendor'] }}"
                    alt="Kegiatan ekonomi di atas sungai"><b>03</b></div>
            <div><x-eyebrow>Mata Pencaharian</x-eyebrow>
                <h2>Kehidupan ekonomi masyarakat</h2>
                <p>Hasil kebun dan olahan rumahan berpindah dari jukung ke jukung. Pasar terapung memperlihatkan sebuah
                    ekonomi lokal yang lentur, dekat, dan berakar pada hubungan antarkampung.</p>
                <div class="mini-facts"><span><x-icon name="boat" /> Perdagangan jukung</span><span><x-icon
                            name="leaf" /> Hasil kebun lokal</span></div>
            </div>
        </div>
    </section>
    <section class="wetland-organisms section shell"><x-section-head eyebrow="Bentang Kehidupan"
            title="Flora dan fauna ekosistem lahan basah"
            text="Kenali peran organisme secara umum; spesies yang terdapat secara khusus di Lok Baintan memerlukan verifikasi lapangan." />
        <div class="organism-grid">
            @foreach ($wetlandOrganisms as $organism)
                <article><img src="{{ $organism['image'] }}" alt="{{ $organism['name'] }}" loading="lazy">
                    <div><span>{{ $organism['category'] }}</span>
                        <h3>{{ $organism['name'] }}</h3>
                        <p>{{ $organism['description'] }}</p>
                    </div>
                </article>
            @endforeach
        </div>
    </section>
    <section class="responsible">
        <div class="shell">
            <div><x-eyebrow light>Wisata Bertanggung Jawab</x-eyebrow>
                <h2>Menjaga keindahan sungai, menghormati kehidupan</h2>
                <p>Kehadiran kita sebaiknya meninggalkan kesan baik, bukan jejak yang merusak.</p>
            </div>@php $responsible=[['leaf','Bawa kembali sampahmu'],['people','Hormati ruang pedagang'],['river','Kurangi plastik sekali pakai'],['camera','Minta izin sebelum memotret']]; @endphp<div class="responsible-grid">
                @foreach ($responsible as $i => [$icon, $title])
                    <article><span>0{{ $i + 1 }}</span><x-icon :name="$icon" />
                        <h3>{{ $title }}</h3>
                    </article>
                @endforeach
            </div>
        </div>
    </section>
    <section class="conservation-section section shell">
        <div><x-eyebrow>Menjaga Lahan Basah</x-eyebrow>
            <h2>Langkah kecil yang berarti bagi sungai</h2>
        </div>
        <div class="conservation-grid">
            <article><x-icon name="leaf" />
                <h3>Kebersihan</h3>
                <p>Bawa kembali sampah pribadi dan hindari membuang sisa makanan atau kemasan ke aliran sungai.</p>
            </article>
            <article><x-icon name="people" />
                <h3>Penghormatan</h3>
                <p>Berikan ruang bagi pedagang, warga, dan aktivitas harian; jangan mengganggu pekerjaan atau rumah tangga.
                </p>
            </article>
            <article><x-icon name="wallet" />
                <h3>Dampak lokal</h3>
                <p>Membeli dari pedagang setempat membantu ekonomi terhubung langsung dengan kehidupan pasar terapung.</p>
            </article>
        </div>
    </section>
@endsection
