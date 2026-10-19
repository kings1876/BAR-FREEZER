import React from 'react';
import { ShoppingBag, FileText, Check, ShieldCheck, Thermometer, SlidersHorizontal } from 'lucide-react';
import { Product } from '../types';
import { ProductImage } from './ProductImage';
import { useCart } from '../context/CartContext';
import { Link } from '../context/RouterContext';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, openQuoteForProduct, toggleCompare, isInCompare } = useCart();
  const compared = isInCompare(product.id);

  return (
    <div className="group bg-white rounded-lg border border-slate-200/90 hover:border-slate-300 hover:shadow-md transition-all duration-200 flex flex-col justify-between overflow-hidden">
      {/* Visual Product Box */}
      <div className="relative p-3 bg-slate-50/50 border-b border-slate-100">
        <Link href={`/product/${product.slug}/`} className="block focus-visible:outline-amber-500">
          <ProductImage product={product} className="w-full" />
        </Link>

        {/* Compare Checkbox Trigger in top right */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleCompare(product);
          }}
          className={`absolute top-4 right-4 z-10 p-1.5 rounded transition-all text-xs font-mono flex items-center gap-1 ${
            compared
              ? 'bg-cyan-600 text-white shadow-xs'
              : 'bg-white/80 hover:bg-white text-slate-500 hover:text-slate-900 border border-slate-200 shadow-xs'
          }`}
          title={compared ? "Remove from comparison" : "Compare this unit"}
        >
          <SlidersHorizontal className="w-3.5 h-3.5" />
          <span className="hidden sm:inline text-[10px]">{compared ? 'Comparing' : 'Compare'}</span>
        </button>
      </div>

      {/* Content Area */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        {/* Brand & Category Kicker (Unboxed text with dot separator, zero pills) */}
        <div className="flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-slate-700 uppercase tracking-wider">{product.brand}</span>
            <span aria-hidden="true">·</span>
            <span>{product.type}</span>
          </div>
          <span className="font-mono text-[11px] text-slate-400">SKU: {product.sku}</span>
        </div>

        {/* Product Title */}
        <h3 className="text-sm sm:text-base font-semibold text-slate-900 leading-snug line-clamp-2">
          <Link 
            href={`/product/${product.slug}/`} 
            className="hover:text-cyan-700 transition-colors focus-visible:outline-amber-500"
          >
            {product.name}
          </Link>
        </h3>

        {/* Trustpilot Review Metric */}
        <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
          <div className="flex items-center gap-0.5">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="inline-flex items-center justify-center w-2.5 h-2.5 bg-[#00b67a] text-white text-[7px] font-bold">
                ★
              </span>
            ))}
          </div>
          <span className="font-bold text-slate-800">4.9 / 5.0</span>
          <span className="text-slate-400">· Trustpilot</span>
        </div>

        {/* Quick Specs Strip */}
        <div className="grid grid-cols-3 gap-2 py-2 px-2.5 bg-slate-50 rounded text-xs text-slate-600 font-mono">
          <div>
            <span className="text-[10px] text-slate-400 block uppercase font-sans">Width</span>
            <span className="font-medium text-slate-900">{product.widthMm ? `${product.widthMm}mm` : '—'}</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 block uppercase font-sans">Volume</span>
            <span className="font-medium text-slate-900">{product.capacityLitres ? `${product.capacityLitres}L` : '—'}</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-400 block uppercase font-sans">Temp</span>
            <span className="font-medium text-slate-900">{product.tempRange ? product.tempRange.split(' ')[0] : '—'}</span>
          </div>
        </div>

        {/* Stock & Delivery Promise */}
        <div className="text-xs text-slate-600 flex items-center gap-1.5 pt-1">
          {product.stockQty == null ? (
            <>
              <span className="inline-block w-2 h-2 rounded-full bg-amber-500" />
              <span className="font-medium text-slate-700">Availability on request</span>
            </>
          ) : (
            <>
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500" />
              <span className="font-medium text-emerald-800">{product.shippingBadge || "In Stock - Ships Today"}</span>
            </>
          )}
        </div>

        {/* Price & GST Area */}
        <div className="pt-2 border-t border-slate-100 flex items-baseline justify-between">
          {product.price == null ? (
            <div>
              <div className="text-base sm:text-lg font-bold text-slate-900">Price on application</div>
              <div className="text-[11px] text-slate-500">Request a quote for pricing</div>
            </div>
          ) : (
          <div>
            <div className="text-lg sm:text-xl font-bold font-mono text-slate-900 tabular-nums">
              ${product.price.toLocaleString()} <span className="text-xs font-normal text-slate-500 font-sans">AUD</span>
            </div>
            <div className="text-[11px] text-slate-500">
              Incl. GST{product.tradePrice != null && <> · <span className="text-amber-700 font-medium">Trade: ${product.tradePrice.toLocaleString()}</span></>}
            </div>
          </div>
          )}
          {product.warrantyYears > 0 && (
            <div className="text-[11px] text-slate-500 text-right">
              <span className="font-semibold text-slate-700">{product.warrantyYears}yr Warranty</span>
              <span className="block text-[10px] text-slate-400">Manufacturer warranty</span>
            </div>
          )}
        </div>

        {/* Actions Button Row */}
        <div className="pt-2 grid grid-cols-2 gap-2">
          <button
            onClick={() => addToCart(product, 1)}
            className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-md bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs transition-colors focus-visible:outline-amber-500"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Add to Cart</span>
          </button>

          <button
            onClick={() => openQuoteForProduct(product)}
            className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-md bg-amber-500/10 hover:bg-amber-500/20 text-amber-900 border border-amber-500/30 font-semibold text-xs transition-colors focus-visible:outline-amber-500"
          >
            <FileText className="w-3.5 h-3.5 text-amber-700" />
            <span>Quote</span>
          </button>
        </div>
      </div>
    </div>
  );
};
