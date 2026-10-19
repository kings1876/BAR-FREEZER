import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { SITE } from '../../../config/site.js';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type EnquiryType = 'order' | 'quote' | 'trade' | 'contact' | 'warranty' | 'newsletter';
const TYPES: EnquiryType[] = ['order', 'quote', 'trade', 'contact', 'warranty', 'newsletter'];
const PREFIX: Record<EnquiryType, string> = { order: 'BF-ORD', quote: 'BF-Q', trade: 'BF-TR', contact: 'BF-C', warranty: 'CLM-AU', newsletter: 'BF-N' };
const LABEL: Record<EnquiryType, string> = { order: 'New order', quote: 'Quote request', trade: 'Trade quote request', contact: 'Website enquiry', warranty: 'Warranty claim', newsletter: 'Newsletter signup' };

const env = (k: string) => (process.env[k] || '').trim();
const esc = (s: unknown) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const money = (n: unknown) => (typeof n === 'number' && isFinite(n) ? `$${n.toLocaleString('en-AU')} AUD` : '');

// Best-effort rate limit (per serverless instance): 6 requests / minute / IP
const hits = new Map<string, number[]>();
function limited(ip: string) {
  const now = Date.now();
  const arr = (hits.get(ip) || []).filter((t) => now - t < 60_000);
  arr.push(now);
  hits.set(ip, arr);
  return arr.length > 6;
}

function refFor(type: EnquiryType) {
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let s = '';
  for (let i = 0; i < 6; i++) s += alphabet[Math.floor(Math.random() * alphabet.length)];
  return `${PREFIX[type]}-${s}`;
}

function destination(type: EnquiryType): string {
  const S = SITE as any;
  if (type === 'order') return env('ORDER_EMAIL') || S.email;
  if (type === 'quote' || type === 'trade') return env('QUOTE_EMAIL') || S.quoteEmail || S.email;
  if (type === 'warranty') return env('SERVICE_EMAIL') || S.supportEmail || S.email;
  return env('CONTACT_EMAIL') || S.email;
}

function transporter() {
  const host = env('SMTP_HOST'), user = env('SMTP_USER'), pass = env('SMTP_PASS');
  if (!host || !user || !pass) return null;
  const port = Number(env('SMTP_PORT') || 465);
  return nodemailer.createTransport({ host, port, secure: port === 465, auth: { user, pass } });
}

function shell(title: string, body: string) {
  return `<!doctype html><html><body style="margin:0;background:#f1f5f9;font-family:Arial,Helvetica,sans-serif;color:#0f172a">
<table width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:24px 12px">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border:1px solid #e2e8f0;border-radius:8px;overflow:hidden">
<tr><td style="background:#0f172a;color:#ffffff;padding:16px 24px;font-size:18px;font-weight:bold">${esc(SITE.name)}<span style="color:#f59e0b"> &middot; ${esc(title)}</span></td></tr>
<tr><td style="padding:24px;font-size:14px;line-height:1.5">${body}</td></tr>
<tr><td style="background:#f8fafc;padding:14px 24px;font-size:12px;color:#64748b">${esc(SITE.name)} &middot; ${esc((SITE as any).domain)}</td></tr>
</table></td></tr></table></body></html>`;
}

function fieldsTable(fields: Record<string, string>) {
  const rows = Object.entries(fields)
    .map(([k, v]) => `<tr><td style="padding:6px 12px 6px 0;color:#64748b;vertical-align:top;white-space:nowrap">${esc(k)}</td><td style="padding:6px 0;font-weight:bold;white-space:pre-wrap">${esc(v)}</td></tr>`)
    .join('');
  return `<table cellpadding="0" cellspacing="0" style="width:100%;font-size:14px">${rows}</table>`;
}

function itemsTable(items: any[], totals: any) {
  if (!items.length) return '';
  const rows = items
    .map((i) => `<tr><td style="padding:6px 0;border-bottom:1px solid #e2e8f0">${esc(i.name)}<br><span style="color:#64748b;font-size:12px">${esc(i.sku || '')}</span></td><td style="padding:6px 8px;border-bottom:1px solid #e2e8f0;text-align:center">${esc(i.qty)}</td><td style="padding:6px 0;border-bottom:1px solid #e2e8f0;text-align:right;white-space:nowrap">${esc(money(i.price) || 'Quote')}</td></tr>`)
    .join('');
  const tot = totals
    ? `<tr><td colspan="2" style="padding:6px 0;text-align:right;color:#64748b">Delivery</td><td style="padding:6px 0;text-align:right">${esc(money(totals.delivery) || 'TBC')}</td></tr><tr><td colspan="2" style="padding:6px 0;text-align:right;font-weight:bold">Total (incl. GST)</td><td style="padding:6px 0;text-align:right;font-weight:bold">${esc(money(totals.total))}</td></tr>`
    : '';
  return `<h3 style="margin:20px 0 8px;font-size:15px">Items</h3><table cellpadding="0" cellspacing="0" style="width:100%;font-size:14px"><tr><th align="left" style="color:#64748b;font-weight:normal">Product</th><th style="color:#64748b;font-weight:normal">Qty</th><th align="right" style="color:#64748b;font-weight:normal">Price</th></tr>${rows}${tot}</table>`;
}

async function saveRecord(record: any): Promise<boolean> {
  const url = env('UPSTASH_REDIS_REST_URL') || env('KV_REST_API_URL');
  const token = env('UPSTASH_REDIS_REST_TOKEN') || env('KV_REST_API_TOKEN');
  if (!url || !token) return false;
  try {
    const r = await fetch(url, {
      method: 'POST',
      headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(['SET', `enquiry:${record.ref}`, JSON.stringify(record)])
    });
    if (!r.ok) return false;
    await fetch(url, { method: 'POST', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }, body: JSON.stringify(['LPUSH', 'enquiries', record.ref]) });
    return true;
  } catch {
    return false;
  }
}

export async function POST(req: Request) {
  const ip = (req.headers.get('x-forwarded-for') || 'unknown').split(',')[0].trim();
  if (limited(ip)) return NextResponse.json({ ok: false, error: 'Too many requests. Please wait a minute and try again.' }, { status: 429 });

  let body: any;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid request.' }, { status: 400 });
  }
  const type = body?.type as EnquiryType;
  if (!TYPES.includes(type)) return NextResponse.json({ ok: false, error: 'Unknown form type.' }, { status: 400 });
  if (body.website) return NextResponse.json({ ok: true, ref: refFor(type) }); // honeypot: pretend success

  const raw = body.fields && typeof body.fields === 'object' ? body.fields : {};
  const fields: Record<string, string> = {};
  for (const [k, v] of Object.entries(raw).slice(0, 40)) {
    const val = String(v ?? '').trim().slice(0, 4000);
    if (val) fields[String(k).slice(0, 60)] = val;
  }
  const emailKey = Object.keys(fields).find((k) => /e-?mail/i.test(k));
  const customerEmail = emailKey ? fields[emailKey] : '';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(customerEmail)) return NextResponse.json({ ok: false, error: 'Please enter a valid email address.' }, { status: 400 });
  if (type !== 'newsletter' && Object.keys(fields).length < 2) return NextResponse.json({ ok: false, error: 'Please complete the form.' }, { status: 400 });

  const items = (Array.isArray(body.items) ? body.items : []).slice(0, 60).map((i: any) => ({
    name: String(i?.name ?? '').slice(0, 200), sku: String(i?.sku ?? '').slice(0, 60), qty: Number(i?.qty) || 1, price: typeof i?.price === 'number' ? i.price : null
  }));
  const totals = body.totals && typeof body.totals === 'object' ? { subtotal: Number(body.totals.subtotal) || 0, delivery: Number(body.totals.delivery) || 0, total: Number(body.totals.total) || 0 } : null;

  const ref = refFor(type);
  const record = { ref, type, createdAt: new Date().toISOString(), fields, items, totals, ip };
  const to = destination(type);

  let emailed = false;
  const tx = transporter();
  if (tx) {
    const from = env('SMTP_FROM') || env('SMTP_USER');
    try {
      await tx.sendMail({
        from: `"${SITE.name} Website" <${from}>`,
        to,
        replyTo: customerEmail,
        subject: `${LABEL[type]} ${ref}${fields['Contact Name'] ? ' - ' + fields['Contact Name'] : ''}`,
        text: `${LABEL[type]} ${ref}\n\n${Object.entries(fields).map(([k, v]) => `${k}: ${v}`).join('\n')}\n\n${items.map((i: any) => `${i.qty} x ${i.name} (${i.sku}) ${money(i.price)}`).join('\n')}${totals ? `\n\nTotal (incl. GST): ${money(totals.total)}` : ''}`,
        html: shell(`${LABEL[type]} ${ref}`, `${fieldsTable(fields)}${itemsTable(items, totals)}`)
      });
      emailed = true;
    } catch (e) {
      console.error('enquiry email failed', (e as Error).message);
    }
    if (emailed && type !== 'newsletter') {
      const intro: Record<string, string> = {
        order: 'Thanks for your order request. We will review it and email you the tax invoice and payment details shortly. Your order is not paid or dispatched until payment is confirmed.',
        quote: 'Thanks for your quote request. Our sales team will reply with pricing and delivery details.',
        trade: 'Thanks for your trade quote request. Our sales team will reply with trade pricing and delivery details.',
        contact: 'Thanks for your message. Our team will reply as soon as possible.',
        warranty: 'We have received your warranty claim. Our service team will contact you to arrange the next steps.'
      };
      try {
        await tx.sendMail({
          from: `"${SITE.name}" <${from}>`,
          to: customerEmail,
          subject: `${SITE.name}: we received your ${LABEL[type].toLowerCase()} (${ref})`,
          text: `${intro[type]}\n\nReference: ${ref}\n\n${Object.entries(fields).map(([k, v]) => `${k}: ${v}`).join('\n')}`,
          html: shell(`Reference ${ref}`, `<p>${esc(intro[type])}</p><p>Reference: <strong>${esc(ref)}</strong></p>${fieldsTable(fields)}${itemsTable(items, totals)}`)
        });
      } catch (e) {
        console.error('confirmation email failed', (e as Error).message);
      }
    }
  }
  const saved = await saveRecord(record);

  if (!emailed && !saved) {
    console.error('enquiry not delivered: no working SMTP or storage configured');
    return NextResponse.json({ ok: false, error: 'not-configured' }, { status: 503 });
  }
  return NextResponse.json({ ok: true, ref });
}
