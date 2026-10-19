import { NextResponse } from 'next/server';
import { checkAdminPasscode } from '../../../../lib/adminAuth';
import { sendMail } from '../../../../lib/mailer';
import { getEnquiry, markEnquiryReplied } from '../../../../lib/store';
import { enquiryReplyEmail } from '../../../../lib/emails';
import { REPLY } from '../../../../config/reply';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  const denied = checkAdminPasscode(req);
  if (denied) return denied;
  let b: any;
  try { b = await req.json(); } catch { return NextResponse.json({ ok: false, error: 'invalid-request' }, { status: 400 }); }
  const enquiry = await getEnquiry(String(b.id || ''));
  const reply = String(b.reply || '').trim().slice(0, 8000);
  if (!enquiry || !reply) return NextResponse.json({ ok: false, error: 'Enquiry not found or reply is empty.' }, { status: 400 });

  const r = await sendMail({
    to: enquiry.email,
    subject: `Re: your ${enquiry.type} (${enquiry.id}) - Bar Freezer`,
    html: enquiryReplyEmail(enquiry.name, reply),
    text: reply,
    replyTo: REPLY.channels.email,
  });
  if (!r.sent) return NextResponse.json({ ok: false, error: r.reason === 'not-configured' ? 'SMTP is not configured on the server.' : 'The email could not be sent.' }, { status: 503 });
  await markEnquiryReplied(enquiry.id);
  return NextResponse.json({ ok: true });
}
