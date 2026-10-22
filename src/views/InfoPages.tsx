import React, { useState, useEffect } from 'react';
import { 
  Building, 
  Phone, 
  Mail, 
  MapPin, 
  CheckCircle2, 
  ShieldCheck, 
  Truck, 
  Flame, 
  Percent, 
  CreditCard, 
  Search, 
  ChevronRight,
  ArrowRight,
  Send,
  HelpCircle
} from 'lucide-react';
import { SITE, FAQS, BRANDS } from '../config/core.js';
import { PRODUCT_COUNTS } from '../config/products-counts.js';
import { collectForm, sendEnquiry } from '../lib/enquiry-client';
import { makeOrderNumber } from '../lib/order';
import { waOrderLink, whatsappEnabled } from '../lib/whatsapp';
import { useCart } from '../context/CartContext';
import { useRouter, Link } from '../context/RouterContext';
import { fmtNum } from '../lib/format';
import { WALLETS } from '../config/reply';

/**
 * Commercial Financing Page (/finance/)
 */
export const FinancePage: React.FC = () => {
  const { setIsQuoteModalOpen } = useCart();

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="bg-slate-900 text-white rounded-xl border border-slate-800 p-6 sm:p-10 shadow-lg space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold text-amber-400 uppercase tracking-wider">
            <span>EQUIPMENT FINANCE ENQUIRIES</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            Equipment Finance for Bar Fridges and Freezers
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            If you would rather spread the cost of commercial refrigeration, tell us when you request a quote. We will reply with the options available for your order. Finance is offered by third-party lenders and is subject to approval, so terms, rates and tax treatment depend on the lender and your business. Check them with your accountant.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-6 bg-white rounded-xl border border-slate-200 space-y-3 flex flex-col justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Ask about finance</h2>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Add a note to your quote request saying you would like finance, and include the equipment and delivery postcode. We will come back with what is available.
              </p>
            </div>
            <button
              onClick={() => setIsQuoteModalOpen(true)}
              className="w-full py-2 bg-slate-900 text-white text-xs font-semibold rounded hover:bg-slate-800"
            >
              Request a quote with finance
            </button>
          </div>

          <div className="p-6 bg-white rounded-xl border border-slate-200 space-y-3 flex flex-col justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">Pay now instead</h2>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                You can pay by Osko or cryptocurrency once your order is confirmed. See the payment methods page for details.
              </p>
            </div>
            <Link
              href="/payment-methods/"
              className="w-full py-2 bg-slate-100 text-slate-800 text-xs font-semibold rounded text-center hover:bg-slate-200"
            >
              View payment methods
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * About Bar Freezer Australia (/about/)
 */
export const AboutPage: React.FC = () => {
  const brandCount = PRODUCT_COUNTS.brands;
  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="bg-white rounded-xl border border-slate-200/90 p-6 sm:p-10 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold text-cyan-700 uppercase tracking-wider">
            <span>ABOUT BAR FREEZER AUSTRALIA</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            About Bar Freezer Australia: Commercial and Home Bar Refrigeration
          </h1>

          <p className="text-sm text-slate-700 leading-relaxed">
            Bar Freezer (barfreezer.com.au) is an Australian online supplier of bar fridges, bar freezers, kegerators, wine fridges, ice machines and refrigeration accessories for pubs, cafes, restaurants, venues and home bars.
          </p>

          <p className="text-sm text-slate-700 leading-relaxed">
            We list {fmtNum(PRODUCT_COUNTS.total)} products from {brandCount} brands, with the specifications published by each manufacturer or supplier. You can compare models, request a quote for multiple units, and have equipment delivered Australia-wide. Read our <Link href="/guides/" className="text-cyan-700 font-semibold">buying guides</Link> to choose the right size and type, or <Link href="/contact/" className="text-cyan-700 font-semibold">contact us</Link> with a question.
          </p>

          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center text-xs">
            <div>
              <span className="font-mono font-bold text-lg text-slate-900 block">3,140+</span>
              <span className="text-slate-500">Verified Reviews</span>
            </div>
            <div>
              <span className="font-mono font-bold text-lg text-slate-900 block">{fmtNum(PRODUCT_COUNTS.total)}</span>
              <span className="text-slate-500">Products listed</span>
            </div>
            <div>
              <span className="font-mono font-bold text-lg text-slate-900 block">{brandCount}</span>
              <span className="text-slate-500">Brands</span>
            </div>
            <div>
              <span className="font-mono font-bold text-lg text-slate-900 block">Australia-wide</span>
              <span className="text-slate-500">Delivery</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Shows the receiving wallet for a coin with a copy button.
export const WalletBox: React.FC<{ coin: string }> = ({ coin }) => {
  const w = WALLETS.find((x) => x.coin === coin) || WALLETS[0];
  const [copied, setCopied] = useState(false);
  const copy = () => {
    if (navigator.clipboard) navigator.clipboard.writeText(w.address).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000); });
  };
  return (
    <div className="rounded-lg bg-slate-50 border border-slate-300 p-3 space-y-1.5">
      <div className="text-xs font-bold text-slate-900">{w.name} <span className="font-normal text-slate-500">· Network: {w.network}</span></div>
      <div className="font-mono text-xs sm:text-sm text-slate-800 break-all select-all">{w.address}</div>
      <div className="flex items-center justify-between gap-3">
        <button type="button" onClick={copy} className="px-3 py-1.5 rounded bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold">{copied ? 'Copied' : 'Copy address'}</button>
        <span className="text-[11px] text-slate-500">Send only {w.coin} on the {w.network} network. Check the address against your order email before you send.</span>
      </div>
    </div>
  );
};

export const PAYMENT_OPTIONS: [string, string, string][] = [
  ['Osko', 'Osko (instant bank payment)', 'Pay instantly from your banking app'],
  ['Crypto', 'Cryptocurrency (BTC, USDT, ETH): save 10%', '10% off your order total, wallet shown below']
];

export const PaymentMethodsPage: React.FC = () => (
  <div className="bg-slate-50 min-h-screen py-8">
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Payment Methods</h1>
      <p className="text-sm text-slate-600">We accept the payment methods below. After you place an order request we confirm stock and freight, then email your tax invoice with payment instructions. Orders are dispatched once payment is confirmed. All prices are in AUD and include GST.</p>
      {[
        ['Osko', 'Osko payments settle in minutes, including after hours. Use the Osko details on your tax invoice and your order reference so we can match the payment.'],
        ['Cryptocurrency (BTC, USDT, ETH)', 'Pay with cryptocurrency and take 10% off your order total. We accept Bitcoin (BTC), Tether (USDT, on the Tron network as TRC-20) and Ethereum (ETH). Choose crypto at checkout and tell us which coin you prefer in your order; we confirm the amount in AUD converted at the time of invoice. Send the exact amount quoted on the network shown below, and check the address against your order email before you send. The order is confirmed once the transaction is verified.']
      ].map(([t, d]) => (
        <div key={t} className="bg-white p-5 rounded-xl border border-slate-200">
          <h2 className="text-base font-bold text-slate-900">{t}</h2>
          <p className="text-xs text-slate-600 mt-1 leading-relaxed">{d}</p>
          {t.startsWith('Cryptocurrency') && (
            <dl className="mt-3 space-y-3">
              {WALLETS.map((w) => (
                <div key={w.coin} className="rounded-lg bg-slate-50 border border-slate-200 p-3">
                  <dt className="text-xs font-bold text-slate-900">{w.name} <span className="font-normal text-slate-500">· Network: {w.network}</span></dt>
                  <dd className="mt-1 font-mono text-xs sm:text-sm text-slate-800 break-all select-all">{w.address}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      ))}
      <p className="text-xs text-slate-500">Questions about paying? <Link href="/contact/" className="text-cyan-700 font-semibold">Contact us</Link>.</p>
    </div>
  </div>
);

/**
 * FAQ Page (/faq/)
 */
export const FaqPage: React.FC = () => (
  <div className="bg-slate-50 min-h-screen py-8">
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Bar Fridge &amp; Bar Freezer FAQs</h1>
      <p className="text-sm text-slate-600">Answers to common questions about bar freezers, bar fridges, delivery and ordering. Can't find what you need? <Link href="/contact/" className="text-cyan-700 font-semibold">Contact us</Link>.</p>
      <div className="space-y-3">
        {FAQS.map((faq: any, i: number) => (
          <div key={i} className="bg-white rounded-xl border border-slate-200 p-5">
            <h2 className="text-base font-bold text-slate-900">{faq.question}</h2>
            <p className="text-sm text-slate-600 mt-2 leading-relaxed">{faq.answer}</p>
          </div>
        ))}
      </div>
      <p className="text-xs text-slate-500">See also: <Link href="/guides/" className="text-cyan-700 font-semibold">buying guides</Link>, <Link href="/payment-methods/" className="text-cyan-700 font-semibold">payment methods</Link> and <Link href="/delivery/" className="text-cyan-700 font-semibold">delivery</Link>.</p>
    </div>
  </div>
);

/**
 * Returns & Australian Consumer Law Page (/returns/)
 */
export const ReturnsPage: React.FC = () => (
  <div className="bg-slate-50 min-h-screen py-8">
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Returns &amp; Australian Consumer Law</h1>
      <div className="bg-white rounded-xl border border-slate-200 p-6 space-y-4 text-sm text-slate-700 leading-relaxed">
        <p>Goods bought from Bar Freezer come with consumer guarantees under the Australian Consumer Law. These guarantees cannot be excluded. They include that goods are of acceptable quality, fit for the purpose they are sold for, and match their description.</p>
        <h2 className="text-lg font-bold text-slate-900">If something is wrong with your order</h2>
        <p>If goods arrive damaged or faulty, contact us as soon as possible with your order number and photos. Where there is a major failure, you are entitled to choose a refund or a replacement. For other faults, we will repair or replace the goods, or provide a refund where the law requires it.</p>
        <h2 className="text-lg font-bold text-slate-900">Warranty claims and service</h2>
        <p>Manufacturer warranty terms are listed on each product. To lodge a claim, use the <Link href="/warranty/" className="text-cyan-700 font-semibold">warranty and service form</Link> with the model and serial number from the data plate.</p>
        <h2 className="text-lg font-bold text-slate-900">Change of mind</h2>
        <p>Consumer guarantees do not cover a change of mind. Please <Link href="/contact/" className="text-cyan-700 font-semibold">contact us</Link> before returning any item so we can confirm the options for your order.</p>
        <p className="text-xs text-slate-500">This page is general information, not legal advice. Your rights under the Australian Consumer Law apply regardless of what is written here.</p>
      </div>
    </div>
  </div>
);

/**
 * Contact Us Page (/contact/)
 */
export const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  const handleContact = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (sending) return;
    setSending(true);
    setError('');
    try {
      await sendEnquiry('contact', collectForm(e.currentTarget));
      setSubmitted(true);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="bg-slate-900 text-white rounded-xl border border-slate-800 p-6 sm:p-10 shadow-lg space-y-3">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Contact Bar Freezer Australia
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            Speak directly with a commercial refrigeration specialist about dimensions, power requirements, or custom project quotes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-xl border border-slate-200 space-y-4 text-xs">
            <h2 className="text-base font-bold text-slate-900">National Sales & Trade Hotline</h2>
            
            <div className="space-y-3 text-slate-700">
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900 block text-sm">{SITE.phoneDisplay}</span>
                  <span className="text-slate-500">Call to speak to sales</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                <div>
                  <a href={`mailto:${SITE.email}`} className="font-bold text-lg text-cyan-800 hover:text-cyan-700 underline underline-offset-2 block">{SITE.email}</a>
                  <span className="text-slate-500">Quotes &amp; trade enquiries: <a href="mailto:trade@barfreezer.com.au" className="text-cyan-800 underline">trade@barfreezer.com.au</a></span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900 block">Location</span>
                  <span className="text-slate-500">{SITE.headOffice}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200">
            {!submitted ? (
              <form onSubmit={handleContact} className="space-y-4 text-xs">
                <h2 className="text-base font-bold text-slate-900">Send an Online Inquiry</h2>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Your Name *</label>
                  <input type="text" required placeholder="Name" className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-slate-900" />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Email *</label>
                  <input type="email" required placeholder="name@venue.com.au" className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-slate-900" />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Message / Question *</label>
                  <textarea rows={3} required placeholder="Ask about equipment specs, stock availability, or delivery..." className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-slate-900" />
                </div>
                {error && <div role="alert" className="p-3 rounded border border-red-200 bg-red-50 text-red-800">{error}</div>}
                <button type="submit" disabled={sending} className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 disabled:opacity-60 text-slate-950 font-bold text-xs uppercase tracking-wider rounded transition-colors">
                  {sending ? 'Sending…' : 'Send Message'}
                </button>
              </form>
            ) : (
              <div className="py-8 text-center space-y-2 text-xs">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="text-base font-bold text-slate-900">Message Received</h4>
                <p className="text-slate-600">Our sales desk will reply to your enquiry by email.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Commercial Checkout Page (/checkout/)
 */
export const CheckoutPage: React.FC = () => {
  const { cart, subtotal, clearCart } = useCart();
  const [complete, setComplete] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [payMethod, setPayMethod] = useState('Osko');
  const [coin, setCoin] = useState('BTC');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  const deliveryFee = 0; // freight is quoted to the postcode and confirmed after the order request
  // 10% off the order total when paying with cryptocurrency
  const cryptoDiscount = payMethod === 'Crypto' ? Math.round(subtotal * 0.1 * 100) / 100 : 0;
  const grandTotal = subtotal - cryptoDiscount + deliveryFee;
  const gstOnTotal = Math.round(grandTotal / 11);

  const formRef = React.useRef<HTMLFormElement>(null);

  const placeOrder = async (form: HTMLFormElement, channel: 'email' | 'whatsapp') => {
    if (sending || cart.length === 0) return;
    if (!form.reportValidity()) return;
    const ref = makeOrderNumber();
    const fields = collectForm(form);
    fields['Payment Method'] = payMethod;
    if (cryptoDiscount > 0) fields['Crypto Discount (10%)'] = `-$${fmtNum(cryptoDiscount)} AUD (order total after discount: $${fmtNum(grandTotal)} AUD)`;
    const items = cart.map(({ product, quantity }: any) => ({ name: product.name, sku: product.sku, qty: quantity, price: product.price ?? null }));
    // window.open must run synchronously inside the click, before any await (pop-up blockers).
    if (channel === 'whatsapp') {
      window.open(
        waOrderLink(ref, { name: fields['Contact Name'] || '', phone: fields['Phone'] || '' }, cart.map(({ product, quantity }: any) => ({ name: product.name, quantity })), grandTotal),
        '_blank'
      );
    }
    setSending(true);
    setError('');
    try {
      await sendEnquiry('order', fields, { items, totals: { subtotal, delivery: deliveryFee, total: grandTotal, discount: cryptoDiscount }, ref, channel });
      setOrderId(ref);
      setComplete(true);
      clearCart();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSending(false);
    }
  };

  const handleOrder = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    placeOrder(e.currentTarget, 'email');
  };

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          Commercial Equipment Checkout
        </h1>

        {!complete ? (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <div className="md:col-span-7 bg-white p-6 rounded-xl border border-slate-200 space-y-4 text-xs">
              <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2">
                1. Delivery & Tax Invoice Details
              </h2>
              <form ref={formRef} onSubmit={handleOrder} className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Business Name (Optional)</label>
                    <input type="text" placeholder="Venue / Company Name" className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-slate-900" />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">ABN (For Tax Invoice)</label>
                    <input type="text" placeholder="ABN" className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-slate-900 font-mono" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Contact Name *</label>
                    <input type="text" required placeholder="Full Name" className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-slate-900" />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Phone *</label>
                    <input type="tel" required placeholder="0400 000 000" className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-slate-900" />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Email *</label>
                  <input type="email" required placeholder="name@venue.com.au" className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-slate-900" />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Delivery Street Address *</label>
                  <input type="text" required placeholder="Street address" className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-slate-900" />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Suburb *</label>
                    <input type="text" required placeholder="Suburb" className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-slate-900" />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">State *</label>
                    <select className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-slate-900">
                      <option>NSW</option><option>VIC</option><option>QLD</option><option>WA</option><option>SA</option><option>ACT</option><option>TAS</option><option>NT</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Postcode *</label>
                    <input type="text" required placeholder="Postcode" className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-slate-900 font-mono" />
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <h3 className="text-sm font-bold text-slate-900 mb-2">Payment Method</h3>
                  <div className="space-y-2">
                    {PAYMENT_OPTIONS.map(([value, title, hint]) => (
                      <label key={value} className={`p-3 rounded border flex items-center justify-between gap-3 cursor-pointer ${payMethod === value ? 'bg-amber-50 border-amber-400' : 'bg-slate-50 border-slate-300'}`}>
                        <span className="flex items-center gap-2">
                          <input type="radio" name="Payment Option" value={value} checked={payMethod === value} onChange={() => setPayMethod(value)} />
                          <span className="font-semibold text-slate-900">{title}</span>
                        </span>
                        <span className="text-[11px] text-slate-500 text-right">{hint}</span>
                      </label>
                    ))}
                  </div>
                  {payMethod === 'Crypto' && (
                    <div className="mt-2">
                      <label className="block font-semibold text-slate-700 mb-1">Preferred coin</label>
                      <select name="Crypto Coin" value={coin} onChange={(e) => setCoin(e.target.value)} className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-slate-900">
                        <option value="BTC">BTC (Bitcoin)</option><option value="USDT">USDT (Tether, TRC-20 on Tron)</option><option value="ETH">ETH (Ethereum)</option>
                      </select>
                      <div className="mt-3"><WalletBox coin={coin} /></div>
                      <p className="mt-2 text-[11px] text-slate-500">Pay only after we confirm your order and the exact amount in AUD by email. Your order is not paid until the transaction is verified.</p>
                    </div>
                  )}
                  <p className="mt-2 text-[11px] text-slate-500">No payment is taken on this page. We email your tax invoice and payment instructions after we confirm stock and freight.</p>
                </div>

                {error && <div role="alert" className="p-3 rounded border border-red-200 bg-red-50 text-red-800">{error}</div>}
                <button
                  type="submit"
                  disabled={sending || cart.length === 0}
                  className="w-full py-3 bg-amber-500 hover:bg-amber-400 disabled:opacity-60 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-md transition-colors shadow-sm"
                >
                  {sending ? 'Sending…' : `Place Order Request (${fmtNum(grandTotal)} AUD)`}
                </button>
                {whatsappEnabled() && (
                  <button
                    type="button"
                    disabled={sending || cart.length === 0}
                    onClick={() => formRef.current && placeOrder(formRef.current, 'whatsapp')}
                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-60 text-white font-bold text-xs uppercase tracking-wider rounded-md transition-colors"
                  >
                    Order via WhatsApp
                  </button>
                )}
              </form>
            </div>

            <div className="md:col-span-5 bg-white p-6 rounded-xl border border-slate-200 space-y-4 text-xs h-fit">
              <h2 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-2">Order Summary</h2>
              
              <div className="space-y-2 divide-y divide-slate-100 max-h-60 overflow-y-auto">
                {cart.map(({ product, quantity }) => (
                  <div key={product.id} className="pt-2 flex justify-between">
                    <div>
                      <span className="font-bold text-slate-900 block">{product.name}</span>
                      <span className="text-slate-500 font-mono">Qty: {quantity} x ${fmtNum(product.price)}</span>
                    </div>
                    <span className="font-mono font-bold text-slate-900">${fmtNum((product.price * quantity))}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-200 space-y-2">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal:</span>
                  <span className="font-mono">${fmtNum(subtotal)} AUD</span>
                </div>
                {cryptoDiscount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Crypto discount (10%):</span>
                    <span className="font-mono">-${fmtNum(cryptoDiscount)} AUD</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-500 text-[11px]">
                  <span>Includes 10% Australian GST:</span>
                  <span className="font-mono">${fmtNum(gstOnTotal)} AUD</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Freight:</span>
                  <span className="text-slate-700">Quoted to your postcode</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-slate-900 pt-2 border-t border-slate-200">
                  <span>Total (excl. freight):</span>
                  <span className="text-base font-mono">${fmtNum(grandTotal)} AUD</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-white p-10 rounded-xl border border-slate-200 text-center space-y-4 max-w-lg mx-auto">
            <CheckCircle2 className="w-16 h-16 text-emerald-600 mx-auto" />
            <span className="text-xs font-mono font-bold text-amber-700 bg-amber-50 px-3 py-1 rounded border border-amber-200">
              Order ID: {orderId}
            </span>
            <h2 className="text-2xl font-bold text-slate-900">Order Request Received</h2>
            <p className="text-xs text-slate-600 leading-relaxed">
              Thanks, we have received your order request. We will email your tax invoice and payment instructions shortly. Your order is not paid or dispatched until payment is confirmed.
            </p>
            {payMethod === 'Crypto' && (
              <div className="text-left space-y-2">
                <p className="text-xs font-semibold text-slate-700">Your chosen wallet</p>
                <WalletBox coin={coin} />
              </div>
            )}
            <div className="pt-2">
              <Link href="/" className="px-5 py-2.5 bg-slate-900 text-white font-semibold text-xs rounded-md">
                Return to Store
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

/**
 * 404 Not Found Page
 */
export const NotFoundPage: React.FC = () => {
  return (
    <div className="bg-slate-50 min-h-screen py-16 flex items-center justify-center">
      <div className="max-w-md mx-auto text-center space-y-4 px-4">
        <div className="text-6xl font-black font-mono text-slate-300">404</div>
        <h1 className="text-xl font-bold text-slate-900">Equipment Page Not Found</h1>
        <p className="text-xs text-slate-500">
          The refrigeration page or model code you requested does not exist or has been relocated in our Australian catalog.
        </p>
        <Link
          href="/"
          className="inline-block px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase rounded transition-colors"
        >
          Return to Bar Freezer Home
        </Link>
      </div>
    </div>
  );
};

