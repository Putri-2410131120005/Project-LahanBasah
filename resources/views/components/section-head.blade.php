@props(['eyebrow', 'title', 'text' => null, 'centered' => false])
<div {{ $attributes->class(['section-head', 'centered' => $centered]) }}>
    <x-eyebrow>{{ $eyebrow }}</x-eyebrow>
    <h2>{{ $title }}</h2>
    @if($text)<p>{{ $text }}</p>@endif
</div>
