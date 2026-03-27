// Mensagens e construção de texto
const OPENINGS = [
    'Oi! Acabei de escolher o plano',
    'Olá! Gostaria de ativar o plano',
    'Oi! Quero assinar o plano',
    'Olá! Estou interessado no plano'
];

const URGENCIES = [
    'A oferta está acabando, né?',
    'Vi que a promoção é por tempo limitado',
    'Acho que a oferta expira logo',
    'Preciso ativar antes que acabe'
];

const CTAS = [
    'Quero ativar agora. Pode liberar meu acesso?',
    'Já quero começar hoje. Pode liberar meu acesso?',
    'Estou pronto para ativar. Pode liberar meu acesso?',
    'Vamos fechar isso agora. Pode liberar meu acesso?'
];

const SUPPORT_CTAS = [
    'Pode me ajudar com isso?',
    'Preciso de suporte urgente. Pode auxiliar?',
    'Estou com problema. Pode resolver?'
];

const TRIAL_CTAS = [
    'Quero testar agora. Pode liberar meu acesso?',
    'Já quero começar o teste. Pode liberar meu acesso?',
    'Estou pronto para testar. Pode liberar meu acesso?'
];

function buildSupportMessage(device) {
    const deviceName = getDeviceName(device);
    const cta = getRandomElement(SUPPORT_CTAS);

    return `🆘 SUPORTE NIXZAN TV\n\nDispositivo: ${deviceName}\n\nOi! Preciso de ajuda com a niXZan TV. ${cta}`;
}

function buildFreeTrialMessage(device) {
    const deviceName = getDeviceName(device);

    return `🎬 TESTE GRÁTIS SOLICITADO\n\nDispositivo: ${deviceName}\n\nAcabei de solicitar o teste grátis de 4 horas.\n\nPode liberar meu acesso agora.`;
}

function buildPlanMessage(plan, device, period, offerExpired) {
    const planData = PLANS_DATA[plan];
    const pricing = planData.pricing[period];
    const deviceName = getDeviceName(device);
    const periodLabel = getPeriodLabel(period);

    let message = `💰 PAGAMENTO REALIZADO - NIXZAN TV\n\nPlano: ${planData.emoji} ${plan}\nDispositivo: ${deviceName}`;

    if (offerExpired) {
        message += `\nValor: ${formatCurrency(pricing.normalPrice)} ${pricing.period}\n(Oferta expirou)`;
    } else {
        message += `\nValor: ${formatCurrency(pricing.price)} ${pricing.period}`;
        if (pricing.savings) {
            message += ` (${pricing.savings})`;
        }
    }

    message += `\nPeríodo: ${periodLabel}\n\nAcabei de realizar o pagamento!\n📎 Segue o comprovante em anexo.\n\nPode liberar meu acesso assim que confirmar.`;

    return message;
}

function buildWhatsAppMessage(plan, device, period, offerExpired) {
    const messageHandlers = {
        'Suporte': () => buildSupportMessage(device),
        'Teste Grátis': () => buildFreeTrialMessage(device),
        default: () => buildPlanMessage(plan, device, period, offerExpired)
    };

    return (messageHandlers[plan] || messageHandlers.default)();
}

function prepareOrder(plan, device, period) {
    return {
        plan,
        device: getDeviceName(device),
        period,
        price: PLANS_DATA[plan].pricing[period].price,
        timestamp: new Date().toISOString()
    };
}
