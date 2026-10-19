'use client';

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { REPLY } from '../../config/reply';
import { parsePaymentDetail, money, paymentTermsLines } from '../../lib/order';
import { waLinkTo, waPaymentDetailsText, whatsappEnabled } from '../../lib/whatsapp';
import type { StoredOrder, StoredEnquiry } from '../../lib/store';

const KEY = 'bf-admin-passcode';
const accent = REPLY.brand.primary;

type View = { name: 'hub' } | { name: 'orders' } | { name: 'enquiries' } | { name: 'order'; id: string } | { name: 'enquiry'; id: string };

const statusLabel: Record<string, string> = {
  pending: 'Pending', 'payment-sent': 'Payment sent', 'payment-confirmed': 'Payment confirmed', new: 'New', replied: 'Replied',
};

function Badge({ s }: { s: string }) {
  const hot = s === 'pending' || s === 'new';
  return (
    <span className="px-2 py-0.5 rounded text-[11px] font-semibold" style={{ background: hot ? accent : '#1e293b', color: hot ? '#0f172a' : '#cbd5e1', border: hot ? 'none' : '1px solid #334155' }}>
      {statusLabel[s] || s}
    </span>
  );
}

export default function AdminPage() {
  const [pass, setPass] = useState('');
  const [input, setInput] = useState('');
  const [authed, setAuthed] = useState(false);
  const [error, setError] = useState('');
  const [view, setView] = useState<View>({ name: 'hub' });
  const [orders, setOrders] = useState<StoredOrder[]>([]);
  const [enquiries, setEnquiries] = useState<StoredEnquiry[]>([]);
  const [storeConfigured, setStoreConfigured] = useState(true);
  const [filter, setFilter] = useState('all');

  const api = useCallback(
    async (path: string, init: RequestInit = {}, p = pass) => {
      const res = await fetch(path, { ...init, headers: { ...(init.headers || {}), 'Content-Type': 'application/json', 'X-Admin-Passcode': p } });
      let data: any = {};
      try { data = await res.json(); } catch {}
      return { status: res.status, data };
    },
    [pass]
  );

  const refresh = useCallback(
    async (p = pass) => {
      const [o, e] = await Promise.all([api('/api/admin/orders/', {}, p), api('/api/admin/enquiries/', {}, p)]);
      if (o.status === 200) { setOrders(o.data.orders || []); setStoreConfigured(!!o.data.storeConfigured); }
      if (e.status === 200) setEnquiries(e.data.enquiries || []);
      return o.status;
    },
    [api, pass]
  );

  const signIn = useCallback(
    async (p: string) => {
      setError('');
      const { status } = await api('/api/admin/orders/', {}, p);
      if (status === 200) {
        setPass(p);
        setAuthed(true);
        try { localStorage.setItem(KEY, p); } catch {}
        const [o, e] = await Promise.all([api('/api/admin/orders/', {}, p), api('/api/admin/enquiries/', {}, p)]);
        setOrders(o.data.orders || []);
        setStoreConfigured(!!o.data.storeConfigured);
        setEnquiries(e.data.enquiries || []);
      } else if (status === 503) setError('Admin is not configured yet: set ADMIN_PASSCODE in Vercel.');
      else setError('Wrong passcode.');
    },
    [api]
  );

  useEffect(() => {
    try {
      const saved = localStorage.getItem(KEY);
      if (saved) signIn(saved);
    } catch {}
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const signOut = () => {
    try { localStorage.removeItem(KEY); } catch {}
    setAuthed(false);
    setPass('');
    setInput('');
  };

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 bg-slate-950">
        <form onSubmit={(e) => { e.preventDefault(); signIn(input); }} className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
          <h1 className="text-lg font-bold text-white">Bar Freezer admin</h1>
          <label className="block text-xs text-slate-400" htmlFor="pc">Passcode</label>
          <input id="pc" type="password" value={input} onChange={(e) => setInput(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 text-white" autoFocus />
          {error && <p role="alert" className="text-sm text-red-400">{error}</p>}
          <button type="submit" className="w-full py-2.5 rounded font-bold text-slate-950" style={{ background: accent }}>Sign in</button>
        </form>
      </div>
    );
  }

  const pending = orders.filter((o) => o.status === 'pending').length;
  const fresh = enquiries.filter((e) => e.status === 'new').length;

  const nav = (n: View['name'], label: string) => (
    <button onClick={() => setView({ name: n } as View)} className={`px-3 py-1.5 rounded text-sm ${view.name === n ? 'text-slate-950 font-bold' : 'text-slate-300 hover:text-white'}`} style={view.name === n ? { background: accent } : undefined}>
      {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header className="border-b border-slate-800 px-4 py-3 flex flex-wrap items-center gap-2">
        <button onClick={() => setView({ name: 'hub' })} className="font-bold text-white mr-4">Bar Freezer <span style={{ color: accent }}>admin</span></button>
        {nav('hub', 'Dashboard')}
        {nav('orders', `Orders${pending ? ` (${pending})` : ''}`)}
        {nav('enquiries', `Enquiries${fresh ? ` (${fresh})` : ''}`)}
        <button onClick={() => refresh()} className="ml-auto text-xs text-slate-400 hover:text-white">Refresh</button>
        <button onClick={signOut} className="text-xs text-slate-400 hover:text-white">Sign out</button>
      </header>

      <main className="max-w-5xl mx-auto p-4 space-y-6">
        {!storeConfigured && (
          <div className="rounded border border-amber-600/50 bg-amber-950/40 text-amber-200 text-sm p-3">
            Storage is not connected, so orders and enquiries are emailed but will not appear here. Add an Upstash Redis database in Vercel (Storage tab) to fill this dashboard.
          </div>
        )}

        {view.name === 'hub' && (
          <>
            <div className="grid sm:grid-cols-2 gap-4">
              <button onClick={() => setView({ name: 'orders' })} className="text-left bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-slate-600">
                <div className="text-xs text-slate-400">Orders</div>
                <div className="text-3xl font-bold">{orders.length}</div>
                <div className="text-sm text-slate-400">{pending} pending</div>
              </button>
              <button onClick={() => setView({ name: 'enquiries' })} className="text-left bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-slate-600">
                <div className="text-xs text-slate-400">Enquiries</div>
                <div className="text-3xl font-bold">{enquiries.length}</div>
                <div className="text-sm text-slate-400">{fresh} new</div>
              </button>
            </div>
            <Section title="Recent orders">
              {orders.slice(0, 5).map((o) => <OrderRow key={o.orderNumber} o={o} onOpen={() => setView({ name: 'order', id: o.orderNumber })} />)}
              {!orders.length && <Empty />}
            </Section>
            <Section title="Recent enquiries">
              {enquiries.slice(0, 5).map((e) => <EnquiryRow key={e.id} e={e} onOpen={() => setView({ name: 'enquiry', id: e.id })} />)}
              {!enquiries.length && <Empty />}
            </Section>
          </>
        )}

        {view.name === 'orders' && (
          <Section title="Orders">
            {orders.map((o) => <OrderRow key={o.orderNumber} o={o} onOpen={() => setView({ name: 'order', id: o.orderNumber })} />)}
            {!orders.length && <Empty />}
          </Section>
        )}

        {view.name === 'enquiries' && (
          <Section title="Enquiries">
            <div className="flex flex-wrap gap-2 pb-2">
              {['all', 'contact', 'quote', 'trade', 'warranty', 'new', 'replied'].map((f) => (
                <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1 rounded-full text-xs border ${filter === f ? 'text-slate-950 font-bold border-transparent' : 'border-slate-700 text-slate-300'}`} style={filter === f ? { background: accent } : undefined}>{f}</button>
              ))}
            </div>
            {enquiries.filter((e) => filter === 'all' || e.type === filter || e.status === filter).map((e) => <EnquiryRow key={e.id} e={e} onOpen={() => setView({ name: 'enquiry', id: e.id })} />)}
            {!enquiries.length && <Empty />}
          </Section>
        )}

        {view.name === 'order' && (
          <OrderDetail
            order={orders.find((o) => o.orderNumber === view.id)}
            api={api}
            onBack={() => setView({ name: 'orders' })}
            onChanged={refresh}
          />
        )}

        {view.name === 'enquiry' && (
          <EnquiryDetail
            enquiry={enquiries.find((e) => e.id === view.id)}
            api={api}
            onBack={() => setView({ name: 'enquiries' })}
            onChanged={refresh}
          />
        )}
      </main>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-2">
      <h2 className="font-bold text-white">{title}</h2>
      {children}
    </section>
  );
}
const Empty = () => <p className="text-sm text-slate-500">Nothing here yet.</p>;

function OrderRow({ o, onOpen }: { o: StoredOrder; onOpen: () => void }) {
  return (
    <button onClick={onOpen} className="w-full flex flex-wrap items-center gap-3 text-left px-3 py-2 rounded hover:bg-slate-800 border border-slate-800">
      <span className="font-mono text-sm text-white">{o.orderNumber}</span>
      <span className="text-sm text-slate-300 flex-1 min-w-[8rem]">{o.customerName}</span>
      <span className="text-xs text-slate-400">{o.channel === 'whatsapp' ? 'WhatsApp' : 'Email'}</span>
      <span className="text-sm font-mono text-slate-200">{money(o.amountDue)}</span>
      <Badge s={o.status} />
    </button>
  );
}
function EnquiryRow({ e, onOpen }: { e: StoredEnquiry; onOpen: () => void }) {
  return (
    <button onClick={onOpen} className="w-full flex flex-wrap items-center gap-3 text-left px-3 py-2 rounded hover:bg-slate-800 border border-slate-800">
      <span className="font-mono text-sm text-white">{e.id}</span>
      <span className="text-sm text-slate-300 flex-1 min-w-[8rem]">{e.name || e.email}</span>
      <span className="text-xs text-slate-400">{e.type}</span>
      <Badge s={e.status} />
    </button>
  );
}

type Api = (path: string, init?: RequestInit) => Promise<{ status: number; data: any }>;

function OrderDetail({ order, api, onBack, onChanged }: { order?: StoredOrder; api: Api; onBack: () => void; onChanged: () => Promise<unknown> }) {
  const [methodId, setMethodId] = useState(REPLY.methods[0].id);
  const [detail, setDetail] = useState('');
  const [note, setNote] = useState('');
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState('');
  const method = REPLY.methods.find((m) => m.id === methodId)!;
  const fields = useMemo(() => parsePaymentDetail(detail), [detail]);

  if (!order) return <button onClick={onBack} className="text-sm text-slate-400">← Back (order not found)</button>;
  const link = `${location.origin}/order/payment-details/?id=${encodeURIComponent(order.orderNumber)}`;
  const waText = waPaymentDetailsText(order.orderNumber, order.amountDue, fields, link, paymentTermsLines());

  const send = async () => {
    setBusy(true);
    setMsg('');
    const r = await api('/api/admin/send-payment-email/', { method: 'POST', body: JSON.stringify({ orderNumber: order.orderNumber, methodId, detail, note }) });
    setBusy(false);
    setMsg(r.data.ok ? 'Payment details emailed to the customer.' : r.data.error || 'Could not send.');
    if (r.data.ok) await onChanged();
  };
  const remove = async () => {
    if (!confirm(`Delete order ${order.orderNumber}?`)) return;
    await api(`/api/admin/orders/?id=${encodeURIComponent(order.orderNumber)}`, { method: 'DELETE' });
    await onChanged();
    onBack();
  };

  return (
    <div className="space-y-4">
      <button onClick={onBack} className="text-sm text-slate-400 hover:text-white">← Orders</button>
      <Section title={`Order ${order.orderNumber}`}>
        <div className="flex flex-wrap gap-2 items-center"><Badge s={order.status} /><span className="text-xs text-slate-400">{new Date(order.createdAt).toLocaleString('en-AU')} · {order.channel}</span></div>
        <dl className="grid sm:grid-cols-2 gap-x-6 gap-y-1 text-sm">
          <Row k="Name" v={order.customerName} /><Row k="Email" v={order.customerEmail} /><Row k="Phone" v={order.customerPhone} /><Row k="Address" v={order.address || ''} />
          <Row k="Payment option" v={order.paymentMethod} /><Row k="Amount due" v={money(order.amountDue)} />
        </dl>
        <table className="w-full text-sm mt-2"><tbody>
          {order.items.map((i, n) => <tr key={n} className="border-t border-slate-800"><td className="py-1">{i.name}</td><td className="text-center">{i.quantity}</td><td className="text-right font-mono">{money(i.lineTotal)}</td></tr>)}
        </tbody></table>
        {order.notes && <p className="text-sm text-slate-300">Notes: {order.notes}</p>}
        {order.status === 'payment-confirmed' && <p className="text-sm text-emerald-400">Customer has uploaded a payment screenshot.</p>}
      </Section>

      <Section title={order.paymentDetails ? 'Resend payment details' : 'Send payment details'}>
        <label className="block text-xs text-slate-400" htmlFor="m">Method</label>
        <select id="m" value={methodId} onChange={(e) => setMethodId(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2">
          {REPLY.methods.map((m) => <option key={m.id} value={m.id}>{m.label}</option>)}
        </select>
        <label className="block text-xs text-slate-400" htmlFor="d">Paste the payment details (one per line, “Label: value”)</label>
        <textarea id="d" rows={6} value={detail} onChange={(e) => setDetail(e.target.value)} placeholder={method.placeholder} className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2 font-mono text-sm" />
        <label className="block text-xs text-slate-400" htmlFor="n">Optional note to customer</label>
        <input id="n" value={note} onChange={(e) => setNote(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2" />
        {fields.length > 0 && (
          <div className="rounded border border-slate-700 p-3 text-sm space-y-1">
            <div className="text-xs text-slate-400">Preview: what the customer can copy</div>
            {fields.map((f, i) => <div key={i} className="flex gap-3"><span className="text-slate-400 w-40 shrink-0">{f.label}</span><span className="font-mono break-all">{f.value}</span></div>)}
          </div>
        )}
        <div className="flex flex-wrap gap-2 items-center">
          <button onClick={send} disabled={busy || !fields.length} className="px-4 py-2 rounded font-bold text-slate-950 disabled:opacity-50" style={{ background: accent }}>{busy ? 'Sending…' : 'Email payment details'}</button>
          {whatsappEnabled() && order.customerPhone && fields.length > 0 && (
            <>
              <a href={waLinkTo(order.customerPhone, waText)} target="_blank" rel="noreferrer" className="px-4 py-2 rounded border border-slate-600 text-sm">Open in WhatsApp</a>
              <button onClick={() => navigator.clipboard.writeText(waText)} className="px-4 py-2 rounded border border-slate-600 text-sm">Copy message</button>
            </>
          )}
        </div>
        {msg && <p role="status" className="text-sm text-slate-300">{msg}</p>}
      </Section>
      <button onClick={remove} className="text-xs text-red-400 hover:text-red-300">Delete order</button>
    </div>
  );
}

function EnquiryDetail({ enquiry, api, onBack, onChanged }: { enquiry?: StoredEnquiry; api: Api; onBack: () => void; onChanged: () => Promise<unknown> }) {
  const [reply, setReply] = useState('');
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState('');
  if (!enquiry) return <button onClick={onBack} className="text-sm text-slate-400">← Back (enquiry not found)</button>;

  const send = async () => {
    setBusy(true);
    setMsg('');
    const r = await api('/api/admin/reply-enquiry/', { method: 'POST', body: JSON.stringify({ id: enquiry.id, reply }) });
    setBusy(false);
    setMsg(r.data.ok ? 'Reply emailed.' : r.data.error || 'Could not send.');
    if (r.data.ok) { setReply(''); await onChanged(); }
  };
  const remove = async () => {
    if (!confirm(`Delete ${enquiry.id}?`)) return;
    await api(`/api/admin/enquiries/?id=${encodeURIComponent(enquiry.id)}`, { method: 'DELETE' });
    await onChanged();
    onBack();
  };

  return (
    <div className="space-y-4">
      <button onClick={onBack} className="text-sm text-slate-400 hover:text-white">← Enquiries</button>
      <Section title={`${enquiry.type} ${enquiry.id}`}>
        <div className="flex gap-2 items-center"><Badge s={enquiry.status} /><span className="text-xs text-slate-400">{new Date(enquiry.createdAt).toLocaleString('en-AU')}</span></div>
        <dl className="grid sm:grid-cols-2 gap-x-6 gap-y-1 text-sm">
          {Object.entries(enquiry.meta || {}).map(([k, v]) => <Row key={k} k={k} v={v} />)}
        </dl>
        {enquiry.items && enquiry.items.length > 0 && (
          <ul className="text-sm list-disc pl-5">{enquiry.items.map((i, n) => <li key={n}>{i.qty || 1} × {i.name} {i.price != null ? `(${money(i.price)})` : ''}</li>)}</ul>
        )}
      </Section>
      {enquiry.type !== 'newsletter' && (
        <Section title="Reply">
          <label className="block text-xs text-slate-400" htmlFor="r">Message to {enquiry.name || enquiry.email}</label>
          <textarea id="r" rows={6} value={reply} onChange={(e) => setReply(e.target.value)} className="w-full bg-slate-800 border border-slate-700 rounded px-3 py-2" />
          <button onClick={send} disabled={busy || !reply.trim()} className="px-4 py-2 rounded font-bold text-slate-950 disabled:opacity-50" style={{ background: accent }}>{busy ? 'Sending…' : 'Send reply'}</button>
          {enquiry.phone && whatsappEnabled() && <a href={waLinkTo(enquiry.phone, reply)} target="_blank" rel="noreferrer" className="ml-2 px-4 py-2 rounded border border-slate-600 text-sm">Reply on WhatsApp</a>}
          {msg && <p role="status" className="text-sm text-slate-300">{msg}</p>}
        </Section>
      )}
      <button onClick={remove} className="text-xs text-red-400 hover:text-red-300">Delete</button>
    </div>
  );
}

const Row = ({ k, v }: { k: string; v: string }) => (v ? <div className="flex gap-3"><dt className="text-slate-400 w-36 shrink-0">{k}</dt><dd className="break-words min-w-0">{v}</dd></div> : null);
