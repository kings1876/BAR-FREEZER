import React from 'react';
import SEARCHES from '../config/seo-searches.json';

interface Props {
  path: string;
  minPrice?: number | null;
  noun?: string;
}

// "Popular searches" block: the buying phrases people use for this page's products (Semrush AU research, docs/keyword-map.md).
// Shown as plain text, with the first 12 visible and the rest in an expandable list. Price line uses the real lowest listed price.
export const RelatedSearches: React.FC<Props> = ({ path, minPrice, noun = 'products' }) => {
  const list: string[] = ((SEARCHES as any)[path] as string[]) || [];
  if (!list.length) return null;
  const shown = list.slice(0, 12);
  const rest = list.slice(12);
  const hasCheap = list.some((k) => /cheap/.test(k));
  return (
    <section aria-labelledby="popular-searches" className="bg-white rounded-xl border border-slate-200 p-5 mt-8 space-y-3">
      <h2 id="popular-searches" className="text-base font-bold text-slate-900">Popular searches for {noun}</h2>
      {hasCheap && minPrice ? (
        <p className="text-sm text-slate-600">
          Looking for cheap {noun}? Prices on this page start from ${minPrice.toLocaleString()} AUD including GST. Use the sort menu to put the lowest prices first and compare models side by side.
        </p>
      ) : null}
      <ul className="flex flex-wrap gap-2 text-xs text-slate-700">
        {shown.map((k) => (
          <li key={k} className="px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200">{k}</li>
        ))}
      </ul>
      {rest.length > 0 && (
        <details className="text-xs text-slate-700">
          <summary className="cursor-pointer font-semibold text-cyan-700">More searches ({rest.length})</summary>
          <ul className="flex flex-wrap gap-2 mt-2">
            {rest.map((k) => (
              <li key={k} className="px-2.5 py-1 rounded-full bg-slate-100 border border-slate-200">{k}</li>
            ))}
          </ul>
        </details>
      )}
    </section>
  );
};
