import { setupBookingDemo } from './booking-demo.js';

const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];



function openDialog(dialog) {

    if (!dialog) return;

    if (dialog.open) return;

    dialog.dataset.previousFocus = '';
<<<<<<< HEAD
    dialog._previousFocus = document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
=======

    dialog._previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;

>>>>>>> 78755cc (Pengembangan fitur komentar dan halaman tim pengembang)
    if (typeof dialog.showModal === 'function') dialog.showModal();

    else dialog.setAttribute('open', '');

    document.body.style.overflow = 'hidden';

}



function closeDialog(dialog) {

    if (!dialog) return;

    if (!dialog.open && !dialog.hasAttribute('open')) return;

    dialog.querySelector('video')?.pause();

    if (typeof dialog.close === 'function') dialog.close();

    else dialog.removeAttribute('open');

    document.body.style.overflow = '';

    dialog._previousFocus?.focus?.();

}



function initializePage() {
<<<<<<< HEAD
    const navToggle = document.querySelector('[data-nav-toggle]');
    const navMenu = document.querySelector('#main-navigation');

    if (navToggle && navMenu && navToggle.dataset.lbBound !== 'true') {
        navToggle.dataset.lbBound = 'true';

        const closeNavigation = () => {
            navToggle.setAttribute('aria-expanded', 'false');
            navToggle.setAttribute('aria-label', 'Buka menu navigasi');
            document.querySelector('.header')?.classList.remove('is-menu-open');
        };

        navToggle.addEventListener('click', () => {
            const open = navToggle.getAttribute('aria-expanded') !== 'true';
            navToggle.setAttribute('aria-expanded', String(open));
            navToggle.setAttribute(
                'aria-label',
                open ? 'Tutup menu navigasi' : 'Buka menu navigasi',
            );
            document.querySelector('.header')?.classList.toggle('is-menu-open', open);
        });

        navMenu.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', closeNavigation);
        });

        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape') closeNavigation();
        });
    }

    const syncOrganismCardHeights = (grid) => {
        if (!grid) return;

        const cards = $$('[data-organism-card]', grid);
        cards.forEach((card) => {
            card.style.minHeight = '';
        });
=======

    const navToggle = document.querySelector('[data-nav-toggle]');

    const navMenu = document.querySelector('#main-navigation');

    $$('[data-image-fallback]').forEach((image) => {

        if (image.dataset.lbFallbackBound === 'true') return;

        image.dataset.lbFallbackBound = 'true';

        image.addEventListener('error', () => {

            const fallback = image.dataset.fallback;

            if (fallback && image.getAttribute('src') !== fallback) image.src = fallback;

        });

    });

    $$('[data-comment-media]').forEach((button) => {

        if (button.dataset.lbBound === 'true') return;

        button.dataset.lbBound = 'true';

        const control = button.closest('.comment-upload-control');

        const input = control?.querySelector('[data-comment-file]');

        const fileName = control?.querySelector('[data-comment-file-name]');

        button.addEventListener('click', () => input?.click());

        input?.addEventListener('change', () => {

            if (fileName) fileName.textContent = input.files?.[0]?.name || 'Opsional · foto 5 MB, video 25 MB';

        });

    });

    $$('[data-comment-reply]').forEach((button) => {

        if (button.dataset.lbBound === 'true') return;

        button.dataset.lbBound = 'true';

        button.addEventListener('click', () => {

            const form = document.getElementById(button.getAttribute('aria-controls'));

            if (!form) return;

            form.hidden = false;

            form.querySelector('input[name="name"]')?.focus();

        });

    });

    $$('[data-comment-cancel]').forEach((button) => {

        if (button.dataset.lbBound === 'true') return;

        button.dataset.lbBound = 'true';

        button.addEventListener('click', () => {

            const form = button.closest('form');

            if (!form) return;

            form.reset();

            form.hidden = true;

            const fileName = form.querySelector('[data-comment-file-name]');

            if (fileName) fileName.textContent = 'Opsional · foto 5 MB, video 25 MB';

        });

    });

    const commentDeleteDialog = document.querySelector('#comment-delete-dialog');
    let pendingCommentDelete = null;

    $$('[data-comment-delete]').forEach((form) => {
        if (form.dataset.lbBound === 'true') return;
        form.dataset.lbBound = 'true';
        form.addEventListener('submit', (event) => {
            if (form.dataset.lbConfirmed === 'true') return;
            event.preventDefault();
            if (!commentDeleteDialog || typeof commentDeleteDialog.showModal !== 'function') {
                if (window.confirm('Yakin ingin menghapus komentar ini?')) {
                    form.dataset.lbConfirmed = 'true';
                    form.requestSubmit();
                }
                return;
            }
            pendingCommentDelete = form;
            commentDeleteDialog.showModal();
        });
    });

    if (commentDeleteDialog && commentDeleteDialog.dataset.lbBound !== 'true') {
        commentDeleteDialog.dataset.lbBound = 'true';
        commentDeleteDialog.querySelector('[data-comment-delete-cancel]')?.addEventListener('click', () => commentDeleteDialog.close());
        commentDeleteDialog.querySelector('[data-comment-delete-confirm]')?.addEventListener('click', () => {
            if (!pendingCommentDelete) return;
            const form = pendingCommentDelete;
            form.dataset.lbConfirmed = 'true';
            commentDeleteDialog.close();
            form.requestSubmit();
        });
        commentDeleteDialog.addEventListener('close', () => { pendingCommentDelete = null; });
    }

    $$('[data-comment-toast]').forEach((toast) => {
        if (toast.dataset.lbBound === 'true') return;
        toast.dataset.lbBound = 'true';
        const dismiss = () => { toast.hidden = true; };
        toast.querySelector('[data-comment-toast-close]')?.addEventListener('click', dismiss);
        window.setTimeout(dismiss, 4500);
    });

    $$('.comment-form').forEach((form) => {

        if (form.dataset.lbResetBound === 'true') return;

        form.dataset.lbResetBound = 'true';

        form.addEventListener('reset', () => {

            window.setTimeout(() => {

                const fileName = form.querySelector('[data-comment-file-name]');

                if (fileName) fileName.textContent = 'Opsional · foto 5 MB, video 25 MB';

            }, 0);

        });

    });

    if (navToggle && navMenu && navToggle.dataset.lbBound !== 'true') {

        navToggle.dataset.lbBound = 'true';

        const closeNavigation = () => {

            navToggle.setAttribute('aria-expanded', 'false');

            navToggle.setAttribute('aria-label', 'Buka menu navigasi');

            document.querySelector('.header')?.classList.remove('is-menu-open');

        };

        navToggle.addEventListener('click', () => {

            const open = navToggle.getAttribute('aria-expanded') !== 'true';

            navToggle.setAttribute('aria-expanded', String(open));

            navToggle.setAttribute('aria-label', open ? 'Tutup menu navigasi' : 'Buka menu navigasi');

            document.querySelector('.header')?.classList.toggle('is-menu-open', open);

        });

        navMenu.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeNavigation));

        document.addEventListener('keydown', (event) => {

            if (event.key === 'Escape') closeNavigation();

        });

    }

    const syncOrganismCardHeights = (grid) => {

        if (!grid) return;

        const cards = $$('[data-organism-card]', grid);

        cards.forEach((card) => { card.style.minHeight = ''; });
>>>>>>> 78755cc (Pengembangan fitur komentar dan halaman tim pengembang)

        if (window.matchMedia('(max-width: 640px)').matches) return;

        const closedCards = cards.filter((card) => !card.classList.contains('is-open'));
<<<<<<< HEAD
        if (!closedCards.length) return;

        const tallestClosedCard = Math.max(
            ...closedCards.map((card) => card.getBoundingClientRect().height),
        );

        closedCards.forEach((card) => {
            card.style.minHeight = `${Math.ceil(tallestClosedCard)}px`;
        });
    };

    $$('[data-organism-toggle]').forEach((button) => {
        if (button.dataset.lbBound === 'true') return;
        button.dataset.lbBound = 'true';

        button.addEventListener('click', () => {
            const card = button.closest('[data-organism-card]');
            const grid = card?.closest('[data-organism-grid]');
            const group = card?.dataset.organismGroup;
            const willOpen = button.getAttribute('aria-expanded') !== 'true';

            $$('[data-organism-card]', grid)
                .filter((item) => item.dataset.organismGroup === group)
                .forEach((item) => {
                    const control = item.querySelector('[data-organism-toggle]');
                    const panel = item.querySelector('.organism-extra');
                    const active = item === card && willOpen;

                    item.classList.toggle('is-open', active);
                    control?.setAttribute('aria-expanded', String(active));
                    if (control) {
                        control.textContent = active
                            ? 'Tampilkan Lebih Sedikit'
                            : 'Lihat Selengkapnya';
                    }
                    panel?.setAttribute('aria-hidden', String(!active));
                });

            requestAnimationFrame(() => syncOrganismCardHeights(grid));
            window.setTimeout(() => syncOrganismCardHeights(grid), 340);
        });
    });

    $$('[data-organism-grid]').forEach((grid) => {
        if (grid.dataset.lbHeightBound === 'true') return;
        grid.dataset.lbHeightBound = 'true';

        const sync = () => syncOrganismCardHeights(grid);
        window.addEventListener('resize', sync, { passive: true });
        sync();
    });

    $$('[data-close-dialog]').forEach((button) => {
        if (button.dataset.lbBound === 'true') return;
        button.dataset.lbBound = 'true';
        button.addEventListener('click', () => closeDialog(button.closest('dialog')));
    });

    $$('dialog.modal').forEach((dialog) => {
        if (dialog.dataset.lbBound === 'true') return;
        dialog.dataset.lbBound = 'true';

        dialog.addEventListener('click', (event) => {
            if (event.target === dialog) closeDialog(dialog);
        });

        dialog.addEventListener('cancel', (event) => {
            event.preventDefault();
            closeDialog(dialog);
        });
    });

    const planner = document.querySelector('#travel-planner');

    function localToday() {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
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
            } else {
                item.textContent = value;
            }

            return item;
        }));
    }

    if (planner) {
        const form = planner.querySelector('#planner-form');
        const result = planner.querySelector('#plan-result');
        const disclaimer = result.querySelector('.plan-disclaimer');

        if (disclaimer) {
            disclaimer.textContent = 'Panduan pribadi, bukan pemesanan. Rencana hanya disimpan di browser ini jika Anda memilih Simpan Rencana; tidak ada jadwal, harga, atau ketersediaan yang dijamin.';
        }
=======

        if (!closedCards.length) return;

        const tallestClosedCard = Math.max(...closedCards.map((card) => card.getBoundingClientRect().height));

        closedCards.forEach((card) => { card.style.minHeight = `${Math.ceil(tallestClosedCard)}px`; });

    };

    $$('[data-organism-toggle]').forEach((button) => {

        if (button.dataset.lbBound === 'true') return;

        button.dataset.lbBound = 'true';

        button.addEventListener('click', () => {

            const card = button.closest('[data-organism-card]');

            const grid = card?.closest('[data-organism-grid]');

            const group = card?.dataset.organismGroup;

            const willOpen = button.getAttribute('aria-expanded') !== 'true';

            $$('[data-organism-card]', grid).filter((item) => item.dataset.organismGroup === group).forEach((item) => {

                const control = item.querySelector('[data-organism-toggle]');

                const panel = item.querySelector('.organism-extra');

                const active = item === card && willOpen;

                item.classList.toggle('is-open', active);

                control?.setAttribute('aria-expanded', String(active));

                const label = control?.querySelector('[data-organism-label]');

                if (label) label.textContent = active ? 'Tampilkan Lebih Sedikit' : 'Lihat Selengkapnya';

                else if (control) control.textContent = active ? 'Tampilkan Lebih Sedikit' : 'Lihat Selengkapnya';

                panel?.setAttribute('aria-hidden', String(!active));

            });

            requestAnimationFrame(() => syncOrganismCardHeights(grid));

            window.setTimeout(() => syncOrganismCardHeights(grid), 340);

        });

    });

    $$('[data-organism-grid]').forEach((grid) => {

        if (grid.dataset.lbHeightBound === 'true') return;

        grid.dataset.lbHeightBound = 'true';

        const sync = () => syncOrganismCardHeights(grid);

        window.addEventListener('resize', sync, { passive: true });

        sync();

    });

    $$('[data-close-dialog]').forEach((button) => {

        if (button.dataset.lbBound === 'true') return;

        button.dataset.lbBound = 'true';

        button.addEventListener('click', () => closeDialog(button.closest('dialog')));

    });

    $$('dialog.modal').forEach((dialog) => {

        if (dialog.dataset.lbBound === 'true') return;

        dialog.dataset.lbBound = 'true';

        dialog.addEventListener('click', (event) => event.target === dialog && closeDialog(dialog));

        dialog.addEventListener('cancel', (event) => { event.preventDefault(); closeDialog(dialog); });

    });



    const planner = document.querySelector('#travel-planner');



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

        const disclaimer = result.querySelector('.plan-disclaimer');

        if (disclaimer) disclaimer.textContent = 'Panduan pribadi, bukan pemesanan. Rencana hanya disimpan di browser ini jika Anda memilih Simpan Rencana; tidak ada jadwal, harga, atau ketersediaan yang dijamin.';

        const dateInput = form.elements.date;

        const savedEntry = planner.querySelector('[data-open-saved-from-form]');

        const getPlanStorage = () => {

            try {

                const saved = JSON.parse(localStorage.getItem('lok-baintan-saved-plan') || 'null');

                return saved && Array.isArray(saved.activities) && typeof saved.date === 'string' ? saved : null;

            } catch { return null; }

        };

        const refreshSavedEntry = () => {

            const available = Boolean(getPlanStorage());

            if (savedEntry) savedEntry.hidden = !available;

            planner.querySelector('[data-open-saved]')?.toggleAttribute('hidden', !available);

        };

        refreshSavedEntry();

        dateInput.min = localToday();

        $$('input[type="checkbox"]', form).forEach((checkbox) => {

            const syncCheckbox = () => checkbox.closest('label')?.classList.toggle('selected', checkbox.checked);

            syncCheckbox();

            checkbox.addEventListener('change', syncCheckbox);

        });



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

                const control = field === 'activities'

                    ? form.querySelector('[name="activities[]"]')

                    : form.elements[field];

                if (control) {

                    control.setAttribute('aria-invalid', message ? 'true' : 'false');

                    if (field === 'activities') {

                        $$('[name="activities[]"]', form).forEach((item) => item.setAttribute('aria-invalid', message ? 'true' : 'false'));

                    }

                }

            });

            const firstError = Object.entries(errors).find(([, message]) => message);

            if (firstError) {

                form.querySelector(firstError[0] === 'activities' ? '[name="activities[]"]' : `[name="${firstError[0]}"]`)?.focus();

                return;

            }


>>>>>>> 78755cc (Pengembangan fitur komentar dan halaman tim pengembang)

        const dateInput = form.elements.date;
        const savedEntry = planner.querySelector('[data-open-saved-from-form]');

        const getPlanStorage = () => {
            try {
                const saved = JSON.parse(localStorage.getItem('lok-baintan-saved-plan') || 'null');
                return saved && Array.isArray(saved.activities) && typeof saved.date === 'string'
                    ? saved
                    : null;
            } catch {
                return null;
            }
        };

        const refreshSavedEntry = () => {
            const available = Boolean(getPlanStorage());
            if (savedEntry) savedEntry.hidden = !available;
            planner.querySelector('[data-open-saved]')?.toggleAttribute('hidden', !available);
        };

        refreshSavedEntry();
        dateInput.min = localToday();

        $$('input[type="checkbox"]', form).forEach((checkbox) => {
            const syncCheckbox = () => {
                checkbox.closest('label')?.classList.toggle('selected', checkbox.checked);
            };
            syncCheckbox();
            checkbox.addEventListener('change', syncCheckbox);
        });

        form.addEventListener('submit', (event) => {
            event.preventDefault();

            const data = new FormData(form);
            const date = data.get('date');
            const visitors = Number(data.get('visitors'));
            const departure = form.elements.departure;
            const activities = data.getAll('activities[]');

            const errors = {
                date: !date
                    ? 'Pilih tanggal kunjungan.'
                    : date < localToday()
                        ? 'Tanggal kunjungan tidak boleh tanggal lampau.'
                        : '',
                visitors: !Number.isInteger(visitors) || visitors < 1 || visitors > 999
                    ? 'Masukkan jumlah pengunjung antara 1–999 orang, tanpa desimal.'
                    : '',
                departure: !departure.value ? 'Pilih lokasi keberangkatan.' : '',
                activities: !activities.length ? 'Pilih setidaknya satu aktivitas wisata.' : '',
            };

            Object.entries(errors).forEach(([field, message]) => {
                const target = form.querySelector(`[data-error="${field}"]`);
                if (target) target.textContent = message;

                const control = field === 'activities'
                    ? form.querySelector('[name="activities[]"]')
                    : form.elements[field];

                if (control) {
                    control.setAttribute('aria-invalid', message ? 'true' : 'false');

                    if (field === 'activities') {
                        $$('[name="activities[]"]', form).forEach((item) => {
                            item.setAttribute('aria-invalid', message ? 'true' : 'false');
                        });
                    }
                }
            });

            const firstError = Object.entries(errors).find(([, message]) => message);
            if (firstError) {
                const selector = firstError[0] === 'activities'
                    ? '[name="activities[]"]'
                    : `[name="${firstError[0]}"]`;
                form.querySelector(selector)?.focus();
                return;
            }

            const selectedDeparture = departure.selectedOptions[0];
<<<<<<< HEAD
            const dateLabel = new Intl.DateTimeFormat('id-ID', { dateStyle: 'full' })
                .format(new Date(`${date}T12:00:00`));

            const preparation = [
                'Periksa cuaca dan kondisi akses sebelum berangkat; aktivitas pasar mengikuti keadaan setempat.',
                'Bawa uang tunai pecahan kecil, air minum, pelindung hujan, dan tas tahan percikan.',
                'Minta izin sebelum memotret, beri ruang untuk pedagang, dan bawa kembali sampah.',
            ];

            if (visitors > 1) {
                preparation.push('Sepakati titik berkumpul dan perhatikan kebutuhan setiap anggota rombongan.');
            }

            if (activities.includes('Menyusuri sungai dengan jukung')) {
                preparation.push('Jika ingin mencoba jukung, konfirmasikan kepada warga atau pendamping setempat, pastikan perlengkapan keselamatan, dan ikuti arahan pendamping.');
            }

            if (activities.includes('Mengenal kuliner khas Banjar')) {
                preparation.push('Tanyakan bahan makanan kepada pedagang jika memiliki alergi; pilihan kuliner mengikuti sajian yang tersedia.');
            }

            const sequence = [
                'Datang pada pagi hari setelah memeriksa cuaca dan akses terakhir ke tepian sungai.',
                ...activities.map((item) => `${item} dengan santun, mengikuti ritme masyarakat dan tanpa menghalangi perdagangan.`),
                'Sebelum pulang, periksa barang bawaan dan bawa kembali sampahmu.',
            ];

            const plan = {
                date,
                dateLabel,
                visitors,
                departure: selectedDeparture.textContent,
                departureQuery: selectedDeparture.dataset.query,
                activities,
                sequence,
                preparation,
                notes: String(data.get('notes') || '').trim(),
                destination: 'Pasar Terapung Lok Baintan',
                destinationDescription: 'Ruang perdagangan di atas jukung di Sungai Martapura.',
            };

            displayPlan(plan);
            refreshSavedEntry();
        });

        const buildShareText = (plan) => [
            'Rencana Kunjungan · Lok Baintan Explorer',
            `Tanggal: ${plan.dateLabel || plan.date}`,
            `Pengunjung: ${plan.visitors} orang`,
            `Keberangkatan: ${plan.departure}`,
            `Destinasi: ${plan.destination}`,
            '',
            'Aktivitas:',
            ...plan.activities.map((activity, index) => `${index + 1}. ${activity}`),
            '',
            'Persiapan:',
            ...plan.preparation.map((item) => `• ${item}`),
            ...(plan.notes ? ['', `Catatan: ${plan.notes}`] : []),
        ].join('\n');

        const planStatus = result.querySelector('[data-plan="status"]');
        const getSavedPlan = getPlanStorage;

        const renderTimeline = (plan) => {
            const items = [
                ['Datang & orientasi', 'Konfirmasi kondisi akses dan titik berkumpul pada hari kunjungan.'],
                ...plan.activities.map((activity) => [
                    activity,
                    'Ikuti ritme aktivitas dengan santun; durasi mengikuti kesepakatan lapangan.',
                ]),
                ['Kumpul & pulang', 'Periksa barang bawaan dan bawa kembali sampah pribadi.'],
            ];

            const list = result.querySelector('[data-plan="timeline"]');
            if (!list) return;

            list.replaceChildren(...items.map(([title, detail], index) => {
                const li = document.createElement('li');
                const number = document.createElement('span');
                const contents = document.createElement('div');
                const heading = document.createElement('strong');
                const description = document.createElement('p');

                number.textContent = String(index + 1).padStart(2, '0');
                heading.textContent = title;
                description.textContent = detail;
                contents.append(heading, description);
                li.append(number, contents);

                return li;
            }));
        };

        function displayPlan(plan, isSaved = false) {
            planner.dataset.currentPlan = JSON.stringify(plan);

            result.querySelector('[data-plan="summary"]').textContent =
                `${plan.dateLabel || plan.date} · ${plan.visitors} pengunjung`;
            result.querySelector('[data-plan="departure"]').textContent =
                plan.departure || '';
            result.querySelector('[data-plan="destination-name"]').textContent =
                plan.destination || 'Pasar Terapung Lok Baintan';
            result.querySelector('[data-plan="destination-description"]').textContent =
                plan.destinationDescription || 'Ruang perdagangan di atas jukung di Sungai Martapura.';

            setList(result.querySelector('[data-plan="activities"]'), plan.activities || []);
            setList(result.querySelector('[data-plan="sequence"]'), plan.sequence || [], true);
            setList(result.querySelector('[data-plan="preparation"]'), plan.preparation || []);
            renderTimeline(plan);

            result.querySelector('[data-plan="notes-wrap"]').hidden = !plan.notes;
            result.querySelector('[data-plan="notes"]').textContent = plan.notes || '';

            const origin = encodeURIComponent(
                plan.departureQuery || plan.departure || 'Banjarmasin, Kalimantan Selatan',
            );
            const destination = encodeURIComponent(
                'Pasar Terapung Lok Baintan, Sungai Tabuk, Kabupaten Banjar, Kalimantan Selatan',
            );
            result.querySelector('[data-plan="directions"]').href =
                `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=driving`;

            form.hidden = true;
            result.hidden = false;
            planner.querySelector('[data-step-label="form"]')?.classList.remove('current');
            planner.querySelector('[data-step-label="result"]')?.classList.add('current');

            planStatus.textContent = isSaved ? 'Rencana tersimpan berhasil dibuka.' : '';
            refreshSavedEntry();

            const surface = planner.querySelector('.modal-surface');
            if (surface) surface.scrollTop = 0;
            result.scrollTop = 0;
            result.querySelector('h3')?.focus({ preventScroll: true });
        }

        const restoreSaved = () => {
            const plan = getSavedPlan();
            if (!plan) {
                refreshSavedEntry();
                return;
            }
            displayPlan(plan, true);
        };

        savedEntry?.addEventListener('click', restoreSaved);

        planner.querySelector('[data-save-plan]')?.addEventListener('click', () => {
            const plan = JSON.parse(planner.dataset.currentPlan || 'null');
            if (!plan) return;

            try {
                localStorage.setItem('lok-baintan-saved-plan', JSON.stringify(plan));
                refreshSavedEntry();
                planStatus.textContent = 'Rencana disimpan di perangkat ini.';
            } catch {
                planStatus.textContent = 'Penyimpanan browser tidak tersedia.';
            }
        });

        $$('[data-open-planner]').forEach((button) => {
            if (button.dataset.lbBound === 'true') return;
            button.dataset.lbBound = 'true';

            button.addEventListener('click', () => {
                refreshSavedEntry();

                if (getSavedPlan() && result.hidden === false) {
                    form.hidden = false;
                    result.hidden = true;
                    planner.querySelector('[data-step-label="result"]')?.classList.remove('current');
                    planner.querySelector('[data-step-label="form"]')?.classList.add('current');
                }

                openDialog(planner);
                planner.querySelector('.modal-surface')?.scrollTo({ top: 0 });
            });
        });

        planner.querySelector('[data-share-plan]')?.addEventListener('click', () => {
            const plan = JSON.parse(planner.dataset.currentPlan || 'null') || getSavedPlan();
            if (!plan) return;

            window.open(
                `https://wa.me/?text=${encodeURIComponent(buildShareText(plan))}`,
                '_blank',
                'noopener,noreferrer',
            );
        });

        planner.querySelector('[data-view-plan]')?.addEventListener('click', () => {
            result.querySelector('[data-plan="timeline"]')?.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
            });
        });

        planner.querySelector('[data-destination-detail]')?.addEventListener('click', () => {
            result.querySelector('[data-plan="destination-detail"]')?.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
            });
        });

        planner.querySelector('[data-edit-plan]')?.addEventListener('click', () => {
            const plan = JSON.parse(planner.dataset.currentPlan || 'null');

            if (plan) {
                form.elements.date.value = plan.date || '';
                form.elements.visitors.value = plan.visitors || 1;

                const departureOption = [...form.elements.departure.options].find(
                    (option) => option.dataset.query === plan.departureQuery
                        || option.textContent.trim() === (plan.departure || '').trim(),
                );

                if (departureOption) {
                    form.elements.departure.value = departureOption.value;
                }

                $$('[name="activities[]"]', form).forEach((checkbox) => {
                    checkbox.checked = (plan.activities || []).includes(checkbox.value);
                    checkbox.closest('label')?.classList.toggle('selected', checkbox.checked);
                });

                form.elements.notes.value = plan.notes || '';
            }

            result.hidden = true;
            form.hidden = false;
            planner.querySelector('[data-step-label="result"]').classList.remove('current');
            planner.querySelector('[data-step-label="form"]').classList.add('current');
            dateInput.focus();
        });

        setupBookingDemo(planner);
    }

    const activityRoot = document.querySelector('[data-activity-tabs]');
    if (activityRoot) {
        const showActivity = (index) => {
            $$('[data-activity-tab]', activityRoot).forEach((button) => {
                const active = Number(button.dataset.activityTab) === index;
                button.classList.toggle('active', active);
                button.setAttribute('aria-pressed', String(active));
            });

            $$('[data-activity-panel]', activityRoot).forEach((panel) => {
                panel.hidden = Number(panel.dataset.activityPanel) !== index;
            });
        };

        $$('[data-activity-tab]', activityRoot).forEach((button) => {
            button.addEventListener('click', () => showActivity(Number(button.dataset.activityTab)));
        });

        const requested = Number(new URLSearchParams(location.search).get('aktivitas'));
        if (requested >= 1 && requested <= 4) showActivity(requested - 1);
    }

    const galleryRoot = document.querySelector('[data-gallery]');
    if (galleryRoot) {
        const lightbox = document.querySelector('#gallery-lightbox');
        let visibleGalleryItems = [];
        let lightboxIndex = -1;

        $$('[data-gallery-filter]', galleryRoot).forEach((button) => {
            if (button.dataset.lbBound === 'true') return;
            button.dataset.lbBound = 'true';

            button.addEventListener('click', () => {
                const category = button.dataset.galleryFilter;

                $$('[data-gallery-filter]', galleryRoot).forEach((item) => {
                    const active = item === button;
                    item.classList.toggle('active', active);
                    item.setAttribute('aria-pressed', String(active));
                });

                const masonry = galleryRoot.querySelector('.masonry');

                $$('[data-gallery-item]', galleryRoot).forEach((item) => {
                    item.hidden = category === 'Video'
                        || (category !== 'Semua' && item.dataset.category !== category);
                });

                if (masonry) masonry.hidden = category === 'Video';

                const videoFeature = galleryRoot.querySelector('[data-video-feature]');
                if (videoFeature) {
                    videoFeature.hidden = category !== 'Semua' && category !== 'Video';
                }

                visibleGalleryItems = $$('[data-gallery-item]:not([hidden])', galleryRoot);
            });
        });

        if (lightbox) {
            const showLightboxItem = (item) => {
                const image = lightbox.querySelector('[data-lightbox-image]');
                if (!item || !image) return;

                image.src = item.dataset.src;
                image.alt = item.dataset.title || '';
                lightbox.querySelector('[data-lightbox-category]').textContent = item.dataset.category || '';
                lightbox.querySelector('[data-lightbox-title]').textContent = item.dataset.title || '';
                lightbox.querySelector('[data-lightbox-credit]').textContent = item.dataset.credit || '';
                lightbox.querySelector('[data-lightbox-counter]').textContent =
                    visibleGalleryItems.length
                        ? `${lightboxIndex + 1} / ${visibleGalleryItems.length}`
                        : '';
            };

            visibleGalleryItems = $$('[data-gallery-item]', galleryRoot);

            $$('[data-gallery-item]', galleryRoot).forEach((item) => {
                item.addEventListener('click', () => {
                    visibleGalleryItems = $$('[data-gallery-item]:not([hidden])', galleryRoot);
                    lightboxIndex = visibleGalleryItems.indexOf(item);
                    showLightboxItem(item);
                    openDialog(lightbox);
                });
            });

            lightbox.querySelector('[data-lightbox-prev]')?.addEventListener('click', () => {
                if (!visibleGalleryItems.length) return;
                lightboxIndex = (lightboxIndex - 1 + visibleGalleryItems.length)
                    % visibleGalleryItems.length;
                showLightboxItem(visibleGalleryItems[lightboxIndex]);
            });

            lightbox.querySelector('[data-lightbox-next]')?.addEventListener('click', () => {
                if (!visibleGalleryItems.length) return;
                lightboxIndex = (lightboxIndex + 1) % visibleGalleryItems.length;
                showLightboxItem(visibleGalleryItems[lightboxIndex]);
            });

            lightbox.addEventListener('keydown', (event) => {
                if (event.key === 'ArrowLeft') {
                    lightbox.querySelector('[data-lightbox-prev]')?.click();
                }
                if (event.key === 'ArrowRight') {
                    lightbox.querySelector('[data-lightbox-next]')?.click();
                }
            });
        }

        galleryRoot.querySelector('[data-open-video]')?.addEventListener('click', () => {
            const dialog = document.querySelector('#video-dialog');
            if (!dialog) return;
            openDialog(dialog);
            dialog.querySelector('video')?.play?.().catch(() => {});
=======

            const dateLabel = new Intl.DateTimeFormat('id-ID', { dateStyle: 'full' }).format(new Date(`${date}T12:00:00`));

            const preparation = [

                'Periksa cuaca dan kondisi akses sebelum berangkat. Aktivitas pasar mengikuti keadaan setempat.',

                'Bawa uang tunai pecahan kecil, air minum, pelindung hujan, dan tas tahan percikan.',

                'Minta izin sebelum memotret, beri ruang untuk pedagang, dan bawa kembali sampah.',

            ];

            if (visitors > 1) preparation.push('Sepakati titik berkumpul dan perhatikan kebutuhan setiap anggota rombongan.');

            if (activities.includes('Menyusuri sungai dengan jukung')) preparation.push('Jika ingin mencoba jukung, konfirmasikan kepada warga atau pendamping setempat, pastikan perlengkapan keselamatan, dan ikuti arahan pendamping.');

            if (activities.includes('Mengenal kuliner khas Banjar')) preparation.push('Tanyakan bahan makanan kepada pedagang jika memiliki alergi. Pilihan kuliner mengikuti sajian yang tersedia.');

            const sequence = ['Datang pada pagi hari setelah memeriksa cuaca dan akses terakhir ke tepian sungai.', ...activities.map((item) => `${item} dengan santun, mengikuti ritme masyarakat dan tanpa menghalangi perdagangan.`), 'Sebelum pulang, periksa barang bawaan dan bawa kembali sampahmu.'];

            const notes = String(data.get('notes') || '').trim();



            const plan = {

                date,

                dateLabel,

                visitors,

                departure: selectedDeparture.textContent,

                departureQuery: selectedDeparture.dataset.query,

                activities,

                sequence,

                preparation,

                notes,

                destination: 'Pasar Terapung Lok Baintan',

                destinationDescription: 'Ruang perdagangan di atas jukung di Sungai Martapura.',

            };

            displayPlan(plan);

            refreshSavedEntry();

        });



        const buildShareText = (plan) => [

            'Rencana Kunjungan · Lok Baintan Explorer',

            `Tanggal: ${plan.dateLabel || plan.date}`,

            `Pengunjung: ${plan.visitors} orang`,

            `Keberangkatan: ${plan.departure}`,

            `Destinasi: ${plan.destination}`,

            '',

            'Aktivitas:',

            ...plan.activities.map((activity, index) => `${index + 1}. ${activity}`),

            '',

            'Persiapan:',

            ...plan.preparation.map((item) => `• ${item}`),

            ...(plan.notes ? ['', `Catatan: ${plan.notes}`] : []),

        ].join('\n');



        const planStatus = result.querySelector('[data-plan="status"]');

        const getSavedPlan = getPlanStorage;

        const renderTimeline = (plan) => {

            const items = [

                ['Datang & orientasi', 'Konfirmasi kondisi akses dan titik berkumpul pada hari kunjungan.'],

                ...plan.activities.map((activity) => [activity, 'Ikuti ritme aktivitas dengan santun; durasi mengikuti kesepakatan lapangan.']),

                ['Kumpul & pulang', 'Periksa barang bawaan dan bawa kembali sampah pribadi.'],

            ];

            const list = result.querySelector('[data-plan="timeline"]');

            if (!list) return;

            list.replaceChildren(...items.map(([title, detail], index) => {

                const li = document.createElement('li');

                const number = document.createElement('span');

                const contents = document.createElement('div');

                const heading = document.createElement('strong');

                const description = document.createElement('p');

                number.textContent = String(index + 1).padStart(2, '0');

                heading.textContent = title;

                description.textContent = detail;

                contents.append(heading, description);

                li.append(number, contents);

                return li;

            }));

        };

        function displayPlan(plan, isSaved = false) {

            planner.dataset.currentPlan = JSON.stringify(plan);

            result.querySelector('[data-plan="summary"]').textContent = `${plan.dateLabel || plan.date} · ${plan.visitors} pengunjung`;

            result.querySelector('[data-plan="departure"]').textContent = plan.departure || '';

            result.querySelector('[data-plan="destination-name"]').textContent = plan.destination || 'Pasar Terapung Lok Baintan';

            result.querySelector('[data-plan="destination-description"]').textContent = plan.destinationDescription || 'Ruang perdagangan di atas jukung di Sungai Martapura.';

            setList(result.querySelector('[data-plan="activities"]'), plan.activities || []);

            setList(result.querySelector('[data-plan="sequence"]'), plan.sequence || [], true);

            setList(result.querySelector('[data-plan="preparation"]'), plan.preparation || []);

            renderTimeline(plan);

            result.querySelector('[data-plan="notes-wrap"]').hidden = !plan.notes;

            result.querySelector('[data-plan="notes"]').textContent = plan.notes || '';

            const origin = encodeURIComponent(plan.departureQuery || plan.departure || 'Banjarmasin, Kalimantan Selatan');

            const destination = encodeURIComponent('Pasar Terapung Lok Baintan, Sungai Tabuk, Kabupaten Banjar, Kalimantan Selatan');

            result.querySelector('[data-plan="directions"]').href = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=driving`;

            form.hidden = true;

            result.hidden = false;

            planner.querySelector('[data-step-label="form"]')?.classList.remove('current');

            planner.querySelector('[data-step-label="result"]')?.classList.add('current');

            planStatus.textContent = isSaved ? 'Rencana tersimpan berhasil dibuka.' : '';

            refreshSavedEntry();

            const surface = planner.querySelector('.modal-surface');

            if (surface) surface.scrollTop = 0;

            result.scrollTop = 0;

            result.querySelector('h3')?.focus({ preventScroll: true });

        }

        const restoreSaved = () => {

            const plan = getSavedPlan();

            if (!plan) { refreshSavedEntry(); return; }

            displayPlan(plan, true);

        };

        savedEntry?.addEventListener('click', restoreSaved);

        planner.querySelector('[data-save-plan]')?.addEventListener('click', () => {

            const plan = JSON.parse(planner.dataset.currentPlan || 'null');

            if (!plan) return;

            try {

                localStorage.setItem('lok-baintan-saved-plan', JSON.stringify(plan));

                refreshSavedEntry();

                planStatus.textContent = 'Rencana disimpan di perangkat ini.';

            } catch { planStatus.textContent = 'Penyimpanan browser tidak tersedia.'; }

        });

        $$('[data-open-planner]').forEach((button) => {

            if (button.dataset.lbBound === 'true') return;

            button.dataset.lbBound = 'true';

            button.addEventListener('click', () => {

                refreshSavedEntry();

                if (getSavedPlan() && result.hidden === false) {

                    form.hidden = false;

                    result.hidden = true;

                    planner.querySelector('[data-step-label="result"]')?.classList.remove('current');

                    planner.querySelector('[data-step-label="form"]')?.classList.add('current');

                }

                openDialog(planner);

                planner.querySelector('.modal-surface')?.scrollTo({ top: 0 });

            });

        });

        planner.querySelector('[data-share-plan]')?.addEventListener('click', () => {

            const plan = JSON.parse(planner.dataset.currentPlan || 'null') || getSavedPlan();

            if (!plan) return;

            window.open(`https://wa.me/?text=${encodeURIComponent(buildShareText(plan))}`, '_blank', 'noopener,noreferrer');

        });

        planner.querySelector('[data-view-plan]')?.addEventListener('click', () => {

            result.querySelector('[data-plan="timeline"]')?.scrollIntoView({ behavior: 'smooth', block: 'start' });

        });

        planner.querySelector('[data-destination-detail]')?.addEventListener('click', () => {

            result.querySelector('[data-plan="destination-detail"]')?.scrollIntoView({ behavior: 'smooth', block: 'center' });

        });



        planner.querySelector('[data-edit-plan]')?.addEventListener('click', () => {

            const plan = JSON.parse(planner.dataset.currentPlan || 'null');

            if (plan) {

                form.elements.date.value = plan.date || '';

                form.elements.visitors.value = plan.visitors || 1;

                const departureOption = [...form.elements.departure.options].find(o => o.dataset.query === plan.departureQuery || o.textContent.trim() === (plan.departure || '').trim());

                if (departureOption) form.elements.departure.value = departureOption.value;

                $$('[name="activities[]"]', form).forEach(cb => {

                    cb.checked = (plan.activities || []).includes(cb.value);

                    cb.closest('label')?.classList.toggle('selected', cb.checked);

                });

                form.elements.notes.value = plan.notes || '';

            }

            result.hidden = true; form.hidden = false;

            planner.querySelector('[data-step-label="result"]').classList.remove('current');

            planner.querySelector('[data-step-label="form"]').classList.add('current');

            dateInput.focus();

>>>>>>> 78755cc (Pengembangan fitur komentar dan halaman tim pengembang)
        });

    }
<<<<<<< HEAD

    $$('[data-faq-toggle]').forEach((button) => {
        button.addEventListener('click', () => {
            const article = button.closest('article');
            const open = !article.classList.contains('open');

            article.classList.toggle('open', open);
            button.setAttribute('aria-expanded', String(open));
            document.getElementById(button.getAttribute('aria-controls')).hidden = !open;
        });
    });

    const mapRoot = document.querySelector('[data-map-section]');
    if (mapRoot) {
        const destinations = JSON.parse(mapRoot.dataset.destinations);
        const select = document.querySelector('[data-destination-select]');
        const frame = mapRoot.querySelector('[data-map-frame]');
        const fallback = mapRoot.querySelector('[data-map-fallback]');

        const updateMap = () => {
            const destination = destinations.find((item) => item.id === select.value)
                || destinations[0];
            const query = encodeURIComponent(destination.query);
            const search = `https://www.google.com/maps/search/?api=1&query=${query}`;

            frame.hidden = false;
            fallback.hidden = true;
            frame.title = `Peta Google Maps ${destination.name}`;
            frame.src = `https://maps.google.com/maps?q=${query}&z=14&output=embed&hl=id`;

            mapRoot.querySelector('[data-destination-name]').textContent = destination.name;
            mapRoot.querySelector('[data-destination-description]').textContent = destination.description;
            mapRoot.querySelector('[data-map-link]').href = search;
            mapRoot.querySelector('[data-fallback-link]').href = search;
            mapRoot.querySelector('[data-fallback-name]').textContent = destination.name;
            mapRoot.querySelector('[data-caption-name]').textContent = destination.name;
            mapRoot.querySelector('[data-caption-area]').textContent = destination.area;
            mapRoot.querySelector('[data-map-status]').textContent =
                'Memuat peta Google Maps… Jika peta kosong atau diblokir peramban, buka lokasi melalui tautan di atas.';
        };

        select.addEventListener('change', updateMap);

        frame.addEventListener('load', () => {
            mapRoot.querySelector('[data-map-status]').textContent =
                'Peta disediakan oleh Google Maps. Jika peta kosong atau diblokir peramban, buka lokasi melalui tautan di atas.';
        });

        mapRoot.querySelector('[data-map-retry]').addEventListener('click', (event) => {
            if (!fallback.hidden) {
                updateMap();
                event.currentTarget.textContent = 'Peta tidak tampil?';
            } else {
                frame.hidden = true;
                fallback.hidden = false;
                mapRoot.querySelector('[data-map-status]').textContent =
                    'Peta tidak dapat dimuat. Gunakan tautan Google Maps di atas.';
                event.currentTarget.textContent = 'Coba muat ulang peta';
            }
        });
    }
}

=======



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

        let visibleGalleryItems = [];

        let lightboxIndex = -1;

        $$('[data-gallery-filter]', galleryRoot).forEach((button) => {

            if (button.dataset.lbBound === 'true') return;

            button.dataset.lbBound = 'true';

            button.addEventListener('click', () => {

                const category = button.dataset.galleryFilter;

                $$('[data-gallery-filter]', galleryRoot).forEach((item) => {

                    const active = item === button;

                    item.classList.toggle('active', active);

                    item.setAttribute('aria-pressed', String(active));

                });

                const masonry = galleryRoot.querySelector('.masonry');

                $$('[data-gallery-item]', galleryRoot).forEach((item) => {

                    item.hidden = category === 'Video' || (category !== 'Semua' && item.dataset.category !== category);

                });

                if (masonry) masonry.hidden = category === 'Video';

                const videoFeature = galleryRoot.querySelector('[data-video-feature]');

                if (videoFeature) videoFeature.hidden = category !== 'Semua' && category !== 'Video';

                visibleGalleryItems = $$('[data-gallery-item]:not([hidden])', galleryRoot);

            });

        });

        if (lightbox) {

            const showLightboxItem = (item) => {

                const image = lightbox.querySelector('[data-lightbox-image]');

                if (!item || !image) return;

                image.src = item.dataset.src;

                image.alt = item.dataset.title || '';

                lightbox.querySelector('[data-lightbox-category]').textContent = item.dataset.category || '';

                lightbox.querySelector('[data-lightbox-title]').textContent = item.dataset.title || '';

                lightbox.querySelector('[data-lightbox-credit]').textContent = item.dataset.credit || '';

                lightbox.querySelector('[data-lightbox-counter]').textContent = visibleGalleryItems.length ? `${lightboxIndex + 1} / ${visibleGalleryItems.length}` : '';

            };

            visibleGalleryItems = $$('[data-gallery-item]', galleryRoot);

            $$('[data-gallery-item]', galleryRoot).forEach((item) => item.addEventListener('click', () => {

                visibleGalleryItems = $$('[data-gallery-item]:not([hidden])', galleryRoot);

                lightboxIndex = visibleGalleryItems.indexOf(item);

                showLightboxItem(item);

                openDialog(lightbox);

            }));

            lightbox.querySelector('[data-lightbox-prev]')?.addEventListener('click', () => {

                if (!visibleGalleryItems.length) return;

                lightboxIndex = (lightboxIndex - 1 + visibleGalleryItems.length) % visibleGalleryItems.length;

                showLightboxItem(visibleGalleryItems[lightboxIndex]);

            });

            lightbox.querySelector('[data-lightbox-next]')?.addEventListener('click', () => {

                if (!visibleGalleryItems.length) return;

                lightboxIndex = (lightboxIndex + 1) % visibleGalleryItems.length;

                showLightboxItem(visibleGalleryItems[lightboxIndex]);

            });

            lightbox.addEventListener('keydown', (event) => {

                if (event.key === 'ArrowLeft') lightbox.querySelector('[data-lightbox-prev]')?.click();

                if (event.key === 'ArrowRight') lightbox.querySelector('[data-lightbox-next]')?.click();

            });

        }

        galleryRoot.querySelector('[data-open-video]')?.addEventListener('click', () => {

            const dialog = document.querySelector('#video-dialog');

            if (!dialog) return;

            openDialog(dialog);

            dialog.querySelector('video')?.play?.().catch(() => { });

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



}



// One audio element lives outside .app so internal navigation never replaces it.

>>>>>>> 78755cc (Pengembangan fitur komentar dan halaman tim pengembang)
const musicWidget = document.querySelector('[data-lb-music-player]');

if (musicWidget) {

    const audio = musicWidget.querySelector('[data-lb-music-audio]');

    const button = musicWidget.querySelector('[data-lb-music-toggle]');

    const feedback = musicWidget.querySelector('[data-lb-music-feedback]');

    const message = (text) => {

        if (!feedback) return;

        feedback.textContent = text;

        feedback.hidden = !text;

    };

    const sync = () => {

        if (!audio || !button) return;

        const playing = !audio.paused && !audio.ended;

        button.classList.toggle('is-playing', playing);

        button.setAttribute('aria-pressed', String(playing));
<<<<<<< HEAD
        button.setAttribute(
            'aria-label',
            playing ? 'Matikan musik Banjar' : 'Putar musik Banjar',
        );
=======

        button.setAttribute('aria-label', playing ? 'Matikan musik Banjar' : 'Putar musik Banjar');

>>>>>>> 78755cc (Pengembangan fitur komentar dan halaman tim pengembang)
        button.title = playing ? 'Matikan musik Banjar' : 'Putar musik Banjar';

    };

    if (audio && button) {

        audio.volume = 0.42;

        audio.preload = 'metadata';

<<<<<<< HEAD
        audio.addEventListener('playing', () => {
            sync();
            message('');
        });
=======
        audio.addEventListener('playing', () => { sync(); message(''); });

>>>>>>> 78755cc (Pengembangan fitur komentar dan halaman tim pengembang)
        audio.addEventListener('play', sync);

        audio.addEventListener('pause', sync);

        audio.addEventListener('ended', sync);

        audio.addEventListener('error', () => {

            sync();

            const code = audio.error?.code;
<<<<<<< HEAD
            message(code === 4
                ? 'File musik tidak ditemukan atau format tidak didukung.'
                : 'Gagal memuat audio. Periksa berkas MP3.');
=======

            message(code === 4 ? 'File musik tidak ditemukan atau format tidak didukung.' : 'Gagal memuat audio. Periksa berkas MP3.');

>>>>>>> 78755cc (Pengembangan fitur komentar dan halaman tim pengembang)
        });

        if (button.dataset.lbBound !== 'true') {

            button.dataset.lbBound = 'true';

            button.addEventListener('click', async () => {
<<<<<<< HEAD
                if (!audio.paused) {
                    audio.pause();
                    sync();
                    localStorage.setItem('lok-baintan-music', 'paused');
                    message('');
                    return;
                }
=======

                if (!audio.paused) { audio.pause(); sync(); localStorage.setItem('lok-baintan-music', 'paused'); message(''); return; }
>>>>>>> 78755cc (Pengembangan fitur komentar dan halaman tim pengembang)

                message('');

                try {
<<<<<<< HEAD
                    if (audio.error) audio.load();
                    await audio.play();
                    sync();
                    localStorage.setItem('lok-baintan-music', 'playing');
                } catch (error) {
                    console.error('[Lok Baintan] Musik gagal:', error);
                    sync();
                    message(audio.error
                        ? 'Periksa file /audio/panting-banjar.mp3.'
                        : 'Audio diblokir browser atau file tidak dapat diputar.');
                }
=======

                    // Playing is triggered only by a direct user gesture, never autoplay.

                    if (audio.error) audio.load();

                    await audio.play();

                    sync();

                    localStorage.setItem('lok-baintan-music', 'playing');

                } catch (error) {

                    console.error('[Lok Baintan] Musik gagal:', error);

                    sync();

                    message(audio.error ? 'Periksa file /audio/panting-banjar.mp3.' : 'Audio diblokir browser atau file tidak dapat diputar.');

                }

>>>>>>> 78755cc (Pengembangan fitur komentar dan halaman tim pengembang)
            });

        }

        sync();

    }

}

<<<<<<< HEAD
try {
    initializePage();
} catch (error) {
    console.error('[Lok Baintan] Inisialisasi gagal:', error);
}

// Navigasi internal mempertahankan pemutar musik saat halaman berganti.
=======


// Rebind only the replaced page DOM; preserve the music element and audio state.

try { initializePage(); } catch (error) { console.error('[Lok Baintan] Inisialisasi gagal:', error); }



// Internal link navigation without a hard reload preserves the audio playback.

// On a failed request, ordinary navigation remains the fallback.

>>>>>>> 78755cc (Pengembangan fitur komentar dan halaman tim pengembang)
{

    const pageSelectors = ['.header', '.page-content', 'footer', '#travel-planner'];

    let request = null;

    let navigating = false;

    async function navigate(url, fromHistory = false) {

        request?.abort();

        const controller = new AbortController();

        request = controller;

        navigating = true;

        try {

            const response = await fetch(url, {

                signal: controller.signal,

                headers: { 'X-Requested-With': 'LokBaintanNavigation' },

                credentials: 'same-origin',

            });

            if (!response.ok || !(response.headers.get('content-type') || '').includes('text/html')) {

                throw new Error('Halaman tidak tersedia');

            }

            const next = new DOMParser().parseFromString(await response.text(), 'text/html');
<<<<<<< HEAD
            const replacements = pageSelectors.map((selector) => [
                document.querySelector(selector),
                next.querySelector(selector),
            ]);

            if (replacements.some(([oldNode, newNode]) => !oldNode || !newNode)) {
                throw new Error('Struktur halaman berbeda');
            }
=======

            const replacements = pageSelectors.map(selector => [document.querySelector(selector), next.querySelector(selector)]);

            if (replacements.some(([oldNode, newNode]) => !oldNode || !newNode)) throw new Error('Struktur halaman berbeda');
>>>>>>> 78755cc (Pengembangan fitur komentar dan halaman tim pengembang)

            if (controller.signal.aborted) return;

            document.querySelectorAll('dialog[open]').forEach(closeDialog);
<<<<<<< HEAD
            replacements.forEach(([oldNode, newNode]) => {
                oldNode.replaceWith(document.importNode(newNode, true));
            });

            document.title = next.title;

            if (!fromHistory) {
                history.pushState({ lokBaintan: true }, '', url);
            }
=======

            replacements.forEach(([oldNode, newNode]) => oldNode.replaceWith(document.importNode(newNode, true)));

            document.title = next.title;

            if (!fromHistory) history.pushState({ lokBaintan: true }, '', url);
>>>>>>> 78755cc (Pengembangan fitur komentar dan halaman tim pengembang)

            document.body.style.overflow = '';

            initializePage();

            const hash = new URL(url, location.href).hash;

            if (hash) {

                const target = document.getElementById(decodeURIComponent(hash.substring(1)));

                if (target) target.scrollIntoView({ block: 'start', behavior: 'instant' });

                else window.scrollTo(0, 0);
<<<<<<< HEAD
            } else {
                window.scrollTo(0, 0);
            }
=======

            } else window.scrollTo(0, 0);

>>>>>>> 78755cc (Pengembangan fitur komentar dan halaman tim pengembang)
        } catch (error) {

            if (error.name !== 'AbortError') {

                console.warn('[Lok Baintan] Navigasi biasa:', error.message);

                window.location.assign(url);

            }

        } finally {

            if (request === controller) request = null;

            navigating = false;

        }

    }

    if (document.documentElement.dataset.lbSpaBound !== 'true') {

        document.documentElement.dataset.lbSpaBound = 'true';

<<<<<<< HEAD
        document.addEventListener('click', (event) => {
            if (
                event.defaultPrevented || event.button !== 0
                || event.metaKey || event.ctrlKey || event.altKey || event.shiftKey
            ) return;

            const link = event.target.closest?.('a[href]');

            if (
                !link || link.hasAttribute('download')
                || link.dataset.noSpa !== undefined
                || (link.target && link.target !== '_self')
            ) return;

            const target = new URL(link.href, location.href);

            if (
                target.origin !== location.origin
                || !['http:', 'https:'].includes(target.protocol)
            ) return;

            if (target.pathname === location.pathname && target.search === location.search) return;
            if (/\.(?:pdf|zip|png|jpg|jpeg|webp|mp3|mp4)$/i.test(target.pathname)) return;

            event.preventDefault();
=======
        document.addEventListener('click', event => {

            if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;

            const link = event.target.closest?.('a[href]');

            if (!link || link.hasAttribute('download') || link.dataset.noSpa !== undefined || (link.target && link.target !== '_self')) return;

            const target = new URL(link.href, location.href);

            if (target.origin !== location.origin || !['http:', 'https:'].includes(target.protocol)) return;

            if (target.pathname === location.pathname && target.search === location.search) return;

            if (/\.(?:pdf|zip|png|jpg|jpeg|webp|mp3|mp4)$/i.test(target.pathname)) return;

            event.preventDefault();

>>>>>>> 78755cc (Pengembangan fitur komentar dan halaman tim pengembang)
            if (!navigating) navigate(target.href);

        });

        window.addEventListener('popstate', () => navigate(location.href, true));

    }
<<<<<<< HEAD
}
=======

}
>>>>>>> 78755cc (Pengembangan fitur komentar dan halaman tim pengembang)
