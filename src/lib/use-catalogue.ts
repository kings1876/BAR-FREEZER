'use client';
import { useEffect, useState } from 'react';

// The full product table is large (hundreds of KB of script). Pages that only need it for filtering, sorting or
// pickers load it on the visitor's first interaction (touch, click, key press or scroll), not during page load.
let cache: any[] | null = null;
let pending: Promise<any[]> | null = null;

export function loadCatalogue(): Promise<any[]> {
  if (cache) return Promise.resolve(cache);
  if (!pending) pending = import('../config/products-data.js').then((m) => (cache = m.PRODUCTS as any[]));
  return pending;
}

export function useCatalogue(eager = false): any[] | null {
  const [catalogue, setCatalogue] = useState<any[] | null>(cache);
  useEffect(() => {
    if (cache) { setCatalogue(cache); return; }
    let done = false;
    const load = () => { if (done) return; done = true; cleanup(); loadCatalogue().then(setCatalogue); };
    const events = ['pointerdown', 'keydown', 'touchstart', 'scroll', 'focusin'];
    const cleanup = () => events.forEach((e) => window.removeEventListener(e, load));
    if (eager) load();
    else events.forEach((e) => window.addEventListener(e, load, { once: true, passive: true }));
    return cleanup;
  }, [eager]);
  return catalogue;
}
