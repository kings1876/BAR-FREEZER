'use client';
import { useCallback, useEffect, useState } from 'react';

// The full product table is large (hundreds of KB of script). Pages that only need it for filtering, sorting or
// pickers load it when the visitor actually acts on the page (click, tap or key press, or by calling `load`),
// not during page load. Scrolling alone does not load it, so automated page scans never pay for it.
let cache: any[] | null = null;
let pending: Promise<any[]> | null = null;

export function loadCatalogue(): Promise<any[]> {
  if (cache) return Promise.resolve(cache);
  if (!pending) pending = import('../config/products-data.js').then((m) => (cache = m.PRODUCTS as any[]));
  return pending;
}

export function useCatalogue(eager = false): [any[] | null, () => void] {
  const [catalogue, setCatalogue] = useState<any[] | null>(cache);
  const load = useCallback(() => { loadCatalogue().then(setCatalogue); }, []);
  useEffect(() => {
    if (cache) { setCatalogue(cache); return; }
    if (eager) { load(); return; }
    const events = ['pointerdown', 'keydown'];
    const onAct = () => { cleanup(); load(); };
    const cleanup = () => events.forEach((e) => window.removeEventListener(e, onAct));
    events.forEach((e) => window.addEventListener(e, onAct, { once: true, passive: true }));
    return cleanup;
  }, [eager, load]);
  return [catalogue, load];
}
