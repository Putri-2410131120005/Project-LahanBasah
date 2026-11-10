@php
    $links = [
        ['Beranda', 'home'], ['Tentang Lok Baintan', 'about'], ['Jelajah Wisata', 'explore'],
        ['Pesona Lahan Basah', 'wetlands'], ['Galeri', 'gallery'], ['Panduan Berkunjung', 'guide'],
    ];
@endphp
<footer><div class="footer-dark">
    <div class="footer-invitation shell"><span>LOK BAINTAN EXPLORER</span><p>Satu sungai. <i>Ribuan cerita.</i></p><button type="button" data-open-planner>Rencanakan Kunjungan</button></div>
    <div class="footer-top shell">
        <div class="footer-brand"><a class="logo" href="{{ route('home') }}"><img class="logo-artwork" src="/branding/lok-baintan-explorer.png" alt="Lok Baintan Explorer"></a><p>Jelajahi pesona sungai, rasakan budaya Banjar.</p><div class="footer-loc"><x-icon name="map"/> Kabupaten Banjar, Kalimantan Selatan<br>Kalimantan Selatan, Indonesia</div></div>
        <div><h4>Jelajahi</h4>@foreach(array_slice($links, 0, 3) as [$label, $routeName])<a href="{{ route($routeName) }}">{{ $label }}</a>@endforeach</div>
        <div><h4>Temukan</h4>@foreach(array_slice($links, 3) as [$label, $routeName])<a href="{{ route($routeName) }}">{{ $label }}</a>@endforeach</div>
        <div class="footer-note"><span>Waktu terbaik berkunjung</span><strong><x-icon name="sun"/> Pagi hari</strong><p>Datang sebelum matahari meninggi untuk menyaksikan pasar terapung yang paling hidup.</p></div>
    </div>
    <details class="media-credits shell"><summary>Kredit fotografi & film</summary><p>Dokumentasi Lok Baintan dan Sungai Martapura dari Wikimedia Commons. Foto diubah ukuran, dikonversi, dan dipotong dalam tampilan; video dikonversi ke MP4. Materi tetap mengikuti lisensi masing-masing.</p><div>@foreach($credits as $media)<p><a href="{{ $media['source'] }}" target="_blank" rel="noreferrer">{{ $media['label'] }}</a><span>{{ $media['author'] }} · <a href="{{ $media['licenseUrl'] }}" target="_blank" rel="noreferrer">{{ $media['license'] }}</a></span></p>@endforeach</div></details>
    <div class="footer-bottom shell"><span>© {{ date('Y') }} Lok Baintan Explorer</span><span>Merayakan sungai & budaya Banjar.</span></div>
</div></footer>
