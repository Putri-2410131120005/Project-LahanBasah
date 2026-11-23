@extends('layouts.app')
@section('title', 'Tentang Lok Baintan')
@section('content')
    <x-page-hero label="Tentang" title="Mengenal Lok Baintan Lebih Dekat"
        text="Sebuah warisan sungai yang terus hidup melalui kayuhan jukung, perdagangan tradisional, dan keramahan masyarakat Banjar."
        :image="$images['village']" />
    <section class="section shell about-lead">
        <div><x-eyebrow>Kisah dari Sungai</x-eyebrow>
            <h2>Pasar yang tumbuh bersama aliran Martapura</h2>
        </div>
        <div>
            <p>Pasar Terapung Lok Baintan berada di Kabupaten Banjar, Kalimantan Selatan. Setiap pagi, pedagang dari
                kampung-kampung sekitar berkumpul dengan jukung penuh hasil kebun dan makanan tradisional.</p>
            <p>Di sini, sungai bukan latar belakang. Sungai adalah ruang kerja, jalur pertemuan, sekaligus bagian dari
                identitas masyarakat Banjar.</p>
        </div>
    </section>
    <section class="story-section shell">
        <div class="story-image"><img src="{{ $images['morning'] }}" alt="Suasana sungai pada pagi hari"><span>Lok
                Baintan<br>Kalimantan Selatan</span></div>
        <div class="story-copy"><span class="story-index">01 · Jejak Waktu</span>
            <h2>Sejarah Pasar Terapung</h2>
            <p>Tradisi pasar terapung berakar dari kehidupan masyarakat yang bermukim di tepian dan sepanjang anak Sungai
                Martapura. Sebelum jalan darat menghubungkan banyak kampung, sungai menjadi jalur utama perpindahan orang
                dan barang.</p>
            <p>Pertemuan antarpedagang di atas air tumbuh secara alami. Sistem barter dahulu dikenal dengan istilah
                <i>bapanduk</i>, kemudian berkembang mengikuti perubahan zaman tanpa meninggalkan karakter khasnya.</p>
            <blockquote><x-icon name="quote" :size="28" />“Pasar terapung adalah ingatan kolektif tentang bagaimana
                masyarakat Banjar hidup berdampingan dengan sungai.”</blockquote>
        </div>
    </section>
    <section class="story-section reverse shell">
        <div class="story-image"><img src="{{ $images['vendor'] }}" alt="Pedagang tradisional di atas perahu"></div>
        <div class="story-copy"><span class="story-index">02 · Tradisi Hidup</span>
            <h2>Perdagangan di Atas Sungai</h2>
            <p>Sebagian besar pedagang merupakan perempuan yang mengatur hasil kebun, buah, sayuran, ikan, dan wadai di atas
                jukung. Perahu-perahu saling mendekat dengan cekatan, menciptakan pasar yang selalu bergerak mengikuti arus.
            </p>
            <p>Transaksi berlangsung akrab dan langsung. Sapaan, proses tawar menawar, dan pertukaran cerita membuat
                pengalaman pasar terasa personal, bukan sekadar kegiatan jual beli.</p>
            <ul class="check-list">
                <li>Jukung sebagai lapak sekaligus alat transportasi</li>
                <li>Hasil kebun dari kampung-kampung sekitar</li>
                <li>Interaksi spontan yang hangat antarpedagang</li>
            </ul>
        </div>
    </section>
    <section class="culture-band">
        <div class="shell"><x-section-head eyebrow="Budaya Masyarakat Banjar" title="Nilai yang tetap mengalir"
                text="Kehidupan sungai membentuk cara masyarakat berinteraksi, bekerja, dan merawat kebersamaan."
                centered />@php $facts=[['boat','Jukung','Perahu kayu tradisional yang lincah menyusuri sungai.',$images['boats']],['sun','Pagi','Waktu saat aktivitas pasar terasa paling hidup.',$images['morning']],['people','Acil','Sapaan hangat bagi perempuan Banjar yang berdagang.',$images['woman']]]; @endphp<div class="fact-grid">
                @foreach ($facts as [$icon, $name, $text, $image])
                    <article><img src="{{ $image }}" alt="Kehidupan sungai: {{ $name }}"
                            loading="lazy"><span><x-icon :name="$icon" /></span>
                        <h3>{{ $name }}</h3>
                        <p>{{ $text }}</p>
                    </article>
                @endforeach
            </div>
        </div>
    </section>
    <section class="culture-continuity section shell">
        <div><x-eyebrow>Warisan yang Terus Hidup</x-eyebrow>
            <h2>Tradisi yang bertahan melalui perubahan</h2>
        </div>
        <div class="continuity-grid">
            <article><span>01</span>
                <h3>Jalur yang menghubungkan</h3>
                <p>Sungai menjadi jalur gerak, bertemu, dan berdagang bagi masyarakat tepian sebelum banyak akses darat
                    tersedia.</p>
            </article>
            <article><span>02</span>
                <h3>Ekonomi yang bergerak</h3>
                <p>Jukung mempertemukan pedagang dari kampung dengan pembeli dalam ritme pagi yang dekat dan personal.</p>
            </article>
            <article><span>03</span>
                <h3>Tradisi yang dijaga</h3>
                <p>Melestarikan pasar berarti mendukung pedagang, menjaga kebersihan sungai, serta menghormati kerja dan
                    ruang masyarakat.</p>
            </article>
        </div>
    </section>
@endsection
