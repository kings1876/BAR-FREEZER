// Reply Portal config: every brand / currency / payment / channel specific lives here.
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
    { id: 'crypto', label: 'Cryptocurrency (BTC / USDT TRC-20 / ETH)', placeholder: 'Coin: USDT\nNetwork: Tron (TRC-20)\nWallet address: ...\nAmount: ...' },
  ],
  terms: [
    'Use your order number as the payment reference.',
    'Your order is dispatched once payment has cleared.',
    'For crypto, send the exact amount quoted on the network we specify; network fees are paid by the sender.',
    'After paying, upload a screenshot of your payment to speed up confirmation.',
  ],
};

export const SITE_URL = 'https://barfreezer.com.au';
