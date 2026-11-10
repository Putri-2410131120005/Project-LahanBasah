const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

function openDialog(dialog) {
    if (!dialog || dialog.open) return;
    dialog.showModal();
    document.body.style.overflow = 'hidden';
}

function closeDialog(dialog) {
    if (!dialog?.open) return;
    dialog.querySelector('video')?.pause();
    dialog.close();
    document.body.style.overflow = '';
}

$$('[data-close-dialog]').forEach((button) => button.addEventListener('click', () => closeDialog(button.closest('dialog'))));
$$('dialog.modal').forEach((dialog) => {
    dialog.addEventListener('click', (event) => event.target === dialog && closeDialog(dialog));
    dialog.addEventListener('cancel', (event) => { event.preventDefault(); closeDialog(dialog); });
});

const planner = document.querySelector('#travel-planner');
$$('[data-open-planner]').forEach((button) => button.addEventListener('click', () => openDialog(planner)));

function localToday() {
    const now = new Date();
    return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
}

function setList(element, values, numbered = false) {
    element.replaceChildren(...values.map((value, index) => {
        const item = document.createElement('li');
        if (numbered) {
            const number = document.createElement('span');
            const text = document.createElement('p');
            number.textContent = String(index + 1).padStart(2, '0');
            text.textContent = value;
            item.append(number, text);
        } else item.textContent = value;
        return item;
    }));
}

if (planner) {
    const form = planner.querySelector('#planner-form');
    const result = planner.querySelector('#plan-result');
    const dateInput = form.elements.date;
    dateInput.min = localToday();
    $$('input[type="checkbox"]', form).forEach((checkbox) => checkbox.addEventListener('change', () => checkbox.closest('label').classList.toggle('selected', checkbox.checked)));

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const data = new FormData(form);
        const date = data.get('date');
        const visitors = Number(data.get('visitors'));
        const departure = form.elements.departure;
        const activities = data.getAll('activities[]');
        const errors = {
            date: !date ? 'Pilih tanggal kunjungan.' : date < localToday() ? 'Tanggal kunjungan tidak boleh tanggal lampau.' : '',
            visitors: !Number.isInteger(visitors) || visitors < 1 || visitors > 999 ? 'Masukkan jumlah pengunjung antara 1–999 orang, tanpa desimal.' : '',
            departure: !departure.value ? 'Pilih lokasi keberangkatan.' : '',
            activities: !activities.length ? 'Pilih setidaknya satu aktivitas wisata.' : '',
        };
        Object.entries(errors).forEach(([field, message]) => {
            const target = form.querySelector(`[data-error="${field}"]`);
            if (target) target.textContent = message;
        });
        const firstError = Object.entries(errors).find(([, message]) => message);
        if (firstError) {
            form.querySelector(firstError[0] === 'activities' ? '[name="activities[]"]' : `[name="${firstError[0]}"]`)?.focus();
            return;
        }

        const selectedDeparture = departure.selectedOptions[0];
        const dateLabel = new Intl.DateTimeFormat('id-ID', { dateStyle: 'full' }).format(new Date(`${date}T12:00:00`));
        const preparation = [
            'Periksa cuaca dan kondisi akses sebelum berangkat; aktivitas pasar mengikuti keadaan setempat.',
            'Bawa uang tunai pecahan kecil, air minum, pelindung hujan, dan tas tahan percikan.',
            'Minta izin sebelum memotret, beri ruang untuk pedagang, dan bawa kembali sampah.',
        ];
        if (visitors > 1) preparation.push('Sepakati titik berkumpul dan perhatikan kebutuhan setiap anggota rombongan.');
        if (activities.includes('Menyusuri sungai dengan jukung')) preparation.push('Jika ingin mencoba jukung, konfirmasikan kepada warga atau pendamping setempat, pastikan perlengkapan keselamatan, dan ikuti arahan pendamping.');
        if (activities.includes('Mengenal kuliner khas Banjar')) preparation.push('Tanyakan bahan makanan kepada pedagang jika memiliki alergi; pilihan kuliner mengikuti sajian yang tersedia.');
        const sequence = ['Datang pada pagi hari setelah memeriksa cuaca dan akses terakhir ke tepian sungai.', ...activities.map((item) => `${item} dengan santun, mengikuti ritme masyarakat dan tanpa menghalangi perdagangan.`), 'Sebelum pulang, periksa barang bawaan dan bawa kembali sampahmu.'];

        result.querySelector('[data-plan="summary"]').textContent = `${dateLabel} · ${visitors} pengunjung`;
        result.querySelector('[data-plan="departure"]').textContent = selectedDeparture.textContent;
        setList(result.querySelector('[data-plan="activities"]'), activities);
        setList(result.querySelector('[data-plan="sequence"]'), sequence, true);
        setList(result.querySelector('[data-plan="preparation"]'), preparation);
        const notes = String(data.get('notes') || '').trim();
        result.querySelector('[data-plan="notes-wrap"]').hidden = !notes;
        result.querySelector('[data-plan="notes"]').textContent = notes;
        const origin = encodeURIComponent(selectedDeparture.dataset.query);
        const destination = encodeURIComponent('Pasar Terapung Lok Baintan, Sungai Tabuk, Kabupaten Banjar, Kalimantan Selatan');
        result.querySelector('[data-plan="directions"]').href = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=driving`;
        form.hidden = true;
        result.hidden = false;
        planner.querySelector('[data-step-label="form"]').classList.remove('current');
        planner.querySelector('[data-step-label="result"]').classList.add('current');
        result.querySelector('h3').focus();
    });

    planner.querySelector('[data-edit-plan]').addEventListener('click', () => {
        result.hidden = true; form.hidden = false;
        planner.querySelector('[data-step-label="result"]').classList.remove('current');
        planner.querySelector('[data-step-label="form"]').classList.add('current');
        dateInput.focus();
    });
}

const activityRoot = document.querySelector('[data-activity-tabs]');
if (activityRoot) {
    const showActivity = (index) => {
        $$('[data-activity-tab]', activityRoot).forEach((button) => {
            const active = Number(button.dataset.activityTab) === index;
            button.classList.toggle('active', active);
            button.setAttribute('aria-pressed', String(active));
        });
        $$('[data-activity-panel]', activityRoot).forEach((panel) => panel.hidden = Number(panel.dataset.activityPanel) !== index);
    };
    $$('[data-activity-tab]', activityRoot).forEach((button) => button.addEventListener('click', () => showActivity(Number(button.dataset.activityTab))));
    const requested = Number(new URLSearchParams(location.search).get('aktivitas'));
    if (requested >= 1 && requested <= 4) showActivity(requested - 1);
}

const galleryRoot = document.querySelector('[data-gallery]');
if (galleryRoot) {
    const lightbox = document.querySelector('#gallery-lightbox');
    $$('[data-gallery-filter]', galleryRoot).forEach((button) => button.addEventListener('click', () => {
        const category = button.dataset.galleryFilter;
        $$('[data-gallery-filter]', galleryRoot).forEach((item) => {
            const active = item === button;
            item.classList.toggle('active', active);
            item.setAttribute('aria-pressed', String(active));
        });
        $$('[data-gallery-item]', galleryRoot).forEach((item) => item.hidden = !['Semua', 'Video'].includes(category) && item.dataset.category !== category);
        galleryRoot.querySelector('[data-video-feature]').hidden = !['Semua', 'Video'].includes(category);
    }));
    $$('[data-gallery-item]', galleryRoot).forEach((item) => item.addEventListener('click', () => {
        const image = lightbox.querySelector('[data-lightbox-image]');
        image.src = item.dataset.src; image.alt = item.dataset.title;
        lightbox.querySelector('[data-lightbox-category]').textContent = item.dataset.category;
        lightbox.querySelector('[data-lightbox-title]').textContent = item.dataset.title;
        lightbox.querySelector('[data-lightbox-credit]').textContent = item.dataset.credit;
        openDialog(lightbox);
    }));
    galleryRoot.querySelector('[data-open-video]').addEventListener('click', () => {
        const dialog = document.querySelector('#video-dialog');
        openDialog(dialog);
        dialog.querySelector('video').play().catch(() => {});
    });
}

$$('[data-faq-toggle]').forEach((button) => button.addEventListener('click', () => {
    const article = button.closest('article');
    const open = !article.classList.contains('open');
    article.classList.toggle('open', open);
    button.setAttribute('aria-expanded', String(open));
    document.getElementById(button.getAttribute('aria-controls')).hidden = !open;
}));

const mapRoot = document.querySelector('[data-map-section]');
if (mapRoot) {
    const destinations = JSON.parse(mapRoot.dataset.destinations);
    const select = document.querySelector('[data-destination-select]');
    const frame = mapRoot.querySelector('[data-map-frame]');
    const fallback = mapRoot.querySelector('[data-map-fallback]');
    const updateMap = () => {
        const destination = destinations.find((item) => item.id === select.value) || destinations[0];
        const search = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(destination.query)}`;
        frame.hidden = false; fallback.hidden = true;
        frame.title = `Peta Google Maps ${destination.name}`;
        frame.src = `https://maps.google.com/maps?q=${encodeURIComponent(destination.query)}&z=14&output=embed&hl=id`;
        mapRoot.querySelector('[data-destination-name]').textContent = destination.name;
        mapRoot.querySelector('[data-destination-description]').textContent = destination.description;
        mapRoot.querySelector('[data-map-link]').href = search;
        mapRoot.querySelector('[data-fallback-link]').href = search;
        mapRoot.querySelector('[data-fallback-name]').textContent = destination.name;
        mapRoot.querySelector('[data-caption-name]').textContent = destination.name;
        mapRoot.querySelector('[data-caption-area]').textContent = destination.area;
        mapRoot.querySelector('[data-map-status]').textContent = 'Memuat peta Google Maps… Jika peta kosong atau diblokir peramban, buka lokasi melalui tautan di atas.';
    };
    select.addEventListener('change', updateMap);
    frame.addEventListener('load', () => mapRoot.querySelector('[data-map-status]').textContent = 'Peta disediakan oleh Google Maps. Jika peta kosong atau diblokir peramban, buka lokasi melalui tautan di atas.');
    mapRoot.querySelector('[data-map-retry]').addEventListener('click', (event) => {
        if (!fallback.hidden) { updateMap(); event.currentTarget.textContent = 'Peta tidak tampil?'; }
        else {
            frame.hidden = true; fallback.hidden = false;
            mapRoot.querySelector('[data-map-status]').textContent = 'Peta tidak dapat dimuat. Gunakan tautan Google Maps di atas.';
            event.currentTarget.textContent = 'Coba muat ulang peta';
        }
    });
}
