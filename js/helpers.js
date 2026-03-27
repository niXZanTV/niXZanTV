// Funções utilitárias
function formatCurrency(value) {
    return `R$ ${value.toFixed(2)}`;
}

function getDeviceName(device) {
    const deviceNames = {
        'smarttv': 'Smart TV',
        'tvbox': 'TV Box',
        'smartphone': 'Smartphone',
        'tablet': 'Tablet',
        'pc': 'PC/Notebook',
        'roku': 'Roku/Fire Stick'
    };
    return deviceNames[device] || 'dispositivo';
}

function getPeriodLabel(period) {
    const periodLabels = {
        'monthly': 'Mensal',
        'quarterly': 'Trimestral',
        'annual': 'Anual'
    };
    return periodLabels[period];
}

function getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
}
