import React from 'react';
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight, ShieldCheck, FileText, Truck } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useRouter, Link } from '../context/RouterContext';
import { ProductImage } from './ProductImage';
import { fmtNum } from '../lib/format';

export const CartDrawer: React.FC = () => {
  const { 
    cart, 
    isCartOpen, 
    setIsCartOpen, 
    removeFromCart, 
    updateQuantity, 
    subtotal, 
    gstAmount, 
    cartCount,
    openQuoteForCart 
  } = useCart();
  const { navigate } = useRouter();

  if (!isCartOpen) return null;


  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-950/70 backdrop-blur-xs transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-4 sm:p-6 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-amber-400" />
              <h2 className="text-base font-bold uppercase tracking-wider">Your Equipment Order</h2>
              <span className="text-xs font-mono bg-slate-800 text-slate-300 px-2 py-0.5 rounded">
                {cartCount} {cartCount === 1 ? 'item' : 'items'}
              </span>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              aria-label="Close cart drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Freight note */}
          <div className="bg-slate-50 border-b border-slate-200 px-4 py-3 text-xs">
            <div className="flex items-center gap-2 text-slate-700">
              <Truck className="w-4 h-4 text-cyan-600 shrink-0" />
              <span>Freight is quoted to your postcode and confirmed with your order.</span>
            </div>
            <div className="mt-1.5 pl-6 font-semibold text-emerald-700">Pay with crypto at checkout and save 10%.</div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-slate-100 flex items-center justify-center text-slate-400">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">Your cart is empty</h3>
                  <p className="text-xs text-slate-500 mt-1 max-w-xs mx-auto">
                    Browse Australia's largest commercial bar refrigeration catalog or request a personalized trade quote.
                  </p>
                </div>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigate('/bar-freezers/');
                  }}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-md transition-colors inline-block"
                >
                  Browse Bar Freezers
                </button>
              </div>
            ) : (
              cart.map(({ product, quantity }) => (
                <div key={product.id} className="p-3 bg-slate-50/70 rounded-lg border border-slate-200/80 flex gap-3">
                  <div className="w-20 h-20 shrink-0 bg-white rounded border border-slate-200 overflow-hidden">
                    <ProductImage product={product} className="w-full h-full p-1" />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs font-semibold text-slate-900 line-clamp-2">
                          <Link 
                            href={`/product/${product.slug}/`}
                            onClick={() => setIsCartOpen(false)}
                            className="hover:text-cyan-700"
                          >
                            {product.name}
                          </Link>
                        </h4>
                        <button
                          onClick={() => removeFromCart(product.id)}
                          className="text-slate-400 hover:text-rose-600 p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <div className="text-[11px] font-mono text-slate-500 mt-0.5">
                        {product.brand} · SKU: {product.sku}
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-slate-200 bg-white rounded">
                        <button
                          onClick={() => updateQuantity(product.id, quantity - 1)}
                          className="p-1 hover:bg-slate-100 text-slate-600"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-xs font-mono font-semibold text-slate-900">
                          {quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(product.id, quantity + 1)}
                          className="p-1 hover:bg-slate-100 text-slate-600"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      {/* Price */}
                      <div className="text-right">
                        <div className="text-xs font-bold font-mono text-slate-900">
                          ${fmtNum(((product.price ?? 0) * quantity))} AUD
                        </div>
                        <div className="text-[10px] text-slate-500">
                          ${fmtNum((product.price ?? 0))} ea
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Actions */}
          {cart.length > 0 && (
            <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 space-y-3">
              {/* Totals */}
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal (Excl. Freight)</span>
                  <span className="font-mono">${fmtNum(subtotal)} AUD</span>
                </div>
                <div className="flex justify-between text-slate-500 text-[11px]">
                  <span>Includes 10% Australian GST</span>
                  <span className="font-mono">${fmtNum(gstAmount)} AUD</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>Freight</span>
                  <span className="font-medium text-slate-700">Quoted to your postcode</span>
                </div>
                <div className="pt-2 border-t border-slate-200 flex justify-between items-baseline text-sm font-bold text-slate-900">
                  <span>Total (AUD, excl. freight)</span>
                  <span className="text-lg font-mono">
                    ${fmtNum(subtotal)} AUD
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigate('/checkout/');
                  }}
                  className="w-full py-3 px-4 rounded-md bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition-colors"
                >
                  <span>Proceed to Commercial Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={openQuoteForCart}
                  className="w-full py-2.5 px-4 rounded-md bg-white border border-slate-300 hover:bg-slate-100 text-slate-800 font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
                >
                  <FileText className="w-4 h-4 text-cyan-600" />
                  <span>Convert Order to Official Trade Quote</span>
                </button>
              </div>

              {/* Security & Finance Note */}
              <div className="pt-2 flex items-center justify-center gap-4 text-[10px] text-slate-500 text-center">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" />
                  <span>256-Bit SSL Encrypted</span>
                </span>
                <span>·</span>
                <span>Finance enquiries welcome</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
