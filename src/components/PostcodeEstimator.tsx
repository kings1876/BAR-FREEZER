import React, { useState } from 'react';
import { Truck, MapPin, CheckCircle2, AlertCircle } from 'lucide-react';
import { Link } from '../context/RouterContext';

interface PostcodeEstimatorProps {
  productPrice?: number;
}

// State for an Australian postcode, from the standard Australia Post ranges.
function stateFor(n: number): string | null {
  if ((n >= 200 && n <= 299) || (n >= 2600 && n <= 2618) || (n >= 2900 && n <= 2920)) return 'ACT';
  if (n >= 800 && n <= 999) return 'NT';
  if ((n >= 1000 && n <= 2599) || (n >= 2619 && n <= 2899) || (n >= 2921 && n <= 2999)) return 'NSW';
  if ((n >= 3000 && n <= 3999) || (n >= 8000 && n <= 8999)) return 'VIC';
  if ((n >= 4000 && n <= 4999) || (n >= 9000 && n <= 9999)) return 'QLD';
  if (n >= 5000 && n <= 5999) return 'SA';
  if (n >= 6000 && n <= 6999) return 'WA';
  if (n >= 7000 && n <= 7999) return 'TAS';
  return null;
}

// Freight is quoted per order, so this checks that we deliver to the postcode and points to a quote. It shows no prices or transit times.
export const PostcodeEstimator: React.FC<PostcodeEstimatorProps> = () => {
  const [postcode, setPostcode] = useState('');
  const [result, setResult] = useState<{ pc: string; state: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const check = (e: React.FormEvent) => {
    e.preventDefault();
    const pc = postcode.trim();
    const state = /^\d{4}$/.test(pc) ? stateFor(parseInt(pc, 10)) : null;
    if (!state) {
      setError('Please enter a valid 4-digit Australian postcode (e.g. 2000, 3000, 4000)');
      setResult(null);
      return;
    }
    setError(null);
    setResult({ pc, state });
  };

  return (
    <div className="p-4 bg-slate-50 rounded-lg border border-slate-200/90 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wide">
          <Truck className="w-4 h-4 text-cyan-700" />
          <span>Delivery Area Check</span>
        </div>
        <span className="text-[11px] text-slate-500 font-mono">Australia-Wide</span>
      </div>

      <form onSubmit={check} className="flex gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            inputMode="numeric"
            maxLength={4}
            aria-label="Delivery postcode"
            placeholder="Enter 4-digit AU Postcode (e.g. 2000)"
            value={postcode}
            onChange={(e) => setPostcode(e.target.value)}
            className="w-full text-xs font-mono bg-white border border-slate-300 rounded px-3 py-2 pl-8 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
          />
          <MapPin className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
        </div>
        <button
          type="submit"
          className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold rounded transition-colors whitespace-nowrap"
        >
          Check
        </button>
      </form>

      {error && (
        <div className="flex items-center gap-1.5 text-xs text-rose-600">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {result && (
        <div className="p-3 bg-white rounded border border-slate-200 space-y-1.5 text-xs">
          <div className="flex items-center gap-1.5 font-semibold text-cyan-800">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>We deliver to {result.pc} ({result.state})</span>
          </div>
          <p className="text-slate-600 text-[11px] leading-relaxed">
            Freight is quoted to your postcode and confirmed with your order. <Link href="/quote/" className="text-cyan-700 font-semibold">Request a quote</Link> with your postcode for a delivered price.
          </p>
        </div>
      )}
    </div>
  );
};
