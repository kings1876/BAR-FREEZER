'use client';

import React, { useEffect, useState } from 'react';
import { REPLY } from '../../../config/reply';

export default function ConfirmPaymentPage() {
  const [id, setId] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [note, setNote] = useState('');
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => { setId(new URLSearchParams(window.location.search).get('id') || ''); }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
    if (file.size > 4 * 1024 * 1024) { setError('The screenshot must be under 4MB.'); return; }
    setBusy(true);
    setError('');
    const fd = new FormData();
    fd.append('id', id);
    fd.append('note', note);
    fd.append('screenshot', file);
    try {
      const r = await fetch('/api/order/confirm-payment/', { method: 'POST', body: fd });
      const d = await r.json().catch(() => ({}));
      if (r.ok && d.ok) setDone(true);
      else setError(d.error || `Upload failed. Please email the screenshot to ${REPLY.channels.email}.`);
    } catch {
      setError(`Upload failed. Please email the screenshot to ${REPLY.channels.email}.`);
    }
    setBusy(false);
  };

  return (
    <main className="min-h-screen bg-slate-100 py-8 px-4 text-slate-900">
      <div className="max-w-lg mx-auto space-y-4">
        <h1 className="text-2xl font-extrabold">Confirm your payment</h1>
        {done ? (
          <p className="bg-white rounded-lg border border-slate-200 p-4 text-sm" role="status">Thanks. We have your screenshot for order {id} and will confirm once the payment clears.</p>
        ) : (
          <form onSubmit={submit} className="bg-white rounded-lg border border-slate-200 p-4 space-y-3 text-sm">
            <p>Order <strong className="font-mono">{id}</strong></p>
            <label htmlFor="s" className="block font-semibold">Payment screenshot (JPG, PNG, WebP or HEIC, max 4MB)</label>
            <input id="s" type="file" accept="image/jpeg,image/png,image/webp,image/heic,image/heif" required onChange={(e) => setFile(e.target.files?.[0] || null)} />
            <label htmlFor="n" className="block font-semibold">Note (optional)</label>
            <input id="n" value={note} onChange={(e) => setNote(e.target.value)} className="w-full border border-slate-300 rounded px-3 py-2" />
            {error && <p role="alert" className="text-red-700">{error}</p>}
            <button disabled={busy || !file} className="w-full py-3 rounded font-bold text-slate-950 disabled:opacity-50" style={{ background: REPLY.brand.primary }}>{busy ? 'Uploading…' : 'Send screenshot'}</button>
          </form>
        )}
      </div>
    </main>
  );
}
