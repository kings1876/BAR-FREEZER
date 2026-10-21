import React, { useState } from 'react';
import { 
  Truck, 
  ShieldCheck, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Award, 
  Star, 
  Send, 
  CheckCircle2, 
  CreditCard,
  Building
} from 'lucide-react';
import { SITE, CATEGORIES, BRANDS, CITIES, VENUES } from '../config/site.js';
import { Link } from '../context/RouterContext';
import { sendEnquiry } from '../lib/enquiry-client';

export const Footer: React.FC = () => {
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const [subError, setSubError] = useState('');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) return;
    setSubError('');
    try {
      await sendEnquiry('newsletter', { Email: emailInput.trim() });
      setSubscribed(true);
      setEmailInput('');
    } catch (err) {
      setSubError((err as Error).message);
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800 text-xs">
      {/* Trust strip */}
      <div className="border-b border-slate-800/80 bg-slate-900/60 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6">
          <div>
            <p className="text-sm font-bold text-white">Australia-wide delivery</p>
            <p className="mt-1 text-slate-400 leading-relaxed">Freight is quoted to your postcode and confirmed with your order.</p>
          </div>
          <div>
            <p className="text-sm font-bold text-white">Warranty and service</p>
            <p className="mt-1 text-slate-400 leading-relaxed">Warranty terms are listed on each product. Lodge a claim online.</p>
          </div>
          <div>
            <p className="text-sm font-bold text-white">Compare before you buy</p>
            <p className="mt-1 text-slate-400 leading-relaxed">Specifications from manufacturers and suppliers, side by side.</p>
          </div>
          <div>
            <p className="text-sm font-bold text-white">Trade pricing</p>
            <p className="mt-1 text-slate-400 leading-relaxed">Request a quote for trade and multi-unit orders.</p>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        
        {/* Column 1: Company & Contact */}
        <div className="lg:col-span-2 space-y-4 pr-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-cyan-700 flex items-center justify-center text-white font-black text-sm">
              BF
            </div>
            <span className="text-lg font-bold text-white tracking-tight">BAR FREEZER AUSTRALIA</span>
          </div>

          <p className="text-slate-400 leading-relaxed">
            Bar Freezer Australia supplies commercial and home bar refrigeration: bar fridges, bar freezers, kegerators, wine fridges, ice machines and accessories, delivered Australia-wide.
          </p>

          {/* Trustpilot Review Badge */}
          <Link href="/reviews/" className="inline-flex items-center gap-2 p-2.5 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 transition-colors">
            <div className="flex items-center text-emerald-400">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 fill-current" />
              ))}
            </div>
            <span className="font-semibold text-white">4.9 / 5.0</span>
            <span className="text-slate-400">· 3,140+ Trustpilot Reviews</span>
          </Link>

          <div className="space-y-1.5 text-slate-400 pt-1">
            <div className="flex items-center gap-2">
              <span className="text-white font-semibold">{SITE.phoneDisplay}</span>
              
            </div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-slate-300">{SITE.email}</span>
            </div>
            <div className="flex items-start gap-2 pt-1">
              <span>{SITE.headOffice}</span>
            </div>
            <div className="flex items-center gap-2">
              <span>{SITE.tradingHours}</span>
            </div>
          </div>
        </div>

        {/* Column 2: Equipment Categories */}
        <div className="space-y-3">
          <p className="text-xs font-bold uppercase tracking-wider text-white">Refrigeration</p>
          <ul className="space-y-2 text-slate-400">
            <li><Link href="/bar-freezers/under-bar-freezers/" className="hover:text-white transition-colors">Underbar Freezers</Link></li>
            <li><Link href="/bar-freezers/back-bar-freezers/" className="hover:text-white transition-colors">Back Bar Freezers</Link></li>
            <li><Link href="/bar-freezers/glass-door-display-freezers/" className="hover:text-white transition-colors">Glass Display Freezers</Link></li>
            <li><Link href="/bar-freezers/glass-frosters-specialty/" className="hover:text-white transition-colors">Glass & Beer Mug Frosters</Link></li>
            <li><Link href="/bar-freezers/chest-bench-freezers/" className="hover:text-white transition-colors">Chest & Bench Freezers</Link></li>
            <li><Link href="/bar-freezers/upright-commercial-freezers/" className="hover:text-white transition-colors">Upright Kitchen Freezers</Link></li>
            <li><Link href="/bar-freezers/home-bar-outdoor-freezers/" className="hover:text-white transition-colors">Home Bar & Outdoor Freezers</Link></li>
            <li><Link href="/bar-fridges/bottle-coolers/" className="hover:text-white transition-colors">Bottle Coolers</Link></li>
            <li><Link href="/bar-fridges/kegerators-dispensers/" className="hover:text-white transition-colors">Kegerators &amp; Dispensers</Link></li>
            <li><Link href="/bar-fridges/wine-fridges/" className="hover:text-white transition-colors">Wine Fridges</Link></li>
            <li><Link href="/clearance/" className="text-rose-400 hover:text-rose-300 font-medium">Clearance & Ex-Display</Link></li>
          </ul>
        </div>

        {/* Column 3: Australian Delivery Hubs */}
        <div className="space-y-3">
          <p className="text-xs font-bold uppercase tracking-wider text-white">Delivery Australia-Wide</p>
          <ul className="space-y-1.5 text-slate-400 grid grid-cols-2 gap-x-2">
            {CITIES.map((c: any) => (
              <li key={c.slug}>
                <Link href={`/delivery/${c.slug}/`} className="hover:text-cyan-400 transition-colors inline-block py-1.5">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
          <div className="pt-2">
            <Link href="/delivery/" className="text-cyan-400 hover:text-cyan-300 font-semibold block">
              Delivery information &rarr;
            </Link>
          </div>
        </div>

        {/* Column 4: Trade & Support */}
        <div className="space-y-3">
          <p className="text-xs font-bold uppercase tracking-wider text-white">Trade & Operations</p>
          <ul className="space-y-2 text-slate-400">
            <li><Link href="/quote/" className="text-amber-400 hover:text-amber-300 font-semibold">Trade Pricing & Quotes</Link></li>
                        <li><Link href="/warranty/" className="hover:text-white transition-colors">Warranty & Service Claims</Link></li>
            <li><Link href="/finance/" className="hover:text-white transition-colors">Equipment Finance Enquiries</Link></li>
            <li><Link href="/compare/" className="hover:text-white transition-colors">Side-by-Side Spec Compare</Link></li>
            <li><Link href="/guides/" className="hover:text-white transition-colors">Buying Guides</Link></li>
            <li><Link href="/reviews/" className="hover:text-white transition-colors">Trustpilot Customer Reviews</Link></li>
            <li><Link href="/payment-methods/" className="hover:text-white transition-colors">Payment Methods</Link></li>
            <li><Link href="/returns/" className="hover:text-white transition-colors">Returns & Australian Consumer Law</Link></li>
            <li><Link href="/faq/" className="hover:text-white transition-colors">Equipment FAQs</Link></li>
            <li><Link href="/about/" className="hover:text-white transition-colors">About Bar Freezer Australia</Link></li>
            <li><Link href="/contact/" className="hover:text-white transition-colors">Contact Us</Link></li>
          </ul>
        </div>
      </div>

      {/* About and categories (plain text for readers and crawlers) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-2">
          <p className="text-xs font-bold uppercase tracking-wider text-white">About Bar Freezer Australia</p>
          <p className="text-slate-400 leading-relaxed">
            Bar Freezer Australia is an online supplier of bar fridges, bar freezers, kegerators, wine fridges, ice machines and refrigeration accessories for pubs, cafes, restaurants, venues and home bars. Every product page lists the specifications supplied by the manufacturer or supplier, so you can compare size, capacity, refrigerant and warranty before you buy. You can request a quote for several units, compare models side by side, and read our buying guides on sizing, ventilation and finishes.
          </p>
        </div>
        <dl className="space-y-2 text-slate-400">
          <div><dt className="inline font-semibold text-white">Delivery and payment: </dt><dd className="inline">we deliver Australia-wide, with freight quoted to your postcode. You can pay by bank transfer, PayID, Osko or cryptocurrency (BTC, USDT and ETH). Prices are in Australian dollars and include GST, and we supply a tax invoice with every order.</dd></div>
          <div><dt className="inline font-semibold text-white">Need help choosing? </dt><dd className="inline">read our buying guides on bar fridge sizes, glass and solid doors, ventilation, kegerators and wine fridges, or send us your list for a quote.</dd></div>
          <div><dt className="inline font-semibold text-white">Bar freezers: </dt><dd className="inline">under bar, back bar, glass door display, chest, upright and glass froster models for ice, garnishes and frozen stock.</dd></div>
          <div><dt className="inline font-semibold text-white">Bar fridges: </dt><dd className="inline">under bar, bottle cooler, back bar, beer, wine, kegerator, combination and outdoor models for drinks service.</dd></div>
          <div><dt className="inline font-semibold text-white">Accessories and parts: </dt><dd className="inline">shelves, door seals and locks, castors and legs, ice machines, cleaners and spare parts.</dd></div>
        </dl>
      </div>

      {/* Brands and venues */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-white">Brands</p>
          <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-slate-400">
            {BRANDS.map((b: any) => (
              <li key={b.slug}><Link href={`/brands/${b.slug}/`} className="hover:text-white">{b.name}</Link></li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-wider text-white">Venues</p>
          <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-slate-400">
            {VENUES.map((v: any) => (
              <li key={v.slug}><Link href={v.path} className="hover:text-white">{v.name}</Link></li>
            ))}
          </ul>
        </div>
      </div>

      {/* Trade Newsletter & Disclaimer Strip */}
      <div className="border-t border-slate-800 bg-slate-900/30 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-md">
            <p className="text-sm font-bold text-white">Product and Trade Updates</p>
            <p className="text-slate-400 text-xs mt-1">
              Occasional updates on new products, ex-display stock and buying guides.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="flex w-full md:w-auto max-w-md gap-2">
            <input
              type="email"
              required
              placeholder="Enter your email (e.g. venue@bar.com.au)"
              value={emailInput}
              onChange={(e) => setEmailInput(e.target.value)}
              className="bg-slate-900 border border-slate-700 text-slate-100 placeholder-slate-500 text-xs px-3 py-2 rounded-md focus:outline-none focus:border-amber-500 flex-1 md:w-64"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase rounded-md transition-colors whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        </div>
        {subError && <p role="alert" className="max-w-7xl mx-auto text-red-400 text-xs mt-2 text-center md:text-right">{subError}</p>}
        {subscribed && (
          <p className="max-w-7xl mx-auto text-emerald-400 text-xs mt-2 text-center md:text-right">
            ✓ Subscribed to Bar Freezer trade updates.
          </p>
        )}
      </div>

      {/* Bottom Legal Strip */}
      <div className="border-t border-slate-900 py-6 px-4 sm:px-6 lg:px-8 text-[11px] text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div>
            © {new Date().getFullYear()} {SITE.legalName}. ABN {SITE.abn}. All prices in AUD include 10% Australian GST.
          </div>
          <div className="flex flex-wrap items-center gap-4 text-slate-400">
            <Link href="/delivery/" className="hover:text-white">Shipping Policy</Link>
            <span>·</span>
            <Link href="/returns/" className="hover:text-white">Returns & Guarantees</Link>
            <span>·</span>
            <Link href="/warranty/" className="hover:text-white">Warranty</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
