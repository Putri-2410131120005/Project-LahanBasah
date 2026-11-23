@extends('layouts.app')
@section('title', 'Galeri')
@section('content')
    <x-page-hero label="Galeri" title="Galeri Pesona Lok Baintan"
        text="Momen-momen yang merekam warna pasar, hangatnya budaya, dan ketenangan Sungai Martapura." :image="$images['morning']" />

    <section class="section shell gallery-page" data-gallery>
        <div class="gallery-toolbar">
            <div>
                <x-eyebrow>Kisah dalam Gambar</x-eyebrow>
                <h2>Lihat lebih dekat</h2>
            </div>
            <div class="filters">
                @foreach (['Semua', 'Pasar Terapung', 'Budaya Banjar', 'Sungai & Alam', 'Video'] as $category)
                    <button @class(['active' => $category === 'Semua']) type="button" data-gallery-filter="{{ $category }}"
                        aria-pressed="{{ $category === 'Semua' ? 'true' : 'false' }}">{{ $category }}</button>
                @endforeach
            </div>
        </div>

        <p class="media-note">Dokumentasi Lok Baintan dan Sungai Martapura, Kalimantan Selatan. Setiap bingkai
            menyimpan cerita; kredit fotografer dan lisensi tersedia di bagian bawah halaman.</p>

        <div class="masonry">
            @foreach ($gallery as $item)
                @php $credit = collect($credits)->firstWhere('file', $item['src']); @endphp
                <button @class(['tall' => $item['tall'] ?? false]) type="button" data-gallery-item data-category="{{ $item['cat'] }}"
                    data-src="{{ $item['src'] }}" data-title="{{ $item['title'] }}"
                    data-credit="{{ $credit['author'] ?? '' }} · Wikimedia Commons"
                    aria-label="Buka pratinjau foto: {{ $item['title'] }}">
                    <img src="{{ $item['src'] }}" alt="{{ $item['title'] }}" loading="lazy">
                    <span class="gallery-shade"></span>
                    <span class="gallery-caption"><small>{{ $item['cat'] }}</small><b>{{ $item['title'] }}</b></span>
                    <span class="gallery-open">Lihat Foto</span>
                </button>
            @endforeach
        </div>

        <section class="video-feature" aria-labelledby="film-title" data-video-feature>
            <div class="film-player">
                <button class="film-launch" type="button" data-open-video aria-label="Putar film dokumenter Lok Baintan">
                    <img src="/media/lok-baintan-film-poster.webp" alt="Dokumentasi pedagang di Pasar Terapung Lok Baintan">
                    <span><x-icon name="play" :size="52" /> Putar Film</span>
                </button>
                <span class="film-duration">DOKUMENTASI ASLI · 1 MENIT 26 DETIK</span>
            </div>
            <div class="film-copy">
                <x-eyebrow>Jendela Kehidupan Sungai</x-eyebrow>
                <h2 id="film-title">Bukan sekadar tempat.<br><i>Ini kehidupan.</i></h2>
                <p>Ikuti gerak jukung, perjumpaan pedagang, dan keseharian pasar terapung dalam rekaman langsung
                    dari Lok Baintan.</p>
                <div class="film-credit"><x-icon name="camera" /><span>Film oleh Midori<br><a
                            href="https://commons.wikimedia.org/wiki/File:Lok_Baintan_Floating_Market,_South_Kalimantan,_Indonesia.ogv"
                            target="_blank" rel="noreferrer">Wikimedia Commons · CC BY-SA 3.0</a></span></div>
            </div>
        </section>
    </section>

    {{-- Modal foto memakai class khusus agar CSS modal itinerary tidak ikut mengubah layout. --}}
    <dialog class="modal gallery-modal" id="gallery-lightbox" aria-labelledby="gallery-preview-title">
        <div class="lb-lightbox-panel">
            <button class="lb-lightbox-close" type="button" data-close-dialog aria-label="Tutup foto">
                <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor"
                    stroke-width="2.2" stroke-linecap="round" aria-hidden="true">
                    <path d="M5 5 19 19M19 5 5 19" />
                </svg>
            </button>

            <div class="lb-lightbox-photo">
                <img data-lightbox-image alt="">
            </div>

            <div class="lb-lightbox-info">
                <small data-lightbox-category></small>
                <strong id="gallery-preview-title" data-lightbox-title></strong>
                <span data-lightbox-credit></span>
            </div>

            <nav class="lb-lightbox-controls" aria-label="Navigasi foto galeri">
                <button type="button" class="lb-lightbox-arrow" data-lightbox-prev aria-label="Foto sebelumnya">
                    <svg viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor"
                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <path d="m14 5-7 7 7 7" />
                    </svg>
                </button>
                <span class="lb-lightbox-count" data-lightbox-counter aria-live="polite"></span>
                <button type="button" class="lb-lightbox-arrow" data-lightbox-next aria-label="Foto berikutnya">
                    <svg viewBox="0 0 24 24" width="21" height="21" fill="none" stroke="currentColor"
                        stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <path d="m10 5 7 7-7 7" />
                    </svg>
                </button>
            </nav>
        </div>
    </dialog>

    <dialog class="modal video-modal" id="video-dialog" aria-labelledby="video-modal-title">
        <div class="modal-surface">
            <div class="modal-dismiss">
                <button class="modal-close" type="button" data-close-dialog aria-label="Tutup dialog">×</button>
            </div>
            <span class="planner-kicker">DOKUMENTASI DARI LOK BAINTAN</span>
            <h2 id="video-modal-title">Kehidupan di atas jukung</h2>
            <video controls playsinline preload="metadata" poster="/media/lok-baintan-film-poster.webp"
                aria-label="Film dokumenter Pasar Terapung Lok Baintan">
                <source src="/media/lok-baintan-film.mp4" type="video/mp4">
                Peramban Anda tidak mendukung pemutaran video.
            </video>
            <p>Film oleh Midori · Wikimedia Commons · CC BY-SA 3.0. Tutup pemutar untuk menghentikan video.</p>
        </div>
    </dialog>
@endsection
