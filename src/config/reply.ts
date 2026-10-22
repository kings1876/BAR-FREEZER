// Reply Portal config: every brand / currency / payment / channel specific lives here.
// Receiving wallets supplied by the business owner. Always confirm the address in the order email before sending.
export const WALLETS = [
  { coin: 'BTC', name: 'Bitcoin (BTC)', network: 'Bitcoin', address: 'bc1qzn330nvevy8l2phf2swc25znd8ct6ju9gdprl7' },
  { coin: 'USDT', name: 'Tether (USDT)', network: 'Tron (TRC-20)', address: 'TBnrAF6yjaYyUBXFGDzDUdkUG7EZr6qrFN' },
  { coin: 'ETH', name: 'Ethereum (ETH)', network: 'Ethereum', address: '0x71e590e953d8DBf7a2d8a4Fa58Ea55c3c57A6f8C' },
];

export const REPLY = {
  orderPrefix: 'BF',
  currency: { code: 'AUD', symbol: '$', locale: 'en-AU' },
  brand: { primary: '#f59e0b', headerDark: '#0f172a' },
  // WhatsApp number (digits with country code, e.g. 61400000000). Empty = WhatsApp features hidden.
  channels: { whatsapp: '', email: 'sales@barfreezer.com.au' },
  methods: [
    { id: 'bank-transfer', label: 'Bank Transfer (EFT)', placeholder: 'Account name: ...\nBSB: ...\nAccount number: ...\nReference: ...' },
    { id: 'payid', label: 'PayID', placeholder: 'PayID: ...\nAccount name: ...\nReference: ...' },
    { id: 'osko', label: 'Osko', placeholder: 'PayID: ...\nAccount name: ...\nBSB: ...\nAccount number: ...' },
    { id: 'crypto', label: 'Cryptocurrency (BTC / USDT TRC-20 / ETH)', placeholder: 'Coin: USDT\nNetwork: Tron (TRC-20)\nWallet address: TBnrAF6yjaYyUBXFGDzDUdkUG7EZr6qrFN\nAmount: ...' },
  ],
  terms: [
    'Use your order number as the payment reference.',
    'Your order is dispatched once payment has cleared.',
    'For crypto, send the exact amount quoted on the network we specify; network fees are paid by the sender.',
    'After paying, upload a screenshot of your payment to speed up confirmation.',
  ],
};

export const SITE_URL = 'https://barfreezer.com.au';
