import React, { useState } from 'react';
import { Truck, MapPin, CheckCircle2, AlertCircle, Clock } from 'lucide-react';

interface PostcodeEstimatorProps {
  productPrice?: number;
}

export const PostcodeEstimator: React.FC<PostcodeEstimatorProps> = ({ productPrice = 2000 }) => {
  const [postcode, setPostcode] = useState('');
  const [estimate, setEstimate] = useState<{
    city: string;
    state: string;
    deliveryTime: string;
    cost: string;
    depot: string;
    tailgateIncluded: boolean;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const calculateEstimate = (e: React.FormEvent) => {
    e.preventDefault();
    const pc = postcode.trim();
    if (!/^\d{4}$/.test(pc)) {
      setError('Please enter a valid 4-digit Australian postcode (e.g. 2000, 3000, 4000)');
      setEstimate(null);
      return;
    }

    setError(null);
    const num = parseInt(pc, 10);
    const isFree = productPrice >= 3500;

    if (num >= 2000 && num <= 2234) {
      setEstimate({
        city: 'Sydney Metro',
        state: 'NSW',
        deliveryTime: 'Next Business Day (Dispatch before 2pm)',
        cost: isFree ? 'FREE ($3,500+ order)' : '$89.00 AUD flat rate',
        depot: 'Dispatched from Chullora Distribution Centre NSW',
        tailgateIncluded: true
      });
    } else if (num >= 2250 && num <= 2999) {
      setEstimate({
        city: 'Regional NSW / ACT',
        state: 'NSW/ACT',
        deliveryTime: '1 - 3 Business Days',
        cost: isFree ? 'FREE' : '$125.00 AUD specialized linehaul',
        depot: 'Sydney Regional Express Logistics',
        tailgateIncluded: true
      });
    } else if (num >= 3000 && num <= 3207) {
      setEstimate({
        city: 'Melbourne Metro',
        state: 'VIC',
        deliveryTime: '1 - 2 Business Days',
        cost: isFree ? 'FREE' : '$89.00 AUD flat rate',
        depot: 'Dispatched from Truganina Logistics Hub VIC',
        tailgateIncluded: true
      });
    } else if (num >= 3211 && num <= 3999) {
      setEstimate({
        city: 'Regional Victoria',
        state: 'VIC',
        deliveryTime: '2 - 3 Business Days',
        cost: isFree ? 'FREE' : '$110.00 AUD',
        depot: 'Melbourne Logistics Hub',
        tailgateIncluded: true
      });
    } else if (num >= 4000 && num <= 4207) {
      setEstimate({
        city: 'Brisbane Metro',
        state: 'QLD',
        deliveryTime: '1 - 2 Business Days',
        cost: isFree ? 'FREE' : '$95.00 AUD flat rate',
        depot: 'Dispatched from Yatala Warehouse QLD',
        tailgateIncluded: true
      });
    } else if (num >= 4208 && num <= 4999) {
      setEstimate({
        city: 'Gold Coast / Sunshine Coast / Regional QLD',
        state: 'QLD',
        deliveryTime: '2 - 4 Business Days',
        cost: isFree ? 'FREE' : '$145.00 AUD',
        depot: 'Yatala Express Depot QLD',
        tailgateIncluded: true
      });
    } else if (num >= 5000 && num <= 5999) {
      setEstimate({
        city: 'Adelaide & SA',
        state: 'SA',
        deliveryTime: '2 - 3 Business Days',
        cost: isFree ? 'FREE' : '$95.00 AUD',
        depot: 'Regency Park Freight Terminal SA',
        tailgateIncluded: true
      });
    } else if (num >= 6000 && num <= 6999) {
      setEstimate({
        city: 'Perth Metro & WA',
        state: 'WA',
        deliveryTime: '2 - 3 Business Days',
        cost: isFree ? 'FREE' : '$120.00 AUD (WA local stock)',
        depot: 'Hazelmere Airport Logistics Park WA',
        tailgateIncluded: true
      });
    } else if (num >= 7000 && num <= 7999) {
      setEstimate({
        city: 'Hobart & Tasmania',
        state: 'TAS',
        deliveryTime: '3 - 4 Business Days (Bass Strait Express)',
        cost: '$165.00 AUD in heavy export crate',
        depot: 'Derwent Park Terminal TAS',
        tailgateIncluded: true
      });
    } else if (num >= 800 && num <= 999) {
      setEstimate({
        city: 'Darwin & NT',
        state: 'NT',
        deliveryTime: '4 - 6 Business Days',
        cost: '$220.00 AUD (Tropical humidity test included)',
        depot: 'Berrimah Freight Terminal NT',
        tailgateIncluded: true
      });
    } else {
      setEstimate({
        city: 'Australia Regional / Rural',
        state: 'AU',
        deliveryTime: '3 - 5 Business Days',
        cost: '$135.00 AUD (tailgate included)',
        depot: 'Nearest Capital City Distribution Hub',
        tailgateIncluded: true
      });
    }
  };

  return (
    <div className="p-4 bg-slate-50 rounded-lg border border-slate-200/90 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-900 uppercase tracking-wide">
          <Truck className="w-4 h-4 text-cyan-700" />
          <span>Delivery Lead Time & Cost Estimator</span>
        </div>
        <span className="text-[11px] text-slate-500 font-mono">Australia-Wide</span>
      </div>

      <form onSubmit={calculateEstimate} className="flex gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            maxLength={4}
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

      {estimate && (
        <div className="p-3 bg-white rounded border border-slate-200 space-y-1.5 text-xs">
          <div className="flex items-center justify-between font-semibold text-slate-900">
            <span className="flex items-center gap-1.5 text-cyan-800">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{estimate.city} ({estimate.state})</span>
            </span>
            <span className="font-mono text-emerald-700">{estimate.cost}</span>
          </div>
          <div className="text-slate-600 flex items-center gap-1.5 text-[11px]">
            <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span>Transit: <strong>{estimate.deliveryTime}</strong></span>
          </div>
          <div className="text-[11px] text-slate-500 pt-1 border-t border-slate-100 flex items-center justify-between">
            <span>{estimate.depot}</span>
            <span className="text-emerald-700 font-medium">✓ Hydraulic Tailgate Lifter Included</span>
          </div>
        </div>
      )}
    </div>
  );
};
