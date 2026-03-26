const CONFIG = {
    WHATSAPP_NUMBER: '54996472916',
    WHATSAPP_BASE_URL: 'https://api.whatsapp.com/send/',
};

const TESTIMONIALS = [
    { name: 'Carlos M.', city: 'São Paulo, SP', stars: 5, text: 'Cancelei 6 plataformas e economizo R$400 por mês. Melhor decisão que tomei. Funciona perfeito.' },
    { name: 'Mariana S.', city: 'Rio de Janeiro, RJ', stars: 5, text: 'Achei que era golpe, mas funciona MESMO! Tenho acesso a TUDO e minha conta já se pagou em 2 dias.' },
    { name: 'João P.', city: 'Minas Gerais, MG', stars: 4, text: 'Não precisa de conhecimento técnico nenhum. Minha mãe de 65 anos conseguiu usar sem problemas.' },
    { name: 'Ana S.', city: 'Brasília, DF', stars: 5, text: 'Funciona em 4 celulares, 2 TVs e no PC. Minha família inteira usa. MUITO bom mesmo!' },
    { name: 'Felipe M.', city: 'Curitiba, PR', stars: 5, text: 'Qualidade surpreendente! Assisto em 4K na Smart TV sem nenhum problema. Recomendo!' },
    { name: 'Juliana C.', city: 'Salvador, BA', stars: 5, text: 'Suporte rápido e eficiente. Tive uma dúvida e foi resolvida em minutos. Muito satisfeita!' },
    { name: 'Lucas T.', city: 'Porto Alegre, RS', stars: 4, text: 'Já vale só pelo conteúdo exclusivo. Cancelei Netflix e Prime Video. Economia real!' },
    { name: 'Beatriz G.', city: 'Campinas, SP', stars: 5, text: 'Testei o período grátis e já contratei. Não conseguia parar de assistir novos conteúdos!' },
    { name: 'Rafael D.', city: 'Recife, PE', stars: 5, text: 'Melhor investimento que fiz. Menos de um café por dia e acesso ilimitado. Perfeito!' },
    { name: 'Fernanda L.', city: 'Fortaleza, CE', stars: 5, text: 'Meu marido questionava, mas agora toda a família aprova. Passou a ser essencial!' },
    { name: 'Diego A.', city: 'Belém, PA', stars: 4, text: 'Acesso rápido, sem travamentos, excelente interface. Muito melhor que as concorrentes!' },
    { name: 'Camila N.', city: 'Goiânia, GO', stars: 5, text: 'Rodei em 5 dispositivos diferentes e funciona perfeitamente em todos. Impressionante!' },
    { name: 'Gustavo H.', city: 'Manaus, AM', stars: 5, text: 'Internet até que instável aqui e mesmo assim assisto tranquilamente. Muito estável!' },
    { name: 'Larissa F.', city: 'São Luís, MA', stars: 4, text: 'Quantidade de canais é impressionante. Conteúdo novo toda semana. Nunca falta nada!' },
    { name: 'Bruno R.', city: 'Maceió, AL', stars: 5, text: 'Cancelei todas as assinaturas. Tenho tudo aqui por 1/10 do preço. Loucura boa!' },
    { name: 'Aline V.', city: 'Natal, RN', stars: 5, text: 'Minha filha adora. Desenhos, filmes, séries... tem de tudo mesmo. Muito feliz com plano família!' },
    { name: 'Thiago E.', city: 'João Pessoa, PB', stars: 4, text: 'Resolveu meu problema de assinatura múltipla. Agora tudo em um app só. Excelente!' },
    { name: 'Renata B.', city: 'Aracaju, SE', stars: 5, text: 'Achei que ia ter problemas legais, mas tudo regularizado. Muito tranquilo usar!' },
    { name: 'Roberto G.', city: 'Campo Grande, MS', stars: 5, text: 'Parei de piratear e comecei a pagar aqui. Vale cada centavo investido. Consciência limpa!' },
    { name: 'Patricia O.', city: 'Cuiabá, MT', stars: 5, text: 'Teste de 4 horas foi suficiente pra me convencer. Já sou cliente há 3 meses!' },
];

let currentTestimonialIndex = 0;
let selectedDevice = null;
let selectedPlan = null;
let selectedPeriod = 'monthly';
let offerExpired = false;

const PLANS_DATA = {
    'Básico': {
        emoji: '📺',
        pricing: {
            monthly: { price: 30, normalPrice: 45, period: '/mês', savings: null },
            quarterly: { price: 90, normalPrice: 135, period: '/tri', savings: 'Economiza R$ 45' },
            annual: { price: 360, normalPrice: 540, period: '/ano', savings: 'Economiza R$ 180' }
        },
        features: [
            'Acesso total',
            '10.000+ canais',
            '50.000+ filmes',
            'Qualidade até HD',
            '1 dispositivo simultâneo'
        ],
        popular: false
    },

    'Premium': {
        emoji: '🚀',
        pricing: {
            monthly: { price: 45, normalPrice: 60, period: '/mês', savings: null },
            quarterly: { price: 135, normalPrice: 180, period: '/tri', savings: 'Economiza R$ 45' },
            annual: { price: 540, normalPrice: 720, period: '/ano', savings: 'Economiza R$ 180' }
        },
        features: [
            'Tudo do Básico +',
            'Qualidade 4K',
            '2 telas simultâneas',
            'Sem anúncios',
            'Suporte prioritário'
        ],
        popular: true
    },

    'Família': {
        emoji: '👨‍👩‍👧‍👦',
        pricing: {
            monthly: { price: 60, normalPrice: 75, period: '/mês', savings: null },
            quarterly: { price: 180, normalPrice: 225, period: '/tri', savings: 'Economiza R$ 45' },
            annual: { price: 720, normalPrice: 900, period: '/ano', savings: 'Economiza R$ 180' }
        },
        features: [
            'Tudo do Premium +',
            'Até 6 perfis',
            '4 telas simultâneas',
            'Espaço ilimitado',
            'R$ 10/pessoa por mês'
        ],
        popular: false
    }
};

function startCountdown() {
    let targetDate = sessionStorage.getItem('countdownTarget');
    let countdownInterval;
    
    if (!targetDate) {
        targetDate = new Date().getTime() + (0.5 * 60 * 60 * 1000);
        sessionStorage.setItem('countdownTarget', targetDate);
    } else {
        targetDate = parseInt(targetDate);
    }
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;
        
        if (distance < 0) {
            clearInterval(countdownInterval);
            const hoursEl = document.getElementById('hours');
            const minutesEl = document.getElementById('minutes');
            const secondsEl = document.getElementById('seconds');
            const headerTimer = document.getElementById('headerTimer');
            
            if (hoursEl) hoursEl.textContent = '00';
            if (minutesEl) minutesEl.textContent = '00';
            if (secondsEl) secondsEl.textContent = '00';
            if (headerTimer) headerTimer.textContent = '00:00:00';
            
            offerExpired = true;
            updatePricesAfterExpiry();
            return;
        }
        
        const hours = Math.max(0, Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
        const minutes = Math.max(0, Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
        const seconds = Math.max(0, Math.floor((distance % (1000 * 60)) / 1000));
        
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');
        const headerTimer = document.getElementById('headerTimer');
        
        if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
        if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
        if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
        if (headerTimer) headerTimer.textContent = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }
    
    updateCountdown();
    countdownInterval = setInterval(updateCountdown, 1000);
}

if (offerExpired) {
    updatePricesAfterExpiry();
}
startCountdown();

function updatePricesAfterExpiry() {
    const activePlans = document.querySelector('.plans-grid:not(.expired-plans)');
    const expiredPlans = document.querySelector('.plans-grid.expired-plans');

    if (offerExpired) {
        if (activePlans) activePlans.style.display = 'none';
        if (expiredPlans) expiredPlans.style.display = 'grid';
    } else {
        if (activePlans) activePlans.style.display = 'grid';
        if (expiredPlans) expiredPlans.style.display = 'none';
    }
    
    startNextOfferCountdown();
}

function startNextOfferCountdown() {
    const urgencySection = document.querySelector('.urgency-section h2');
    const headerUrgency = document.querySelector('.header-urgency');
    if (!urgencySection) return;
    
    let nextOfferTime = sessionStorage.getItem('nextOfferTime');
    let nextOfferInterval;
    
    if (!nextOfferTime) {
        nextOfferTime = new Date().getTime() + (1 * 60 * 60 * 1000);
        sessionStorage.setItem('nextOfferTime', nextOfferTime);
    } else {
        nextOfferTime = parseInt(nextOfferTime);
    }
    
    function updateNextOfferCountdown() {
        const now = new Date().getTime();
        const distance = nextOfferTime - now;
        
        if (distance < 0) {
            clearInterval(nextOfferInterval);
            offerExpired = false;
            sessionStorage.removeItem('countdownTarget');
            sessionStorage.removeItem('nextOfferTime');
            startCountdown();
            updatePricesAfterExpiry();
            return;
        }
        
        const hours = Math.max(0, Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
        const minutes = Math.max(0, Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
        const seconds = Math.max(0, Math.floor((distance % (1000 * 60)) / 1000));
        
        const timerText = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        
        // Atualizar o countdown
        const hoursEl = document.getElementById('hours');
        const minutesEl = document.getElementById('minutes');
        const secondsEl = document.getElementById('seconds');
        const headerTimer = document.getElementById('headerTimer');
        
        if (hoursEl) hoursEl.textContent = String(hours).padStart(2, '0');
        if (minutesEl) minutesEl.textContent = String(minutes).padStart(2, '0');
        if (secondsEl) secondsEl.textContent = String(seconds).padStart(2, '0');
        
        // Atualizar textos
        urgencySection.textContent = `⏰ Próxima Oferta em:`;
        
        if (headerUrgency) {
            headerUrgency.innerHTML = `⏱️ Próxima oferta em <span id="headerTimer">${timerText}</span>`;
        }
    }
    
    updateNextOfferCountdown();
    nextOfferInterval = setInterval(updateNextOfferCountdown, 1000);
}

document.addEventListener('DOMContentLoaded', function() {
    // Period toggle
    const periodButtons = document.querySelectorAll('.period-btn');
    
    periodButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const period = this.getAttribute('data-period');
            
            periodButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            document.querySelectorAll('.monthly-price, .quarterly-price, .annual-price').forEach(el => {
                el.style.display = 'none';
            });
            document.querySelectorAll('.monthly-period, .quarterly-period, .annual-period').forEach(el => {
                el.style.display = 'none';
            });
            
            document.querySelectorAll(`.${period}-price`).forEach(el => {
                el.style.display = 'block';
            });
            document.querySelectorAll(`.${period}-period`).forEach(el => {
                el.style.display = 'inline';
            });
        });
    });
    
    document.querySelectorAll('.monthly-price').forEach(el => el.style.display = 'block');
    document.querySelectorAll('.monthly-period').forEach(el => el.style.display = 'inline');
    
    updateSavingsCalculations();
    
    // FAQ accordion
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
    
    // Scroll suave
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
    
    // Device modal e rotação de testemunhas
    initDeviceModal();
    rotateTestimonials();
});

function updateSavingsCalculations() {
    const planNames = ['Básico', 'Premium', 'Família'];
    const periods = ['monthly', 'quarterly', 'annual'];
    
    planNames.forEach(planName => {
        const planData = PLANS_DATA[planName];
        
        periods.forEach(period => {
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

function initDeviceModal() {
    const deviceModal = document.getElementById('deviceModal');
    const deviceOptions = document.querySelectorAll('.device-option');
    const planButtons = document.querySelectorAll('.plan-button');
    const periodButtons = document.querySelectorAll('.period-btn');
    
    if (!deviceModal) return;
    
    deviceModal.addEventListener('click', function(e) {
        if (e.target === this) {
            this.classList.remove('active');
        }
    });
    
    periodButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            selectedPeriod = this.getAttribute('data-period');
        });
    });
    
    planButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            selectedPlan = this.getAttribute('data-plan');
            selectedDevice = null;
            
            deviceOptions.forEach(opt => opt.classList.remove('selected'));
            
            deviceModal.classList.add('active');
            return false;
        });
    });
    
    deviceOptions.forEach(option => {
        option.addEventListener('click', function() {
            deviceOptions.forEach(opt => opt.classList.remove('selected'));
            this.classList.add('selected');
            selectedDevice = this.getAttribute('data-device');
            
            setTimeout(() => {
                redirectToWhatsApp();
            }, 300);
        });
    });
}

function redirectToWhatsApp() {
    if (!selectedDevice) {
        alert('Por favor, selecione um dispositivo');
        return;
    }
    
    const deviceNames = {
        'smarttv': 'Smart TV',
        'tvbox': 'TV Box',
        'smartphone': 'Smartphone',
        'tablet': 'Tablet',
        'pc': 'PC/Notebook',
        'roku': 'Roku/Fire Stick'
    };
    
    const periodLabels = {
        'monthly': 'Mensal',
        'quarterly': 'Trimestral',
        'annual': 'Anual'
    };
    
    const plan = selectedPlan || 'niXZan TV';
    const device = deviceNames[selectedDevice] || 'dispositivo';
    
    let message = '';
    
    if (plan === 'Suporte') {
        message = `🆘 *SUPORTE NIXZAN TV*\n\n`;
        message += `📱 *Dispositivo:* ${device}\n\n`;
        message += `Olá! Preciso de suporte com a niXZan TV. Pode me ajudar? 😊`;
    }
    else if (plan === 'Teste Grátis') {
        message = `🎬 *TESTE GRÁTIS - 4 HORAS*\n\n`;
        message += `📱 *Dispositivo:* ${device}\n`;
        message += `⏰ *Acesso:* 4 horas completo\n`;
        message += `💰 *Valor:* Grátis\n\n`;
        message += `🎁 *O que você recebe:*\n`;
        message += `  ✅ 10.000+ canais\n`;
        message += `  ✅ 50.000+ filmes e séries\n`;
        message += `  ✅ Qualidade até 4K\n`;
        message += `  ✅ Multidispositivos\n`;
        message += `  ✅ Sem cartão de crédito\n\n`;
        message += `Olá! Gostaria de começar o teste grátis de 4 horas da niXZan TV. Pode me ajudar? 😊`;
    } else {
        const planData = PLANS_DATA[plan];
        const pricing = planData.pricing[selectedPeriod];
        const periodLabel = periodLabels[selectedPeriod];
        
        message = `🎬 *NIXZAN TV - ${plan.toUpperCase()}*\n\n`;
        message += `📱 *Dispositivo:* ${device}\n`;
        message += `💰 *Plano:* ${planData.emoji} ${plan}\n`;
        
        if (offerExpired) {
            const normalPrice = pricing.normalPrice;
            message += `💵 *Preço Regular:* R$ ${normalPrice.toFixed(2)} ${pricing.period}\n`;
            message += `⚠️ *Nota:* A oferta especial expirou\n`;
        } else {
            message += `💵 *Preço:* R$ ${pricing.price.toFixed(2)} ${pricing.period}\n`;
        }
        
        message += `📅 *Período:* ${periodLabel}\n`;
        
        if (pricing.savings && !offerExpired) {
            message += `✨ *${pricing.savings}*\n`;
        }
        
        message += `\n📋 *Benefícios do Plano:*\n`;
        planData.features.forEach(feature => {
            if (offerExpired && feature.includes('R$')) {
                return;
            }
            message += `  ✅ ${feature}\n`;
        });
        
        if (offerExpired) {
            message += `\n📌 *Informações:*\n`;
            message += `  ℹ️ Preço de lista atual\n`;
            message += `  💬 Fale conosco para promoções\n`;
        } else {
            message += `\n🎁 *Oferta Especial:*\n`;
            message += `  ⏰ Teste grátis por 4 horas\n`;
            message += `  🚫 Sem cartão de crédito\n`;
            message += `  ✋ Sem compromisso\n`;
        }
        
        message += `\nOlá! Gostaria de assinar o plano acima da niXZan TV. Pode me ajudar? 😊`;
    }
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `${CONFIG.WHATSAPP_BASE_URL}?phone=${CONFIG.WHATSAPP_NUMBER}&text=${encodedMessage}&type=phone_number&app_absent=0`;
    
    window.open(whatsappUrl, '_blank');
    document.getElementById('deviceModal').classList.remove('active');
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
            
            currentTestimonialIndex = (currentTestimonialIndex + 1) % totalSets;
            const startIdx = currentTestimonialIndex * itemsPerPage;
            
            testimonials.forEach((el, idx) => {
                const testimonialIdx = (startIdx + idx) % TESTIMONIALS.length;
                const testimonial = TESTIMONIALS[testimonialIdx];
                
                el.innerHTML = `
                    <div class="stars">${'⭐'.repeat(testimonial.stars)}</div>
                    <p>"${testimonial.text}"</p>
                    <div class="author">
                        <div class="author-avatar">${testimonial.name.split(' ')[0][0] + testimonial.name.split(' ')[1][0]}</div>
                        <div>
                            <div class="author-name">${testimonial.name}</div>
                            <div class="author-location">${testimonial.city}</div>
                        </div>
                    </div>
                `;
            });
            
            testimonialsGrid.style.opacity = '1';
        }, 300);
    }, 6000);
}


