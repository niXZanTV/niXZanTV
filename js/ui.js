// UI e interação de usuário
const DEVICE_COMPATIBILITY = {
    smarttv: {
        title: "Smart TVs Compatíveis",
        description: "O niXZan TV funciona perfeitamente nestas Smart TVs:",
        brands: ["Samsung Tizen", "LG WebOS", "Sony Android TV", "TCL Android TV", "Philips Android TV", "Hisense", "Xiaomi", "AOC"]
    },
    tvbox: {
        title: "TV Boxes Compatíveis",
        description: "Compatível com todos os TV Boxes Android:",
        brands: ["Android TV Box", "Fire TV Stick", "Fire TV Cube", "NVIDIA Shield", "Xiaomi Mi Box", "TCL Box", "Qualquer Android TV"]
    },
    smartphone: {
        title: "Smartphones Compatíveis",
        description: "Funciona em qualquer smartphone moderno:",
        brands: ["Android (todas as versões)", "iPhone (iOS 12+)", "Samsung Galaxy", "iPhone", "Xiaomi", "Motorola", "Qualquer smartphone"]
    },
    tablet: {
        title: "Tablets Compatíveis",
        description: "Compatível com todos os tablets:",
        brands: ["iPad", "Samsung Galaxy Tab", "Lenovo Tab", "Amazon Fire HD", "Xiaomi Pad", "Qualquer tablet Android/iOS"]
    },
    pc: {
        title: "Computadores Compatíveis",
        description: "Funciona em qualquer PC ou notebook:",
        brands: ["Windows 10+", "macOS", "Linux", "Chromebook", "Qualquer computador moderno"]
    },
    roku: {
        title: "Roku e Fire Stick Compatíveis",
        description: "Compatível com dispositivos de streaming:",
        brands: ["Roku Express", "Roku Stick", "Fire TV Stick", "Fire TV Stick Lite", "Fire TV Cube", "Todos os modelos Roku"]
    }
};

function updatePricesAfterExpiry() {
    const activePlans = document.querySelector('.plans-grid:not(.expired-plans)');
    const expiredPlans = document.querySelector('.plans-grid.expired-plans');

    if (STATE.offerExpired) {
        if (activePlans) activePlans.style.display = 'none';
        if (expiredPlans) expiredPlans.style.display = 'grid';
    } else {
        if (activePlans) activePlans.style.display = 'grid';
        if (expiredPlans) expiredPlans.style.display = 'none';
    }

    startNextOfferCountdown();
}

function handlePeriodToggle() {
    const periodButtons = document.querySelectorAll('.period-btn');

    periodButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            STATE.selectedPeriod = this.getAttribute('data-period');

            periodButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            document.querySelectorAll('.monthly-price, .quarterly-price, .annual-price').forEach(el => {
                el.style.display = 'none';
            });
            document.querySelectorAll('.monthly-period, .quarterly-period, .annual-period').forEach(el => {
                el.style.display = 'none';
            });

            document.querySelectorAll(`.${STATE.selectedPeriod}-price`).forEach(el => {
                el.style.display = 'block';
            });
            document.querySelectorAll(`.${STATE.selectedPeriod}-period`).forEach(el => {
                el.style.display = 'inline';
            });

            updateSavingsCalculations();
        });
    });

    document.querySelectorAll('.monthly-price').forEach(el => el.style.display = 'block');
    document.querySelectorAll('.monthly-period').forEach(el => el.style.display = 'inline');

    updateSavingsCalculations();
}

function updateSavingsCalculations() {
    Object.keys(PLANS_DATA).forEach(planName => {
        const planData = PLANS_DATA[planName];

        Object.keys(planData.pricing).forEach(period => {
            const pricing = planData.pricing[period];
            const economy = (pricing.normalPrice - pricing.price).toFixed(2);

            const cards = document.querySelectorAll('.plan-card');

            cards.forEach(card => {
                if (card.getAttribute('data-plan') === planName) {
                    const savingsEl = card.querySelector(`.${period}-price .savings`);

                    if (savingsEl) {
                        savingsEl.textContent = `Economiza R$ ${economy}`;
                    }
                }
            });
        });
    });
}

function handleFAQ() {
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.closest('.faq-item');

            document.querySelectorAll('.faq-item.active').forEach(item => {
                if (item !== faqItem) {
                    item.classList.remove('active');
                }
            });

            faqItem.classList.toggle('active');
        });
    });
}

function handleSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);

            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

function initDeviceModal() {
    const deviceModal = document.getElementById('deviceModal');
    const deviceOptions = document.querySelectorAll('.device-option');
    const planButtons = document.querySelectorAll('.plan-button');
    const periodButtons = document.querySelectorAll('.period-btn');
    const continueTestBtn = document.getElementById('continue-test-btn');

    if (!deviceModal) return;

    deviceModal.addEventListener('click', function(e) {
        if (e.target === this) {
            this.classList.remove('active');
            resetDeviceModal();
        }
    });

    periodButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            STATE.selectedPeriod = this.getAttribute('data-period');
        });
    });

    planButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            STATE.selectedPlan = this.getAttribute('data-plan');
            STATE.selectedDevice = null;

            // Todos os planos agora mostram o modal de dispositivo
            deviceOptions.forEach(opt => opt.classList.remove('selected'));
            deviceModal.classList.add('active');
            document.querySelector('.device-modal-grid').style.display = 'grid';
            document.querySelector('.device-compatibility').style.display = 'none';
            document.querySelector('.device-modal-footer').style.display = 'block';
            
            return false;
        });
    });

    deviceOptions.forEach(option => {
        option.addEventListener('click', function() {
            deviceOptions.forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
            STATE.selectedDevice = this.getAttribute('data-device');

            // Mostrar compatibilidade
            showDeviceCompatibility(STATE.selectedDevice);
        });
    });

    if (continueTestBtn) {
        continueTestBtn.addEventListener('click', function() {
            redirectToWhatsApp();
        });
    }
}

function showDeviceCompatibility(device) {
    const compatibilityData = DEVICE_COMPATIBILITY[device];
    if (!compatibilityData) return;

    document.getElementById('compatibility-title').textContent = compatibilityData.title;
    document.getElementById('compatibility-description').textContent = compatibilityData.description;

    const listEl = document.getElementById('compatibility-list');
    listEl.innerHTML = '';

    compatibilityData.brands.forEach(brand => {
        const brandEl = document.createElement('div');
        brandEl.className = 'compatibility-brand';
        brandEl.textContent = '✓ ' + brand;
        listEl.appendChild(brandEl);
    });

    // Esconder grid e footer, mostrar compatibilidade
    document.querySelector('.device-modal-grid').style.display = 'none';
    document.querySelector('.device-modal-footer').style.display = 'none';
    document.querySelector('.device-compatibility').style.display = 'block';

    // Mudar o texto do botão dependendo do plano
    const continueBtn = document.getElementById('continue-test-btn');
    if (STATE.selectedPlan === 'Teste Grátis') {
        continueBtn.textContent = 'Continuar para Teste Grátis';
    } else {
        continueBtn.textContent = 'Continuar para ' + STATE.selectedPlan;
    }
}

function resetDeviceModal() {
    document.querySelector('.device-modal-grid').style.display = 'grid';
    document.querySelector('.device-compatibility').style.display = 'none';
    document.querySelector('.device-modal-footer').style.display = 'block';
}

function redirectToWhatsApp() {
    if (STATE.selectedPlan === 'Teste Grátis' || STATE.selectedPlan === 'Suporte') {
        if (!STATE.selectedDevice) {
            alert('Por favor, selecione um dispositivo');
            return;
        }
        const message = buildWhatsAppMessage(STATE.selectedPlan, STATE.selectedDevice, STATE.selectedPeriod, STATE.offerExpired);
        const encodedMessage = encodeURIComponent(message);
        const whatsappUrl = `${CONFIG.WHATSAPP_BASE_URL}?phone=${CONFIG.WHATSAPP_NUMBER}&text=${encodedMessage}&type=phone_number&app_absent=0`;

        setTimeout(() => {
            window.open(whatsappUrl, '_blank');
            document.getElementById('deviceModal').classList.remove('active');
        }, Math.random() * 500 + 300);
        return;
    }

    const link = MERCADO_PAGO_LINKS[STATE.selectedPlan][STATE.selectedPeriod][STATE.offerExpired ? 'noOffer' : 'offer'];

    setTimeout(() => {
        window.location.href = link;
        document.getElementById('deviceModal').classList.remove('active');
    }, Math.random() * 500 + 300);
}

function rotateTestimonials() {
    const testimonialsGrid = document.querySelector('.testimonials-grid');
    if (!testimonialsGrid || TESTIMONIALS.length === 0) return;

    setInterval(() => {
        const testimonials = document.querySelectorAll('.testimonial');
        if (testimonials.length === 0) return;

        testimonialsGrid.style.opacity = '0';

        setTimeout(() => {
            const itemsPerPage = 4;
            const totalSets = Math.ceil(TESTIMONIALS.length / itemsPerPage);

            STATE.currentTestimonialIndex = (STATE.currentTestimonialIndex + 1) % totalSets;
            const startIdx = STATE.currentTestimonialIndex * itemsPerPage;

            testimonials.forEach((el, idx) => {
                const testimonialIdx = (startIdx + idx) % TESTIMONIALS.length;
                const testimonial = TESTIMONIALS[testimonialIdx];

                el.innerHTML = `\n                    <div class="stars">${'⭐'.repeat(testimonial.stars)}</div>\n                    <p>"${testimonial.text}"</p>\n                    <div class="author">\n                        <div class="author-avatar">${testimonial.name.split(' ')[0][0] + testimonial.name.split(' ')[1][0]}</div>\n                        <div>\n                            <div class="author-name">${testimonial.name}</div>\n                            <div class="author-location">${testimonial.city}</div>\n                        </div>\n                    </div>\n                `;
            });

            testimonialsGrid.style.opacity = '1';
        }, 300);
    }, 6000);
}
