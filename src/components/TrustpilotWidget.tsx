import React from 'react';
import { Star, CheckCircle2, ExternalLink } from 'lucide-react';
import { SITE } from '../config/site.js';
import { Link } from '../context/RouterContext';

interface TrustpilotBadgeProps {
  variant?: 'compact' | 'pill' | 'banner' | 'card' | 'floating';
  className?: string;
  onClick?: () => void;
}

export const TrustpilotBadge: React.FC<TrustpilotBadgeProps> = ({
  variant = 'compact',
  className = '',
  onClick
}) => {
  if (variant === 'pill') {
    return (
      <Link
        href="/reviews/"
        onClick={onClick}
        className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#00b67a] hover:bg-[#009e6a] text-white shadow-xs transition-colors group ${className}`}
        title="View 3,140+ Trustpilot reviews"
      >
        <div className="flex items-center gap-0.5">
          {[...Array(5)].map((_, i) => (
            <span key={i} className="inline-flex items-center justify-center w-3.5 h-3.5 bg-[#005128] text-white text-[10px] font-bold">
              ★
            </span>
          ))}
        </div>
        <span className="text-xs font-bold tracking-tight">Trustpilot</span>
        <span className="text-xs font-mono font-bold">4.9 / 5</span>
        <span className="hidden sm:inline text-[11px] text-white/90">· 3,140+ Reviews</span>
      </Link>
    );
  }

  if (variant === 'banner') {
    return (
      <div className={`p-4 sm:p-5 bg-emerald-950/40 border border-emerald-800/60 rounded-xl flex flex-col sm:flex-row items-center justify-between gap-4 ${className}`}>
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-lg bg-[#00b67a] flex items-center justify-center text-white font-black text-xl shadow-sm shrink-0">
            ★
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-bold text-white tracking-tight">Trustpilot</span>
              <span className="text-xs font-mono font-bold text-[#00b67a] bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                Score: 4.9 / 5.0 · Excellent
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5">
              Over <strong>3,140 verified Australian hospitality reviews</strong> from pub owners, cocktail bars, cafes, and breweries.
            </p>
          </div>
        </div>

        <Link
          href="/reviews/"
          onClick={onClick}
          className="px-4 py-2 bg-[#00b67a] hover:bg-[#009e6a] text-slate-950 font-bold text-xs uppercase tracking-wider rounded-md transition-colors whitespace-nowrap shadow-sm flex items-center gap-1.5"
        >
          <span>Read All 3,140+ Reviews</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </Link>
      </div>
    );
  }

  // Default compact
  return (
    <Link
      href="/reviews/"
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 text-xs font-medium text-slate-300 hover:text-white transition-colors ${className}`}
    >
      <div className="flex items-center gap-0.5">
        {[...Array(5)].map((_, i) => (
          <span key={i} className="inline-flex items-center justify-center w-3 h-3 bg-[#00b67a] text-slate-950 text-[9px] font-bold">
            ★
          </span>
        ))}
      </div>
      <span className="font-bold text-white">Trustpilot</span>
      <span className="font-mono text-emerald-400 font-semibold">4.9 / 5</span>
      <span className="text-slate-400 font-mono">(3,140+ reviews)</span>
    </Link>
  );
};

export const TrustpilotFloatingTab: React.FC = () => {
  return (
    <aside 
      className="hidden md:flex fixed bottom-6 right-6 z-30"
      aria-label="Trustpilot verified reviews summary"
    >
      <Link
        href="/reviews/"
        className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg bg-slate-900/95 hover:bg-slate-900 border border-emerald-500/40 text-white shadow-2xl backdrop-blur-md transition-all hover:scale-105 group"
      >
        <div className="w-7 h-7 rounded bg-[#00b67a] flex items-center justify-center text-white text-base font-bold shadow-xs">
          ★
        </div>
        <div className="flex flex-col text-left">
          <div className="flex items-center gap-1">
            <span className="text-xs font-bold text-white">Trustpilot</span>
            <span className="text-xs font-mono font-bold text-emerald-400">4.9</span>
          </div>
          <span className="text-[10px] text-slate-400 font-mono">
            3,140+ AU Reviews
          </span>
        </div>
      </Link>
    </aside>
  );
};
