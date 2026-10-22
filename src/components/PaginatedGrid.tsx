import React, { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginatedGridProps<T> {
  items: T[];
  render: (item: T, index: number) => React.ReactNode;
  pageSize?: number;
  className?: string;
  resetKey?: string | number;
  /** Total number of items when `items` is only a preview of the list. */
  totalCount?: number;
  /** Called when the visitor changes page, so a lazily loaded full list can start loading. */
  onNeedAll?: () => void;
}

// Numbered pagination: Previous, page numbers and Next. Page 1 starts from whatever items are available,
// and later pages fill in once the full list has loaded.
export function PaginatedGrid<T>({ items, render, pageSize = 12, className = 'grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6', resetKey, totalCount, onNeedAll }: PaginatedGridProps<T>) {
  const [page, setPage] = useState(1);
  const topRef = useRef<HTMLDivElement>(null);
  useEffect(() => { setPage(1); }, [resetKey]);

  const total = totalCount ?? items.length;
  const pages = Math.max(1, Math.ceil(total / pageSize));
  const current = Math.min(page, pages);
  const shown = items.slice((current - 1) * pageSize, current * pageSize);

  const go = (p: number) => {
    if (onNeedAll) onNeedAll();
    setPage(p);
    if (topRef.current) topRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Page numbers with ellipses: 1 … 4 5 6 … 12
  const numbers: (number | 'gap-a' | 'gap-b')[] = [];
  for (let p = 1; p <= pages; p++) {
    if (p === 1 || p === pages || Math.abs(p - current) <= 1) numbers.push(p);
    else if (p === 2 && current > 3) numbers.push('gap-a');
    else if (p === pages - 1 && current < pages - 2) numbers.push('gap-b');
  }
  const btn = 'min-w-9 h-9 px-3 inline-flex items-center justify-center rounded-md border text-xs font-semibold transition-colors';

  return (
    <>
      <div ref={topRef} className="scroll-mt-28" />
      <h2 className="sr-only">Products</h2>
      {shown.length > 0 ? (
        <div className={className}>{shown.map((it, i) => render(it, i))}</div>
      ) : (
        <p className="py-10 text-center text-sm text-slate-500">Loading products…</p>
      )}
      {pages > 1 && (
        <nav aria-label="Pagination" className="pt-8 flex flex-wrap items-center justify-center gap-2">
          <button type="button" disabled={current === 1} onClick={() => go(current - 1)} aria-label="Previous page" className={`${btn} border-slate-300 bg-white text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:hover:bg-white`}>
            <ChevronLeft className="w-4 h-4" />
          </button>
          {numbers.map((n) => (typeof n === 'number' ? (
            <button
              key={n}
              type="button"
              onClick={() => go(n)}
              aria-label={`Page ${n}`}
              aria-current={n === current ? 'page' : undefined}
              className={`${btn} ${n === current ? 'bg-slate-900 border-slate-900 text-white' : 'border-slate-300 bg-white text-slate-700 hover:bg-slate-100'}`}
            >
              {n}
            </button>
          ) : (
            <span key={n} aria-hidden="true" className="px-1 text-slate-400">…</span>
          )))}
          <button type="button" disabled={current === pages} onClick={() => go(current + 1)} aria-label="Next page" className={`${btn} border-slate-300 bg-white text-slate-700 hover:bg-slate-100 disabled:opacity-40 disabled:hover:bg-white`}>
            <ChevronRight className="w-4 h-4" />
          </button>
        </nav>
      )}
    </>
  );
}
