import React from 'react';
import { SlidersHorizontal, Trash2, ShoppingBag, FileText, Check, Plus, ChevronRight } from 'lucide-react';
import { PRODUCTS } from '../config/site.js';
import { ProductImage } from '../components/ProductImage';
import { useCart } from '../context/CartContext';
import { Link } from '../context/RouterContext';

export const ComparePage: React.FC = () => {
  const { compareList, toggleCompare, addToCart, openQuoteForProduct } = useCart();

  // If compareList is empty, default to comparing 3 top benchmark underbar freezers
  const sample = ['under-bar-fridges', 'wine-fridges', 'under-bar-freezers'].map((slug) => PRODUCTS.find((p: any) => p.categorySlug === slug && p.condition === 'new' && p.capacityLitres > 0 && p.widthMm > 0 && p.images && p.images.length)).filter(Boolean) as any[];
  const displayItems = compareList.length > 0 ? compareList : sample;
  const val = (v: any, unit = '') => (v === undefined || v === null || v === '' || v === 0 || v === '0' ? '—' : `${v}${unit}`);

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="flex items-center text-xs text-slate-500 space-x-1 font-medium">
          <Link href="/" className="hover:text-slate-900">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-semibold">Equipment Comparison</span>
        </nav>

        {/* Header */}
        <div className="bg-white rounded-xl border border-slate-200/90 p-6 sm:p-8 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono font-semibold text-cyan-700 uppercase tracking-wider">
              <span>TECHNICAL SPECIFICATION MATRIX</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mt-1">
              Compare Bar Fridges and Freezers Side by Side
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Compare capacity, dimensions, temperature range, doors, refrigerant and warranty across models. Add products to compare from any category page.
            </p>
          </div>

          {compareList.length > 0 && (
            <span className="text-xs font-mono font-bold bg-cyan-50 text-cyan-800 px-3 py-1.5 rounded border border-cyan-200">
              {compareList.length} of 4 Units Compared
            </span>
          )}
        </div>

        {/* Side-by-Side Comparison Matrix */}
        <div className="bg-white rounded-xl border border-slate-200 overflow-x-auto shadow-xs">
          <table className="w-full text-xs text-left border-collapse">
            <thead>
              <tr className="bg-slate-900 text-white divide-x divide-slate-800">
                <th className="p-4 w-48 font-bold uppercase tracking-wider text-[11px] sticky left-0 bg-slate-900 z-10">
                  Feature / Specification
                </th>
                {displayItems.map((item) => (
                  <th key={item.id} className="p-4 min-w-[240px] max-w-[280px] align-top">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between">
                        <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-400">
                          {item.brand}
                        </span>
                        <button
                          onClick={() => toggleCompare(item)}
                          className="text-slate-400 hover:text-rose-400 p-1"
                          title="Remove from comparison"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="bg-white rounded p-2 border border-slate-700">
                        <ProductImage product={item} className="h-28" />
                      </div>

                      <h2 className="text-xs font-bold text-white line-clamp-2 leading-snug">
                        {item.name}
                      </h2>

                      <div className="text-lg font-mono font-bold text-amber-400">
                        {item.price != null ? `$${item.price.toLocaleString()} AUD` : 'Price on application'}
                      </div>

                      <div className="flex flex-col gap-1.5 pt-1">
                        <button
                          onClick={() => addToCart(item, 1)}
                          className="w-full py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-[11px] uppercase rounded transition-colors"
                        >
                          Add to Cart
                        </button>
                        <button
                          onClick={() => openQuoteForProduct(item)}
                          className="w-full py-1.5 bg-slate-800 hover:bg-slate-700 text-white text-[11px] rounded transition-colors"
                        >
                          Request Trade Quote
                        </button>
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 text-slate-700">
              <tr className="divide-x divide-slate-100 hover:bg-slate-50">
                <td className="p-3 font-semibold text-slate-900 bg-slate-50/80 sticky left-0">Trade Price (Excl. Tax)</td>
                {displayItems.map((item) => (
                  <td key={item.id} className="p-3 font-mono font-bold text-emerald-800">
                    {item.tradePrice != null ? `$${item.tradePrice.toLocaleString()} AUD` : 'Request a quote'}
                  </td>
                ))}
              </tr>

              <tr className="divide-x divide-slate-100 hover:bg-slate-50">
                <td className="p-3 font-semibold text-slate-900 bg-slate-50/80 sticky left-0">Gross Usable Capacity</td>
                {displayItems.map((item) => (
                  <td key={item.id} className="p-3 font-mono font-semibold">
                    {item.capacityLitres ? `${item.capacityLitres} Litres` : (item.capacityLabel || '—')}
                  </td>
                ))}
              </tr>

              <tr className="divide-x divide-slate-100 hover:bg-slate-50">
                <td className="p-3 font-semibold text-slate-900 bg-slate-50/80 sticky left-0">External Dimensions (W x D x H)</td>
                {displayItems.map((item) => (
                  <td key={item.id} className="p-3 font-mono">
                    {item.widthMm && item.depthMm && item.heightMm ? `${item.widthMm} x ${item.depthMm} x ${item.heightMm} mm` : '—'}
                  </td>
                ))}
              </tr>

              <tr className="divide-x divide-slate-100 hover:bg-slate-50">
                <td className="p-3 font-semibold text-slate-900 bg-slate-50/80 sticky left-0">Operating Temperature</td>
                {displayItems.map((item) => (
                  <td key={item.id} className="p-3 font-mono font-bold text-cyan-800">
                    {val(item.tempRange)}
                  </td>
                ))}
              </tr>

              <tr className="divide-x divide-slate-100 hover:bg-slate-50">
                <td className="p-3 font-semibold text-slate-900 bg-slate-50/80 sticky left-0">Door Config & Style</td>
                {displayItems.map((item) => (
                  <td key={item.id} className="p-3">
                    {item.doorCount ? `${item.doorCount} x ${item.doorType} (${item.doorStyle})` : '—'}
                  </td>
                ))}
              </tr>

              <tr className="divide-x divide-slate-100 hover:bg-slate-50">
                <td className="p-3 font-semibold text-slate-900 bg-slate-50/80 sticky left-0">Power</td>
                {displayItems.map((item) => (
                  <td key={item.id} className="p-3 font-mono">
                    {val(item.power)}
                  </td>
                ))}
              </tr>

              <tr className="divide-x divide-slate-100 hover:bg-slate-50">
                <td className="p-3 font-semibold text-slate-900 bg-slate-50/80 sticky left-0">Refrigerant</td>
                {displayItems.map((item) => (
                  <td key={item.id} className="p-3 font-mono text-cyan-700">
                    {val(item.refrigerant)}
                  </td>
                ))}
              </tr>

              <tr className="divide-x divide-slate-100 hover:bg-slate-50">
                <td className="p-3 font-semibold text-slate-900 bg-slate-50/80 sticky left-0">Net Weight</td>
                {displayItems.map((item) => (
                  <td key={item.id} className="p-3 font-mono">
                    {val(item.weightKg, ' kg')}
                  </td>
                ))}
              </tr>

              <tr className="divide-x divide-slate-100 hover:bg-slate-50">
                <td className="p-3 font-semibold text-slate-900 bg-slate-50/80 sticky left-0">Warranty</td>
                {displayItems.map((item) => (
                  <td key={item.id} className="p-3 font-semibold text-amber-800">
                    {item.warrantyYears ? `${item.warrantyYears} years` : (item.warrantyText || 'See product page')}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
};
