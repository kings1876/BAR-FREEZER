// Light email shell (white body, dark brand header band, accent colour only) + one builder per email.
import { REPLY, SITE_URL } from '../config/reply';
import { money, paymentTermsLines } from './order';
import type { StoredOrder } from './store';

const NAME = 'Bar Freezer';

export const esc = (s: unknown) =>
  String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export function shell(title: string, body: string) {
  return `<!doctype html><html><body style="margin:0;background:#f1f5f9;font-family:Arial,Helvetica,sans-serif;color:#0f172a">
<table width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:24px 12px">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#ffffff;border:1px solid #e2e8f0;border-radius:8px;overflow:hidden">
<tr><td style="background:${REPLY.brand.headerDark};color:#ffffff;padding:16px 24px;font-size:18px;font-weight:bold">${NAME}<span style="color:${REPLY.brand.primary}"> &middot; ${esc(title)}</span></td></tr>
<tr><td style="padding:24px;font-size:14px;line-height:1.55;color:#0f172a">${body}</td></tr>
<tr><td style="background:#f8fafc;padding:14px 24px;font-size:12px;color:#64748b">${NAME} &middot; barfreezer.com.au &middot; ${esc(REPLY.channels.email)}</td></tr>
</table></td></tr></table></body></html>`;
}

export const button = (href: string, label: string) =>
  `<p style="margin:20px 0"><a href="${esc(href)}" style="background:${REPLY.brand.primary};color:#0f172a;text-decoration:none;font-weight:bold;padding:12px 22px;border-radius:6px;display:inline-block">${esc(label)}</a></p>`;

export const callout = (html: string) =>
  `<div style="border-left:4px solid ${REPLY.brand.primary};background:#f8fafc;padding:12px 16px;margin:16px 0;border-radius:4px">${html}</div>`;

export function fieldsTable(fields: Record<string, string>) {
  const rows = Object.entries(fields)
    .map(([k, v]) => `<tr><td style="padding:6px 12px 6px 0;color:#64748b;vertical-align:top;white-space:nowrap">${esc(k)}</td><td style="padding:6px 0;font-weight:bold;white-space:pre-wrap">${esc(v)}</td></tr>`)
    .join('');
  return `<table cellpadding="0" cellspacing="0" style="width:100%;font-size:14px">${rows}</table>`;
}

export function itemsTable(items: { name: string; quantity: number; lineTotal: number | null }[], total?: number) {
  if (!items.length) return '';
  const rows = items
    .map((i) => `<tr><td style="padding:6px 0;border-bottom:1px solid #e2e8f0">${esc(i.name)}</td><td style="padding:6px 8px;border-bottom:1px solid #e2e8f0;text-align:center">${esc(i.quantity)}</td><td style="padding:6px 0;border-bottom:1px solid #e2e8f0;text-align:right;white-space:nowrap">${esc(money(i.lineTotal) || 'Quote')}</td></tr>`)
    .join('');
  const tot = typeof total === 'number' ? `<tr><td colspan="2" style="padding:8px 0;text-align:right;font-weight:bold">Total (incl. GST)</td><td style="padding:8px 0;text-align:right;font-weight:bold">${esc(money(total))}</td></tr>` : '';
  return `<table cellpadding="0" cellspacing="0" style="width:100%;font-size:14px;margin-top:12px"><tr><th align="left" style="color:#64748b;font-weight:normal">Item</th><th style="color:#64748b;font-weight:normal">Qty</th><th align="right" style="color:#64748b;font-weight:normal">Price</th></tr>${rows}${tot}</table>`;
}

export function orderNotificationEmail(o: StoredOrder) {
  const body = `<p>New order request <strong>${esc(o.orderNumber)}</strong> via ${o.channel === 'whatsapp' ? 'WhatsApp checkout' : 'the website'}.</p>
${fieldsTable({ Name: o.customerName, Email: o.customerEmail, Phone: o.customerPhone, Address: o.address || '', 'Payment option': o.paymentMethod, Notes: o.notes || '' })}
${itemsTable(o.items, o.amountDue)}
${button(`${SITE_URL}/admin/`, 'Reply in Dashboard →')}`;
  return shell(`New order ${o.orderNumber}`, body);
}

export function orderConfirmationEmail(o: StoredOrder) {
  const body = `<p>Hi ${esc(o.customerName)},</p>
<p>Thanks for your order request <strong>${esc(o.orderNumber)}</strong>. We are confirming stock and freight and will email you a separate message with your payment details. <strong>Please watch for that email.</strong></p>
<p>Your order is not paid or dispatched until payment is confirmed.</p>
${itemsTable(o.items, o.amountDue)}
<p style="color:#64748b">Questions? Reply to this email or write to ${esc(REPLY.channels.email)}.</p>`;
  return shell(`Order ${o.orderNumber} received`, body);
}

export function paymentDetailsEmail(o: StoredOrder, methodLabel: string, fields: { label: string; value: string }[], note?: string) {
  const link = `${SITE_URL}/order/payment-details/?id=${encodeURIComponent(o.orderNumber)}`;
  const list = fields.map((f) => `<tr><td style="padding:6px 12px 6px 0;color:#64748b;white-space:nowrap">${esc(f.label)}</td><td style="padding:6px 0;font-weight:bold;word-break:break-all">${esc(f.value)}</td></tr>`).join('');
  const terms = paymentTermsLines().map((t) => `<li>${esc(t)}</li>`).join('');
  const body = `<p>Hi ${esc(o.customerName)},</p>
<p>Here are the payment details for order <strong>${esc(o.orderNumber)}</strong>.</p>
${callout(`<div style="font-size:12px;color:#64748b">Amount due</div><div style="font-size:22px;font-weight:bold">${esc(money(o.amountDue))}</div><div style="font-size:12px;color:#64748b;margin-top:4px">${esc(methodLabel)}</div>`)}
<table cellpadding="0" cellspacing="0" style="width:100%;font-size:14px">${list}</table>
${note ? `<p>${esc(note)}</p>` : ''}
${button(link, 'Open payment details (tap to copy)')}
<ul style="color:#475569;padding-left:18px">${terms}</ul>`;
  return shell(`Payment details ${o.orderNumber}`, body);
}

export function enquiryReplyEmail(name: string, reply: string) {
  const body = `<p>Hi ${esc(name)},</p><p style="white-space:pre-wrap">${esc(reply)}</p><p style="color:#64748b">Reply to this email to continue the conversation.</p>`;
  return shell('Reply from Bar Freezer', body);
}

export function enquiryNotificationEmail(label: string, ref: string, fields: Record<string, string>, items: { name: string; quantity: number; lineTotal: number | null }[]) {
  const body = `<p>${esc(label)} <strong>${esc(ref)}</strong></p>${fieldsTable(fields)}${itemsTable(items)}${button(`${SITE_URL}/admin/`, 'Reply in Dashboard →')}`;
  return shell(`${label} ${ref}`, body);
}

export function enquiryConfirmationEmail(name: string, label: string, ref: string) {
  const body = `<p>Hi ${esc(name || 'there')},</p><p>Thanks, we have received your ${esc(label.toLowerCase())} (reference <strong>${esc(ref)}</strong>). Our team will reply by email shortly.</p>`;
  return shell(`Reference ${ref}`, body);
}
