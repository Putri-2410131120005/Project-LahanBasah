import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';

const PACKAGES = [
    {
        id: 'siring',
        title: 'Paket Kelotok dari Siring',
        destination: 'Pasar Terapung Lok Baintan',
        meeting: 'Dermaga Siring, Banjarmasin',
        time: '05.30 WITA',
        price: 450000,
        capacity: 15,
    },
    {
        id: 'dermaga-lokal',
        title: 'Paket Kelotok dari Dermaga Lokal',
        destination: 'Pasar Terapung Lok Baintan',
        meeting: 'Dermaga Lok Baintan',
        time: '06.00 WITA',
        price: 250000,
        capacity: 8,
    },
    {
        id: 'martapura',
        title: 'Paket Susur Sungai Martapura',
        destination: 'Sungai Martapura',
        meeting: 'Dermaga Siring, Banjarmasin',
        time: '07.00 WITA',
        price: 50000,
        capacity: null,
    },
];

const PAYMENT_METHODS = [
    { id: 'qris', label: 'QRIS', confirm: 'Simulasikan Pembayaran QRIS' },
    { id: 'dana', label: 'DANA', confirm: 'Bayar dengan DANA (Demo)' },
    {
        id: 'bsi',
        label: 'BSI Virtual Account',
        confirm: 'Simulasikan Transfer BSI',
        account: 'DEMO-BSI-001',
    },
    {
        id: 'bri',
        label: 'BRIVA',
        confirm: 'Simulasikan Transfer BRI',
        account: 'DEMO-BRIVA-001',
    },
];

const rupiah = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
});

const money = (amount) => rupiah.format(amount);
const unit = (item) => item.capacity ? 'per perahu' : 'per orang';
const findPackage = (id) => PACKAGES.find((item) => item.id === id);

const QR_DEMO = `
    <svg viewBox="0 0 120 120" width="150" role="img"
        aria-label="Ilustrasi kode QRIS demo" class="lb-payment-qr">
        <rect width="120" height="120" fill="#fff"/>
        <path fill="#173e34" d="M8 8h30v30H8z M82 8h30v30H82z
            M8 82h30v30H8z M48 8h14v14H48z M65 24h11v18H65z
            M46 37h15v13H46z M88 46h24v16H88z M10 48h24v11H10z
            M85 78h13v15H85z M102 94h10v18h-10z
            M49 86h17v26H49z M70 97h19v13H70z"/>
        <path fill="#fff" d="M14 14h18v18H14z M88 14h18v18H88z
            M14 88h18v18H14z"/>
        <rect x="14" y="48" width="92" height="26" rx="5" fill="#e6ecdf"/>
        <text x="60" y="66" font-size="15" font-family="sans-serif"
            font-weight="bold" text-anchor="middle" fill="#173e34">DEMO</text>
    </svg>
`;

const ICONS = {
    owner: '<circle cx="12" cy="7" r="3"/><path d="M5 21v-2a7 7 0 0 1 14 0v2z"/>',
    schedule: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4m8-4v4M3 10h18"/>',
    destination: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/>',
    meeting: '<path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
    code: '<path d="m3 11 8-8h8l2 2v8l-8 8-3-3a2 2 0 0 0-3-3z"/>',
    method: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18m-14 5h4"/>',
    total: '<circle cx="12" cy="12" r="9"/><path d="M9 9h6m-6 6h6"/>',
};

function ticketRow(field, label) {
    return `<p>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
            stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"
            aria-hidden="true">${ICONS[field]}</svg>
        <span><strong>${label}:</strong> <span data-ticket="${field}"></span></span>
    </p>`;
}

function calculatePrice(item, visitors) {
    const quantity = item.capacity
        ? Math.ceil(visitors / item.capacity)
        : visitors;

    return {
        quantityLabel: `${quantity} ${item.capacity ? 'perahu' : 'orang'}`,
        total: quantity * item.price,
    };
}

function makeTicketCode() {
    const random = crypto.getRandomValues(new Uint32Array(2));
    const suffix = Array.from(random, (value) =>
        value.toString(16).padStart(8, '0'),
    ).join('').toUpperCase();

    return `LB-DEMO-${suffix}`;
}

function installStyles() {
    if (document.getElementById('lb-booking-styles')) return;

    const style = document.createElement('style');
    style.id = 'lb-booking-styles';
    style.textContent = `
        #travel-planner [data-booking-screen][hidden],
        #travel-planner [data-booking-quote][hidden],
        #travel-planner [data-booking-summary][hidden],
        #travel-planner [data-payment-details][hidden],
        #travel-planner [data-download-status][hidden] {
            display: none !important;
        }

        #travel-planner .lb-booking-steps {
            flex-wrap: wrap;
            gap: 8px 20px;
        }

        .lb-package-catalog {
            max-width: 1120px;
            margin: 26px auto;
            padding: 0 16px;
            color: #173e34;
        }

        .lb-package-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(min(100%, 220px), 1fr));
            gap: 12px;
            margin-top: 12px;
        }

        .lb-package-card,
        #travel-planner .lb-booking-panel {
            padding: 16px;
            border: 1px solid #aec0a8;
            border-radius: 12px;
            background: #faf7ef;
            color: #173e34;
        }

        .lb-package-card > :first-child,
        #travel-planner .lb-booking-panel > :first-child {
            margin-top: 0;
        }

        .lb-package-card p,
        #travel-planner .lb-booking-panel p {
            margin: 6px 0;
            overflow-wrap: anywhere;
        }

        #travel-planner .lb-booking-panel {
            margin: 18px 0;
        }

        #travel-planner .lb-booking-panel select {
            display: block;
            width: 100%;
            margin: 7px 0;
            padding: 10px;
            border: 1px solid #aec0a8;
            border-radius: 8px;
            background: #fff;
            color: #173e34;
            font: inherit;
        }

        #travel-planner .lb-booking-total {
            padding-top: 8px;
            border-top: 1px solid #d3bb89;
        }

        #travel-planner .lb-payment-methods {
            display: grid;
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 8px;
            margin: 12px 0;
        }

        #travel-planner .lb-payment-methods .button {
            min-width: 0;
            white-space: normal;
            text-align: center;
        }

        #travel-planner .lb-payment-details {
            margin-top: 14px;
            padding: 13px;
            border: 1px solid #d7dfcd;
            border-radius: 9px;
            background: #f1f4ea;
        }

        #travel-planner .lb-payment-details h4 {
            margin-top: 0;
        }

        #travel-planner .lb-payment-qr {
            display: block;
            max-width: 100%;
            margin: 10px auto;
        }

        #travel-planner [data-payment-confirm]:disabled,
        #travel-planner .lb-ticket-download:disabled {
            opacity: 0.55;
            cursor: not-allowed;
        }

        #travel-planner .lb-ticket {
            display: grid;
            gap: 12px;
            color: #173e34;
        }

        #travel-planner .lb-ticket-image {
            --ticket-background: #f8f6ee;
            display: grid;
            gap: 12px;
            padding: 10px;
            background: var(--ticket-background);
        }

        #travel-planner .lb-ticket-confirmed {
            margin: 0;
            padding: 12px 16px;
            border-radius: 10px;
            background: #dbe7cd;
            color: #173e34;
            font-weight: 700;
        }

        #travel-planner .lb-ticket-card {
            position: relative;
            min-width: 0;
            padding: 18px 24px;
            border: 1px solid #aec0a8;
            border-radius: 12px;
            background: #faf7ef;
            overflow-wrap: anywhere;
        }

        #travel-planner .lb-ticket-card::before,
        #travel-planner .lb-ticket-card::after {
            position: absolute;
            top: 50%;
            width: 22px;
            height: 22px;
            border: 1px solid #aec0a8;
            border-radius: 50%;
            background: var(--ticket-background);
            content: '';
        }

        #travel-planner .lb-ticket-card::before {
            left: -1px;
            transform: translate(-50%, -50%);
            clip-path: inset(0 0 0 50%);
        }

        #travel-planner .lb-ticket-card::after {
            right: -1px;
            transform: translate(50%, -50%);
            clip-path: inset(0 50% 0 0);
        }

        #travel-planner .lb-ticket-title {
            padding-left: 14px;
            border-left: 3px solid #b69456;
        }

        #travel-planner .lb-ticket-title h3 {
            margin: 0;
            color: #173e34;
            font: 700 clamp(21px, 4vw, 28px)/1.2 Georgia, serif;
        }

        #travel-planner .lb-ticket-title p {
            margin: 4px 0 0;
            color: #556955;
        }

        #travel-planner .lb-ticket-rows {
            margin-top: 13px;
            padding-top: 13px;
            border-top: 1px solid #d3bb89;
        }

        #travel-planner .lb-ticket-rows p {
            display: flex;
            align-items: flex-start;
            gap: 9px;
            margin: 0 0 8px;
            color: #556955;
            font-size: 13px;
        }

        #travel-planner .lb-ticket-rows strong {
            color: #173e34;
        }

        #travel-planner .lb-ticket-rows svg {
            flex: 0 0 18px;
            width: 18px;
            height: 18px;
        }

        #travel-planner .lb-ticket-caption {
            margin: 0;
            color: #556955;
            font-size: 12px;
        }

        #travel-planner .lb-ticket-download {
            width: 100%;
            min-height: 45px;
            padding: 10px 16px;
            border: 1px solid #aec0a8;
            border-radius: 10px;
            background: #e2e8d7;
            color: #173e34;
            font-weight: 700;
            cursor: pointer;
        }

        #travel-planner .lb-ticket-download:hover {
            background: #d5e2cb;
        }

        @media (max-width: 480px) {
            #travel-planner .lb-ticket-card {
                padding: 16px 18px;
            }
        }
    `;

    document.head.append(style);
}

function showPackageCatalog() {
    const activity = document.querySelector('[data-activity-tabs]');
    if (!activity || document.querySelector('[data-lb-package-catalog]')) return;

    const catalog = document.createElement('section');
    catalog.className = 'lb-package-catalog';
    catalog.dataset.lbPackageCatalog = '';
    catalog.innerHTML = `
        <h2>Pilihan Paket dan Harga</h2>
        <p>Bandingkan tujuan, titik kumpul, dan harga simulasi setiap paket.</p>
        <div class="lb-package-grid"></div>
    `;

    const grid = catalog.querySelector('.lb-package-grid');

    for (const item of PACKAGES) {
        const card = document.createElement('article');
        card.className = 'lb-package-card';

        const title = document.createElement('h3');
        title.textContent = item.title;
        card.append(title);

        const infos = [
            `Tujuan: ${item.destination}`,
            `Titik kumpul: ${item.meeting}`,
            `Jadwal contoh: ${item.time}`,
            `Harga simulasi: ${money(item.price)} ${unit(item)}`,
        ];

        for (const info of infos) {
            const paragraph = document.createElement('p');
            paragraph.textContent = info;
            card.append(paragraph);
        }

        grid.append(card);
    }

    (activity.closest('section') || activity).after(catalog);
}

function writeFields(root, attribute, values) {
    for (const [key, value] of Object.entries(values)) {
        const element = root.querySelector(`[${attribute}="${key}"]`);
        if (element) element.textContent = value;
    }
}

async function saveTicketPdf(card, code) {
    await document.fonts?.ready;

    const { width, height } = card.getBoundingClientRect();
    if (!width || !height) throw new Error('Kartu tiket belum terlihat.');

    const image = await toPng(card, {
        backgroundColor: '#f8f6ee',
        pixelRatio: 3,
        skipFonts: true,
    });

    const pdf = new jsPDF({
        orientation: width >= height ? 'landscape' : 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true,
    });

    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const margin = 15;

    const scale = Math.min(
        (pageWidth - margin * 2) / width,
        (pageHeight - margin * 2) / height,
    );

    const imageWidth = width * scale;
    const imageHeight = height * scale;

    pdf.addImage(
        image,
        'PNG',
        (pageWidth - imageWidth) / 2,
        (pageHeight - imageHeight) / 2,
        imageWidth,
        imageHeight,
    );

    pdf.save(`Tiket-Lok-Baintan-${code}.pdf`);
}

export function setupBookingDemo(planner) {
    installStyles();
    showPackageCatalog();

    if (!planner || planner.dataset.bookingDemoBound) return;

    const form = planner.querySelector('#planner-form');
    const result = planner.querySelector('#plan-result');
    const steps = planner.querySelector('.planner-steps');
    const actions = result?.querySelector('.result-actions');
    const grid = form?.querySelector('.form-grid');
    const surface = planner.querySelector('.modal-surface');

    if (!form || !result || !steps || !actions || !grid || !surface) return;
    planner.dataset.bookingDemoBound = 'true';

    const heading = planner.querySelector('.planner-heading > p');
    if (heading) {
        heading.textContent =
            'Pilih paket dan cek harga simulasi sebelum membuat rencana perjalanan.';
    }

    steps.classList.add('lb-booking-steps');
    steps.insertAdjacentHTML('beforeend', `
        <span data-step-label="payment">03 · Pembayaran</span>
        <span data-step-label="ticket">04 · Tiket digital</span>
    `);

    grid.insertAdjacentHTML('afterbegin', `
        <label class="departure-field">
            Nama pemesan
            <input name="bookingName" type="text" required maxlength="80"
                autocomplete="name" placeholder="Masukkan nama lengkap"
                aria-describedby="lb-name-error">
            <span class="field-error" id="lb-name-error" role="alert"></span>
        </label>
    `);

    grid.insertAdjacentHTML('afterend', `
        <section class="lb-booking-panel" aria-labelledby="lb-package-title">
            <h4 id="lb-package-title">Paket dan Harga</h4>

            <label for="lb-booking-package">
                Pilih paket berdasarkan tujuan dan titik kumpul
            </label>
            <select id="lb-booking-package" name="bookingPackage" required
                aria-describedby="lb-package-error">
                <option value="">Pilih paket perjalanan</option>
            </select>
            <p class="field-error" id="lb-package-error" role="alert"></p>

            <div data-booking-quote hidden aria-live="polite">
                <p><strong>Tujuan:</strong> <span data-quote="destination"></span></p>
                <p><strong>Titik kumpul:</strong> <span data-quote="meeting"></span></p>
                <p><strong>Jadwal contoh:</strong> <span data-quote="time"></span></p>
                <p><strong>Harga simulasi:</strong> <span data-quote="price"></span></p>
                <p data-quote="calculation"></p>
                <p class="lb-booking-total">
                    <strong>Total simulasi:</strong> <strong data-quote="total"></strong>
                </p>
            </div>
        </section>
    `);

    actions.insertAdjacentHTML('beforebegin', `
        <section class="lb-booking-panel" data-booking-summary hidden>
            <h4>Ringkasan Paket</h4>
            <p><strong>Paket:</strong> <span data-summary="title"></span></p>
            <p><strong>Tujuan:</strong> <span data-summary="destination"></span></p>
            <p><strong>Titik kumpul:</strong> <span data-summary="meeting"></span></p>
            <p><strong>Jadwal contoh:</strong> <span data-summary="schedule"></span></p>
            <p><strong>Perhitungan:</strong> <span data-summary="calculation"></span></p>
            <p class="lb-booking-total">
                <strong>Total simulasi:</strong> <strong data-summary="total"></strong>
            </p>
        </section>
        <p class="field-error" data-booking-error role="alert"></p>
    `);

    actions.insertAdjacentHTML('beforeend', `
        <button type="button" class="button primary" data-booking-start
            style="grid-column: 1 / -1">
            Lanjut ke Pembayaran
        </button>
    `);

    result.insertAdjacentHTML('afterend', `
        <section class="plan-result" data-booking-screen="payment" hidden>
            <div class="plan-result-top">
                <span>SIMULASI PEMBAYARAN</span>
                <h3 tabindex="-1">Pembayaran kunjungan</h3>
                <p data-payment-summary></p>
            </div>

            <div class="lb-booking-panel">
                <h4>Total biaya simulasi</h4>
                <p><strong data-payment-total></strong></p>
                <p class="planner-notice">Menunggu pembayaran</p>
            </div>

            <section class="lb-booking-panel" aria-labelledby="lb-payment-method-title">
                <h4 id="lb-payment-method-title">Pilih Metode Pembayaran</h4>

                <div class="lb-payment-methods" role="group"
                    aria-label="Metode pembayaran simulasi">
                    ${PAYMENT_METHODS.map((method) => `
                        <button type="button" class="button planner-outline"
                            data-payment-method="${method.id}" aria-pressed="false">
                            ${method.label}
                        </button>
                    `).join('')}
                </div>

                <div class="lb-payment-details" data-payment-details hidden>
                    <h4 data-payment-method-name></h4>
                    <p data-payment-method-amount></p>
                    <div data-payment-instructions></div>
                </div>

                <p class="lb-ticket-caption" data-payment-feedback role="status"></p>
            </section>

            <div class="result-actions">
                <button type="button" class="button planner-outline" data-booking-back>
                    Kembali ke Rencana
                </button>
                <button type="button" class="button primary" data-payment-confirm disabled>
                    Simulasikan Pembayaran Berhasil
                </button>
            </div>
        </section>

        <section class="plan-result" data-booking-screen="ticket" hidden>
            <div class="lb-ticket">
                <div class="lb-ticket-image" data-ticket-image>
                    <p class="lb-ticket-confirmed">✓ Pembayaran terkonfirmasi</p>

                    <div class="lb-ticket-card">
                        <div class="lb-ticket-title">
                            <h3 tabindex="-1" data-ticket="title"></h3>
                            <p data-ticket="group"></p>
                        </div>

                        <div class="lb-ticket-rows">
                            ${ticketRow('owner', 'Nama pemesan')}
                            ${ticketRow('schedule', 'Jadwal kunjungan')}
                            ${ticketRow('destination', 'Tujuan')}
                            ${ticketRow('meeting', 'Titik kumpul')}
                            ${ticketRow('code', 'Kode tiket')}
                            ${ticketRow('method', 'Metode pembayaran')}
                            ${ticketRow('total', 'Total simulasi')}
                        </div>
                    </div>

                    <p class="lb-ticket-caption">Tiket demo · Lok Baintan Explorer</p>
                </div>

                <button type="button" class="lb-ticket-download" data-booking-download>
                    Unduh Tiket PDF
                </button>
                <p class="lb-ticket-caption" data-download-status role="status" hidden></p>

                <button type="button" class="button planner-outline" data-booking-back>
                    Kembali ke Rencana
                </button>
            </div>
        </section>
    `);

    const nameInput = form.elements.bookingName;
    const visitorsInput = form.elements.visitors;
    const packageSelect = form.elements.bookingPackage;
    const nameError = form.querySelector('#lb-name-error');
    const packageError = form.querySelector('#lb-package-error');
    const quote = form.querySelector('[data-booking-quote]');

    const summary = result.querySelector('[data-booking-summary]');
    const bookingError = result.querySelector('[data-booking-error]');
    const startButton = result.querySelector('[data-booking-start]');
    const editButton = result.querySelector('[data-edit-plan]');
    const savedButton = planner.querySelector('[data-open-saved-from-form]');

    const payment = planner.querySelector('[data-booking-screen="payment"]');
    const paymentDetails = payment.querySelector('[data-payment-details]');
    const paymentInstructions = payment.querySelector('[data-payment-instructions]');
    const paymentFeedback = payment.querySelector('[data-payment-feedback]');
    const confirmButton = payment.querySelector('[data-payment-confirm]');
    const methodButtons = [...payment.querySelectorAll('[data-payment-method]')];

    const ticket = planner.querySelector('[data-booking-screen="ticket"]');
    const downloadButton = ticket.querySelector('[data-booking-download]');
    const downloadStatus = ticket.querySelector('[data-download-status]');

    let order = null;

    for (const item of PACKAGES) {
        const option = document.createElement('option');
        option.value = item.id;
        option.textContent = `${item.title} · ${money(item.price)} ${unit(item)}`;
        packageSelect.append(option);
    }

    function getPlan() {
        return JSON.parse(planner.dataset.currentPlan || 'null');
    }

    function showStep(step) {
        form.hidden = true;
        result.hidden = step !== 'result';
        payment.hidden = step !== 'payment';
        ticket.hidden = step !== 'ticket';

        steps.querySelectorAll('[data-step-label]').forEach((label) => {
            label.classList.toggle('current', label.dataset.stepLabel === step);
        });

        surface.scrollTop = 0;
        const activeScreen = { result, payment, ticket }[step];
        activeScreen.querySelector('h3')?.focus({ preventScroll: true });
    }

    function setError(input, element, message) {
        element.textContent = message;
        input.setAttribute('aria-invalid', String(Boolean(message)));
    }

    function renderQuote() {
        const item = findPackage(packageSelect.value);
        const visitors = Number(visitorsInput.value);

        quote.hidden = !item;
        if (!item) return;

        const fields = {
            destination: item.destination,
            meeting: item.meeting,
            time: item.time,
            price: `${money(item.price)} ${unit(item)}`,
            calculation: '',
            total: 'Isi jumlah pengunjung antara 1–999 orang.',
        };

        if (Number.isInteger(visitors) && visitors >= 1 && visitors <= 999) {
            const price = calculatePrice(item, visitors);
            fields.calculation = `${price.quantityLabel} × ${money(item.price)}`;
            fields.total = money(price.total);
        }

        writeFields(quote, 'data-quote', fields);
    }

    function renderSummary() {
        const plan = getPlan();
        const item = findPackage(plan?.bookingPackageId);

        summary.hidden = !item;
        bookingError.textContent = '';
        if (!item) return;

        const price = calculatePrice(item, plan.visitors);

        writeFields(summary, 'data-summary', {
            title: item.title,
            destination: item.destination,
            meeting: item.meeting,
            schedule: `${plan.dateLabel || plan.date} · ${item.time}`,
            calculation: `${price.quantityLabel} × ${money(item.price)}`,
            total: money(price.total),
        });
    }

    function updateMethodButtons(activeId) {
        for (const button of methodButtons) {
            const active = button.dataset.paymentMethod === activeId;
            button.setAttribute('aria-pressed', String(active));
            button.classList.toggle('primary', active);
            button.classList.toggle('planner-outline', !active);
        }
    }

    function resetPayment() {
        paymentDetails.hidden = true;
        paymentInstructions.replaceChildren();
        confirmButton.disabled = true;
        confirmButton.textContent = 'Simulasikan Pembayaran Berhasil';
        paymentFeedback.textContent = 'Pilih metode pembayaran untuk melanjutkan.';
        updateMethodButtons(null);
    }

    function selectPaymentMethod(id) {
        const method = PAYMENT_METHODS.find((item) => item.id === id);
        if (!order || order.code || payment.hidden || !method) return;

        order.method = method;
        updateMethodButtons(id);

        payment.querySelector('[data-payment-method-name]').textContent = method.label;
        payment.querySelector('[data-payment-method-amount]').textContent =
            `Total simulasi: ${order.total}`;

        paymentDetails.hidden = false;
        paymentFeedback.textContent = '';
        confirmButton.disabled = false;
        confirmButton.textContent = method.confirm;

        if (id === 'qris') {
            paymentInstructions.innerHTML = `
                ${QR_DEMO}
                <p>Ilustrasi QRIS untuk presentasi. Kode ini tidak dapat dipindai untuk membayar.</p>
            `;
            return;
        }

        if (id === 'dana') {
            paymentInstructions.innerHTML = `
                <p><strong>Merchant:</strong> Lok Baintan Explorer</p>
                <p>Klik tombol di bawah untuk menyimulasikan pembayaran DANA.</p>
            `;
            return;
        }

        paymentInstructions.innerHTML = `
            <p><strong>Virtual Account contoh:</strong> <code data-demo-account></code></p>
            <button type="button" class="button planner-outline" data-copy-account>
                Salin Nomor Demo
            </button>
        `;

        paymentInstructions.querySelector('[data-demo-account]').textContent = method.account;

        paymentInstructions.querySelector('[data-copy-account]').addEventListener(
            'click',
            async () => {
                const selectedOrder = order;

                try {
                    await navigator.clipboard.writeText(method.account);
                    if (order === selectedOrder && order.method?.id === id) {
                        paymentFeedback.textContent = 'Nomor demo disalin.';
                    }
                } catch {
                    if (order === selectedOrder && order.method?.id === id) {
                        paymentFeedback.textContent = 'Salin nomor demo secara manual dari layar.';
                    }
                }
            },
        );
    }

    nameInput.addEventListener('input', () => {
        setError(nameInput, nameError, '');
    });

    packageSelect.addEventListener('change', () => {
        setError(packageSelect, packageError, '');
        renderQuote();
    });

    visitorsInput.addEventListener('input', renderQuote);
    visitorsInput.addEventListener('change', renderQuote);

    form.addEventListener('submit', (event) => {
        const nameMessage = nameInput.value.trim() ? '' : 'Masukkan nama pemesan.';
        const packageMessage = findPackage(packageSelect.value)
            ? ''
            : 'Pilih paket perjalanan untuk melihat harga.';

        setError(nameInput, nameError, nameMessage);
        setError(packageSelect, packageError, packageMessage);

        if (!nameMessage && !packageMessage) return;

        event.preventDefault();
        event.stopImmediatePropagation();
        (nameMessage ? nameInput : packageSelect).focus();
    }, true);

    form.addEventListener('submit', () => {
        if (result.hidden) return;

        const plan = getPlan();
        if (!plan) return;

        planner.dataset.currentPlan = JSON.stringify({
            ...plan,
            bookingName: nameInput.value.trim(),
            bookingPackageId: packageSelect.value,
        });

        order = null;
        renderSummary();
    });

    editButton?.addEventListener('click', () => {
        const plan = getPlan();

        nameInput.value = plan?.bookingName || '';
        packageSelect.value = findPackage(plan?.bookingPackageId)
            ? plan.bookingPackageId
            : '';

        setError(nameInput, nameError, '');
        setError(packageSelect, packageError, '');
        renderQuote();
    });

    savedButton?.addEventListener('click', () => {
        order = null;
        renderSummary();
    });

    startButton.addEventListener('click', () => {
        const plan = getPlan();
        if (!plan) return;

        const item = findPackage(plan.bookingPackageId);

        if (!plan.bookingName || !item) {
            bookingError.textContent =
                'Lengkapi nama dan pilihan paket melalui tombol Ubah Rencana.';
            editButton?.focus();
            return;
        }

        const key = planner.dataset.currentPlan;

        if (order?.key === key) {
            showStep(order.code ? 'ticket' : 'payment');
            return;
        }

        const price = calculatePrice(item, plan.visitors);

        order = {
            key,
            title: item.title,
            owner: plan.bookingName,
            schedule: `${plan.dateLabel || plan.date} · ${item.time}`,
            destination: item.destination,
            meeting: item.meeting,
            group: item.capacity
                ? `${plan.visitors} pengunjung · ${price.quantityLabel}`
                : `${plan.visitors} pengunjung`,
            total: money(price.total),
            method: null,
            code: null,
        };

        payment.querySelector('[data-payment-summary]').textContent =
            `${order.title} · ${order.schedule} · ${order.group}`;
        payment.querySelector('[data-payment-total]').textContent = order.total;

        resetPayment();
        showStep('payment');
    });

    for (const button of methodButtons) {
        button.addEventListener('click', () => selectPaymentMethod(button.dataset.paymentMethod));
    }

    confirmButton.addEventListener('click', () => {
        if (!order?.method || payment.hidden || order.code) return;

        order.code = makeTicketCode();

        writeFields(ticket, 'data-ticket', {
            title: order.title,
            group: order.group,
            owner: order.owner,
            schedule: order.schedule,
            destination: order.destination,
            meeting: order.meeting,
            code: order.code,
            method: order.method.label,
            total: order.total,
        });

        downloadStatus.hidden = true;
        showStep('ticket');
    });

    planner.querySelectorAll('[data-booking-back]').forEach((button) => {
        button.addEventListener('click', () => showStep('result'));
    });

    downloadButton.addEventListener('click', async () => {
        if (!order?.code || ticket.hidden || downloadButton.disabled) return;

        const code = order.code;
        downloadButton.disabled = true;
        downloadButton.textContent = 'Menyiapkan PDF…';
        downloadStatus.hidden = true;

        try {
            await saveTicketPdf(ticket.querySelector('[data-ticket-image]'), code);
            downloadStatus.textContent = 'Tiket PDF berhasil dibuat.';
        } catch (error) {
            console.error('[Lok Baintan] Gagal membuat PDF tiket:', error);
            downloadStatus.textContent = 'PDF gagal dibuat. Coba unduh tiket lagi.';
        } finally {
            downloadStatus.hidden = false;
            downloadButton.disabled = false;
            downloadButton.textContent = 'Unduh Tiket PDF';
        }
    });

    renderQuote();
}