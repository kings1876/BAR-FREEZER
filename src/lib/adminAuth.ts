import { NextResponse } from 'next/server';

// Returns a Response to send back when the request is not allowed, or null when OK.
export function checkAdminPasscode(req: Request): NextResponse | null {
  const expected = (process.env.ADMIN_PASSCODE || '').trim();
  if (!expected) return NextResponse.json({ ok: false, error: 'admin-not-configured' }, { status: 503 });
  const given = req.headers.get('x-admin-passcode') || '';
  if (given !== expected) return NextResponse.json({ ok: false, error: 'unauthorized' }, { status: 401 });
  return null;
}
