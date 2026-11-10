<!doctype html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="theme-color" content="#173E34">
    <meta name="description" content="Jelajahi Pasar Terapung Lok Baintan, budaya Banjar, dan pesona Sungai Martapura. Temukan pengalaman, galeri, dan panduan perjalananmu.">
    <link rel="icon" type="image/png" href="/branding/favicon.png">
    <title>@yield('title') · Lok Baintan Explorer</title>
    @vite(['resources/css/app.css', 'resources/js/app.js'])
</head>
<body>
<div class="app" lang="id">
    <x-header :page="$page"/>
    <main class="page-content page-{{ $page }}">@yield('content')</main>
    <x-footer :credits="$credits"/>
    <x-travel-planner :destinations="$destinations"/>
</div>
@stack('scripts')
</body>
</html>
