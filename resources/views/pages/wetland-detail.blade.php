@extends('layouts.app')
@section('title', $lesson['title'])
@section('content')
    <section class="wetland-detail-hero" style="background-image:linear-gradient(90deg,rgba(10,37,31,.88),rgba(10,37,31,.2)),url('{{ $lesson['image'] }}')">
        <div class="shell wetland-detail-hero-content">
            <x-eyebrow light>Edukasi Lahan Basah</x-eyebrow><span class="detail-number">{{ $lesson['number'] }}</span>
            <h1>{{ $lesson['title'] }}</h1><p>{{ $lesson['intro'] }}</p>
        </div>
    </section>
    <main class="section shell wetland-detail-main">
        <div class="wetland-detail-layout">
            <article class="wetland-article">
                <section id="pengantar" class="detail-card detail-intro"><p class="detail-lead">Materi ini mengajak kita melihat hubungan antara lingkungan lahan basah, Sungai Martapura, dan kehidupan masyarakat Lok Baintan secara lebih dekat.</p></section>
                @foreach ($lesson['sections'] as $section)
                    <section id="materi-{{ $loop->iteration }}" class="detail-card"><h2>{{ $section['title'] }}</h2><p>{{ $section['body'] }}</p></section>
                @endforeach
                <section id="tahukah-kamu" class="insight-card"><x-eyebrow>Tahukah Kamu?</x-eyebrow><p>{{ $lesson['insight'] }}</p></section>
                <section id="kaitan-lok-baintan" class="connection-card"><x-eyebrow>Kaitannya dengan Kehidupan Masyarakat Lok Baintan</x-eyebrow><p>{{ $lesson['connection'] }}</p></section>
                <section id="pelestarian" class="detail-card"><h2>Tantangan dan upaya pelestarian</h2><p>{{ $lesson['challenge'] }}</p><p>Langkah yang dapat dilakukan antara lain mengurangi sampah sekali pakai, menjaga tepian sungai, mengikuti aturan keselamatan, menghormati ruang pedagang, dan mendukung wisata yang manfaatnya dirasakan masyarakat setempat.</p></section>
                <section id="kesimpulan" class="detail-card"><h2>Kesimpulan</h2><p>{{ $lesson['conclusion'] }}</p></section>
                <section id="referensi" class="detail-card references"><h2>Sumber dan Referensi</h2><p class="reference-note">Struktur referensi disiapkan untuk dilengkapi setelah verifikasi akademik dan lapangan.</p><ul><li>Definisi dan prinsip lahan basah - Ramsar Convention on Wetlands (perlu verifikasi tautan dan tanggal akses).</li><li>Data kondisi Sungai Martapura dan Lok Baintan - sumber pemerintah daerah atau publikasi penelitian setempat (perlu verifikasi).</li><li>Observasi aktivitas pasar dan transportasi sungai - dokumentasi lapangan dengan izin (perlu dilengkapi).</li></ul></section>
            </article>
            <aside class="wetland-detail-aside">
                <figure class="sidebar-card"><img src="{{ $lesson['image'] }}" alt="{{ $lesson['image_alt'] }}"><figcaption>Visual pendukung materi {{ $lesson['number'] }}.</figcaption></figure>
                <nav class="lesson-outline sidebar-card" aria-labelledby="outline-title">
                    <h2 id="outline-title">Dalam Materi Ini</h2>
                    <a href="#pengantar">Pengantar materi</a>
                    @foreach ($lesson['sections'] as $section)
                        <a href="#materi-{{ $loop->iteration }}">{{ $section['title'] }}</a>
                    @endforeach
                    <a href="#tahukah-kamu">Tahukah Kamu?</a><a href="#kaitan-lok-baintan">Kaitannya dengan Lok Baintan</a><a href="#pelestarian">Tantangan dan pelestarian</a><a href="#kesimpulan">Kesimpulan</a><a href="#referensi">Sumber dan Referensi</a>
                </nav>
                <a class="button primary" href="{{ route('wetlands') }}">Kembali</a>
            </aside>
        </div>
        <nav class="lesson-navigation" aria-label="Navigasi materi">
            @if ($previousLesson)<a href="{{ route('wetlands.detail', $previousLesson['slug']) }}"><span>Materi Sebelumnya</span>{{ $previousLesson['title'] }}</a>@else<div></div>@endif
            @if ($nextLesson)<a class="next" href="{{ route('wetlands.detail', $nextLesson['slug']) }}"><span>Materi Selanjutnya</span>{{ $nextLesson['title'] }}</a>@endif
        </nav>
    </main>
@endsection
