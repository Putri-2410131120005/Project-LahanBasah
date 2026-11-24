@extends('layouts.app')
@section('title', 'Tim Pengembang')
@section('content')
    <x-page-hero label="Tentang Kami" title="Di Balik Lok Baintan Explorer"
        text="Kenali tim yang merancang pengalaman digital untuk memperkenalkan kehidupan sungai, budaya Banjar, dan pesona lahan basah."
        :image="$images['village']" />

    <section class="section shell developer-team">
        <div class="developer-section-icon" aria-hidden="true"><x-icon name="people" :size="30" /></div>
        <x-section-head eyebrow="Tentang Pengembangan" title="Satu visi, tiga pengembang" centered />
        <div class="developer-intro">
            <p>Lok Baintan Explorer dikembangkan sebagai media informasi dan edukasi digital yang mengajak pengunjung
                mengenal Pasar Terapung Lok Baintan, budaya masyarakat sungai, dan pentingnya menjaga ekosistem lahan basah.
            </p>
        </div>

        <div class="developer-contributions">
            <article class="developer-overview-card">
                <span class="developer-contribution-icon" aria-hidden="true"><x-icon name="spark"
                        :size="25" /></span>
                <h3>Tentang Proyek Kami</h3>
                <div class="developer-project-description">
                    <p>Lok Baintan Explorer merupakan media informasi dan edukasi digital yang memperkenalkan Pasar Terapung
                        Lok Baintan, budaya masyarakat sungai, serta kekayaan ekosistem lahan basah di Kalimantan Selatan.
                    </p>
                    <p>Website ini dirancang agar pengunjung dapat mengenal destinasi melalui cerita budaya, materi
                        pembelajaran, galeri, panduan berkunjung, dan fitur perencanaan perjalanan. Ruang komentar juga
                        disediakan untuk berbagi pengalaman dan kesan setelah menjelajahi informasi di dalamnya.</p>
                    <p>Melalui tampilan yang mudah digunakan dan konten yang saling terhubung, kami berharap Lok Baintan
                        Explorer dapat menumbuhkan ketertarikan terhadap wisata lokal sekaligus meningkatkan kepedulian
                        untuk menjaga sungai, tradisi, dan lingkungan lahan basah.</p>
                </div>
            </article>
            <article class="developer-overview-card">
                <span class="developer-contribution-icon" aria-hidden="true"><x-icon name="people"
                        :size="25" /></span>
                <h3>Bidang Kontribusi Tim</h3>
                <ol class="developer-numbered-list">
                    <li><span class="developer-number" aria-hidden="true">01</span><span>Pengembangan ide dan perencanaan
                            konsep website</span></li>
                    <li><span class="developer-number" aria-hidden="true">02</span><span>Riset destinasi dan penyusunan
                            konten edukasi</span></li>
                    <li><span class="developer-number" aria-hidden="true">03</span><span>Perancangan desain antarmuka dan
                            pengalaman pengguna</span></li>
                    <li><span class="developer-number" aria-hidden="true">04</span><span>Pengembangan fitur dan implementasi
                            website</span></li>
                </ol>
            </article>
        </div>

        <div class="developer-members-heading">
            <span class="developer-section-icon" aria-hidden="true"><x-icon name="leaf" :size="27" /></span>
            <x-section-head eyebrow="Anggota Tim" title="Kenali para pengembang" centered />
        </div>
        <div class="developer-grid">
            @foreach ($developers as $developer)
                <article class="developer-card">
                    <div class="developer-photo">
                        <img src="{{ $developer['image'] }}" data-image-fallback data-fallback="/ornaments/nipah.svg"
                            alt="Foto profil {{ $developer['name'] }}" loading="lazy">
                    </div>
                    <div class="developer-profile">
                        <span class="developer-profile-icon" aria-hidden="true"><x-icon name="people"
                                :size="21" /></span>
                        <h2>{{ $developer['name'] }}</h2>
                        <p class="developer-nim">NIM {{ $developer['nim'] }}</p>
                        <p class="developer-role">{{ $developer['role'] }}</p>
                        <p class="developer-education">{{ $developer['program'] }}<span>{{ $developer['faculty'] }}</span>
                        </p>
                        <p class="developer-description">{{ $developer['description'] }}</p>
                    </div>
                </article>
            @endforeach
        </div>
    </section>
@endsection
