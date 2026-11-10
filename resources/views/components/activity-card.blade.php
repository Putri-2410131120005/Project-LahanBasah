@props(['activity', 'index'])
<article class="activity-card">
    <div class="activity-image"><img src="{{ $activity['image'] }}" alt="{{ $activity['title'] }}" loading="lazy"><span>{{ $activity['tag'] }}</span></div>
    <div class="activity-body">
        <div class="activity-time"><x-icon name="clock" :size="16"/> {{ $activity['time'] }}</div>
        <h3>{{ $activity['title'] }}</h3><p>{{ $activity['short'] }}</p>
        <a href="{{ route('explore', ['aktivitas' => $index + 1]) }}#detail" aria-label="Lihat detail: {{ $activity['title'] }}">Lihat Detail</a>
    </div>
</article>
