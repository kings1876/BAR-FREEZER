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
import { PRODUCTS } from '../config/products-data.js';
import { ProductCard } from '../components/ProductCard';
import { collectForm, sendEnquiry } from '../lib/enquiry-client';
import { PaginatedGrid } from '../components/PaginatedGrid';
import { makeOrderNumber } from '../lib/order';
import { waOrderLink, whatsappEnabled } from '../lib/whatsapp';
import { useCart } from '../context/CartContext';
import { useRouter, Link } from '../context/RouterContext';

/**
 * Search Results Page (/search/)
 */
export const SearchPage: React.FC = () => {
  const { searchQuery, setSearchQuery } = useRouter();
  const [urlQ, setUrlQ] = useState('');

  // Read ?q= from the address (the page is statically exported, so the query is only available in the browser).
  useEffect(() => {
    const q0 = new URLSearchParams(window.location.search).get('q') || '';
    setUrlQ(q0);
    if (q0 && !searchQuery) setSearchQuery(q0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const term = (searchQuery || urlQ || '').trim();
  const q = term.toLowerCase();
  const results = q
    ? PRODUCTS.filter((p: any) =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        String(p.sku).toLowerCase().includes(q) ||
        p.categorySlug.toLowerCase().includes(q) ||
        String(p.model || '').toLowerCase().includes(q) ||
        String(p.type || '').toLowerCase().includes(q) ||
        String(p.subCategory || '').toLowerCase().includes(q)
      )
    : [];

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <h1 className="text-2xl font-bold text-slate-900">
          {term ? `Search results for "${term}" (${results.length} items found)` : 'Search bar fridges, bar freezers and accessories'}
        </h1>

        {!term && (
          <div className="bg-white p-8 rounded-xl border border-slate-200 space-y-3 text-sm text-slate-600">
            <p>Use the search box at the top of the page to find a product by name, brand, model or capacity. Or browse a category:</p>
            <div className="flex flex-wrap gap-2">
              <Link href="/bar-fridges/" className="px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded">Bar fridges</Link>
              <Link href="/bar-freezers/" className="px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded">Bar freezers</Link>
              <Link href="/accessories-parts/" className="px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded">Accessories and parts</Link>
              <Link href="/guides/" className="px-4 py-2 bg-slate-100 text-slate-800 text-xs font-semibold rounded">Buying guides</Link>
            </div>
          </div>
        )}

        {term && results.length > 0 && (
          <PaginatedGrid items={results} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" render={(p: any, i: number) => <ProductCard key={p.id} product={p} priority={i < 2} />} resetKey={term} />
        )}

        {term && results.length === 0 && (
          <div className="bg-white p-12 rounded-xl border border-slate-200 text-center space-y-3">
            <p className="text-sm text-slate-600">No exact matches found. Try searching by brand (for example Skope, Bromic or Williams) or by capacity in litres.</p>
            <Link href="/bar-freezers/" className="inline-block px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded">
              Browse all bar freezers
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

