import React, { useState } from 'react';
import { ShieldCheck, Wrench, CheckCircle2, Phone, AlertCircle, Send, FileText } from 'lucide-react';
import { BRANDS, SITE } from '../config/site.js';
import { Link } from '../context/RouterContext';
import { collectForm, sendEnquiry } from '../lib/enquiry-client';

export const WarrantyPage: React.FC = () => {
  const [brand, setBrand] = useState('Skope');
  const [modelNumber, setModelNumber] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [venueName, setVenueName] = useState('');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [faultType, setFaultType] = useState('Not cooling / temperature fluctuating');
  const [faultDescription, setFaultDescription] = useState('');
  const [purchaseDate, setPurchaseDate] = useState('');
  const [invoiceRef, setInvoiceRef] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [claimId, setClaimId] = useState('');

  const [sending, setSending] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (sending) return;
    setSending(true);
    setError('');
    try {
      const { ref } = await sendEnquiry('warranty', collectForm(e.currentTarget));
      setClaimId(ref);
      setSubmitted(true);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Banner */}
        <div className="bg-slate-900 text-white rounded-xl border border-slate-800 p-6 sm:p-10 shadow-lg space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono font-semibold text-emerald-400 uppercase tracking-wider">
            <span>WARRANTY &amp; SERVICE CLAIMS</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            Warranty Claim and Service Request
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Manufacturer warranty terms are listed on each product page. If your cabinet has a fault, send us the model and serial number from the data plate and a description of the problem. We will review your claim and contact you with the next steps.
          </p>

          <div className="pt-2 flex items-center gap-4 text-xs text-amber-400 font-semibold">
            <Phone className="w-4 h-4 shrink-0" />
            <span>Questions about a claim? Call {SITE.phoneDisplay}</span>
          </div>
        </div>

        {/* Claim Form */}
        <div className="bg-white rounded-xl border border-slate-200/90 shadow-xs p-6 sm:p-8">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-6 text-xs">
              <div>
                <h2 className="text-lg font-bold text-slate-900">Equipment Warranty Claim Form</h2>
                <p className="text-xs text-slate-500 mt-0.5">Please provide exact model and serial data found on the data plate inside the cabinet.</p>
              </div>

              {/* Step 1: Equipment Identification */}
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-4">
                <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px] block">
                  1. Machine Data Plate Details
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Equipment Brand *</label>
                    <select
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded px-3 py-2 text-slate-900 focus:outline-none focus:border-amber-500"
                    >
                      {BRANDS.map((b: any) => (
                        <option key={b.slug} value={b.name}>{b.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Model Number *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. UB-210-F"
                      value={modelNumber}
                      onChange={(e) => setModelNumber(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded px-3 py-2 text-slate-900 font-mono focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Serial Number *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. SN-8921-X4"
                      value={serialNumber}
                      onChange={(e) => setSerialNumber(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded px-3 py-2 text-slate-900 font-mono focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Approx. Purchase Date</label>
                    <input
                      type="date"
                      value={purchaseDate}
                      onChange={(e) => setPurchaseDate(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded px-3 py-2 text-slate-900 font-mono focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Tax Invoice / Order Ref Number</label>
                    <input
                      type="text"
                      placeholder="e.g. INV-10492"
                      value={invoiceRef}
                      onChange={(e) => setInvoiceRef(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded px-3 py-2 text-slate-900 font-mono focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>
              </div>

              {/* Step 2: Venue Contact & Location */}
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-4">
                <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px] block">
                  2. Equipment Location
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Venue / Trading Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Harbour View Hotel"
                      value={venueName}
                      onChange={(e) => setVenueName(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded px-3 py-2 text-slate-900 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Manager / Contact Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Full Name"
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded px-3 py-2 text-slate-900 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Contact Email *</label>
                    <input
                      type="email"
                      required
                      placeholder="contact@venue.com.au"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded px-3 py-2 text-slate-900 focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Contact Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="0400 000 000"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-white border border-slate-300 rounded px-3 py-2 text-slate-900 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Street Address, Suburb & Postcode *</label>
                  <input
                    type="text"
                    required
                    placeholder="123 George St, The Rocks NSW 2000"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded px-3 py-2 text-slate-900 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Step 3: Fault Details */}
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 space-y-4">
                <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px] block">
                  3. Reported Mechanical Fault
                </span>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Primary Symptom / Issue Type</label>
                  <select
                    value={faultType}
                    onChange={(e) => setFaultType(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded px-3 py-2 text-slate-900 focus:outline-none focus:border-amber-500"
                  >
                    <option value="Not cooling / temperature fluctuating">Not cooling / temperature fluctuating</option>
                    <option value="Digital controller alarm code (E1, E2, HA, LA)">Digital controller alarm code (E1, E2, HA, LA)</option>
                    <option value="Unusual compressor vibration or loud fan noise">Unusual compressor vibration or loud fan noise</option>
                    <option value="Excessive frost/ice buildup on evaporator coils">Excessive frost/ice buildup on evaporator coils</option>
                    <option value="Door gasket / seal loose or torn">Door gasket / seal loose or torn</option>
                    <option value="Internal LED lighting or glass heater issue">Internal LED lighting or glass heater issue</option>
                    <option value="Other mechanical or electrical fault">Other mechanical or electrical fault</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Detailed Fault Notes & Observations *</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Describe what temperature reading is showing, how long the issue has persisted, whether condenser coils have been cleaned, and when a service mechanic can access the bar..."
                    value={faultDescription}
                    onChange={(e) => setFaultDescription(e.target.value)}
                    className="w-full bg-white border border-slate-300 rounded px-3 py-2 text-slate-900 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-slate-500 text-[11px] flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>We review every claim and reply by email or phone</span>
                </span>

                {error && <div role="alert" className="mr-4 p-3 rounded border border-red-200 bg-red-50 text-red-800">{error}</div>}
                <button
                  type="submit"
                  disabled={sending}
                  className="px-6 py-3 bg-slate-900 hover:bg-slate-800 disabled:opacity-60 text-white font-bold text-xs uppercase tracking-wider rounded-md transition-colors shadow-sm flex items-center gap-2"
                >
                  <Send className="w-4 h-4 text-amber-400" />
                  <span>{sending ? 'Sending…' : 'Lodge Warranty Service Claim'}</span>
                </button>
              </div>
            </form>
          ) : (
            /* Confirmation */
            <div className="py-8 text-center space-y-4 max-w-md mx-auto">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs font-mono font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded border border-emerald-200">
                  Claim Reference: {claimId}
                </span>
                <h3 className="text-2xl font-bold text-slate-900 mt-3">Warranty Ticket Lodged</h3>
                <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                  Your claim for <strong>{brand} {modelNumber}</strong> has been received. We will contact you at <strong>{phone}</strong> or by email to confirm the next steps.
                </p>
              </div>

              <div className="p-4 bg-slate-50 rounded-lg border border-slate-200 text-xs text-left space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Venue:</span>
                  <span className="font-semibold text-slate-900">{venueName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Service SLA:</span>
                  <span className="font-semibold text-emerald-700">Same-Day / Next-Day On-Site</span>
                </div>
              </div>

              <div className="pt-2 flex justify-center gap-3">
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-4 py-2 bg-slate-900 text-white text-xs font-semibold rounded-md hover:bg-slate-800"
                >
                  Submit Another Claim
                </button>
                <Link
                  href="/"
                  className="px-4 py-2 bg-slate-100 text-slate-800 text-xs font-semibold rounded-md hover:bg-slate-200"
                >
                  Back to Store
                </Link>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
