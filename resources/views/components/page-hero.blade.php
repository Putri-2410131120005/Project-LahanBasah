@props(['label', 'title', 'text', 'image'])
<section class="page-hero" style="background-image:url('{{ $image }}')">
    <div class="page-hero-overlay"></div>
    <img class="hero-foliage" src="/ornaments/nipah.svg" alt="">
    <div class="shell page-hero-content">
        <div class="crumb"><a href="{{ route('home') }}">Beranda</a><span>/</span><span>{{ $label }}</span></div>
        <x-eyebrow light>Lok Baintan Explorer</x-eyebrow>
        <h1>{{ $title }}</h1><p>{{ $text }}</p>
    </div>
    <div class="hero-river-edge" aria-hidden="true"></div>
</section>
