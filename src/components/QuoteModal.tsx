import React, { useState } from 'react';
import { X, FileText, CheckCircle2, ShieldCheck, Phone, Building, Send, Plus, Trash2 } from 'lucide-react';
import { SITE, VENUES } from '../config/core.js';
import { useCart } from '../context/CartContext';
import { Product } from '../types';
import { sendEnquiry } from '../lib/enquiry-client';

export const QuoteModal: React.FC = () => {
  const { isQuoteModalOpen, setIsQuoteModalOpen, quoteProducts, cart } = useCart();

  const [businessName, setBusinessName] = useState('');
  const [abn, setAbn] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [postcode, setPostcode] = useState('');
  const [venueType, setVenueType] = useState('Pubs & Hotels');
  const [notes, setNotes] = useState('');
  const [tailgateNeeded, setTailgateNeeded] = useState(true);
  const [stairAccess, setStairAccess] = useState(false);
  const [financeInterest, setFinanceInterest] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [quoteRef, setQuoteRef] = useState('');
  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  if (!isQuoteModalOpen) return null;

  const itemsToQuote = quoteProducts.length > 0 ? quoteProducts : cart.map((c) => c.product);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sending) return;
    setSending(true);
    setError('');
    try {
      const { ref } = await sendEnquiry(
        'quote',
        {
          'Business Name': businessName,
          ABN: abn,
          'Contact Name': contactName,
          Email: email,
          Phone: phone,
          'Venue Type': venueType,
          'Delivery Postcode': postcode,
          'Tailgate truck required': tailgateNeeded ? 'Yes' : 'No',
          'Stairs / difficult access': stairAccess ? 'Yes' : 'No',
          'Finance estimate wanted': financeInterest ? 'Yes' : 'No',
          Notes: notes
        },
        { items: itemsToQuote.map((p: any) => ({ name: p.name, sku: p.sku, qty: 1, price: p.price ?? null })) }
      );
      setQuoteRef(ref);
      setSubmitted(true);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSending(false);
    }
  };

  const handleClose = () => {
    setIsQuoteModalOpen(false);
    setSubmitted(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div 
        className="fixed inset-0 bg-slate-950/75 backdrop-blur-xs transition-opacity"
        onClick={handleClose}
      />

      <div className="min-h-screen px-4 text-center flex items-center justify-center p-4">
        <div className="relative bg-white text-left rounded-xl shadow-2xl max-w-2xl w-full p-6 sm:p-8 overflow-hidden z-10 border border-slate-200">
          
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-5 right-5 text-slate-400 hover:text-slate-900 p-1.5 rounded-md hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {!submitted ? (
            <div>
              {/* Header */}
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-9 h-9 rounded bg-amber-500/10 text-amber-700 flex items-center justify-center">
                  <FileText className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">Commercial Trade Quote Request</h3>
                  <p className="text-xs text-slate-500">Trade and multi-unit pricing, with finance enquiries welcome</p>
                </div>
              </div>

              {/* Items in this quote request */}
              <div className="my-4 p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs">
                <div className="font-semibold text-slate-800 uppercase tracking-wide text-[11px] mb-2 flex justify-between">
                  <span>Selected Refrigeration Units ({itemsToQuote.length})</span>
                  <span className="text-cyan-700 font-mono">Special Trade Rates Apply</span>
                </div>
                {itemsToQuote.length > 0 ? (
                  <div className="space-y-1.5 max-h-36 overflow-y-auto pr-1">
                    {itemsToQuote.map((p) => (
                      <div key={p.id} className="flex items-center justify-between py-1 border-b border-slate-200/60 last:border-0">
                        <span className="font-medium text-slate-900 line-clamp-1 pr-2">{p.name}</span>
                        <span className="font-mono text-slate-600 whitespace-nowrap">
                          {p.price != null ? `MSRP $${p.price.toLocaleString()} AUD` : 'Price on application'}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-slate-500 italic">No specific units pre-selected. Detail your requirements below.</div>
                )}
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Trading / Business Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. The Craft Hotel / Sydney Bar Co"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded px-3 py-2 text-slate-900 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">ABN (Optional for trade discount)</label>
                    <input
                      type="text"
                      placeholder="e.g. 88 642 901 328"
                      value={abn}
                      onChange={(e) => setAbn(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded px-3 py-2 text-slate-900 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Contact Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. David Campbell"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded px-3 py-2 text-slate-900 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Work Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="david@venue.com.au"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded px-3 py-2 text-slate-900 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Mobile / Direct Phone *</label>
                    <input
                      type="tel"
                      required
                      placeholder="0400 123 456"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded px-3 py-2 text-slate-900 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Venue / Application Type</label>
                    <select
                      value={venueType}
                      onChange={(e) => setVenueType(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded px-3 py-2 text-slate-900 focus:outline-none focus:border-amber-500"
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
                      className="w-full bg-white border border-slate-300 rounded px-3 py-2 text-slate-900 focus:outline-none focus:border-amber-500 font-mono"
                    />
                  </div>
                </div>

                {/* Logistics & Access Requirements */}
                <div className="pt-2 border-t border-slate-100">
                  <span className="font-semibold text-slate-800 block mb-2">Delivery & Fit-Out Requirements:</span>
                  <div className="flex flex-wrap gap-4 text-slate-700">
                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={tailgateNeeded}
                        onChange={(e) => setTailgateNeeded(e.target.checked)}
                        className="rounded border-slate-300 text-amber-500 focus:ring-amber-500"
                      />
                      <span>Hydraulic tailgate lifter truck required</span>
                    </label>

                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={stairAccess}
                        onChange={(e) => setStairAccess(e.target.checked)}
                        className="rounded border-slate-300 text-amber-500 focus:ring-amber-500"
                      />
                      <span>Internal stairs / difficult access</span>
                    </label>

                    <label className="flex items-center gap-1.5 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={financeInterest}
                        onChange={(e) => setFinanceInterest(e.target.checked)}
                        className="rounded border-slate-300 text-amber-500 focus:ring-amber-500"
                      />
                      <span>I would like to ask about finance options</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Additional Project Specifications / Fit-out Timeline</label>
                  <textarea
                    rows={2}
                    placeholder="Provide details on project timeline, preferred brands, dimensions, or custom stainless requirements..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded px-3 py-2 text-slate-900 focus:outline-none focus:border-amber-500"
                  />
                </div>

                {error && <div role="alert" className="p-3 rounded border border-red-200 bg-red-50 text-red-800">{error}</div>}
                <div className="pt-2 flex items-center justify-between">
                  <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Average turnaround: &lt; 2 business hours (Mon-Fri)</span>
                  </div>

                  <button
                    type="submit"
                    disabled={sending}
                    className="py-2.5 px-6 rounded-md bg-amber-500 hover:bg-amber-400 disabled:opacity-60 text-slate-950 font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-sm transition-colors"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>{sending ? 'Sending…' : 'Submit Official Quote Request'}</span>
                  </button>
                </div>
              </form>
            </div>
          ) : (
            /* Success confirmation */
            <div className="py-8 text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div>
                <span className="text-xs font-mono font-bold text-amber-600 bg-amber-50 px-3 py-1 rounded border border-amber-200">
                  Quote Reference: {quoteRef}
                </span>
                <h3 className="text-2xl font-bold text-slate-900 mt-3">Trade Quote Submitted!</h3>
                <p className="text-sm text-slate-600 mt-2 max-w-md mx-auto">
                  Thank you, <strong>{contactName || 'Business Owner'}</strong>. We have received your quote request and our sales team will reply by email.
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-600 max-w-md mx-auto text-left space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Business:</span>
                  <span className="font-medium text-slate-900">{businessName || 'Venue Client'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Confirmation Sent To:</span>
                  <span className="font-mono text-slate-900">{email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Expected Response:</span>
                  <span className="font-semibold text-emerald-700">Within 2 hours (AEST)</span>
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={`tel:${SITE.phone.replace(/\s+/g, '')}`}
                  className="w-full sm:w-auto px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-md transition-colors flex items-center justify-center gap-2"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-400" />
                  <span>Call {SITE.phoneDisplay} for Urgent Dispatch</span>
                </a>
                <button
                  onClick={handleClose}
                  className="w-full sm:w-auto px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold text-xs rounded-md transition-colors"
                >
                  Back to Store
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
