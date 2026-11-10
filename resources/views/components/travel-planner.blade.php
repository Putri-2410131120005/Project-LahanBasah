@props(['destinations'])
@php
    $departures = [
        $destinations[2], $destinations[1],
        ['id' => 'banjarbaru', 'name' => 'Pusat Kota Banjarbaru', 'query' => 'Lapangan Murjani, Banjarbaru, Kalimantan Selatan'],
    ];
    $activityOptions = ['Menyaksikan aktivitas pasar terapung', 'Menyusuri sungai dengan jukung', 'Mengenal kuliner khas Banjar', 'Menikmati suasana pagi dan fotografi'];
@endphp
<dialog class="modal planner-modal" id="travel-planner" aria-labelledby="planner-title">
    <div class="modal-surface">
        <div class="modal-dismiss"><button class="modal-close" type="button" data-close-dialog aria-label="Tutup dialog"><span aria-hidden="true">×</span></button></div>
        <div class="planner-heading">
            <span class="planner-kicker">ASISTEN PERSIAPAN KUNJUNGAN</span>
            <h2 id="planner-title">Rencanakan pagi <i>yang berkesan.</i></h2>
            <p>Pilih pengalamanmu dan siapkan kebutuhan perjalanan dengan panduan pribadi. Ini bukan pemesanan; isian tidak dikirim ke layanan lain.</p>
            <div class="planner-steps" aria-label="Tahapan rencana"><span class="current" data-step-label="form">01 · Preferensi kunjungan</span><span data-step-label="result">02 · Rencana perjalanan</span></div>
        </div>
        <form class="planner-form" id="planner-form" novalidate>
            <p class="form-required">Semua isian wajib diisi, kecuali catatan.</p>
            <div class="form-grid">
                <label>Tanggal kunjungan<input id="plan-date" name="date" type="date" required><span class="field-error" data-error="date" role="alert"></span></label>
                <label>Jumlah pengunjung<input id="plan-visitors" name="visitors" type="number" required min="1" max="999" step="1" value="1"><small>Termasuk anak-anak dalam rombongan.</small><span class="field-error" data-error="visitors" role="alert"></span></label>
                <label class="departure-field">Lokasi keberangkatan
                    <select id="plan-departure" name="departure" required><option value="">Pilih titik keberangkatan</option>@foreach($departures as $departure)<option value="{{ $departure['id'] }}" data-query="{{ $departure['query'] }}">{{ $departure['name'] }}</option>@endforeach</select>
                    <span class="field-error" data-error="departure" role="alert"></span>
                </label>
            </div>
            <fieldset class="activity-options"><legend>Pilihan aktivitas wisata <small>Pilih minimal satu</small></legend>@foreach($activityOptions as $option)<label><input type="checkbox" name="activities[]" value="{{ $option }}"><span>{{ $option }}</span></label>@endforeach</fieldset>
            <p class="form-error" data-error="activities" role="alert"></p>
            <label class="notes-label">Catatan persiapan <small>Opsional</small><textarea name="notes" rows="3" maxlength="1000" placeholder="Misalnya: membawa anak, kebutuhan akses, atau perlengkapan pribadi…"></textarea></label>
            <div class="planner-actions"><p>Tujuan: <b>Pasar Terapung Lok Baintan</b></p><button class="button primary" type="submit">Buat Rencana Perjalanan</button></div>
        </form>
        <div class="plan-result" id="plan-result" hidden>
            <div class="plan-result-top"><span>RENCANA PRIBADI ANDA</span><h3 tabindex="-1">Rencana Kunjunganmu ke Lok Baintan</h3><p data-plan="summary"></p></div>
            <dl class="plan-facts"><div><dt>Berangkat dari</dt><dd data-plan="departure"></dd></div><div><dt>Tujuan</dt><dd>Pasar Terapung Lok Baintan</dd></div><div><dt>Waktu kunjungan disarankan</dt><dd>Pagi hari, sesuai kondisi setempat</dd></div></dl>
            <h4>Pengalaman pilihanmu</h4><ol class="plan-activities" data-plan="activities"></ol>
            <h4>Urutan aktivitas yang disarankan</h4><ol class="plan-sequence" data-plan="sequence"></ol>
            <h4>Siapkan sebelum berangkat</h4><ul class="plan-tips" data-plan="preparation"></ul>
            <div class="plan-notes" data-plan="notes-wrap" hidden><h4>Catatan pribadi</h4><p data-plan="notes"></p></div>
            <p class="planner-notice">Petunjuk arah Google Maps hanya untuk jalur darat, bukan rute jukung. Periksa kondisi jalan dan akses terakhir ke sungai di lokasi. Pengalaman jukung perlu dikonfirmasi dengan warga atau pendamping setempat, bukan layanan yang telah dipesan.</p>
            <div class="result-actions"><a class="button primary" data-plan="directions" target="_blank" rel="noreferrer">Lihat Rute di Google Maps</a><button class="button planner-outline" type="button" data-edit-plan>Ubah Rencana</button></div>
            <p class="plan-disclaimer">Ini panduan pribadi, bukan pemesanan. Tidak ada jadwal, harga, atau ketersediaan yang dijamin. Isian tidak disimpan setelah asisten ditutup.</p>
        </div>
    </div>
</dialog>
