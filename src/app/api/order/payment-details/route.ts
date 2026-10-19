import { NextResponse } from 'next/server';
import { getOrder } from '../../../../lib/store';
import { ORDER_REF_RE, findMethod, paymentTermsLines } from '../../../../lib/order';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

// Public: the order number is the access token. Returns only what the customer's own email contained.
export async function GET(req: Request) {
  const id = new URL(req.url).searchParams.get('id') || '';
  if (!ORDER_REF_RE.test(id)) return NextResponse.json({ ok: false, error: 'not-found' }, { status: 404 });
  const o = await getOrder(id);
  if (!o || !o.paymentDetails) return NextResponse.json({ ok: false, error: 'not-ready' }, { status: 404 });
  return NextResponse.json({
    ok: true,
    orderNumber: o.orderNumber,
    amountDue: o.amountDue,
    status: o.status,
    method: findMethod(o.paymentDetails.methodId)?.label || o.paymentDetails.methodId,
    fields: o.paymentDetails.fields,
    terms: paymentTermsLines(),
  });
}
