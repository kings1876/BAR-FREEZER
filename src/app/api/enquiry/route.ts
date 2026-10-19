import { NextResponse } from 'next/server';
import { SITE } from '../../../config/site.js';
import { sendMail } from '../../../lib/mailer';
import { ORDER_REF_RE } from '../../../lib/order';
import { saveOrder, saveEnquiry, type StoredOrder, type StoredEnquiry } from '../../../lib/store';
import { isStoreConfigured } from '../../../lib/redis';
import {
  orderNotificationEmail, orderConfirmationEmail, enquiryNotificationEmail, enquiryConfirmationEmail,
} from '../../../lib/emails';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type Kind = 'order' | 'quote' | 'trade' | 'contact' | 'warranty' | 'newsletter';
const KINDS: Kind[] = ['order', 'quote', 'trade', 'contact', 'warranty', 'newsletter'];
const PREFIX: Record<Kind, string> = { order: 'BF', quote: 'BF-Q', trade: 'BF-TR', contact: 'BF-C', warranty: 'CLM-AU', newsletter: 'BF-N' };
const LABEL: Record<Kind, string> = {
  order: 'New order', quote: 'Quote request', trade: 'Trade quote request', contact: 'Website enquiry', warranty: 'Warranty claim', newsletter: 'Newsletter signup',
};

const env = (k: string) => (process.env[k] || '').trim();

const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const arr = (hits.get(ip) || []).filter((t) => now - t < 60_000);
  arr.push(now);
  hits.set(ip, arr);
  return arr.length > 8;
}

function newId(kind: Kind) {
  const a = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let s = '';
  for (let i = 0; i < 6; i++) s += a[Math.floor(Math.random() * a.length)];
  return `${PREFIX[kind]}-${s}`;
}

function destination(kind: Kind): string {
  const S = SITE as any;
  if (kind === 'order') return env('ORDER_EMAIL') || S.email;
  if (kind === 'quote' || kind === 'trade') return env('QUOTE_EMAIL') || S.quoteEmail || S.email;
  if (kind === 'warranty') return env('SERVICE_EMAIL') || S.supportEmail || S.email;
  return env('CONTACT_EMAIL') || S.email;
}

const pick = (f: Record<string, string>, re: RegExp) => {
  const k = Object.keys(f).find((x) => re.test(x));
  return k ? f[k] : '';
};

export async function POST(req: Request) {
  const ip = (req.headers.get('x-forwarded-for') || 'unknown').split(',')[0].trim();
  if (limited(ip)) return NextResponse.json({ ok: false, error: 'Too many requests. Please wait a minute and try again.' }, { status: 429 });

  let body: any;
  try { body = await req.json(); } catch { return NextResponse.json({ ok: false, error: 'Invalid request.' }, { status: 400 }); }
  const kind = body?.type as Kind;
  if (!KINDS.includes(kind)) return NextResponse.json({ ok: false, error: 'Unknown form type.' }, { status: 400 });
  if (body.website) return NextResponse.json({ ok: true, ref: newId(kind) });

  const fields: Record<string, string> = {};
  for (const [k, v] of Object.entries(body.fields && typeof body.fields === 'object' ? body.fields : {}).slice(0, 40)) {
    const val = String(v ?? '').trim().slice(0, 4000);
    if (val) fields[String(k).slice(0, 60)] = val;
  }
  const email = pick(fields, /e-?mail/i);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return NextResponse.json({ ok: false, error: 'Please enter a valid email address.' }, { status: 400 });
  if (kind !== 'newsletter' && Object.keys(fields).length < 2) return NextResponse.json({ ok: false, error: 'Please complete the form.' }, { status: 400 });

  const items = (Array.isArray(body.items) ? body.items : []).slice(0, 60).map((i: any) => {
    const qty = Math.max(1, Math.min(999, Number(i?.qty) || 1));
    const price = typeof i?.price === 'number' && isFinite(i.price) ? i.price : null;
    return { name: String(i?.name ?? '').slice(0, 200), sku: String(i?.sku ?? '').slice(0, 60), quantity: qty, price, lineTotal: price === null ? null : Math.round(price * qty * 100) / 100 };
  });
  const name = pick(fields, /contact name|^name$|your name/i) || pick(fields, /name/i);
  const phone = pick(fields, /phone|mobile/i);
  const createdAt = new Date().toISOString();
  const dest = destination(kind);

  let ref: string;
  let notifyHtml: string;
  let confirmHtml: string | null = null;
  let saved = false;

  if (kind === 'order') {
    const proposed = String(body.ref || '');
    ref = ORDER_REF_RE.test(proposed) ? proposed : newId('order');
    const amountDue = Number(body.totals?.total) || items.reduce((s: number, i: any) => s + (i.lineTotal || 0), 0);
    const order: StoredOrder = {
      orderNumber: ref,
      customerName: name,
      customerEmail: email,
      customerPhone: phone,
      address: [pick(fields, /street/i), pick(fields, /suburb/i), pick(fields, /^state/i), pick(fields, /postcode/i)].filter(Boolean).join(', '),
      items: items.map((i: any) => ({ name: i.name, quantity: i.quantity, lineTotal: i.lineTotal })),
      amountDue,
      paymentMethod: pick(fields, /payment/i),
      notes: pick(fields, /note/i),
      status: 'pending',
      channel: body.channel === 'whatsapp' ? 'whatsapp' : 'email',
      createdAt,
    };
    saved = await saveOrder(order).catch(() => false);
    notifyHtml = orderNotificationEmail(order);
    confirmHtml = orderConfirmationEmail(order);
  } else {
    ref = newId(kind);
    const enquiry: StoredEnquiry = {
      id: ref,
      type: kind,
      name,
      email,
      phone,
      message: pick(fields, /message|notes|description|fault/i),
      meta: Object.fromEntries(Object.entries(fields).slice(0, 30)),
      items: items.map((i: any) => ({ name: i.name, sku: i.sku, qty: i.quantity, price: i.price })),
      status: 'new',
      createdAt,
    };
    saved = await saveEnquiry(enquiry).catch(() => false);
    notifyHtml = enquiryNotificationEmail(LABEL[kind], ref, fields, items.map((i: any) => ({ name: i.name, quantity: i.quantity, lineTotal: i.lineTotal })));
    if (kind !== 'newsletter') confirmHtml = enquiryConfirmationEmail(name, LABEL[kind], ref);
  }

  const shop = await sendMail({ to: dest, subject: `${LABEL[kind]} ${ref}${name ? ' - ' + name : ''}`, html: notifyHtml, replyTo: email, fromName: 'Bar Freezer Website' });
  if (shop.sent && confirmHtml) {
    await sendMail({ to: email, subject: `Bar Freezer: we received your ${LABEL[kind].toLowerCase()} (${ref})`, html: confirmHtml });
  }

  if (!shop.sent && !saved) {
    console.error('enquiry not delivered: no working SMTP or storage', { storeConfigured: isStoreConfigured() });
    return NextResponse.json({ ok: false, error: 'not-configured' }, { status: 503 });
  }
  return NextResponse.json({ ok: true, ref, emailed: shop.sent, emailIssue: shop.reason || null, stored: saved });
}
