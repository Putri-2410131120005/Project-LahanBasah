@props(['name', 'size' => 20])
<svg width="{{ $size }}" height="{{ $size }}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" {{ $attributes }}>
    @switch($name)
        @case('boat') <path d="M3 15h18l-3 4H7l-4-4Z"/><path d="M7 15V8h10v7M12 8V4l4 2"/> @break
        @case('clock') <circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/> @break
        @case('compass') <circle cx="12" cy="12" r="9"/><path d="m15 9-2 4-4 2 2-4 4-2Z"/> @break
        @case('leaf') <path d="M20 4C11 4 5 8 5 15c0 2 1 4 3 5 0-7 5-10 9-12-4 3-7 7-8 12 7 0 11-6 11-16Z"/> @break
        @case('map') <path d="m3 6 6-3 6 3 6-3v15l-6 3-6-3-6 3V6Z"/><path d="M9 3v15M15 6v15"/> @break
        @case('play') <circle cx="12" cy="12" r="10"/><path d="m10 8 6 4-6 4V8Z"/> @break
        @case('quote') <path d="M5 11h5v7H3v-6c0-4 2-6 5-7M16 11h5v7h-7v-6c0-4 2-6 5-7"/> @break
        @case('river') <path d="M3 6c3 2 5 2 8 0s5-2 10 0M3 12c3 2 5 2 8 0s5-2 10 0M3 18c3 2 5 2 8 0s5-2 10 0"/> @break
        @case('spark') <path d="m12 2 1.6 5.2L19 9l-5.4 1.8L12 16l-1.6-5.2L5 9l5.4-1.8L12 2Z"/><path d="m19 15 .7 2.3L22 18l-2.3.7L19 21l-.7-2.3L16 18l2.3-.7L19 15Z"/> @break
        @case('sun') <circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/> @break
        @case('wallet') <path d="M4 6h14a2 2 0 0 1 2 2v10H4a2 2 0 0 1-2-2V6a3 3 0 0 1 3-3h12"/><path d="M15 11h5v4h-5a2 2 0 0 1 0-4Z"/> @break
        @case('camera') <path d="M4 7h4l2-3h4l2 3h4v13H4V7Z"/><circle cx="12" cy="13" r="4"/> @break
        @case('chevron') <path d="m7 10 5 5 5-5"/> @break
        @case('route') <circle cx="6" cy="18" r="2"/><circle cx="18" cy="6" r="2"/><path d="M8 18h3a3 3 0 0 0 0-6H9a3 3 0 0 1 0-6h7"/> @break
        @case('people') <circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2"/><path d="M3 20c0-4 2-7 6-7s6 3 6 7M15 14c4 0 6 2 6 6"/> @break
    @endswitch
</svg>
