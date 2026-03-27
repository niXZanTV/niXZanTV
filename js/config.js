// Configurações e dados de domínio
const CONFIG = {
    WHATSAPP_NUMBER: '54996472916',
    WHATSAPP_BASE_URL: 'https://api.whatsapp.com/send/',
};

const MERCADO_PAGO_LINKS = {
    'Básico': {
        'monthly': { offer: 'https://mpago.la/2szXxjS', noOffer: 'https://mpago.la/1FjZRy4' },
        'quarterly': { offer: 'https://mpago.la/1MscxRu', noOffer: 'https://mpago.la/1aTqt6T' },
        'annual': { offer: '', noOffer: '' }
    },
    'Premium': {
        'monthly': { offer: 'https://mpago.la/29Ev7YQ', noOffer: 'https://mpago.la/2n7wiWi' },
        'quarterly': { offer: 'https://mpago.la/2JifGyE', noOffer: 'https://mpago.la/2c9WGtq' },
        'annual': { offer: '', noOffer: '' }
    },
    'Família': {
        'monthly': { offer: 'https://mpago.la/2pj1DGU', noOffer: 'https://mpago.la/2GPZBmo' },
        'quarterly': { offer: 'https://mpago.la/2NNWdk3', noOffer: 'https://mpago.la/1YbhzvK' },
        'annual': { offer: '', noOffer: '' }
    }
};

const TESTIMONIALS = [
    { name: 'Carlos M.', city: 'São Paulo, SP', stars: 5, text: 'Eu pagava várias plataformas e tava ficando caro demais… cancelei tudo e fiquei só com isso. Aqui em casa funcionou muito bem.' },
    { name: 'João P.', city: 'Minas Gerais, MG', stars: 4, text: 'Não manjo nada de tecnologia e mesmo assim consegui usar tranquilo. Até minha mãe usa de boa aqui.' },
    { name: 'Ana S.', city: 'Brasília, DF', stars: 5, text: 'Aqui em casa todo mundo usa, até briga pelo controle kkk. Vale muito a pena mesmo.' },
    { name: 'Felipe M.', city: 'Curitiba, PR', stars: 5, text: 'Uso na minha TV e a qualidade é muito boa, não travou pra mim até agora. Curti bastante.' },
    { name: 'Juliana C.', city: 'Salvador, BA', stars: 5, text: 'Fiquei com dúvida no começo, mas o suporte respondeu rapidinho e me ajudou. Tô gostando bastante.' },
    { name: 'Lucas T.', city: 'Porto Alegre, RS', stars: 4, text: 'Acabei cancelando Netflix e Prime depois que comecei a usar. Pra mim compensou.' },
    { name: 'Beatriz G.', city: 'Campinas, SP', stars: 5, text: 'Testei primeiro e acabei assinando no mesmo dia. Tem muita coisa pra assistir, sério.' },
    { name: 'Rafael D.', city: 'Recife, PE', stars: 5, text: 'Pra mim valeu a pena pelo preço. Uso quase todo dia aqui em casa.' },
    { name: 'Fernanda L.', city: 'Fortaleza, CE', stars: 5, text: 'Meu marido achou que não ia prestar, agora é ele que mais usa 😂' },
    { name: 'Diego A.', city: 'Belém, PA', stars: 4, text: 'Interface simples e rápida. Aqui rodou bem, sem travar na maior parte do tempo.' },
    { name: 'Camila N.', city: 'Goiânia, GO', stars: 5, text: 'Testei no celular, TV e tablet e funcionou em todos. Isso me surpreendeu.' },
    { name: 'Gustavo H.', city: 'Manaus, AM', stars: 5, text: 'Minha internet nem é das melhores e mesmo assim dá pra assistir de boa na maioria das vezes.' },
    { name: 'Larissa F.', city: 'São Luís, MA', stars: 4, text: 'Tem bastante canal e filme. Sempre acho alguma coisa pra ver.' },
    { name: 'Bruno R.', city: 'Maceió, AL', stars: 5, text: 'Eu gastava muito com assinatura… aqui saiu bem mais barato e me atende.' },
    { name: 'Aline V.', city: 'Natal, RN', stars: 5, text: 'Minha filha usa direto pros desenhos e eu vejo séries. Acabou sendo útil pra todo mundo.' },
    { name: 'Thiago E.', city: 'João Pessoa, PB', stars: 4, text: 'Pra quem tinha várias assinaturas, ajuda bastante. Agora tá tudo num lugar só.' },
    { name: 'Patricia O.', city: 'Cuiabá, MT', stars: 5, text: 'Testei sem muita expectativa e acabei ficando. Já tô usando faz um tempo.' },
];

const PLANS_DATA = {
    'Básico': {
        emoji: '📺',
        pricing: {
            monthly: { price: 30, normalPrice: 45, period: '/mês', savings: null },
            quarterly: { price: 90, normalPrice: 135, period: '/tri', savings: 'Economiza R$ 45' },
            annual: { price: 360, normalPrice: 540, period: '/ano', savings: 'Economiza R$ 180' }
        },
        features: ['Acesso total', '10.000+ canais', '50.000+ filmes', 'Qualidade até HD', '1 dispositivo simultâneo'],
        popular: false
    },
    'Premium': {
        emoji: '🚀',
        pricing: {
            monthly: { price: 45, normalPrice: 60, period: '/mês', savings: null },
            quarterly: { price: 135, normalPrice: 180, period: '/tri', savings: 'Economiza R$ 45' },
            annual: { price: 540, normalPrice: 720, period: '/ano', savings: 'Economiza R$ 180' }
        },
        features: ['Tudo do Básico +', 'Qualidade 4K', '2 telas simultâneas', 'Sem anúncios', 'Suporte prioritário'],
        popular: true
    },
    'Família': {
        emoji: '👨‍👩‍👧‍👦',
        pricing: {
            monthly: { price: 60, normalPrice: 75, period: '/mês', savings: null },
            quarterly: { price: 180, normalPrice: 225, period: '/tri', savings: 'Economiza R$ 45' },
            annual: { price: 720, normalPrice: 900, period: '/ano', savings: 'Economiza R$ 180' }
        },
        features: ['Tudo do Premium +', 'Até 6 perfis', '4 telas simultâneas', 'Espaço ilimitado', 'R$ 10/pessoa por mês'],
        popular: false
    }
};
