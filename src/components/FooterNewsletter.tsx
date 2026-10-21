'use client';

import React, { useState } from 'react';
import { sendEnquiry } from '../lib/enquiry-client';

export const FooterNewsletter: React.FC = () => {
  const [emailInput, setEmailInput] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [subError, setSubError] = useState('');

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput.trim()) return;
    setSubError('');
    try {
      await sendEnquiry('newsletter', { Email: emailInput.trim() });
      setSubscribed(true);
      setEmailInput('');
    } catch (err) {
      setSubError((err as Error).message);
    }
  };

  return (
    <>
            <form onSubmit={handleSubscribe} className="flex w-full md:w-auto max-w-md gap-2">
              <input
                type="email"
                required
                placeholder="Enter your email (e.g. venue@bar.com.au)"
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                className="bg-slate-900 border border-slate-700 text-slate-100 placeholder-slate-500 text-xs px-3 py-2 rounded-md focus:outline-none focus:border-amber-500 flex-1 md:w-64"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase rounded-md transition-colors whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>

            {subError && <p role="alert" className="max-w-7xl mx-auto text-red-400 text-xs mt-2 text-center md:text-right">{subError}</p>}
            {subscribed && (
              <p className="max-w-7xl mx-auto text-emerald-400 text-xs mt-2 text-center md:text-right">
                ✓ Subscribed to Bar Freezer trade updates.
              </p>
            )}

    </>
  );
};
