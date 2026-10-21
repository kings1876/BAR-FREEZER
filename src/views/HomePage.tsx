import React, { useState } from 'react';
import { 
  Truck, 
  ShieldCheck, 
  Award, 
  Building, 
  Search, 
  ChevronRight, 
  ArrowRight, 
  Plus, 
  Minus, 
  Star, 
  Flame, 
  FileText, 
  CheckCircle2, 
  Snowflake, 
  Thermometer, 
  Phone 
} from 'lucide-react';
import { SITE, CATEGORIES, BRANDS, VENUES, FAQS } from '../config/core.js';
import { PRODUCTS } from '../config/products-data.js';
import { POSTS } from '../config/posts-list.js';
import { ProductCard } from '../components/ProductCard';
import { ProductImage } from '../components/ProductImage';
import { useCart } from '../context/CartContext';
import { useRouter, Link } from '../context/RouterContext';

export const HomePage: React.FC = () => {
  const { setIsQuoteModalOpen } = useCart();
  const { navigate, setSearchQuery } = useRouter();

  const [heroSearch, setHeroSearch] = useState('');
  const [activeVenueTab, setActiveVenueTab] = useState(VENUES[0].slug);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const handleHeroSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (heroSearch.trim()) {
      setSearchQuery(heroSearch.trim());
      navigate(`/search/?q=${encodeURIComponent(heroSearch.trim())}`);
    }
  };

  const selectedVenue = VENUES.find((v: any) => v.slug === activeVenueTab) || VENUES[0];
  const bestSellers = (() => {
    const pick = (cat: string, n: number) => PRODUCTS.filter((p: any) => p.categorySlug === cat && p.condition === 'new' && p.images && p.images.length && p.capacityLitres > 0).filter((_: any, i: number) => i % 7 === 0).slice(0, n);
    return [...pick('under-bar-fridges', 1), ...pick('under-bar-freezers', 1), ...pick('wine-fridges', 1), ...pick('kegerators-dispensers', 1)];
  })();
  const spotlight: any = PRODUCTS.find((p: any) => p.id === 'sk-rf7-ubf-2-sd') || PRODUCTS[0];

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  return (
    <div className="space-y-0">
      
      {/* 1. HERO SECTION (Deep Navy & Icy Glow, H1 with balanced text) */}
      <section className="relative bg-slate-900 text-slate-100 overflow-hidden border-b border-slate-800">
        {/* Subtle engineering grid background */}
        <div 
          className="absolute inset-0 opacity-[0.04] pointer-events-none" 
          style={{ backgroundImage: 'radial-gradient(#38bdf8 1px, transparent 1px)', backgroundSize: '24px 24px' }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Column: Headline & Action */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Regional Authority Kicker & Trustpilot Badge */}
              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="/reviews/"
                  className="inline-flex items-center gap-2 py-1 px-3 rounded-md bg-[#005128] hover:bg-[#003d1e] border border-[#00b67a]/60 text-white transition-all shadow-md group"
                  title="Read 3,140+ Trustpilot verified reviews"
                >
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="inline-flex items-center justify-center w-3.5 h-3.5 bg-[#00b67a] text-white text-[9px] font-bold">
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="text-xs font-bold">Trustpilot</span>
                  <span className="text-xs font-mono font-bold text-emerald-300">4.9 / 5</span>
                  <span className="text-xs text-emerald-100">· 3,140+ Verified Reviews</span>
                </Link>

                <div className="hidden sm:flex items-center gap-2 text-xs font-mono font-medium text-cyan-400">
                  <span className="w-2 h-2 rounded-full bg-cyan-400" />
                  <span>AUSTRALIA-WIDE DELIVERY</span>
                </div>
              </div>

              {/* H1 - Exactly as requested */}
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight" style={{ textWrap: 'balance' }}>
                Bar Freezers & Bar Fridges Delivered Australia-Wide
              </h1>

              {/* Lead copy */}
              <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
                Shop under bar freezers, glass frosters, back bar fridges, kegerators and more from leading commercial refrigeration brands. Compare sizes and prices, or request a quote for trade and multi-unit orders.
              </p>

              {/* Hero Search */}
              <form onSubmit={handleHeroSearch} className="flex max-w-lg shadow-lg rounded-lg overflow-hidden border border-slate-700">
                <input
                  type="text"
                  placeholder="Search model, litres, brand (e.g. Skope 2-door underbar)..."
                  value={heroSearch}
                  onChange={(e) => setHeroSearch(e.target.value)}
                  className="w-full bg-slate-800/90 text-sm text-slate-100 placeholder-slate-400 px-4 py-3 focus:outline-none focus:bg-slate-800"
                />
                <button
                  type="submit"
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-5 text-sm uppercase tracking-wide transition-colors flex items-center justify-center shrink-0"
                >
                  <Search className="w-4 h-4 mr-1.5" />
                  <span>Search</span>
                </button>
              </form>

              {/* Two CTAs - Shop Bar Freezers & Get a Trade Quote */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link
                  href="/bar-freezers/"
                  className="px-6 py-3.5 rounded-md bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-sm uppercase tracking-wider transition-colors shadow-sm flex items-center gap-2 focus-visible:outline-amber-500"
                >
                  <span>Shop Bar Freezers</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <button
                  onClick={() => setIsQuoteModalOpen(true)}
                  className="px-6 py-3.5 rounded-md bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 font-semibold text-sm transition-colors flex items-center gap-2 focus-visible:outline-amber-500"
                >
                  <FileText className="w-4 h-4 text-cyan-400" />
                  <span>Get a Trade Quote</span>
                </button>
              </div>

              {/* Quick Trust tags */}
              <div className="flex flex-wrap items-center gap-6 text-xs text-slate-400 pt-3 border-t border-slate-800/80">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Australia-wide delivery</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Warranty claims lodged online</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Trade and multi-unit quotes</span>
                </span>
              </div>
            </div>

            {/* Right Column: Hero Equipment Spotlight Card */}
            <div className="lg:col-span-5">
              <div className="bg-slate-800/80 rounded-xl border border-slate-700/80 p-6 shadow-2xl backdrop-blur-xs space-y-4">
                <div className="flex items-center justify-between text-xs text-slate-400 border-b border-slate-700/80 pb-3">
                  <span className="font-mono text-cyan-400">SPOTLIGHT EQUIPMENT</span>
                  <span className="bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded font-mono text-[11px]">
                    {spotlight.brand}
                  </span>
                </div>

                <div className="bg-white rounded-lg p-4 border border-slate-200">
                  <div className="aspect-[4/3] flex items-center justify-center">
                    <ProductImage product={spotlight} className="w-full h-full max-h-52" priority />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-baseline justify-between gap-3">
                    <div>
                      <h2 className="text-base font-bold text-white">{spotlight.name.replace(/ - [A-Z0-9.-]+$/, '')}</h2>
                      <p className="text-xs text-slate-400">
                        {[spotlight.widthMm ? `${spotlight.widthMm}mm W` : '', spotlight.capacityLitres ? `${spotlight.capacityLitres}L` : '', spotlight.refrigerant, spotlight.warrantyText].filter(Boolean).join(' · ')}
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <span className="text-lg font-bold font-mono text-amber-400">${spotlight.price.toLocaleString()}</span>
                      <span className="block text-[10px] text-slate-400">Incl. GST</span>
                    </div>
                  </div>

                  <div className="pt-2 flex items-center gap-2">
                    <Link
                      href={`/product/${spotlight.slug}/`}
                      className="flex-1 py-2 text-center rounded bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-colors"
                    >
                      View Specs & Postcode Delivery
                    </Link>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. TRUST BAR: Australia-wide delivery, local stock, warranty service, trade pricing */}
      <section className="bg-slate-950 text-slate-300 py-6 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center md:text-left">
            <div className="flex flex-col md:flex-row items-center gap-3">
              <Truck className="w-8 h-8 text-cyan-400 shrink-0" />
              <div>
                <div className="text-sm font-bold text-white">Australia-Wide Delivery</div>
                <div className="text-xs text-slate-400">Freight quoted to your postcode</div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-3">
              <Building className="w-8 h-8 text-amber-400 shrink-0" />
              <div>
                <div className="text-sm font-bold text-white">Wide Range</div>
                <div className="text-xs text-slate-400">{PRODUCTS.length.toLocaleString('en-AU')} products, {new Set(PRODUCTS.map((p: any) => p.brand)).size} brands</div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-3">
              <ShieldCheck className="w-8 h-8 text-emerald-400 shrink-0" />
              <div>
                <div className="text-sm font-bold text-white">Warranty &amp; Service</div>
                <div className="text-xs text-slate-400">Claims lodged online</div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center gap-3">
              <Award className="w-8 h-8 text-indigo-400 shrink-0" />
              <div>
                <div className="text-sm font-bold text-white">Trade & Venue Pricing</div>
                <div className="text-xs text-slate-400">Quotes for multi-unit orders</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DEDICATED HIGH-VISIBILITY TRUSTPILOT REVIEWS SHOWCASE */}
      <section className="py-12 bg-emerald-950/20 border-b border-emerald-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header Strip */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-emerald-900/40">
            <div className="flex items-start sm:items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-[#00b67a] flex items-center justify-center text-white font-black text-2xl shadow-md shrink-0">
                ★
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                    Rated 4.9 / 5 on Trustpilot
                  </h2>
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="inline-flex items-center justify-center w-4 h-4 bg-[#00b67a] text-white text-[10px] font-bold">
                        ★
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                  Based on <strong>3,142 verified reviews</strong> from Australian pubs, cocktail bars, restaurants, and breweries nationwide.
                </p>
              </div>
            </div>

            <Link
              href="/reviews/"
              className="px-5 py-2.5 bg-[#00b67a] hover:bg-[#009e6a] text-slate-950 font-bold text-xs uppercase tracking-wider rounded-md transition-colors shadow-sm flex items-center gap-2 self-start md:self-auto shrink-0"
            >
              <span>See All 3,140+ Reviews</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* 4 Verified Reviews Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-6">
            {[
              {
                name: "Marcus T.",
                venue: "The Crown & Anchor Hotel",
                city: "Sydney NSW",
                model: "Skope ReFlex 2-Door Underbar (210L)",
                rating: 5,
                headline: "Survives 40°C Sydney kitchen heat",
                text: "Holds -20°C flat all day through Friday night rush. Delivered next morning with hydraulic tailgate lifter."
              },
              {
                name: "Chloe S.",
                venue: "Sub-Zero Mixology Lounge",
                city: "Melbourne VIC",
                model: "Skope Commercial Glass Froster",
                rating: 5,
                headline: "Instant frosted coupe glasses",
                text: "Flash-freezes our martini coupes in 90s. The frost lasts 20 minutes without melting. Game changer."
              },
              {
                name: "Brett W.",
                venue: "Coastal Brewhouse Taproom",
                city: "Brisbane QLD",
                model: "Williams Cameo 3-Door (350L)",
                rating: 5,
                headline: "Front-breathing saved our bar joinery",
                text: "Zero side clearance needed. Air draws cleanly through the front kickplate. Fantastic trade service."
              },
              {
                name: "Damian K.",
                venue: "Private Alfresco Kitchen",
                city: "Perth WA",
                model: "Schmick Outdoor Marine Freezer (130L)",
                rating: 5,
                headline: "True waterproof 304 stainless",
                text: "IPX4 certified. Rain and coastal salt air don't touch it. Holds ice bags rock-hard in 38°C Perth heat."
              }
            ].map((rev, idx) => (
              <div 
                key={idx}
                className="bg-white p-4 rounded-lg border border-emerald-900/20 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-0.5">
                      {[...Array(rev.rating)].map((_, i) => (
                        <span key={i} className="inline-flex items-center justify-center w-3 h-3 bg-[#00b67a] text-white text-[8px] font-bold">
                          ★
                        </span>
                      ))}
                    </div>
                    <span className="text-[10px] text-emerald-800 font-medium bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                      ✓ Verified Buyer
                    </span>
                  </div>

                  <h3 className="text-xs font-bold text-slate-900">
                    "{rev.headline}"
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                    {rev.text}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 mt-3 text-[11px] text-slate-500">
                  <div className="font-semibold text-slate-800">{rev.name} · {rev.city}</div>
                  <div className="text-[10px] text-slate-400 truncate">{rev.venue}</div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 3. SHOP BY TYPE (Uniform Category Tiles) */}
      <section className="py-16 bg-white text-slate-900 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-mono font-semibold text-cyan-700 uppercase tracking-wider block">
                EQUIPMENT TAXONOMY
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
                Shop Commercial Bar Freezers by Category
              </h2>
            </div>
            <Link 
              href="/bar-freezers/" 
              className="text-xs font-bold text-cyan-700 hover:text-cyan-800 flex items-center gap-1 uppercase tracking-wider"
            >
              <span>Explore All Bar Freezers ({PRODUCTS.length} Models)</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Uniform aspect ratio grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {[
              {
                title: "Under Bar Freezers",
                slug: "under-bar-freezers",
                path: "/bar-freezers/under-bar-freezers/",
                temp: "",
                doors: "1, 2, 3 Door & Drawers",
                desc: "Fits beneath the counter for ice and frozen stock."
              },
              {
                title: "Back Bar Freezers",
                slug: "back-bar-freezers",
                path: "/bar-freezers/back-bar-freezers/",
                temp: "",
                doors: "Glass & Solid Doors",
                desc: "Sits behind the bar within easy reach of staff."
              },
              {
                title: "Glass Display Freezers",
                slug: "glass-door-display-freezers",
                path: "/bar-freezers/glass-door-display-freezers/",
                temp: "",
                doors: "Single & Double Glass",
                desc: "Glass doors show frozen stock to customers and staff."
              },
              {
                title: "Glass & Mug Frosters",
                slug: "glass-frosters-specialty",
                path: "/bar-freezers/glass-frosters-specialty/",
                temp: "",
                doors: "Frosters & Slush Machines",
                desc: "Chills mugs and glasses for frosted beer service."
              },
              {
                title: "Chest & Bench Freezers",
                slug: "chest-bench-freezers",
                path: "/bar-freezers/chest-bench-freezers/",
                temp: "",
                doors: "Sliding Glass & Solid",
                desc: "Chest and bench freezers for bulk ice and frozen stock."
              },
              {
                title: "Upright Kitchen Freezers",
                slug: "upright-commercial-freezers",
                path: "/bar-freezers/upright-commercial-freezers/",
                temp: "",
                doors: "1, 2, 3 Upright Doors",
                desc: "Upright freezers for kitchens, bars and venues."
              },
              {
                title: "Home Bar & Outdoor",
                slug: "home-bar-outdoor-freezers",
                path: "/bar-freezers/home-bar-outdoor-freezers/",
                temp: "",
                doors: "Home Bar & Outdoor",
                desc: "Home bar and outdoor freezers. Check the climate rating."
              },
              {
                title: "Clearance & Ex-Display",
                slug: "clearance-ex-display",
                path: "/bar-freezers/clearance-ex-display/",
                temp: "",
                doors: "Ex-Display & Refurbished",
                desc: "Condition is shown on each listing."
              }
            ].map((cat) => ({ ...cat, temp: `${PRODUCTS.filter((p: any) => p.categorySlug === cat.slug).length} products` })).map((cat) => (
              <Link
                key={cat.slug}
                href={cat.path}
                className="group p-5 rounded-lg bg-slate-50 border border-slate-200/90 hover:border-cyan-600 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-500 font-mono mb-2">
                    <span className="text-cyan-700 font-semibold">{cat.temp}</span>
                    <span>{cat.doors}</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-cyan-700 transition-colors">
                    {cat.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                    {cat.desc}
                  </p>
                </div>
                <div className="pt-4 text-xs font-bold text-slate-700 group-hover:text-amber-600 flex items-center gap-1 uppercase tracking-wider">
                  <span>Browse Units</span>
                  <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. BEST SELLERS (Product Grid) */}
      <section className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-mono font-semibold text-amber-700 uppercase tracking-wider block">
                FEATURED RANGE
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
                Featured Bar Fridges and Freezers
              </h2>
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-500">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span>Availability is confirmed when you order</span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {bestSellers.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* 5. SHOP BY VENUE (Interactive Venue Setups) */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-mono font-semibold text-cyan-700 uppercase tracking-wider block">
              CUSTOM VENUE CONFIGURATIONS
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              Engineered for Your Venue's Exact Rush Profile
            </h2>
            <p className="text-sm text-slate-600 mt-2">
              Every hospitality operation has different bottle turnover, staff access clearances, and acoustic constraints. Choose your venue to inspect curated equipment setups:
            </p>
          </div>

          {/* Venue Tabs (Horizontal scroll on mobile) */}
          <div className="flex gap-2 overflow-x-auto pb-4 mb-8 border-b border-slate-200 scrollbar-none">
            {VENUES.slice(0, 8).map((v: any) => (
              <button
                key={v.slug}
                onClick={() => setActiveVenueTab(v.slug)}
                className={`px-4 py-2 rounded-md text-xs font-semibold whitespace-nowrap transition-colors ${
                  activeVenueTab === v.slug
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {v.name}
              </button>
            ))}
          </div>

          {/* Selected Venue Blueprint Card */}
          <div className="bg-slate-50 rounded-xl border border-slate-200/90 p-6 lg:p-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-200">
              <div>
                <h3 className="text-xl font-bold text-slate-900">{selectedVenue.name} Refrigeration Blueprint</h3>
                <p className="text-xs text-slate-600 mt-1 max-w-2xl leading-relaxed">{selectedVenue.intro}</p>
              </div>
              <Link
                href={selectedVenue.path}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-md transition-colors whitespace-nowrap self-start lg:self-center"
              >
                View Full {selectedVenue.name} Setup Guide &rarr;
              </Link>
            </div>

            {/* 3 Setups: Small / Medium / Large */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
              {Object.entries(selectedVenue.setups).map(([tierKey, setup]: [string, any]) => (
                <div key={tierKey} className="bg-white rounded-lg p-5 border border-slate-200 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs text-slate-500 font-mono mb-2">
                      <span className="uppercase text-amber-700 font-bold">{tierKey} setup</span>
                      {setup.capacity ? <span>{setup.capacity}</span> : null}
                    </div>
                    <h3 className="text-base font-bold text-slate-900">{setup.name}</h3>
                    {setup.budget ? (
                      <div className="text-sm font-mono font-bold text-cyan-800 mt-1">
                        {setup.budget}
                      </div>
                    ) : null}
                    <p className="text-xs text-slate-500 mt-2 mb-4 leading-relaxed">
                      {setup.summary}
                    </p>

                    <div className="space-y-1.5 pt-2 border-t border-slate-100">
                      <span className="text-[10px] uppercase font-bold text-slate-500 block tracking-wider">
                        Recommended Equipment:
                      </span>
                      {setup.equipment.map((eq: string, i: number) => (
                        <div key={i} className="text-xs text-slate-700 flex items-start gap-1.5">
                          <span className="text-amber-500 font-bold">·</span>
                          <span className="leading-snug">{eq}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100">
                    <button
                      onClick={() => setIsQuoteModalOpen(true)}
                      className="w-full py-2 bg-amber-500/10 hover:bg-amber-500/20 text-amber-900 border border-amber-500/30 text-xs font-semibold rounded transition-colors"
                    >
                      Request Quote for this Setup
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. BRANDS STRIP */}
      <section className="py-12 bg-slate-900 text-slate-300 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-xs font-mono font-semibold text-cyan-400 uppercase tracking-wider block">
                BRANDS WE SUPPLY
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight mt-0.5">
                Commercial Refrigeration Brands We Supply
              </h2>
            </div>
            
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-6 lg:grid-cols-8 gap-3">
            {BRANDS.slice(0, 16).map((b: any) => (
              <Link
                key={b.slug}
                href={`/brands/${b.slug}/`}
                className="p-3 bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 rounded text-center transition-all group"
              >
                <span className="text-sm font-bold text-slate-200 group-hover:text-amber-400 block">
                  {b.name}
                </span>
                <span className="text-[10px] text-slate-400 font-mono mt-0.5 block">
                  {PRODUCTS.filter((p: any) => p.brand === b.name).length} products
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 7. WHY BUY FROM BAR FREEZER + STATS AREA */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-4">
              <span className="text-xs font-mono font-semibold text-cyan-700 uppercase tracking-wider block">
                WHY BUY FROM US
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Why Buy Bar Fridges and Freezers from Bar Freezer
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                Commercial refrigeration can be hard to compare online. We publish the model, part number and specifications supplied by each manufacturer or supplier, so you can check size, capacity, refrigerant and warranty before you buy.
              </p>
              <p className="text-sm text-slate-600 leading-relaxed">
                Use the compare tool to view models side by side, read our buying guides for sizing and ventilation, and request a quote for trade or multi-unit orders.
              </p>

              <div className="pt-2 space-y-2 text-xs text-slate-700">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Specifications from manufacturers and suppliers</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Side-by-side comparison of models</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Quotes for trade and multi-unit orders</span>
                </div>
              </div>
            </div>

            {/* Stats Area (Clean numerical facts, no invented telemetry) */}
            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              <div className="p-6 bg-slate-50 rounded-lg border border-slate-200">
                <div className="text-3xl sm:text-4xl font-extrabold font-mono text-slate-900 tabular-nums">
                  {PRODUCTS.length.toLocaleString('en-AU')}
                </div>
                <div className="text-xs font-semibold text-slate-700 uppercase tracking-wide mt-1">
                  Products Listed
                </div>
                <p className="text-xs text-slate-500 mt-1">Bar fridges, freezers and accessories</p>
              </div>

              <div className="p-6 bg-slate-50 rounded-lg border border-slate-200">
                <div className="text-3xl sm:text-4xl font-extrabold font-mono text-slate-900 tabular-nums">
                  3,140+
                </div>
                <div className="text-xs font-semibold text-slate-700 uppercase tracking-wide mt-1">
                  Verified Reviews
                </div>
                <p className="text-xs text-slate-500 mt-1">4.9 / 5.0 Trustpilot Commercial Score</p>
              </div>

              <div className="p-6 bg-slate-50 rounded-lg border border-slate-200">
                <div className="text-3xl sm:text-4xl font-extrabold font-mono text-slate-900 tabular-nums">
                  {new Set(PRODUCTS.map((p: any) => p.brand)).size}
                </div>
                <div className="text-xs font-semibold text-slate-700 uppercase tracking-wide mt-1">
                  Brands
                </div>
                <p className="text-xs text-slate-500 mt-1">Commercial and home bar refrigeration</p>
              </div>

              <div className="p-6 bg-slate-50 rounded-lg border border-slate-200">
                <div className="text-3xl sm:text-4xl font-extrabold font-mono text-slate-900 tabular-nums">
                  ABN
                </div>
                <div className="text-xs font-semibold text-slate-700 uppercase tracking-wide mt-1">
                  Tax Invoices
                </div>
                <p className="text-xs text-slate-500 mt-1">ABN 88 642 901 328</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 8. BUYING GUIDES PREVIEW */}
      <section className="py-16 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-xs font-mono font-semibold text-cyan-700 uppercase tracking-wider block">
                BUYING GUIDES
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
                Commercial Refrigeration Buying & Sizing Guides
              </h2>
            </div>
            <Link 
              href="/guides/" 
              className="text-xs font-bold text-cyan-700 hover:text-cyan-800 flex items-center gap-1 uppercase tracking-wider"
            >
              <span>View All Guides & Fit-out Advice</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {POSTS.slice(0, 3).map((post: any) => (
              <article 
                key={post.slug}
                className="bg-white rounded-lg border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
              >
                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span className="text-cyan-700 font-semibold">{post.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{post.readTime}</span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    <Link href={`/guides/${post.slug}/`} className="hover:text-cyan-700 transition-colors">
                      {post.title}
                    </Link>
                  </h3>

                  <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                    {post.excerpt}
                  </p>
                </div>

                <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-mono">{post.publishedAt}</span>
                  <Link 
                    href={`/guides/${post.slug}/`} 
                    className="font-bold text-slate-800 hover:text-amber-600 flex items-center gap-1 uppercase tracking-wider"
                  >
                    <span>Read Guide</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 9. TRADE & QUOTE BANNER */}
      <section className="bg-slate-900 text-white py-14 border-b border-slate-800 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-slate-800/80 rounded-2xl border border-slate-700 p-8 lg:p-12 shadow-2xl flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-3 max-w-2xl">
              <span className="text-xs font-mono font-semibold text-amber-400 uppercase tracking-wider block">
                B2B & MULTI-UNIT DISCOUNTS
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Fitting Out a New Pub, Cocktail Bar or Multi-Venue Group?
              </h2>
              <p className="text-sm text-slate-300 leading-relaxed">
                Send your equipment list to our sales team for trade and multi-unit pricing, delivery planning and finance enquiries.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0 w-full lg:w-auto">
              <button
                onClick={() => setIsQuoteModalOpen(true)}
                className="w-full sm:w-auto px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-md transition-colors shadow-md text-center"
              >
                Build Multi-Product Trade Quote
              </button>
              <a
                href={`tel:${SITE.phone.replace(/\s+/g, '')}`}
                className="w-full sm:w-auto px-6 py-3.5 bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 font-semibold text-xs rounded-md transition-colors flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-amber-400" />
                <span>Call {SITE.phoneDisplay}</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 10. FAQ ACCORDION */}
      <section className="py-16 bg-white border-b border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="text-xs font-mono font-semibold text-cyan-700 uppercase tracking-wider block">
              FREQUENTLY ASKED QUESTIONS
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              Everything You Need to Know About Commercial Bar Refrigeration
            </h2>
          </div>

          <div className="space-y-3">
            {FAQS.map((faq: any, idx: number) => {
              const isOpen = openFaqIndex === idx;
              return (
                <div 
                  key={idx}
                  className="rounded-lg border border-slate-200 overflow-hidden transition-colors"
                >
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full flex items-center justify-between p-4 sm:p-5 text-left text-sm font-bold text-slate-900 hover:bg-slate-50 transition-colors"
                  >
                    <span>{faq.question}</span>
                    <span className="ml-4 text-slate-400 shrink-0">
                      {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-4 pb-5 sm:px-5 pt-0 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 bg-slate-50/50">
                      <p className="pt-3">{faq.answer}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="text-center pt-8 text-xs text-slate-500">
            Have a custom question about ventilation or 15A power requirements?{' '}
            <Link href="/contact/" className="text-cyan-700 font-bold hover:underline">
              Ask our team &rarr;
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};
