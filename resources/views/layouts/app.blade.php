<!doctype html>
<html lang="id">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="theme-color" content="#173E34">
    <meta name="description"
        content="Jelajahi Pasar Terapung Lok Baintan, budaya Banjar, dan pesona Sungai Martapura. Temukan pengalaman, galeri, dan panduan perjalananmu.">
    <link rel="icon" type="image/png" href="/branding/favicon.png">
    <title>@yield('title') · Lok Baintan Explorer</title>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>

<body>
    <div class="app" lang="id">
        <x-header :page="$page" />
        <main class="page-content page-{{ $page }}">@yield('content')</main>
        <x-footer :credits="$credits" />
        <x-travel-planner :destinations="$destinations" />
    </div>
    <div class="lb-music-fab" data-lb-music-player>
        <button class="lb-music-button" type="button" data-lb-music-toggle aria-label="Nyalakan musik Banjar"
            aria-pressed="false" title="Nyalakan musik Banjar">
            <svg class="lb-music-symbol" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9"
                stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="M9 18V5l12-2v13" />
                <ellipse cx="6" cy="18" rx="3" ry="2" />
                <ellipse cx="18" cy="16" rx="3" ry="2" />
                <path class="lb-music-off-line" d="M3 21 21 3" />
            </svg>
        </button>
        <audio data-lb-music-audio preload="metadata" loop src="{{ asset('audio/panting-banjar.mp3') }}"></audio>
        <span class="lb-music-feedback" data-lb-music-feedback role="status" hidden></span>
    </div>
    @stack('scripts')
</body>

</html>
