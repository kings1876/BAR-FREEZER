import React, { useState } from 'react';
import { 
  Building, 
  FileText, 
  Percent, 
  Truck, 
  ShieldCheck, 
  Clock, 
  Phone, 
  CheckCircle2, 
  Plus, 
  Trash2,
  Send
} from 'lucide-react';
import { SITE, PRODUCTS, VENUES } from '../config/site.js';
import { useCart } from '../context/CartContext';
import { Link } from '../context/RouterContext';
import { collectForm, sendEnquiry } from '../lib/enquiry-client';

export const TradePage: React.FC = () => {
  const { cart, addToCart, setIsQuoteModalOpen } = useCart();

  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);
  const [businessName, setBusinessName] = useState('');
  const [abn, setAbn] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [venueType, setVenueType] = useState('Pubs & Hotels');
  const [postcode, setPostcode] = useState('');
  const [deliveryNotes, setDeliveryNotes] = useState('');
  const [tailgateNeeded, setTailgateNeeded] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [quoteNumber, setQuoteNumber] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  const selectedProducts = selectedProductIds
    .map((id) => PRODUCTS.find((p) => p.id === id))
    .filter(Boolean);

  const totalRetail = selectedProducts.reduce((sum, p: any) => sum + (p.price ?? 0), 0);
  const totalTrade = selectedProducts.reduce((sum, p: any) => sum + (p.tradePrice ?? 0), 0);
  const tradeSavings = totalRetail - totalTrade;

  const handleAddProductToQuote = (productId: string) => {
    if (!selectedProductIds.includes(productId)) {
      setSelectedProductIds([...selectedProductIds, productId]);
    }
  };

  const handleRemoveProductFromQuote = (productId: string) => {
    setSelectedProductIds(selectedProductIds.filter((id) => id !== productId));
  };

  const handleSubmitQuote = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (sending) return;
    setSending(true);
    setError('');
    try {
      const { ref } = await sendEnquiry(
        'trade',
        { ...collectForm(e.currentTarget), 'Tailgate required': tailgateNeeded ? 'Yes' : 'No' },
        { items: selectedProducts.map((p: any) => ({ name: p.name, sku: p.sku, qty: 1, price: p.price ?? null })) }
      );
      setQuoteNumber(ref);
      setIsSubmitted(true);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Header Hero */}
        <div className="bg-slate-900 text-white rounded-xl border border-slate-800 p-6 sm:p-10 shadow-lg space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold text-amber-400 uppercase tracking-wider">
            <span>QUOTES &amp; TRADE PRICING</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            Request a Quote for Bar Fridges and Freezers
          </h1>

          <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
            Build a list of the bar fridges, freezers, kegerators and ice machines you need, then send it to us for a delivered price. Trade and multi-unit pricing is confirmed in your quote. Include your ABN and delivery postcode so we can quote accurately.
          </p>

          <div className="flex flex-wrap items-center gap-6 text-xs text-slate-400 pt-3 border-t border-slate-800">
            <span className="flex items-center gap-1.5 text-white">
              <Percent className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Multi-unit and trade pricing on request</span>
            </span>
            <span className="flex items-center gap-1.5 text-white">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Fit-out advice for venues</span>
            </span>
            <span className="flex items-center gap-1.5 text-white">
              <Truck className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>Delivery quoted to your postcode</span>
            </span>
          </div>
        </div>

        {/* Multi-Product Interactive Quote Builder */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-6 lg:p-8 space-y-6">
          <div>
            <span className="text-xs font-mono font-semibold text-cyan-700 uppercase tracking-wider block">
              STEP 1: SELECT EQUIPMENT
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mt-0.5">
              Multi-Product Trade Quote Builder
            </h2>
            <p className="text-xs text-slate-500 mt-1">
              Add the bar fridges, freezers or ice makers you are considering. We reply with a delivered price.
            </p>
          </div>

          {!isSubmitted ? (
            <div className="space-y-6">
              {/* Selected Equipment Table */}
              <div className="border border-slate-200 rounded-lg overflow-hidden">
                <div className="bg-slate-900 text-white p-3 text-xs font-semibold grid grid-cols-12 gap-2">
                  <div className="col-span-6">Equipment Model & Specs</div>
                  <div className="col-span-2 text-right">RRP (Inc. GST)</div>
                  <div className="col-span-3 text-right">Trade price</div>
                  <div className="col-span-1 text-center">Action</div>
                </div>

                {selectedProducts.length > 0 ? (
                  <div className="divide-y divide-slate-100 text-xs">
                    {selectedProducts.map((p: any) => (
                      <div key={p.id} className="p-3 grid grid-cols-12 gap-2 items-center bg-white hover:bg-slate-50">
                        <div className="col-span-6">
                          <span className="font-bold text-slate-900 block">{p.name}</span>
                          <span className="text-[11px] text-slate-500 font-mono">
                            {p.brand} · SKU: {p.sku} · {p.tempRange} · {p.power}
                          </span>
                        </div>
                        <div className="col-span-2 text-right font-mono text-slate-900">
                          {p.price != null ? `${p.price.toLocaleString()} AUD` : 'On application'}
                        </div>
                        <div className="col-span-3 text-right font-mono font-bold text-emerald-800">
                          {p.tradePrice != null ? `$${p.tradePrice.toLocaleString()} AUD` : 'Quote'}
                        </div>
                        <div className="col-span-1 text-center">
                          <button
                            onClick={() => handleRemoveProductFromQuote(p.id)}
                            className="text-slate-400 hover:text-rose-600 p-1"
                            title="Remove from quote"
                          >
                            <Trash2 className="w-4 h-4 mx-auto" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-6 text-center text-slate-400 text-xs">
                    No items selected yet. Choose equipment from the quick-add list below.
                  </div>
                )}

                {/* Listed total */}
                {selectedProducts.length > 0 && (
                  <div className="bg-slate-50 p-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
                    <span className="text-slate-500">Trade and multi-unit pricing is confirmed in your quote.</span>
                    <div className="text-right">
                      <span className="text-slate-500 block text-[11px]">Listed total:</span>
                      <span className="text-lg font-mono font-bold text-slate-900">
                        ${totalRetail.toLocaleString()} AUD <span className="text-xs font-normal text-slate-500">Incl. GST</span>
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Quick Add Available Equipment */}
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700 block">
                  Quick add popular equipment:
                </span>
                <div className="flex flex-wrap gap-2">
                  {PRODUCTS.filter((p: any) => !selectedProductIds.includes(p.id) && p.primaryCategory !== 'Accessories & Parts' && p.condition === 'new' && p.capacityLitres > 0).filter((_: any, i: number) => i % 97 === 0).slice(0, 6).map((p: any) => (
                    <button
                      key={p.id}
                      onClick={() => handleAddProductToQuote(p.id)}
                      className="px-3 py-1.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-medium flex items-center gap-1.5 transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5 text-cyan-700" />
                      <span>{p.brand} {p.model} ({p.capacityLitres}L)</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* STEP 2: Trade Client Information Form */}
              <form onSubmit={handleSubmitQuote} className="pt-6 border-t border-slate-200 space-y-4 text-xs">
                <div>
                  <span className="text-xs font-mono font-semibold text-cyan-700 uppercase tracking-wider block">
                    STEP 2: SUBMIT VENUE DETAILS
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mt-0.5">
                    Your Contact & Site Access Details
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Company / Venue Trading Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Crown Hotel Group"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-slate-900 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Australian Business Number (ABN) *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 12 345 678 901"
                      value={abn}
                      onChange={(e) => setAbn(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-slate-900 font-mono focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Contact Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Full Name"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-slate-900 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Email for Quote PDF *</label>
                    <input
                      type="email"
                      required
                      placeholder="manager@venue.com.au"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-slate-900 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Phone *</label>
                    <input
                      type="tel"
                      required
                      placeholder="0400 000 000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-slate-900 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Venue Type</label>
                    <select
                      value={venueType}
                      onChange={(e) => setVenueType(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-slate-900"
                    >
                      {VENUES.map((v: any) => (
                        <option key={v.slug} value={v.name}>{v.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Delivery Postcode & State *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 2000 Sydney NSW"
                      value={postcode}
                      onChange={(e) => setPostcode(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-slate-900 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Project Details, Bench Heights & Fit-out Schedule</label>
                  <textarea
                    rows={3}
                    placeholder="Provide details on project timeline, preferred brands, dimensions, or custom stainless requirements..."
                    value={deliveryNotes}
                    onChange={(e) => setDeliveryNotes(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded px-3 py-2 text-slate-900"
                  />
                </div>

                <div className="flex items-center justify-between pt-4">
                  <span className="text-slate-500 text-[11px] flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Tax invoices are supplied for Australian business purchases</span>
                  </span>

                  {error && <div role="alert" className="mr-4 p-3 rounded border border-red-200 bg-red-50 text-red-800">{error}</div>}
                  <button
                    type="submit"
                    disabled={sending}
                    className="px-6 py-3 bg-amber-500 hover:bg-amber-400 disabled:opacity-60 text-slate-950 font-bold text-xs uppercase tracking-wider rounded-md transition-colors shadow-sm flex items-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    <span>{sending ? 'Sending…' : 'Submit Trade Quote Request'}</span>
                  </button>
                </div>
              </form>
            </div>
          ) : (
            /* Submission State */
            <div className="py-12 text-center space-y-4 max-w-lg mx-auto">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs font-mono font-bold text-amber-700 bg-amber-50 px-3 py-1 rounded border border-amber-200">
                  Quote Ref: {quoteNumber}
                </span>
                <h3 className="text-2xl font-bold text-slate-900 mt-3">Commercial Trade Proposal Dispatched</h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  An itemized commercial quote has been generated for <strong>{businessName}</strong> and emailed to <strong>{email}</strong>.
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 text-xs text-left space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">ABN Registered:</span>
                  <span className="font-mono text-slate-900">{abn}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Estimated Total:</span>
                  <span className="font-mono font-bold text-emerald-700">${totalTrade.toLocaleString()} AUD</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Response SLA:</span>
                  <span className="font-semibold text-slate-900">&lt; 2 Business Hours</span>
                </div>
              </div>

              <div className="pt-2 flex justify-center gap-3">
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-md hover:bg-slate-800"
                >
                  Create Another Quote
                </button>
                <Link
                  href="/bar-freezers/"
                  className="px-4 py-2 bg-slate-100 text-slate-800 text-xs font-semibold rounded-md hover:bg-slate-200"
                >
                  Return to Store
                </Link>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
