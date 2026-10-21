import React, { useEffect, useState } from 'react';

interface PagedGridProps<T> {
  items: T[];
  render: (item: T) => React.ReactNode;
  pageSize?: number;
  className?: string;
  resetKey?: string | number;
}

// Renders the first page of items, then reveals more on demand. Keeps the initial HTML and DOM small on large categories.
export function PagedGrid<T>({ items, render, pageSize = 12, className = 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6', resetKey }: PagedGridProps<T>) {
  const [count, setCount] = useState(pageSize);
  useEffect(() => { setCount(pageSize); }, [resetKey, pageSize]);
  const shown = items.slice(0, count);
  const remaining = items.length - shown.length;
  return (
    <>
      <h2 className="sr-only">Products</h2>
      <div className={className}>{shown.map(render)}</div>
      {remaining > 0 && (
        <div className="pt-6 text-center">
          <button
            type="button"
            onClick={() => setCount((c) => c + pageSize)}
            className="px-6 py-3 rounded-md bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider transition-colors"
          >
            Show {Math.min(pageSize, remaining)} more ({remaining} remaining)
          </button>
        </div>
      )}
    </>
  );
}
