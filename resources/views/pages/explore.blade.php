@extends('layouts.app')
@section('title', 'Jelajah Wisata')
@section('content')
<x-page-hero label="Jelajah Wisata" title="Jelajahi Pengalaman Wisata Lok Baintan" text="Temukan berbagai pengalaman menarik yang menghadirkan keunikan kehidupan masyarakat sungai." :image="$images['hero']"/>
<section class="section shell"><x-section-head eyebrow="Pilih Pengalamanmu" title="Empat cara menikmati Lok Baintan" text="Nikmati setiap momen dengan perlahan dan biarkan sungai menunjukkan cerita yang berbeda."/><div class="activity-grid explore-grid">@foreach($activities as $index => $activity)<x-activity-card :activity="$activity" :index="$index"/>@endforeach</div></section>
<section class="detail-section" id="detail" data-activity-tabs>
    <div class="shell"><div class="detail-tabs">@foreach($activities as $index => $activity)<button @class(['active' => $index === 0]) type="button" data-activity-tab="{{ $index }}" aria-pressed="{{ $index === 0 ? 'true' : 'false' }}"><span>0{{ $index+1 }}</span> {{ $activity['tag'] }}</button>@endforeach</div>
    @foreach($activities as $index => $activity)<div class="detail-layout" data-activity-panel="{{ $index }}" @if($index !== 0) hidden @endif><div class="detail-image"><img src="{{ $activity['image'] }}" alt="{{ $activity['title'] }}"><span><x-icon name="camera"/> Pengalaman pilihan</span></div><div class="detail-copy"><x-eyebrow>Detail Aktivitas</x-eyebrow><h2>{{ $activity['title'] }}</h2><p>{{ $activity['short'] }} Hadir lebih awal memberi waktu untuk mengamati ritme pasar tanpa tergesa dan berinteraksi secara santun dengan masyarakat setempat.</p><div class="experience-list"><div><x-icon name="spark"/><span><b>Yang dapat dialami</b>{{ $activity['experience'] }}</span></div><div><x-icon name="compass"/><span><b>Persiapan yang disarankan</b>{{ $activity['preparation'] }}</span></div><div><x-icon name="clock"/><span><b>Waktu terbaik</b>{{ $activity['time'] }}, ketika cahaya lembut dan kehidupan pasar sedang ramai.</span></div></div><a class="button primary" href="{{ route('guide') }}">Baca Panduan Berkunjung</a></div></div>@endforeach
    </div>
</section>
@endsection
