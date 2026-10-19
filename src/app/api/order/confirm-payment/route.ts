import { NextResponse } from 'next/server';
import { getOrder, markPaymentConfirmed } from '../../../../lib/store';
import { ORDER_REF_RE, money } from '../../../../lib/order';
import { sendMail } from '../../../../lib/mailer';
import { shell, esc, button } from '../../../../lib/emails';
import { REPLY, SITE_URL } from '../../../../config/reply';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif'];

// Public: order number is the token; never returns order data, only {ok}.
export async function POST(req: Request) {
  let form: FormData;
  try { form = await req.formData(); } catch { return NextResponse.json({ ok: false, error: 'Invalid upload.' }, { status: 400 }); }
  const id = String(form.get('id') || '');
  const note = String(form.get('note') || '').slice(0, 1000);
  const file = form.get('screenshot');
  if (!ORDER_REF_RE.test(id)) return NextResponse.json({ ok: false, error: 'Order not found.' }, { status: 404 });
  const order = await getOrder(id);
  if (!order) return NextResponse.json({ ok: false, error: 'Order not found.' }, { status: 404 });
  if (!(file instanceof File) || !TYPES.includes(file.type)) return NextResponse.json({ ok: false, error: 'Please attach a JPG, PNG, WebP or HEIC screenshot.' }, { status: 400 });
  if (file.size > 4 * 1024 * 1024) return NextResponse.json({ ok: false, error: 'The screenshot must be under 4MB.' }, { status: 400 });

  const buf = Buffer.from(await file.arrayBuffer());
  const to = (process.env.ORDER_EMAIL || '').trim() || REPLY.channels.email;
  const r = await sendMail({
    to,
    subject: `Payment screenshot for order ${order.orderNumber}`,
    html: shell(`Payment screenshot ${order.orderNumber}`, `<p><strong>${esc(order.customerName)}</strong> says they have paid ${esc(money(order.amountDue))} for order ${esc(order.orderNumber)}.</p>${note ? `<p>Note: ${esc(note)}</p>` : ''}<p>The screenshot is attached.</p>${button(`${SITE_URL}/admin/`, 'Open dashboard →')}`),
    replyTo: order.customerEmail,
    attachments: [{ filename: file.name || 'payment-screenshot', content: buf, contentType: file.type }],
  });
  if (!r.sent) return NextResponse.json({ ok: false, error: 'We could not send your screenshot. Please email it to ' + REPLY.channels.email }, { status: 503 });
  await markPaymentConfirmed(order.orderNumber);
  return NextResponse.json({ ok: true });
}
