'use client';

import React, { useEffect, useState } from 'react';
import { money } from '../../../lib/order';
import { REPLY } from '../../../config/reply';

interface Details { orderNumber: string; amountDue: number; method: string; status: string; fields: { label: string; value: string }[]; terms: string[] }

function CopyField({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };
  return (
    <button type="button" onClick={copy} className="w-full flex items-center justify-between gap-3 text-left p-3 rounded-lg border border-slate-200 bg-white hover:bg-slate-50">
      <span className="min-w-0">
        <span className="block text-xs text-slate-500">{label}</span>
        <span className="block font-mono text-sm text-slate-900 break-all">{value}</span>
      </span>
      <span className="text-xs font-bold shrink-0" style={{ color: copied ? '#047857' : '#334155' }}>{copied ? '✓ Copied' : 'Tap to copy'}</span>
    </button>
  );
}

export default function PaymentDetailsPage() {
  const [id, setId] = useState('');
  const [data, setData] = useState<Details | null>(null);
  const [state, setState] = useState<'loading' | 'ready' | 'missing'>('loading');

  useEffect(() => {
    const oid = new URLSearchParams(window.location.search).get('id') || '';
    setId(oid);
    fetch(`/api/order/payment-details/?id=${encodeURIComponent(oid)}`)
      .then((r) => r.json())
      .then((d) => { if (d.ok) { setData(d); setState('ready'); } else setState('missing'); })
      .catch(() => setState('missing'));
  }, []);

  return (
    <main className="min-h-screen bg-slate-100 py-8 px-4 text-slate-900">
      <div className="max-w-lg mx-auto space-y-4">
        <h1 className="text-2xl font-extrabold">Payment details</h1>
        {state === 'loading' && <p>Loading…</p>}
        {state === 'missing' && (
          <p className="bg-white rounded-lg border border-slate-200 p-4 text-sm">
            We could not find payment details for this order yet. If you have not received them, email {REPLY.channels.email} with your order number.
          </p>
        )}
        {state === 'ready' && data && (
          <>
            <div className="rounded-lg p-4 text-slate-950" style={{ background: REPLY.brand.primary }}>
              <div className="text-xs">Order {data.orderNumber} · {data.method}</div>
              <div className="text-3xl font-extrabold">{money(data.amountDue)}</div>
            </div>
            <div className="space-y-2">{data.fields.map((f, i) => <CopyField key={i} label={f.label} value={f.value} />)}</div>
            <ul className="list-disc pl-5 text-sm text-slate-700 space-y-1">{data.terms.map((t, i) => <li key={i}>{t}</li>)}</ul>
            <a href={`/order/confirm-payment/?id=${encodeURIComponent(id)}`} className="block text-center rounded-lg py-3 font-bold bg-slate-900 text-white">I have paid: upload a screenshot</a>
          </>
        )}
      </div>
    </main>
  );
}
