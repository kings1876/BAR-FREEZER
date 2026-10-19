import React, { useState } from 'react';
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
import { SITE, PRODUCTS, FAQS, BRANDS } from '../config/site.js';
import { ProductCard } from '../components/ProductCard';
import { collectForm, sendEnquiry } from '../lib/enquiry-client';
import { makeOrderNumber } from '../lib/order';
import { waOrderLink, whatsappEnabled } from '../lib/whatsapp';
import { useCart } from '../context/CartContext';
import { useRouter, Link } from '../context/RouterContext';

/**
 * Clearance, Ex-Display & Deals Page (/deals/)
 */
export const DealsPage: React.FC = () => {
  const clearanceItems = PRODUCTS.filter(
    (p: any) => p.condition === 'ex-display' || p.condition === 'factory-second' || p.categorySlug === 'clearance-ex-display' || p.price < 2000
  );

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="bg-rose-950 text-white rounded-xl border border-rose-900 p-6 sm:p-10 shadow-lg space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold text-rose-400 uppercase tracking-wider">
            <Flame className="w-4 h-4 text-rose-400" />
            <span>DISCOUNTED WAREHOUSE CLEARANCE & SECONDS</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Commercial Bar Freezers & Coolers Clearance
          </h1>
          <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
            Showroom ex-display models, carton-damaged factory seconds, and overstock commercial inventory. Every unit is pressure-tested by licensed technicians and covered by full Australian warranty.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {clearanceItems.map((p: any) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </div>
  );
};

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
            <span>HOSPITALITY EQUIPMENT LEASING</span>
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            Preserve Your Working Capital with SilverChef & Zip
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            Opening or renovating an Australian bar or restaurant demands liquidity. Rather than tying up tens of thousands of dollars in commercial refrigeration purchases upfront, utilize 100% tax-deductible rental and lease solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white rounded-xl border border-slate-200 space-y-3 flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono font-bold uppercase text-cyan-700">SilverChef Partner</span>
              <h3 className="text-lg font-bold text-slate-900 mt-1">Rent-Try-Buy</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                12-month flexible agreement with low weekly payments. 100% tax deductible as an operating expense. Option to purchase with a 75% rental rebate after 12 months.
              </p>
            </div>
            <button
              onClick={() => setIsQuoteModalOpen(true)}
              className="w-full py-2 bg-slate-900 text-white text-xs font-semibold rounded hover:bg-slate-800"
            >
              Apply via Quote Desk
            </button>
          </div>

          <div className="p-6 bg-white rounded-xl border border-slate-200 space-y-3 flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono font-bold uppercase text-amber-700">Commercial Credit</span>
              <h3 className="text-lg font-bold text-slate-900 mt-1">Zip Business</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Up to $150k line of credit for Australian businesses with interest-free terms available. Buy your refrigeration equipment today and pay over manageable monthly terms.
              </p>
            </div>
            <a
              href="https://zip.co/au/business"
              target="_blank"
              rel="noreferrer"
              className="w-full py-2 bg-slate-100 text-slate-800 text-xs font-semibold rounded text-center hover:bg-slate-200"
            >
              Learn More at Zip
            </a>
          </div>

          <div className="p-6 bg-white rounded-xl border border-slate-200 space-y-3 flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono font-bold uppercase text-emerald-700">Small Orders</span>
              <h3 className="text-lg font-bold text-slate-900 mt-1">Afterpay for Home Bars</h3>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                Split orders up to $2,000 into 4 equal fortnightly payments with zero interest. Ideal for alfresco bar fridges, man cave accessories, and beer dispensers.
              </p>
            </div>
            <Link
              href="/bar-freezers/"
              className="w-full py-2 bg-slate-100 text-slate-800 text-xs font-semibold rounded text-center hover:bg-slate-200"
            >
              Browse Equipment
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
  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="bg-white rounded-xl border border-slate-200/90 p-6 sm:p-10 shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold text-cyan-700 uppercase tracking-wider">
            <span>ABOUT BAR FREEZER AUSTRALIA</span>
            <span>·</span>
            <span>ESTABLISHED TRADE SUPPLIER</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Australia's Specialist Commercial Bar Refrigeration Stockist
          </h1>

          <p className="text-sm text-slate-700 leading-relaxed">
            Bar Freezer (barfreezer.com.au) was founded with one clear mission: to supply Australian hospitality operators, pub groups, boutique mixology bars, and luxury home entertainers with commercial-grade refrigeration that actually withstands the brutal Australian climate.
          </p>

          <p className="text-sm text-slate-700 leading-relaxed">
            Unlike online equipment brokers who drop-ship products from third-party distribution hubs, we hold our own stock in dedicated warehouses across Sydney, Melbourne, Brisbane, and Perth. Every single unit we dispatch has been tested to meet strict Australian MEPS energy efficiency standards and RCM electrical safety compliance.
          </p>

          <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center text-xs">
            <div>
              <span className="font-mono font-bold text-lg text-slate-900 block">3,140+</span>
              <span className="text-slate-500">Verified Reviews</span>
            </div>
            <div>
              <span className="font-mono font-bold text-lg text-slate-900 block">4 Hubs</span>
              <span className="text-slate-500">SYD, MEL, BNE, PER</span>
            </div>
            <div>
              <span className="font-mono font-bold text-lg text-slate-900 block">43°C</span>
              <span className="text-slate-500">Tropical Ambients</span>
            </div>
            <div>
              <span className="font-mono font-bold text-lg text-slate-900 block">100%</span>
              <span className="text-slate-500">Australian Owned</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PAYMENT_OPTIONS: [string, string, string][] = [
  ['Bank Transfer', 'Bank Transfer (EFT)', 'Bank details on your tax invoice'],
  ['PayID', 'PayID', 'PayID details on your tax invoice'],
  ['Osko', 'Osko (instant bank payment)', 'Pay instantly from your banking app'],
  ['Crypto', 'Cryptocurrency (BTC, USDT, ETH)', 'Wallet address and AUD amount emailed after order']
];

export const PaymentMethodsPage: React.FC = () => (
  <div className="bg-slate-50 min-h-screen py-8">
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
      <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Payment Methods</h1>
      <p className="text-sm text-slate-600">We accept the payment methods below. After you place an order request we confirm stock and freight, then email your tax invoice with payment instructions. Orders are dispatched once payment is confirmed. All prices are in AUD and include GST.</p>
      {[
        ['Bank Transfer (EFT)', 'Pay by direct bank transfer using the account details on your tax invoice. Use your order reference so we can match the payment.'],
        ['PayID', 'Pay instantly to our PayID shown on your tax invoice, from any participating Australian bank app.'],
        ['Osko', 'Osko payments settle in minutes, including after hours. Use the PayID or account details on your invoice.'],
        ['Cryptocurrency (BTC, USDT, ETH)', 'We accept Bitcoin (BTC), Tether (USDT, on the Tron network as TRC-20) and Ethereum (ETH). Choose crypto at checkout and tell us which coin you prefer in your order; we email the wallet address and network, with the AUD amount converted at the time of invoice. Send the exact amount quoted on the network we specify; the order is confirmed once the transaction is verified.']
      ].map(([t, d]) => (
        <div key={t} className="bg-white p-5 rounded-xl border border-slate-200">
          <h2 className="text-base font-bold text-slate-900">{t}</h2>
          <p className="text-xs text-slate-600 mt-1 leading-relaxed">{d}</p>
        </div>
      ))}
      <p className="text-xs text-slate-500">Questions about paying? <Link href="/contact/" className="text-cyan-700 font-semibold">Contact us</Link>.</p>
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
            <h3 className="text-base font-bold text-slate-900">National Sales & Trade Hotline</h3>
            
            <div className="space-y-3 text-slate-700">
              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900 block text-sm">{SITE.phoneDisplay}</span>
                  <span className="text-slate-500">Toll-free across Australia (Mon - Fri: 7:30am - 5:30pm AEST)</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-cyan-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-mono font-bold text-slate-900 block">{SITE.email}</span>
                  <span className="text-slate-500">Quotes & General Inquiries: trade@barfreezer.com.au</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900 block">National Head Office & Depot</span>
                  <span className="text-slate-500">{SITE.headOffice}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200">
            {!submitted ? (
              <form onSubmit={handleContact} className="space-y-4 text-xs">
                <h3 className="text-base font-bold text-slate-900">Send an Online Inquiry</h3>
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
                <p className="text-slate-600">Our sales desk will respond within 2 business hours.</p>
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
  const { cart, subtotal, gstAmount, clearCart } = useCart();
  const [complete, setComplete] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [payMethod, setPayMethod] = useState('Bank Transfer');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  const deliveryFee = subtotal >= 3500 ? 0 : 89;
  const grandTotal = subtotal + deliveryFee;

  const formRef = React.useRef<HTMLFormElement>(null);

  const placeOrder = async (form: HTMLFormElement, channel: 'email' | 'whatsapp') => {
    if (sending || cart.length === 0) return;
    if (!form.reportValidity()) return;
    const ref = makeOrderNumber();
    const fields = collectForm(form);
    fields['Payment Method'] = payMethod;
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
      await sendEnquiry('order', fields, { items, totals: { subtotal, delivery: deliveryFee, total: grandTotal }, ref, channel });
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
                      <select name="Crypto Coin" className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-slate-900">
                        <option>BTC (Bitcoin)</option><option>USDT (Tether, TRC-20 on Tron)</option><option>ETH (Ethereum)</option>
                      </select>
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
                  {sending ? 'Sending…' : `Place Order Request (${grandTotal.toLocaleString()} AUD)`}
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
                      <span className="text-slate-500 font-mono">Qty: {quantity} x ${product.price.toLocaleString()}</span>
                    </div>
                    <span className="font-mono font-bold text-slate-900">${(product.price * quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-200 space-y-2">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal:</span>
                  <span className="font-mono">${subtotal.toLocaleString()} AUD</span>
                </div>
                <div className="flex justify-between text-slate-500 text-[11px]">
                  <span>10% Australian GST:</span>
                  <span className="font-mono">${gstAmount.toLocaleString()} AUD</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Freight Delivery:</span>
                  <span className="font-mono text-emerald-700">{deliveryFee === 0 ? 'FREE' : '$89.00 AUD'}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-slate-900 pt-2 border-t border-slate-200">
                  <span>Total Payable:</span>
                  <span className="text-base font-mono">${grandTotal.toLocaleString()} AUD</span>
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
 * Search Results Page (/search/)
 */
export const SearchPage: React.FC = () => {
  const { searchQuery } = useRouter();
  const q = (searchQuery || '').trim().toLowerCase();

  const results = PRODUCTS.filter((p: any) =>
    p.name.toLowerCase().includes(q) ||
    p.brand.toLowerCase().includes(q) ||
    p.sku.toLowerCase().includes(q) ||
    p.categorySlug.toLowerCase().includes(q) ||
    p.shortDescription.toLowerCase().includes(q)
  );

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <h1 className="text-2xl font-bold text-slate-900">
          Search Results for "{searchQuery}" ({results.length} items found)
        </h1>

        {results.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {results.map((p: any) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <div className="bg-white p-12 rounded-xl border border-slate-200 text-center space-y-3">
            <p className="text-sm text-slate-600">No exact matches found. Try searching by brand (e.g. Skope, Bromic, Williams) or litres.</p>
            <Link href="/bar-freezers/" className="inline-block px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded">
              Browse All Bar Freezers
            </Link>
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
