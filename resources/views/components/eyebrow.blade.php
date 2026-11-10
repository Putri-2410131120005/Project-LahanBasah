@props(['light' => false])
<div {{ $attributes->class(['eyebrow', 'light' => $light]) }}><span></span>{{ $slot }}</div>
