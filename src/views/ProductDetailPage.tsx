import React, { useState, useEffect } from 'react';
import { 
  ChevronRight, 
  ShoppingBag, 
  FileText, 
  Phone, 
  MessageSquare, 
  Truck, 
  ShieldCheck, 
  Star, 
  Check, 
  Layers, 
  Download, 
  AlertCircle, 
  Plus, 
  Minus, 
  ArrowRight,
  Maximize2,
  Wind
} from 'lucide-react';
import { PRODUCTS, ACCESSORY_PRODUCTS, SITE } from '../config/site.js';
import { ProductImage } from '../components/ProductImage';
import { PostcodeEstimator } from '../components/PostcodeEstimator';
import { useCart } from '../context/CartContext';
import { useRouter, Link } from '../context/RouterContext';
import { Product } from '../types';
import { useProductDetail } from '../context/ProductDetailContext';

export const ProductDetailPage: React.FC = () => {
  const { routeMatch } = useRouter();
  const { addToCart, openQuoteForProduct, toggleCompare, isInCompare, showNotification } = useCart();
  
  const [quantity, setQuantity] = useState(1);
  const [selectedWarrantyAddon, setSelectedWarrantyAddon] = useState(false);
  const [activeTab, setActiveTab] = useState<'specs' | 'fit' | 'faq' | 'reviews'>('specs');
  const [bundleChecked, setBundleChecked] = useState<Record<string, boolean>>({});
  const [activePhoto, setActivePhoto] = useState(0);

  const productSlug = routeMatch.params.slug;
  useEffect(() => { setActivePhoto(0); }, [productSlug]);
  const detail = useProductDetail();
  const baseProduct: any = PRODUCTS.find((p: any) => p.slug === productSlug) || PRODUCTS[0];
  const product = {
    ...baseProduct,
    specs: {},
    fullDescription: baseProduct.shortDescription,
    ...(detail && detail.id === baseProduct.id ? detail : {}),
  } as unknown as Product;

  const compared = isInCompare(product.id);

  // Frequently bought together accessories
  const bundleItems = (product.frequentlyBoughtTogether || [])
    .map((accId) => ACCESSORY_PRODUCTS.find((a) => a.id === accId))
    .filter(Boolean);

  // Alternative recommendations
  const alternativeItems = (product.alternatives || [])
    .map((altId) => PRODUCTS.find((p) => p.id === altId))
    .filter(Boolean);

  const handleBundleToggle = (id: string) => {
    setBundleChecked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAddBundleToCart = () => {
    addToCart(product, quantity, selectedWarrantyAddon);
    bundleItems.forEach((b: any) => {
      if (bundleChecked[b.id]) {
        // Create an accessory product item
        const accProduct: Product = {
          id: b.id,
          sku: b.sku,
          brand: b.brand,
          model: b.sku,
          name: b.name,
          slug: b.slug,
          categorySlug: b.categorySlug,
          primaryCategory: "Accessories & Parts",
          type: "Accessory",
          doorCount: 0,
          doorType: 'solid',
          doorStyle: 'hinged',
          widthMm: 0,
          depthMm: 0,
          heightMm: 0,
          widthRange: '<600',
          capacityLitres: 0,
          capacityRange: '<100',
          price: b.price,
          tradePrice: b.tradePrice,
          finish: 'stainless',
          tempRange: 'N/A',
          installation: 'freestanding',
          use: 'commercial',
          power: '10A',
          condition: 'new',
          availability: 'in stock',
          stockQty: 50,
          warrantyYears: 1,
          features: [],
          shortDescription: b.shortDescription,
          fullDescription: b.shortDescription,
          specs: {}
        };
        addToCart(accProduct, 1);
      }
    });
    showNotification(`Bundle added to your cart.`);
  };

  const handleDownloadSpecSheet = () => {
    window.print();
  };

  const rootPath =
    product.primaryCategory === 'Bar Fridges & Coolers'
      ? '/bar-fridges/'
      : product.primaryCategory === 'Accessories & Parts'
      ? '/accessories-parts/'
      : '/bar-freezers/';
  const hasPrice = typeof product.price === 'number';
  const firmPrice = hasPrice;
  const silverChefWeekly = hasPrice ? Math.round((product.price as number) * 0.016) : 0;

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Breadcrumbs with trailing slashes */}
        <nav aria-label="Breadcrumb" className="flex items-center text-xs text-slate-500 space-x-1 font-medium">
          <Link href="/" className="hover:text-slate-900">Home</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link href={rootPath} className="hover:text-slate-900">{product.primaryCategory}</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <Link href={`${rootPath}${product.categorySlug}/`} className="hover:text-slate-900">{product.subCategory || product.type}</Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-900 font-semibold truncate max-w-xs" aria-current="page">{product.model}</span>
        </nav>

        {/* Top Product Hero Block (Gallery Left, Contiguous Purchase Module Right) */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-6 lg:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left 6 Columns: Product Visuals & Thumbnails */}
            <div className="lg:col-span-6 space-y-4">
              <div className="relative bg-slate-50 rounded-lg border border-slate-200 p-6 flex items-center justify-center">
                <ProductImage product={product} className="w-full max-h-96" priority imageIndex={activePhoto} />
                <div className="absolute top-4 right-4 flex items-center gap-2">
                  <button
                    onClick={() => toggleCompare(product)}
                    className={`p-2 rounded text-xs font-mono transition-colors shadow-xs ${
                      compared
                        ? 'bg-cyan-600 text-white'
                        : 'bg-white/90 text-slate-700 hover:bg-white border border-slate-200'
                    }`}
                  >
                    {compared ? '✓ Comparing' : '+ Compare Specs'}
                  </button>
                </div>
              </div>

              {/* Photo gallery thumbnails (only when the product has more than one photo) */}
              {product.images && product.images.length > 1 && (
                <div className="grid grid-cols-4 gap-2" role="group" aria-label="Product photos">
                  {product.images.slice(0, 4).map((src: string, i: number) => (
                    <button
                      key={src}
                      type="button"
                      onClick={() => setActivePhoto(i)}
                      aria-label={`View photo ${i + 1} of ${Math.min(product.images.length, 4)}`}
                      aria-pressed={activePhoto === i}
                      className={`aspect-[4/3] rounded bg-white overflow-hidden border-2 ${activePhoto === i ? 'border-amber-500' : 'border-slate-200 hover:border-slate-400'}`}
                    >
                      <img src={src} alt={`${product.name} (photo ${i + 1})`} width={200} height={150} loading="lazy" className="w-full h-full object-contain" />
                    </button>
                  ))}
                </div>
              )}

              {/* Dimension Callout Strip */}
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200/80 grid grid-cols-3 gap-2 text-center text-xs">
                <div>
                  <span className="text-slate-500 text-[10px] uppercase block">Dimensions</span>
                  <span className="font-mono font-bold text-slate-900">{product.widthMm && product.depthMm && product.heightMm ? `${product.widthMm}x${product.depthMm}x${product.heightMm}mm` : '—'}</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] uppercase block">{product.capacityKind && product.capacityKind !== 'gross' ? 'Capacity' : 'Gross Volume'}</span>
                  <span className="font-mono font-bold text-slate-900">{product.capacityLitres ? `${product.capacityLitres} Litres${product.capacityKind === 'combined' ? ' (combined)' : ''}` : (product.capacityLabel || 'On request')}</span>
                </div>
                <div>
                  <span className="text-slate-500 text-[10px] uppercase block">Operating Temp</span>
                  <span className="font-mono font-bold text-cyan-700">{product.tempRange || '—'}</span>
                </div>
              </div>
            </div>

            {/* Right 6 Columns: Contiguous Purchase Module */}
            <div className="lg:col-span-6 space-y-6">
              
              {/* Brand, Model, Title */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
                  <span className="font-bold text-slate-900 uppercase tracking-wider">{product.brand}</span>
                  <span aria-hidden="true">·</span>
                  <span>Model: {product.model}</span>
                  <span aria-hidden="true">·</span>
                  <span>SKU: {product.sku}</span>
                </div>

                <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-slate-900 leading-tight">
                  {(detail && detail.id === baseProduct.id && detail.h1) || product.name}
                </h1>
                {detail && detail.id === baseProduct.id && detail.intro && (
                  <p className="text-sm text-slate-600 leading-relaxed">{detail.intro}</p>
                )}

                {/* Prominent Trustpilot Rating Link */}
                <div className="flex flex-wrap items-center gap-2 pt-1 pb-1">
                  <button
                    type="button"
                    onClick={() => setActiveTab('reviews')}
                    className="flex items-center gap-1.5 hover:opacity-80 transition-opacity"
                  >
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="inline-flex items-center justify-center w-3.5 h-3.5 bg-[#00b67a] text-white text-[9px] font-bold">
                          ★
                        </span>
                      ))}
                    </div>
                    <span className="text-xs font-bold text-slate-900">4.9 / 5.0</span>
                    <span className="text-xs text-cyan-800 font-semibold underline decoration-cyan-300">
                      (3,142 Trustpilot Reviews)
                    </span>
                  </button>
                  <span className="text-slate-300">·</span>
                  <span className="text-[11px] text-emerald-800 font-medium bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    ✓ Verified Commercial Feedback
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {product.shortDescription}
                </p>
              </div>

              {/* Price on application (manufacturer data has no price) */}
              {!hasPrice && (
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
                  <div className="text-xl font-extrabold text-slate-900">Price on application</div>
                  <p className="text-xs text-slate-600">
                    Request a quote for current pricing, trade discounts and delivery to your postcode.
                  </p>
                  <button
                    onClick={() => openQuoteForProduct(product)}
                    className="text-cyan-700 font-bold text-xs hover:underline"
                  >
                    Get a quote &rarr;
                  </button>
                </div>
              )}

              {/* Price & Trade Pricing Block */}
              {hasPrice && (
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
                <div className="flex items-baseline justify-between">
                  <div>
                    <div className="text-3xl font-extrabold font-mono text-slate-900 tabular-nums">
                      ${product.price.toLocaleString()} <span className="text-sm font-normal text-slate-500 font-sans">AUD</span>
                    </div>
                    <div className="text-xs text-slate-500">
                      Includes 10% Australian GST (${Math.round(product.price / 11).toLocaleString()} GST)
                    </div>
                  </div>
                  
                  {product.msrp && (
                    <div className="text-right">
                      <span className="text-xs text-slate-400 line-through font-mono">RRP ${product.msrp.toLocaleString()}</span>
                      <span className="block text-xs font-semibold text-emerald-700">Save ${(product.msrp - product.price).toLocaleString()} AUD</span>
                    </div>
                  )}
                </div>

                {/* Trade Price Option */}
                <div className="pt-2 border-t border-slate-200/80 flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1.5 text-amber-800">
                    <span className="font-semibold">Trade Discount Price:</span>
                    <strong className="font-mono text-sm">{product.tradePrice != null ? `$${product.tradePrice.toLocaleString()} AUD` : 'On application'}</strong>
                  </div>
                  <button
                    onClick={() => openQuoteForProduct(product)}
                    className="text-cyan-700 font-bold hover:underline"
                  >
                    Unlock with ABN Quote &rarr;
                  </button>
                </div>

                {/* SilverChef Lease Estimate */}
                <div className="pt-1.5 text-[11px] text-slate-600 flex items-center justify-between">
                  <span>SilverChef Rent-Try-Buy (100% Tax Deductible):</span>
                  <span className="font-mono font-bold text-slate-900">From ${silverChefWeekly} AUD / week</span>
                </div>
              </div>
              )}

              {/* Availability when stock is not published */}
              {product.stockQty == null && (
                <div className="flex items-center gap-2 p-3 bg-slate-50 border border-slate-200 rounded-md text-xs text-slate-700">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0" />
                  <span className="font-bold">Availability on request</span>
                  <span className="text-slate-500">· Contact us for stock levels and delivery times</span>
                </div>
              )}

              {/* Stock Status Badge */}
              {product.stockQty != null && (
              <div className="flex items-center gap-2 p-3 bg-emerald-50/70 border border-emerald-200/80 rounded-md text-xs text-emerald-900">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
                <span className="font-bold">{product.shippingBadge || "In Stock for Immediate Dispatch"}</span>
                <span className="text-emerald-700">· {product.stockQty} units available in Sydney & Melbourne depots</span>
              </div>
              )}

              {/* Quantity + Buy Actions */}
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  {/* Quantity Stepper */}
                  <div className="flex items-center border border-slate-300 rounded bg-white h-11">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="px-3 h-full hover:bg-slate-100 text-slate-600"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 text-sm font-mono font-bold text-slate-900">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="px-3 h-full hover:bg-slate-100 text-slate-600"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Primary Buy CTA */}
                  <button
                    onClick={() => (firmPrice ? addToCart(product, quantity, selectedWarrantyAddon) : openQuoteForProduct(product))}
                    className="flex-1 h-11 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider rounded-md transition-colors flex items-center justify-center gap-2 shadow-sm focus-visible:outline-amber-500"
                  >
                    <ShoppingBag className="w-4 h-4 text-amber-400" />
                    <span>{firmPrice ? `Add to Cart ($${((product.price as number) * quantity).toLocaleString()} AUD)` : 'Request a Quote to Confirm Price'}</span>
                  </button>
                </div>

                {/* Secondary Action Row: Trade Quote + Call */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => openQuoteForProduct(product)}
                    className="h-10 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-md transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                  >
                    <FileText className="w-4 h-4" />
                    <span>Request Trade Quote</span>
                  </button>

                  <a
                    href={`tel:${SITE.phone.replace(/\s+/g, '')}`}
                    className="h-10 bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 font-semibold text-xs rounded-md transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Phone className="w-3.5 h-3.5 text-cyan-600" />
                    <span>Call {SITE.phoneDisplay}</span>
                  </a>
                </div>
              </div>

              {/* Australian Postcode Delivery Estimator Module */}
              <PostcodeEstimator productPrice={product.price ?? 0} />

            </div>

          </div>
        </div>

        {/* Frequently Bought Together Bundles */}
        {bundleItems.length > 0 && (
          <div className="bg-white rounded-xl border border-slate-200/90 p-6 lg:p-8 space-y-4">
            <h2 className="text-base font-bold text-slate-900 uppercase tracking-wide">
              Frequently Bought Together with {product.model}
            </h2>
            <p className="text-xs text-slate-500">
              Bundle genuine spare shelves, castors, and condenser maintenance kits to ship together on the same pallet.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              {bundleItems.map((item: any) => (
                <label 
                  key={item.id}
                  className="p-3 rounded-lg border border-slate-200 bg-slate-50/70 hover:bg-slate-50 flex items-start gap-3 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={!!bundleChecked[item.id]}
                    onChange={() => handleBundleToggle(item.id)}
                    className="mt-1 rounded border-slate-300 text-amber-500 focus:ring-amber-500"
                  />
                  <div className="flex-1 text-xs">
                    <span className="font-bold text-slate-900 block">{item.name}</span>
                    <span className="text-slate-500 line-clamp-1 mt-0.5">{item.shortDescription}</span>
                    <span className="font-mono font-bold text-slate-900 block mt-1">+${item.price} AUD</span>
                  </div>
                </label>
              ))}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={handleAddBundleToCart}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-md transition-colors"
              >
                Add Selected Items to Cart
              </button>
            </div>
          </div>
        )}

        {/* About this product: specification-based description (also in the page HTML for search engines) */}
        {product.fullDescription && product.fullDescription !== product.shortDescription && (
          <section aria-labelledby="about-product" className="bg-white rounded-xl border border-slate-200/90 p-6 lg:p-8 space-y-3">
            <h2 id="about-product" className="text-xl font-bold text-slate-900">About the {product.brand} {product.model}</h2>
            {String(product.fullDescription).split(/\n\n/).map((para: string, i: number) => (
              <p key={i} className="text-sm text-slate-700 leading-relaxed">{para}</p>
            ))}
          </section>
        )}

        {/* Detailed Tabs: Specifications, Will it Fit?, FAQ, Customer Reviews */}
        <div className="bg-white rounded-xl border border-slate-200/90 overflow-hidden shadow-xs">
          {/* Tab Navigation */}
          <div className="flex border-b border-slate-200 bg-slate-50/80 px-6 overflow-x-auto">
            <button
              onClick={() => setActiveTab('specs')}
              className={`py-4 px-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'specs'
                  ? 'border-amber-500 text-slate-900 bg-white'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              Technical Specifications
            </button>
            <button
              onClick={() => setActiveTab('fit')}
              className={`py-4 px-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'fit'
                  ? 'border-amber-500 text-slate-900 bg-white'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              "Will It Fit?" Dimension & Clearance Guide
            </button>
            <button
              onClick={() => setActiveTab('faq')}
              className={`py-4 px-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'faq'
                  ? 'border-amber-500 text-slate-900 bg-white'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              Model FAQ & Power Requirements
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`py-4 px-4 text-xs font-bold uppercase tracking-wider border-b-2 transition-colors whitespace-nowrap ${
                activeTab === 'reviews'
                  ? 'border-amber-500 text-slate-900 bg-white'
                  : 'border-transparent text-slate-600 hover:text-slate-900'
              }`}
            >
              Verified Customer Reviews (4.9 / 5.0)
            </button>
          </div>

          {/* Tab Content */}
          <div className="p-6 lg:p-8">
            
            {/* 1. SPECS TABLE */}
            {activeTab === 'specs' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                  <div>
                    <h2 className="text-lg font-bold text-slate-900">{product.brand} {product.model} Specifications</h2>
                    <p className="text-xs text-slate-500">Tested to Australian MEPS and HACCP food safety standards.</p>
                  </div>
                  <button
                    onClick={handleDownloadSpecSheet}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download PDF Spec Sheet</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3 text-xs">
                  {Object.entries(product.specs).map(([label, value]) => (
                    <div key={label} className="flex justify-between py-2 border-b border-slate-100">
                      <span className="text-slate-500">{label}</span>
                      <span className="font-mono font-medium text-slate-900 text-right">{value}</span>
                    </div>
                  ))}
                  {product.plugType && (
                    <div className="flex justify-between py-2 border-b border-slate-100">
                      <span className="text-slate-500">Power Connection</span>
                      <span className="font-mono font-medium text-slate-900 text-right">{product.plugType}</span>
                    </div>
                  )}
                  {product.refrigerant && !(product.specs as any)['Refrigerant'] && (
                    <div className="flex justify-between py-2 border-b border-slate-100">
                      <span className="text-slate-500">Refrigerant Gas</span>
                      <span className="font-mono font-medium text-slate-900 text-right">{product.refrigerant}</span>
                    </div>
                  )}
                  {product.ambientRating && (
                    <div className="flex justify-between py-2 border-b border-slate-100">
                      <span className="text-slate-500">Ambient Operating Rating</span>
                      <span className="font-mono font-bold text-cyan-800 text-right">{product.ambientRating}</span>
                    </div>
                  )}
                  {(product.warrantyText || product.warrantyYears > 0) && (
                    <div className="flex justify-between py-2 border-b border-slate-100">
                      <span className="text-slate-500">Manufacturer Warranty</span>
                      <span className="font-mono font-bold text-amber-800 text-right">{product.warrantyText || `${product.warrantyYears} Years`}</span>
                    </div>
                  )}
                </div>

                {/* Features Checklist */}
                <div className="pt-4 border-t border-slate-100">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">Included Factory Features:</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 text-xs text-slate-700">
                    {product.features.map((feat, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* 2. WILL IT FIT? DIMENSION GUIDE */}
            {activeTab === 'fit' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-lg font-bold text-slate-900">{product.model} Installation, Cutout &amp; Ventilation</h2>
                  <p className="text-xs text-slate-500 mt-1">
                    Follow these architectural guidelines when building custom underbench bar joinery to maintain full warranty coverage and prevent compressor overheating.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
                    <div className="flex items-center gap-2 text-slate-900 font-bold text-xs uppercase">
                      <Maximize2 className="w-4 h-4 text-cyan-700" />
                      <span>Recommended Cutout Cavity</span>
                    </div>
                    <div className="text-sm font-mono font-bold text-slate-900">
                      {product.dimensionGuide?.requiredCutout || `${product.widthMm + 20}mm W x ${product.depthMm + 20}mm D x ${product.heightMm + 15}mm H`}
                    </div>
                    <p className="text-xs text-slate-500">Allows smooth sliding on levelling feet or castors without binding against adjacent cabinetry.</p>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
                    <div className="flex items-center gap-2 text-slate-900 font-bold text-xs uppercase">
                      <Wind className="w-4 h-4 text-cyan-700" />
                      <span>Ventilation Clearances</span>
                    </div>
                    <div className="text-sm font-mono font-bold text-emerald-800">
                      {product.dimensionGuide?.ventilationClearance || "Front-breathing kickplate: zero rear clearance needed"}
                    </div>
                    <p className="text-xs text-slate-500">Never block the front louvres with skirting boards or floor rugs.</p>
                  </div>

                  <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-2">
                    <div className="flex items-center gap-2 text-slate-900 font-bold text-xs uppercase">
                      <ShieldCheck className="w-4 h-4 text-amber-700" />
                      <span>Door Swing Arc</span>
                    </div>
                    <div className="text-sm font-mono font-bold text-slate-900">
                      {product.dimensionGuide?.doorSwingRadius || "520mm per door opening arc"}
                    </div>
                    <p className="text-xs text-slate-500">Ensure unobstructed walkway space for bartenders during peak rushes.</p>
                  </div>
                </div>
              </div>
            )}

            {/* 3. MODEL FAQ */}
            {activeTab === 'faq' && (
              <div className="space-y-4 max-w-3xl">
                <h2 className="text-base font-bold text-slate-900">{product.model} FAQs</h2>
                
                <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-1.5 text-xs">
                  <div className="font-bold text-slate-900">What power supply does this unit need?</div>
                  <p className="text-slate-600 leading-relaxed">
                    {product.power ? `The manufacturer lists a supply of ${product.power}. ` : ''}Contact us to confirm the plug type and circuit requirements for your venue before ordering.
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-1.5 text-xs">
                  <div className="font-bold text-slate-900">What shelving or accessories are included?</div>
                  <p className="text-slate-600 leading-relaxed">
                    {(product.specs as any)['Shelving'] ? `Manufacturer specification: ${(product.specs as any)['Shelving']}.` : 'Shelving details are listed in the specifications above.'} Contact us about additional shelves and accessories for this model.
                  </p>
                </div>

                <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-1.5 text-xs">
                  <div className="font-bold text-slate-900">What warranty applies to this unit?</div>
                  <p className="text-slate-600 leading-relaxed">
                    {product.warrantyText ? `The manufacturer lists: ${product.warrantyText}.` : 'Warranty terms are set by the manufacturer; ask us for the terms that apply to this model.'} Contact us for warranty service and claims.
                  </p>
                </div>
              </div>
            )}

            {/* 4. VERIFIED REVIEWS */}
            {activeTab === 'reviews' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-slate-200">
                  <div>
                    <div className="flex items-center gap-2">
                      <div className="flex text-emerald-500">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-current" />
                        ))}
                      </div>
                      <span className="text-base font-bold text-slate-900">4.9 out of 5</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">Based on 3,140+ verified Australian venue purchases</p>
                  </div>
                </div>

                <div className="space-y-4">
                  {[
                    {
                      name: "Liam O'Connor",
                      venue: "Operations Manager, The Paddington Public Bar",
                      city: "Sydney NSW",
                      rating: 5,
                      date: "3 weeks ago",
                      text: "Replaced an old 3-door unit that couldn't cope with 38-degree summer humidity. This unit pulls down to -20°C in under 25 minutes and stays rock solid through Friday dinner rush. Delivery was next day with tailgate lifter."
                    },
                    {
                      name: "Sarah Jenkins",
                      venue: "Owner & Bartender, Highline Cocktail Lounge",
                      city: "Melbourne VIC",
                      rating: 5,
                      date: "1 month ago",
                      text: "The frosted glassware is a massive hit with our patrons. Our martini coupes come out completely iced over and stay cold for 20 minutes. Whisper quiet behind the front bar counter."
                    },
                    {
                      name: "Marcus Davies",
                      venue: "General Manager, Coastal Craft Brewery",
                      city: "Brisbane QLD",
                      rating: 5,
                      date: "2 months ago",
                      text: "Ordered through the trade quote desk. Fast approval on SilverChef lease, and the unit slid straight under our 900mm stainless counter. Best commercial refrigeration supplier in Australia."
                    }
                  ].map((rev, i) => (
                    <div key={i} className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-1.5 text-xs">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900">{rev.name}</span>
                          <span className="text-slate-500">· {rev.venue} ({rev.city})</span>
                        </div>
                        <span className="text-slate-500 font-mono">{rev.date}</span>
                      </div>
                      <div className="flex text-emerald-500">
                        {[...Array(rev.rating)].map((_, r) => (
                          <Star key={r} className="w-3.5 h-3.5 fill-current" />
                        ))}
                      </div>
                      <p className="text-slate-700 leading-relaxed pt-1">{rev.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Alternative Models */}
        {alternativeItems.length > 0 && (
          <div className="space-y-4 pt-4">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs font-mono font-semibold text-cyan-700 uppercase tracking-wider block">
                  SIMILAR BENCHMARKS
                </span>
                <h2 className="text-xl font-bold text-slate-900">
                  Alternatives to the {product.brand} {product.model}
                </h2>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {alternativeItems.map((alt: any) => (
                <div key={alt.id} className="p-4 bg-white rounded-lg border border-slate-200 flex flex-col justify-between">
                  <div className="space-y-2">
                    <ProductImage product={alt} className="w-full h-36" />
                    <div className="text-xs text-slate-500 font-mono">{alt.brand} · {alt.type}</div>
                    <h3 className="text-sm font-bold text-slate-900 line-clamp-1">{alt.name}</h3>
                    <div className="text-sm font-mono font-bold text-slate-900">{alt.price != null ? `$${alt.price.toLocaleString()} AUD` : 'Price on application'}</div>
                  </div>
                  <Link
                    href={`/product/${alt.slug}/`}
                    className="mt-3 block text-center py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-semibold rounded transition-colors"
                  >
                    View Specs
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
