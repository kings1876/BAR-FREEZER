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
import { useProductDetail } from '../context/ProductDetailContext';
import { ProductCard } from '../components/ProductCard';
import { collectForm, sendEnquiry } from '../lib/enquiry-client';
import { PagedGrid } from '../components/PagedGrid';
import { makeOrderNumber } from '../lib/order';
import { waOrderLink, whatsappEnabled } from '../lib/whatsapp';
import { useCart } from '../context/CartContext';
import { useRouter, Link } from '../context/RouterContext';

/**
 * Clearance, Ex-Display & Deals Page (/deals/)
 */
export const DealsPage: React.FC = () => {
  // The server supplies the first products and the total; the full list is linked below the grid.
  const pageDetail = useProductDetail();
  const clearanceItems: any[] = (pageDetail && pageDetail.data && pageDetail.data.items) || [];
  const clearanceTotal: number = (pageDetail && pageDetail.data && pageDetail.data.total) || clearanceItems.length;

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="bg-rose-950 text-white rounded-xl border border-rose-900 p-6 sm:p-10 shadow-lg space-y-3">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold text-rose-400 uppercase tracking-wider">
            <Flame className="w-4 h-4 text-rose-400" />
            <span>EX-DISPLAY, REFURBISHED &amp; CLEARANCE STOCK</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Ex-Display &amp; Clearance Fridges and Freezers
          </h1>
          <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
            Browse ex-display and refurbished commercial fridges and freezers. Each listing shows its condition, so read the description and warranty details before you order, or <Link href="/quote/" className="underline hover:text-white">request a quote</Link> to confirm availability and freight.
          </p>
        </div>

        <PagedGrid items={clearanceItems} pageSize={4} render={(p: any, i: number) => <ProductCard key={p.id} product={p} priority={i < 2} />} />
      </div>
    </div>
  );
};

