// Módulo de contagem regressiva
function updateCountdownElements(hours, minutes, seconds) {
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    const headerTimer = document.getElementById('headerTimer');

    if (hoursEl) hoursEl.textContent = hours;
    if (minutesEl) minutesEl.textContent = minutes;
    if (secondsEl) secondsEl.textContent = seconds;
    if (headerTimer) headerTimer.textContent = `${hours}:${minutes}:${seconds}`;
}

function startCountdown() {
    let targetDate = sessionStorage.getItem('countdownTarget');
    let countdownInterval;

    if (!targetDate) {
        targetDate = new Date().getTime() + (0.44 * 60 * 60 * 1000);
        sessionStorage.setItem('countdownTarget', targetDate);
    } else {
        targetDate = parseInt(targetDate);
    }

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;

        if (distance < 0) {
            clearInterval(countdownInterval);
            updateCountdownElements('00', '00', '00');
            STATE.offerExpired = true;
            updatePricesAfterExpiry();
            return;
        }

        const hours = Math.max(0, Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
        const minutes = Math.max(0, Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
        const seconds = Math.max(0, Math.floor((distance % (1000 * 60)) / 1000));

        updateCountdownElements(
            String(hours).padStart(2, '0'),
            String(minutes).padStart(2, '0'),
            String(seconds).padStart(2, '0')
        );
    }

    updateCountdown();
    countdownInterval = setInterval(updateCountdown, 1000);
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
            STATE.offerExpired = false;
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

        updateCountdownElements(
            String(hours).padStart(2, '0'),
            String(minutes).padStart(2, '0'),
            String(seconds).padStart(2, '0')
        );

        urgencySection.textContent = `⏰ Próxima Oferta em:`;

        if (headerUrgency) {
            headerUrgency.innerHTML = `⏱️ Próxima oferta em <span id="headerTimer">${timerText}</span>`;
        }
    }

    updateNextOfferCountdown();
    nextOfferInterval = setInterval(updateNextOfferCountdown, 1000);
}
