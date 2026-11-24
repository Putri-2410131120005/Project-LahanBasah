@extends('layouts.app')
@section('title', 'Beranda')
@section('content')
    <section class="home-hero" style="background-image:url('{{ $images['hero'] }}')">
        <div class="hero-shade"></div><img class="hero-foliage" src="/ornaments/nipah.svg" alt="">
        <div class="shell hero-inner">
            <div class="hero-location"><x-icon name="map" :size="17" /> Kabupaten Banjar · Kalimantan Selatan</div>
            <div class="hero-copy"><x-eyebrow light>Permata Sungai Kalimantan Selatan</x-eyebrow>
                <h1>Jelajahi Pesona<br><i>Pasar Terapung</i><br>Lok Baintan</h1>
                <p>Temukan keindahan Sungai Martapura, tradisi perdagangan di atas jukung, dan kekayaan budaya Banjar dalam
                    satu perjalanan.</p>
                <div class="button-row"><a class="button light" href="{{ route('explore') }}">Mulai Jelajah</a><a
                        class="button outline" href="{{ route('guide') }}">Panduan Berkunjung</a></div>
            </div>
            <div class="hero-editorial"><span>SEBUAH PERJALANAN KE</span><strong>Jantung budaya<br><i>sungai
                        Banjar.</i></strong><span class="hero-editorial-line"></span><small>Alam yang menghidupi.<br>Tradisi
                    yang terus mengalir.</small></div>
            <div class="hero-facts">
                <div><span>01</span>
                    <p><b>Mulai lebih pagi</b>Rasakan suasana terbaik saat fajar menyapa.</p>
                </div>
                <div><span>02</span>
                    <p><b>Naiki jukung</b>Dekati pasar dari sudut pandang sungai.</p>
                </div>
            </div>
        </div>
        <div class="hero-river-edge" aria-hidden="true"></div>
    </section>
    <section class="destination-ribbon" aria-label="Sekilas destinasi">
        <div class="shell">
            <div><x-icon name="boat" :size="27" />
                <p><span>Warisan yang hidup</span><b>Pasar di atas jukung</b></p>
            </div>
            <div><x-icon name="sun" :size="27" />
                <p><span>Waktu untuk menjelajah</span><b>Pagi yang penuh cerita</b></p>
            </div>
            <div><x-icon name="leaf" :size="27" />
                <p><span>Melangkah dengan bijak</span><b>Rawat sungai, hormati budaya</b></p>
            </div>
        </div>
    </section>
    <section class="intro section shell">
        <div class="intro-collage"><img class="intro-main" src="{{ $images['canoe'] }}"
                alt="Pedagang mendayung jukung di sungai"><img class="intro-small" src="{{ $images['fruit'] }}"
                alt="Hasil kebun lokal">
            <div class="intro-badge"><x-icon name="river" :size="32" /><span>Warisan hidup<br>sungai Banjar</span>
            </div>
        </div>
        <div class="intro-copy"><x-section-head eyebrow="Selamat Datang" title="Di sinilah sungai dan tradisi bertemu" />
            <p>Di sepanjang aliran Sungai Martapura, pagi dimulai dengan kayuhan dayung dan sapaan hangat. Pasar Terapung
                Lok Baintan bukan sekadar tempat berdagang, tetapi juga warisan hidup masyarakat Banjar.</p>
            <p>Saksikan jukung-jukung kayu berkumpul, sarat dengan buah tropis, sayuran, kue tradisional, dan kisah yang
                diwariskan dari generasi ke generasi.</p><a class="text-link" href="{{ route('about') }}">Kenali Lok
                Baintan</a>
            <div class="intro-comment-divider" aria-hidden="true"></div>
            @php
                $commentPreviews = $comments->getCollection()->filter(fn($item) => !$item->trashed())->take(3);
            @endphp
            @if ($commentPreviews->isNotEmpty())
                <aside class="home-comment-preview" aria-label="Komentar terbaru dari pengunjung">
                    <div class="home-comment-preview-top">
                        <strong><x-icon name="people" :size="19" /> Cerita Pengunjung</strong>
                        <a href="#komentar-pengunjung">Lihat Semua Komentar</a>
                    </div>
                    <div class="home-comment-preview-items">
                        @foreach ($commentPreviews as $comment)
                            <a class="home-comment-preview-item" href="#komentar-{{ $comment->id }}">
                                <span class="home-comment-avatar"
                                    aria-hidden="true">{{ mb_strtoupper(mb_substr($comment->author_name, 0, 1)) }}</span>
                                <span class="home-comment-preview-copy">
                                    <strong>{{ $comment->author_name }}</strong>
                                    <span>{{ \Illuminate\Support\Str::limit($comment->body, 120) }}</span>
                                </span>
                                @if ($comment->media_path && $comment->media_mime && str_starts_with($comment->media_mime, 'image/'))
                                    <img src="{{ \Illuminate\Support\Facades\Storage::disk('public')->url($comment->media_path) }}"
                                        alt="Foto komentar" loading="lazy">
                                @elseif ($comment->media_path && $comment->media_mime && str_starts_with($comment->media_mime, 'video/'))
                                    <span class="home-comment-video" aria-label="Komentar berisi video">▶</span>
                                @endif
                            </a>
                        @endforeach
                    </div>
                </aside>
            @endif
        </div>
    </section>
    <section class="features section">
        <div class="shell">
            <x-section-head eyebrow="Pesona yang Menanti" title="Tiga wajah kehidupan sungai"
                text="Setiap sudut Lok Baintan menyimpan pengalaman yang dekat, hangat, dan sulit dilupakan." centered />
            @php $features = [['boat','Keunikan Pasar Terapung','Transaksi di atas jukung yang telah menjadi denyut kehidupan masyarakat sungai selama lintas generasi.',$images['vendor'],route('about'),'Kenali Pasar Terapung'],['people','Budaya Masyarakat Banjar','Keramahan, bahasa, kuliner, dan tradisi yang tumbuh bersama aliran Sungai Martapura.',$images['woman'],route('about'),'Temukan Budaya Banjar'],['river','Keindahan Sungai Martapura','Bentang lahan basah tropis dengan cahaya pagi, riak air, dan permukiman tepian sungai.',$images['river'],route('wetlands'),'Jelajahi Sungai']]; @endphp
            <div class="feature-grid">
                @foreach ($features as $index => [$icon, $title, $text, $image, $url, $action])
                    <article class="feature-card"><img src="{{ $image }}" alt="" loading="lazy">
                        <div class="feature-overlay"></div><span class="feature-num">0{{ $index + 1 }}</span>
                        <div class="feature-content"><span class="round-icon"><x-icon :name="$icon" /></span>
                            <h3>{{ $title }}</h3>
                            <p>{{ $text }}</p><a class="feature-action"
                                href="{{ $url }}">{{ $action }}</a>
                        </div>
                    </article>
                @endforeach
            </div>
        </div>
    </section>
    <section class="section shell">
        <div class="split-head"><x-section-head eyebrow="Pengalaman Pilihan" title="Pengalaman yang tak terlupakan" /><a
                class="button primary" href="{{ route('explore') }}">Lihat Semua Pengalaman</a></div>
        <div class="activity-grid home-activities">
            @foreach (array_slice($activities, 0, 3) as $index => $activity)
                <x-activity-card :activity="$activity" :index="$index" />
            @endforeach
        </div>
    </section>
    <section class="home-explore-strip">
        <div class="shell">
            <div><x-eyebrow>Jelajahi Lebih Jauh</x-eyebrow>
                <h2>Pasar, sungai, dan budaya dalam satu perjalanan</h2>
            </div>
            <div class="home-explore-actions"><a class="text-link" href="{{ route('gallery') }}">Lihat Galeri</a><a
                    class="text-link" href="{{ route('guide') }}">Panduan Berkunjung</a></div>
        </div>
    </section>
    <section class="wetland-teaser">
        <div class="wetland-photo" style="background-image:url('{{ $images['tropical'] }}')"></div>
        <div class="wetland-copy"><x-eyebrow light>Sekilas Pesona Lahan Basah</x-eyebrow>
            <h2>Sungai adalah nadi yang menghidupkan segalanya</h2>
            <p>Dari jalur transportasi hingga ruang bertemu, Sungai Martapura menopang budaya, ekonomi, dan kehidupan
                sehari-hari. Memahami lahan basah berarti memahami jiwa Lok Baintan.</p>
            <div class="wetland-stats">
                <div><strong>4</strong><span>Peran utama<br>sungai</span></div>
                <div><strong>1</strong><span>Ekosistem yang<br>saling terhubung</span></div>
            </div><a class="button light" href="{{ route('wetlands') }}">Jelajahi Lahan Basah</a>
        </div>
    </section>
    <section class="gallery-preview section shell">
        <div class="split-head"><x-section-head eyebrow="Galeri Pilihan" title="Momen dari tepian Martapura" /><a
                class="text-link" href="{{ route('gallery') }}">Lihat Galeri Lengkap</a></div>
        <div class="preview-grid">
            @foreach (array_slice($gallery, 0, 5) as $index => $item)
                <article class="preview-card preview-{{ $index + 1 }}"><img src="{{ $item['src'] }}"
                        alt="{{ $item['title'] }}"><span class="preview-title">{{ $item['title'] }}</span><a
                        class="gallery-open" href="{{ route('gallery') }}">Lihat di Galeri</a></article>
            @endforeach
        </div>
    </section>
    <section class="travel-cta shell"
        style="background-image:linear-gradient(90deg,#173e34 0%,rgba(23,62,52,.96) 42%,rgba(23,62,52,.12) 100%),url('{{ $images['morning'] }}')">
        <div><x-eyebrow light>Mulai Perjalananmu</x-eyebrow>
            <h2>Siap Menjelajahi<br>Lok Baintan?</h2>
            <p>Persiapkan pagi yang berbeda di antara jukung, riak sungai, dan keramahan masyarakat Banjar.</p><button
                class="button light" type="button" data-open-planner>Rencanakan Kunjungan</button>
        </div>
    </section>
    <section class="section shell visitor-comments" id="komentar-pengunjung" aria-label="Komentar Pengunjung">
        <div class="visitor-comments-heading">
            <x-section-head eyebrow="Cerita dari Pengunjung" title="Komentar Pengunjung" />
            <p>Bagikan pengalaman atau pertanyaan tentang kunjunganmu. Nama pengguna dapat kamu isi sendiri. Bagikan
                pengalaman, kesan, atau pertanyaan dengan santun.</p>
        </div>
        @if (session('comment_status'))
            <div class="comment-toast" data-comment-toast role="status">
                <span class="comment-toast-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"
                        stroke-linecap="round" stroke-linejoin="round">
                        <path d="M20 6 9 17l-5-5" />
                    </svg>
                </span>
                <span class="comment-toast-message">{{ session('comment_status') }}</span>
                <button class="comment-toast-close" type="button" data-comment-toast-close
                    aria-label="Tutup pemberitahuan">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
                        stroke-linecap="round">
                        <path d="M18 6 6 18M6 6l12 12" />
                    </svg>
                </button>
            </div>
        @endif
        @if ($errors->any())
            <div class="comment-alert error" role="alert">
                <p>Periksa kembali informasi berikut:</p>
                <ul>
                    @foreach ($errors->all() as $error)
                        <li>{{ $error }}</li>
                    @endforeach
                </ul>
            </div>
        @endif
        <p class="comment-upload-notice">
            Unggah foto maksimal 5 MB atau video maksimal 25 MB (opsional).
            @if (!$commentUploadLimits['photos_supported'])
                Unggahan foto belum didukung konfigurasi server saat ini.
            @endif
            @if (!$commentUploadLimits['videos_supported'])
                Unggahan video 25 MB belum didukung server. Pengelola hosting perlu menaikkan upload_max_filesize dan
                post_max_size.
            @endif
            @if (!$commentUploadLimits['storage_linked'])
                Media tersimpan, tetapi belum dapat ditampilkan sampai pengelola menjalankan php artisan storage:link.
            @endif
        </p>
        <h3 class="comment-form-title">Tinggalkan Komentar</h3>
        <form class="comment-form" action="{{ route('comments.store') }}" method="POST" enctype="multipart/form-data">
            @csrf
            <label class="comment-honeypot" aria-hidden="true">Jangan isi kolom ini
                <input type="text" name="website" tabindex="-1" autocomplete="off">
            </label>
            <label>Nama pengguna
                <input type="text" name="name" placeholder="Masukkan nama pengguna" autocomplete="nickname"
                    maxlength="100" required value="{{ old('parent_id') ? '' : old('name') }}">
            </label>
            <label>Komentar
                <textarea name="body" rows="4" maxlength="5000" placeholder="Tulis pengalaman atau pertanyaanmu di sini..."
                    required>{{ old('parent_id') ? '' : old('body') }}</textarea>
            </label>
            <div class="comment-form-actions">
                <div class="comment-upload-control">
                    <button class="button planner-outline" type="button" data-comment-media>Unggah Media</button>
                    <input class="comment-file-input" type="file" name="media"
                        accept="image/jpeg,image/png,image/webp,video/mp4,video/webm" data-comment-file>
                    <span data-comment-file-name>Opsional · foto 5 MB, video 25 MB</span>
                </div>
                <div class="comment-submit-actions">
                    <button class="button planner-outline" type="reset">Batal</button>
                    <button class="button primary" type="submit">Kirim</button>
                </div>
            </div>
        </form>
        <div class="visitor-comment-list" aria-live="polite">
            @forelse ($comments as $comment)
                @include('components.comments.thread', ['comment' => $comment, 'depth' => 0])
            @empty
                <p class="comment-empty">Belum ada komentar. Jadilah pengunjung pertama yang berbagi cerita.</p>
            @endforelse
        </div>
        @if ($comments->hasPages())
            <nav class="comment-pagination" aria-label="Halaman komentar">
                {{ $comments->links() }}
            </nav>
        @endif
        <dialog class="comment-delete-dialog" id="comment-delete-dialog" aria-labelledby="comment-delete-title">
            <div class="comment-delete-dialog-inner">
                <span class="comment-delete-symbol" aria-hidden="true">✕</span>
                <h3 id="comment-delete-title">Yakin ingin menghapus komentar ini?</h3>
                <p>Komentar akan dihapus dari daftar pengunjung. Balasan orang lain tetap terjaga.</p>
                <div class="comment-delete-dialog-actions">
                    <button type="button" class="button planner-outline" data-comment-delete-cancel>Batal</button>
                    <button type="button" class="button comment-delete-confirm"
                        data-comment-delete-confirm>Hapus</button>
                </div>
            </div>
        </dialog>
    </section>
@endsection
