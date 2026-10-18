import React, { useState, useRef, useEffect } from 'react';
import { 
  Phone, 
  Search, 
  ShoppingBag, 
  ChevronDown, 
  Menu, 
  X, 
  Sparkles, 
  FileText, 
  Truck, 
  ShieldCheck, 
  Star, 
  Check, 
  Flame, 
  ArrowRight,
  SlidersHorizontal
} from 'lucide-react';
import { SITE, CATEGORIES, BRANDS, VENUES, PRODUCTS, CITIES } from '../config/site.js';
import { useCart } from '../context/CartContext';
import { useRouter, Link } from '../context/RouterContext';

export const Header: React.FC = () => {
  const { cartCount, setIsCartOpen, setIsQuoteModalOpen, openQuoteForCart } = useCart();
  const { navigate, searchQuery, setSearchQuery } = useRouter();

  const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const navContainerRef = useRef<HTMLDivElement>(null);
  const megaMenuRef = useRef<HTMLDivElement>(null);

  // Close menus on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(e.target as Node)) {
        setIsSearchActive(false);
      }
      if (
        navContainerRef.current &&
        !navContainerRef.current.contains(e.target as Node) &&
        !(megaMenuRef.current && megaMenuRef.current.contains(e.target as Node))
      ) {
        setActiveMegaMenu(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Autosuggest filtering
  const queryClean = searchInput.trim().toLowerCase();
  const suggestedProducts = queryClean.length >= 2
    ? PRODUCTS.filter((p: any) => 
        p.name.toLowerCase().includes(queryClean) ||
        p.brand.toLowerCase().includes(queryClean) ||
        p.sku.toLowerCase().includes(queryClean) ||
        p.subCategory?.toLowerCase().includes(queryClean)
      ).slice(0, 5)
    : [];

  const suggestedBrands = queryClean.length >= 2
    ? BRANDS.filter((b: any) => b.name.toLowerCase().includes(queryClean)).slice(0, 3)
    : [];

  const suggestedVenues = queryClean.length >= 2
    ? VENUES.filter((v: any) => v.name.toLowerCase().includes(queryClean)).slice(0, 3)
    : [];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      setSearchQuery(searchInput.trim());
      setIsSearchActive(false);
      navigate(`/search/?q=${encodeURIComponent(searchInput.trim())}`);
    }
  };

  const barFreezersCat = CATEGORIES.find((c: any) => c.slug === 'bar-freezers');
  const barFridgesCat = CATEGORIES.find((c: any) => c.slug === 'bar-fridges');
  const accessoriesCat = CATEGORIES.find((c: any) => c.slug === 'accessories-parts');

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-900 border-b border-slate-800 text-slate-100 shadow-md">
      {/* Top Utility & Trust Bar */}
      <div className="bg-slate-950 text-slate-300 text-xs py-1.5 px-4 sm:px-6 lg:px-8 border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          {/* High-Visibility Trustpilot Score & AU Trade Banner */}
          <div className="flex items-center gap-3">
            <Link 
              href="/reviews/" 
              className="inline-flex items-center gap-2 py-0.5 px-2.5 rounded bg-[#005128] hover:bg-[#003d1e] border border-[#00b67a]/60 text-white transition-all shadow-xs group"
              title="Read 3,140+ Trustpilot Customer Reviews"
            >
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="inline-flex items-center justify-center w-3 h-3 bg-[#00b67a] text-white text-[8px] font-bold">
                    ★
                  </span>
                ))}
              </div>
              <span className="font-bold tracking-tight text-white text-xs">Trustpilot</span>
              <span className="font-mono font-bold text-emerald-300 text-xs">4.9 / 5</span>
              <span className="text-[11px] text-emerald-100 font-medium">· 3,140+ Verified Reviews</span>
            </Link>
            <span className="hidden lg:inline text-slate-600">|</span>
            <span className="hidden lg:inline text-slate-400">
              Own stock in Sydney, Melbourne, Brisbane & Perth warehouses
            </span>
          </div>

          {/* Quick links & Direct Contact */}
          <div className="flex items-center gap-4">
            <Link href="/delivery/" className="hover:text-white transition-colors flex items-center gap-1">
              <Truck className="w-3.5 h-3.5 text-cyan-400" />
              <span>Australia-Wide Delivery</span>
            </Link>
            <Link href="/warranty-service/" className="hidden sm:flex items-center gap-1 hover:text-white transition-colors">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>Warranty Service</span>
            </Link>
            <a 
              href={`tel:${SITE.phone.replace(/\s+/g, '')}`} 
              className="text-amber-400 font-semibold flex items-center gap-1 hover:text-amber-300 transition-colors"
            >
              <Phone className="w-3 h-3" />
              <span>{SITE.phoneDisplay}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar (Follows Top Bar Contract: Brand - 7 Nav Links - Primary Action) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" ref={navContainerRef}>
        <div className="flex items-center justify-between gap-4 lg:gap-8 h-18">
          
          {/* Zone 1: Single text element wordmark */}
          <div className="flex items-center gap-3 shrink-0">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
              className="lg:hidden p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-md focus-visible:outline-amber-500"
              aria-label="Toggle navigation menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
            <Link href="/" className="group flex items-center gap-2.5 whitespace-nowrap focus-visible:outline-amber-500">
              <div className="w-9 h-9 rounded bg-cyan-600 flex items-center justify-center text-white font-black text-lg tracking-wider shadow-sm group-hover:bg-cyan-500 transition-colors">
                BF
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight text-white leading-none">
                  BAR FREEZER
                </span>
                <span className="text-[10px] tracking-widest text-cyan-400 uppercase font-mono font-medium mt-0.5">
                  Australia · Commercial & Home
                </span>
              </div>
            </Link>
          </div>

          {/* Search bar with Autosuggest dropdown */}
          <div className="hidden md:flex flex-1 max-w-md relative" ref={searchContainerRef}>
            <form onSubmit={handleSearchSubmit} className="w-full relative">
              <input
                type="text"
                placeholder="Search Skope, underbar freezers, glass frosters..."
                value={searchInput}
                onChange={(e) => {
                  setSearchInput(e.target.value);
                  setIsSearchActive(true);
                }}
                onFocus={() => setIsSearchActive(true)}
                className="w-full bg-slate-800/90 text-sm text-slate-100 placeholder-slate-400 pl-10 pr-4 py-2 rounded-md border border-slate-700 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              {searchInput && (
                <button 
                  type="button" 
                  onClick={() => setSearchInput('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs"
                >
                  Clear
                </button>
              )}
            </form>

            {/* Autosuggest Dropdown UI */}
            {isSearchActive && queryClean.length >= 2 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-slate-900 border border-slate-700 rounded-lg shadow-2xl overflow-hidden z-50">
                <div className="p-3 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400">
                  <span>Search Suggestions for <strong className="text-white">"{searchInput}"</strong></span>
                  <span className="font-mono">{suggestedProducts.length} matches</span>
                </div>

                {suggestedProducts.length > 0 && (
                  <div className="py-2">
                    <div className="px-3 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                      Equipment & Models
                    </div>
                    {suggestedProducts.map((p: any) => (
                      <Link
                        key={p.id}
                        href={`/product/${p.slug}/`}
                        onClick={() => setIsSearchActive(false)}
                        className="flex items-center justify-between px-3 py-2 hover:bg-slate-800/90 transition-colors group"
                      >
                        <div className="flex flex-col pr-2">
                          <span className="text-sm font-medium text-slate-200 group-hover:text-amber-400 line-clamp-1">
                            {p.name}
                          </span>
                          <span className="text-xs text-slate-400">
                            {p.brand} · {p.tempRange} · {p.capacityLitres}L
                          </span>
                        </div>
                        <span className="text-sm font-mono font-bold text-white whitespace-nowrap">
                          ${p.price.toLocaleString()} AUD
                        </span>
                      </Link>
                    ))}
                  </div>
                )}

                {suggestedBrands.length > 0 && (
                  <div className="py-2 border-t border-slate-800 bg-slate-950/40">
                    <div className="px-3 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                      Brands
                    </div>
                    <div className="px-3 flex flex-wrap gap-2 py-1">
                      {suggestedBrands.map((b: any) => (
                        <Link
                          key={b.slug}
                          href={`/brands/${b.slug}/`}
                          onClick={() => setIsSearchActive(false)}
                          className="px-2.5 py-1 text-xs rounded bg-slate-800 text-slate-200 hover:bg-amber-600 hover:text-white transition-colors"
                        >
                          {b.name} Commercial ({b.warrantyYears}yr Warranty)
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {suggestedVenues.length > 0 && (
                  <div className="py-2 border-t border-slate-800 bg-slate-950/40">
                    <div className="px-3 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                      Venue Setups
                    </div>
                    <div className="px-3 flex flex-wrap gap-2 py-1">
                      {suggestedVenues.map((v: any) => (
                        <Link
                          key={v.slug}
                          href={`/venues/${v.slug}/`}
                          onClick={() => setIsSearchActive(false)}
                          className="px-2.5 py-1 text-xs rounded bg-slate-800 text-slate-200 hover:bg-cyan-600 hover:text-white transition-colors"
                        >
                          {v.name} Refrigeration Guide
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                <div className="p-2.5 bg-slate-950 border-t border-slate-800 text-center">
                  <button
                    onClick={handleSearchSubmit}
                    className="w-full text-xs text-amber-400 hover:text-amber-300 font-medium py-1"
                  >
                    View all matching results for "{searchInput}" &rarr;
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Zone 3: Primary Action & Quick Tools */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Compare Bar Icon */}
            <Link
              href="/compare/"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
              title="Compare side-by-side"
            >
              <SlidersHorizontal className="w-4 h-4 text-cyan-400" />
              <span>Compare</span>
            </Link>

            {/* Cart Trigger Button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-md transition-colors focus-visible:outline-amber-500"
              aria-label={`Shopping Cart (${cartCount} items)`}
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-amber-500 text-slate-950 font-bold text-xs rounded-full flex items-center justify-center font-mono">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Primary Action Button (Trade Quote in warm amber accent) */}
            <button
              onClick={() => setIsQuoteModalOpen(true)}
              className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-slate-950 bg-amber-500 hover:bg-amber-400 active:bg-amber-600 rounded-md transition-colors shadow-xs whitespace-nowrap shrink-0 focus-visible:outline-amber-500"
            >
              Get a Trade Quote
            </button>
          </div>
        </div>

        {/* Zone 2: Navigation Links (7 items max) with Mega Menus */}
        <nav 
          className="hidden lg:flex items-center justify-between border-t border-slate-800/80 py-2.5 text-sm font-medium"
          aria-label="Main Navigation"
        >
          {/* 1. Bar Freezers */}
          <div className="relative group">
            <button 
              onMouseEnter={() => setActiveMegaMenu('bar-freezers')}
              onClick={() => setActiveMegaMenu(activeMegaMenu === 'bar-freezers' ? null : 'bar-freezers')}
              className="flex items-center gap-1 text-slate-200 hover:text-amber-400 transition-colors py-1 whitespace-nowrap focus-visible:outline-amber-500"
            >
              <span>1. Bar Freezers</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-400 transition-transform duration-200 group-hover:rotate-180" />
            </button>
          </div>

          {/* 2. Bar Fridges & Coolers */}
          <div className="relative group">
            <button 
              onMouseEnter={() => setActiveMegaMenu('bar-fridges')}
              onClick={() => setActiveMegaMenu(activeMegaMenu === 'bar-fridges' ? null : 'bar-fridges')}
              className="flex items-center gap-1 text-slate-200 hover:text-amber-400 transition-colors py-1 whitespace-nowrap focus-visible:outline-amber-500"
            >
              <span>2. Bar Fridges & Coolers</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-400 transition-transform duration-200 group-hover:rotate-180" />
            </button>
          </div>

          {/* 3. Shop by Venue */}
          <div className="relative group">
            <button 
              onMouseEnter={() => setActiveMegaMenu('venues')}
              onClick={() => setActiveMegaMenu(activeMegaMenu === 'venues' ? null : 'venues')}
              className="flex items-center gap-1 text-slate-200 hover:text-amber-400 transition-colors py-1 whitespace-nowrap focus-visible:outline-amber-500"
            >
              <span>3. Shop by Venue</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-400 transition-transform duration-200 group-hover:rotate-180" />
            </button>
          </div>

          {/* 4. Brands */}
          <div className="relative group">
            <button 
              onMouseEnter={() => setActiveMegaMenu('brands')}
              onClick={() => setActiveMegaMenu(activeMegaMenu === 'brands' ? null : 'brands')}
              className="flex items-center gap-1 text-slate-200 hover:text-amber-400 transition-colors py-1 whitespace-nowrap focus-visible:outline-amber-500"
            >
              <span>4. Brands</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-400 transition-transform duration-200 group-hover:rotate-180" />
            </button>
          </div>

          {/* 5. Accessories & Parts */}
          <div className="relative group">
            <button 
              onMouseEnter={() => setActiveMegaMenu('accessories')}
              onClick={() => setActiveMegaMenu(activeMegaMenu === 'accessories' ? null : 'accessories')}
              className="flex items-center gap-1 text-slate-200 hover:text-amber-400 transition-colors py-1 whitespace-nowrap focus-visible:outline-amber-500"
            >
              <span>5. Accessories & Parts</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-amber-400 transition-transform duration-200 group-hover:rotate-180" />
            </button>
          </div>

          {/* 6. Buying Guides */}
          <Link 
            href="/guides/" 
            className="text-slate-200 hover:text-amber-400 transition-colors py-1 whitespace-nowrap"
          >
            6. Buying Guides
          </Link>

          {/* 7. Trade & Quotes */}
          <Link 
            href="/trade/" 
            className="text-amber-400 hover:text-amber-300 font-semibold transition-colors py-1 whitespace-nowrap flex items-center gap-1"
          >
            <span>7. Trade & Quotes</span>
          </Link>

          {/* Hot Deals Badge Link */}
          <Link 
            href="/deals/" 
            className="text-rose-400 hover:text-rose-300 text-xs font-bold uppercase tracking-wider flex items-center gap-1 px-2 py-0.5 rounded bg-rose-950/40 border border-rose-800/60"
          >
            <Flame className="w-3.5 h-3.5 text-rose-400" />
            <span>Clearance Deals</span>
          </Link>
        </nav>
      </div>

      {/* Mega Menus Overlay */}
      {activeMegaMenu && (
        <div 
          ref={megaMenuRef} 
          onMouseLeave={() => setActiveMegaMenu(null)}
          className="hidden lg:block absolute top-full left-0 right-0 bg-slate-900/98 backdrop-blur-md border-b border-slate-700 shadow-2xl py-8 z-50 text-slate-100"
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            
            {/* 1. Bar Freezers Mega Menu */}
            {activeMegaMenu === 'bar-freezers' && barFreezersCat && (
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-white flex items-center gap-2">
                      <span>Commercial Bar Freezers</span>
                      <span className="text-xs font-normal text-cyan-400 font-mono">43°C Tropical Ambient Rated</span>
                    </h2>
                    <p className="text-xs text-slate-400 mt-0.5">Heavy-duty sub-zero cooling from single door compacts to 3-door upright hotel workhorses.</p>
                  </div>
                  <Link 
                    href="/bar-freezers/" 
                    onClick={() => setActiveMegaMenu(null)}
                    className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1"
                  >
                    <span>View All Bar Freezers ({PRODUCTS.filter((p: any) => p.primaryCategory === 'Bar Freezers').length} Models)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <div className="grid grid-cols-4 gap-6">
                  {barFreezersCat.subcategories.map((sub: any) => (
                    <div key={sub.slug} className="space-y-2">
                      <Link 
                        href={sub.path} 
                        onClick={() => setActiveMegaMenu(null)}
                        className="text-sm font-bold text-white hover:text-amber-400 transition-colors block border-b border-slate-800 pb-1"
                      >
                        {sub.name}
                      </Link>
                      <ul className="space-y-1 text-xs text-slate-300">
                        {sub.types.map((t: any) => (
                          <li key={t.slug}>
                            <Link 
                              href={t.path} 
                              onClick={() => setActiveMegaMenu(null)}
                              className="hover:text-white hover:translate-x-1 transition-all inline-block py-0.5"
                            >
                              {t.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 2. Bar Fridges Mega Menu */}
            {activeMegaMenu === 'bar-fridges' && barFridgesCat && (
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-white">Commercial Bar Fridges & Coolers</h2>
                    <p className="text-xs text-slate-400 mt-0.5">Underbench bottle chillers, sliding glass back bar coolers, dual-zone wine cabinets, and outdoor alfresco units.</p>
                  </div>
                  <Link 
                    href="/bar-fridges/" 
                    onClick={() => setActiveMegaMenu(null)}
                    className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1"
                  >
                    <span>View All Bar Fridges & Coolers</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <div className="grid grid-cols-4 gap-6">
                  {barFridgesCat.subcategories.map((sub: any) => (
                    <div key={sub.slug} className="space-y-2">
                      <Link 
                        href={sub.path} 
                        onClick={() => setActiveMegaMenu(null)}
                        className="text-sm font-bold text-white hover:text-amber-400 transition-colors block border-b border-slate-800 pb-1"
                      >
                        {sub.name}
                      </Link>
                      <ul className="space-y-1 text-xs text-slate-300">
                        {sub.types.map((t: any) => (
                          <li key={t.slug}>
                            <Link 
                              href={t.path} 
                              onClick={() => setActiveMegaMenu(null)}
                              className="hover:text-white hover:translate-x-1 transition-all inline-block py-0.5"
                            >
                              {t.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 3. Shop by Venue */}
            {activeMegaMenu === 'venues' && (
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-white">Refrigeration Curated by Venue Type</h2>
                    <p className="text-xs text-slate-400 mt-0.5">Explore small, medium, and high-volume equipment setups custom-tailored to your hospitality operation.</p>
                  </div>
                  <span className="text-xs text-cyan-400 font-mono">15 Specialized Venue Blueprints</span>
                </div>

                <div className="grid grid-cols-5 gap-4">
                  {VENUES.map((v: any) => (
                    <Link
                      key={v.slug}
                      href={v.path}
                      onClick={() => setActiveMegaMenu(null)}
                      className="p-3 rounded-lg bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 hover:border-amber-500/50 transition-all group"
                    >
                      <div className="text-sm font-semibold text-white group-hover:text-amber-400">
                        {v.name}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-1 line-clamp-1">
                        {v.heroStat}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* 4. Brands */}
            {activeMegaMenu === 'brands' && (
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-white">Leading Commercial & Trade Brands</h2>
                    <p className="text-xs text-slate-400 mt-0.5">Genuine manufacturer stock with nationwide Australian on-site warranty coverage.</p>
                  </div>
                  <span className="text-xs text-amber-400 font-mono">23 Authorized Brands</span>
                </div>

                <div className="grid grid-cols-6 gap-3">
                  {BRANDS.map((b: any) => (
                    <Link
                      key={b.slug}
                      href={`/brands/${b.slug}/`}
                      onClick={() => setActiveMegaMenu(null)}
                      className="p-2.5 rounded bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 hover:border-cyan-500/50 transition-all text-center group"
                    >
                      <span className="text-sm font-bold text-white group-hover:text-cyan-400 block">
                        {b.name}
                      </span>
                      <span className="text-[10px] text-slate-400 block font-mono mt-0.5">
                        {b.warrantyYears}yr Warranty
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* 5. Accessories & Parts */}
            {activeMegaMenu === 'accessories' && accessoriesCat && (
              <div>
                <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-6">
                  <div>
                    <h2 className="text-xl font-bold text-white">Refrigeration Accessories, Ice & Spare Parts</h2>
                    <p className="text-xs text-slate-400 mt-0.5">Shelves, magnetic door seals, castors, glass frosters, and certified OEM spare parts.</p>
                  </div>
                  <Link 
                    href="/accessories-parts/" 
                    onClick={() => setActiveMegaMenu(null)}
                    className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1"
                  >
                    <span>View All Accessories & Parts</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>

                <div className="grid grid-cols-4 gap-6">
                  {accessoriesCat.subcategories.map((sub: any) => (
                    <div key={sub.slug} className="space-y-2">
                      <Link 
                        href={sub.path} 
                        onClick={() => setActiveMegaMenu(null)}
                        className="text-sm font-bold text-white hover:text-amber-400 transition-colors block border-b border-slate-800 pb-1"
                      >
                        {sub.name}
                      </Link>
                      <ul className="space-y-1 text-xs text-slate-300">
                        {sub.types.map((t: any) => (
                          <li key={t.slug}>
                            <Link 
                              href={t.path} 
                              onClick={() => setActiveMegaMenu(null)}
                              className="hover:text-white hover:translate-x-1 transition-all inline-block py-0.5"
                            >
                              {t.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>
      )}

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-18 bg-slate-950/95 z-50 overflow-y-auto px-6 py-6 border-t border-slate-800">
          {/* Mobile Search input */}
          <form onSubmit={(e) => { handleSearchSubmit(e); setIsMobileMenuOpen(false); }} className="relative mb-6">
            <input
              type="text"
              placeholder="Search freezers, fridges, brands..."
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full bg-slate-900 text-sm text-slate-100 placeholder-slate-400 pl-10 pr-4 py-2.5 rounded-lg border border-slate-700"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </form>

          <div className="space-y-6 text-sm font-medium">
            <div>
              <Link 
                href="/bar-freezers/" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-base font-bold text-white flex items-center justify-between py-2 border-b border-slate-800"
              >
                <span>1. Bar Freezers</span>
                <span className="text-xs text-amber-400">View All &rarr;</span>
              </Link>
              <div className="pl-3 py-2 space-y-2 text-xs text-slate-300">
                {barFreezersCat?.subcategories.map((sub: any) => (
                  <Link 
                    key={sub.slug} 
                    href={sub.path} 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block py-1 hover:text-white"
                  >
                    {sub.name}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <Link 
                href="/bar-fridges/" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-base font-bold text-white flex items-center justify-between py-2 border-b border-slate-800"
              >
                <span>2. Bar Fridges & Coolers</span>
                <span className="text-xs text-amber-400">View All &rarr;</span>
              </Link>
              <div className="pl-3 py-2 space-y-2 text-xs text-slate-300">
                {barFridgesCat?.subcategories.map((sub: any) => (
                  <Link 
                    key={sub.slug} 
                    href={sub.path} 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block py-1 hover:text-white"
                  >
                    {sub.name}
                  </Link>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <Link 
                href="/trade/" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-lg text-amber-400 font-bold text-center block"
              >
                Trade Pricing & Quotes
              </Link>
              <Link 
                href="/deals/" 
                onClick={() => setIsMobileMenuOpen(false)}
                className="p-3 bg-rose-500/10 border border-rose-500/30 rounded-lg text-rose-400 font-bold text-center block"
              >
                Clearance & Seconds
              </Link>
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-800 text-xs text-slate-300">
              <Link href="/guides/" onClick={() => setIsMobileMenuOpen(false)} className="block py-1.5">
                Buying Guides & Ventilation Rules
              </Link>
              <Link href="/delivery/" onClick={() => setIsMobileMenuOpen(false)} className="block py-1.5">
                Australia-Wide Freight & Lead Times
              </Link>
              <Link href="/warranty-service/" onClick={() => setIsMobileMenuOpen(false)} className="block py-1.5">
                Warranty Service & Repair Claim
              </Link>
              <Link href="/finance/" onClick={() => setIsMobileMenuOpen(false)} className="block py-1.5">
                SilverChef & Commercial Equipment Finance
              </Link>
              <Link href="/contact/" onClick={() => setIsMobileMenuOpen(false)} className="block py-1.5">
                Contact Our Commercial Sales Team
              </Link>
            </div>

            <div className="p-4 bg-slate-900 rounded-lg border border-slate-800 space-y-2">
              <div className="text-xs text-slate-400 font-mono">Direct Trade Hotline</div>
              <a 
                href={`tel:${SITE.phone.replace(/\s+/g, '')}`} 
                className="text-lg font-bold text-amber-400 block flex items-center gap-2"
              >
                <Phone className="w-5 h-5" />
                <span>{SITE.phoneDisplay}</span>
              </a>
              <div className="text-[11px] text-slate-500">7:30am - 5:30pm AEST Mon - Fri</div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
