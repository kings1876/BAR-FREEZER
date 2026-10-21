import React from 'react';
import { Phone, FileText, ShoppingBag } from 'lucide-react';
import { SITE } from '../config/core.js';
import { useCart } from '../context/CartContext';

export const MobileStickyBar: React.FC = () => {
  const { cartCount, setIsCartOpen, setIsQuoteModalOpen } = useCart();

  return (
    <aside 
      className="lg:hidden fixed bottom-0 left-0 right-0 z-30 bg-slate-900/98 backdrop-blur-md border-t border-slate-800 px-3 py-2 shadow-2xl flex items-center justify-between gap-2 h-14"
      aria-label="Mobile quick actions"
    >
      {/* Direct Call Button */}
      <a
        href={`tel:${SITE.phone.replace(/\s+/g, '')}`}
        className="flex-1 flex items-center justify-center gap-1.5 h-10 px-2 rounded-md bg-slate-800 text-slate-100 font-semibold text-xs border border-slate-700 active:bg-slate-700 transition-colors whitespace-nowrap"
      >
        <Phone className="w-4 h-4 text-amber-400 shrink-0" />
        <span>Call 1300</span>
      </a>

      {/* Primary Trade Quote Button */}
      <button
        onClick={() => setIsQuoteModalOpen(true)}
        className="flex-[2] flex items-center justify-center gap-1.5 h-10 px-3 rounded-md bg-amber-500 text-slate-950 font-bold text-xs uppercase tracking-wide active:bg-amber-400 shadow-sm transition-colors whitespace-nowrap"
      >
        <FileText className="w-4 h-4 shrink-0" />
        <span>Get a Quote</span>
      </button>

      {/* Cart Button */}
      <button
        onClick={() => setIsCartOpen(true)}
        className="relative flex items-center justify-center w-10 h-10 rounded-md bg-slate-800 text-slate-200 border border-slate-700 active:bg-slate-700 transition-colors"
        aria-label={`View Cart (${cartCount} items)`}
      >
        <ShoppingBag className="w-4 h-4" />
        {cartCount > 0 && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-amber-500 text-slate-950 text-[10px] font-bold rounded-full flex items-center justify-center font-mono">
            {cartCount}
          </span>
        )}
      </button>
    </aside>
  );
};
