@php
    $navigation = [
        ['id' => 'beranda', 'label' => 'Beranda', 'route' => 'home'],
        ['id' => 'tentang', 'label' => 'Tentang Lok Baintan', 'route' => 'about'],
        ['id' => 'jelajah', 'label' => 'Jelajah Wisata', 'route' => 'explore'],
        ['id' => 'lahan-basah', 'label' => 'Pesona Lahan Basah', 'route' => 'wetlands'],
        ['id' => 'galeri', 'label' => 'Galeri', 'route' => 'gallery'],
        ['id' => 'panduan', 'label' => 'Panduan Berkunjung', 'route' => 'guide'],
    ];
@endphp
<header class="header">
    <div class="nav-shell">
        <a class="logo" href="{{ route('home') }}" aria-label="Lok Baintan Explorer — Ke Beranda"><img class="logo-artwork" src="/branding/lok-baintan-explorer.png" alt="Lok Baintan Explorer" width="2172" height="724"></a>
        <nav aria-label="Navigasi utama">
            @foreach($navigation as $item)<a @class(['active' => $page === $item['id']]) aria-current="{{ $page === $item['id'] ? 'page' : 'false' }}" href="{{ route($item['route']) }}">{{ $item['label'] }}</a>@endforeach
        </nav>
        <button class="nav-cta" type="button" data-open-planner>Rencanakan Kunjungan</button>
    </div>
</header>
