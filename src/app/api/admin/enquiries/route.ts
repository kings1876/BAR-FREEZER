import { NextResponse } from 'next/server';
import { checkAdminPasscode } from '../../../../lib/adminAuth';
import { isStoreConfigured } from '../../../../lib/redis';
import { listEnquiries, getEnquiry, deleteEnquiry } from '../../../../lib/store';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const denied = checkAdminPasscode(req);
  if (denied) return denied;
  const id = new URL(req.url).searchParams.get('id');
  if (id) {
    const enquiry = await getEnquiry(id);
    return enquiry ? NextResponse.json({ ok: true, enquiry }) : NextResponse.json({ ok: false, error: 'not-found' }, { status: 404 });
  }
  return NextResponse.json({ ok: true, storeConfigured: isStoreConfigured(), enquiries: await listEnquiries() });
}

export async function DELETE(req: Request) {
  const denied = checkAdminPasscode(req);
  if (denied) return denied;
  const id = new URL(req.url).searchParams.get('id');
  if (!id) return NextResponse.json({ ok: false, error: 'missing-id' }, { status: 400 });
  await deleteEnquiry(id);
  return NextResponse.json({ ok: true });
}
