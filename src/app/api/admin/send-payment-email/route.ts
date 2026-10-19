import { NextResponse } from 'next/server';
import { checkAdminPasscode } from '../../../../lib/adminAuth';
import { sendMail } from '../../../../lib/mailer';
import { getOrder, markOrderSent } from '../../../../lib/store';
import { parsePaymentDetail, findMethod } from '../../../../lib/order';
import { paymentDetailsEmail } from '../../../../lib/emails';
import { REPLY } from '../../../../config/reply';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  const denied = checkAdminPasscode(req);
  if (denied) return denied;
  let b: any;
  try { b = await req.json(); } catch { return NextResponse.json({ ok: false, error: 'invalid-request' }, { status: 400 }); }
  const order = await getOrder(String(b.orderNumber || ''));
  if (!order) return NextResponse.json({ ok: false, error: 'order-not-found' }, { status: 404 });
  const method = findMethod(String(b.methodId || ''));
  const fields = parsePaymentDetail(String(b.detail || ''));
  if (!method || !fields.length) return NextResponse.json({ ok: false, error: 'Choose a method and paste the payment details.' }, { status: 400 });

  const r = await sendMail({
    to: order.customerEmail,
    subject: `Payment details for order ${order.orderNumber}`,
    html: paymentDetailsEmail(order, method.label, fields, b.note ? String(b.note).slice(0, 1000) : undefined),
    replyTo: REPLY.channels.email,
  });
  if (!r.sent) return NextResponse.json({ ok: false, error: r.reason === 'not-configured' ? 'SMTP is not configured on the server.' : 'The email could not be sent.' }, { status: 503 });
  await markOrderSent(order.orderNumber, { methodId: method.id, fields, sentAt: new Date().toISOString() });
  return NextResponse.json({ ok: true });
}
