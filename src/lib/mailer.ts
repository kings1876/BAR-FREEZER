import nodemailer from 'nodemailer';

const env = (k: string) => (process.env[k] || '').trim();

let tx: ReturnType<typeof nodemailer.createTransport> | null | undefined;

function transporter() {
  if (tx !== undefined) return tx;
  const host = env('SMTP_HOST'), user = env('SMTP_USER'), pass = env('SMTP_PASS');
  if (!host || !user || !pass) return (tx = null);
  const port = Number(env('SMTP_PORT') || 465);
  tx = nodemailer.createTransport({ host, port, secure: port === 465, auth: { user, pass } });
  return tx;
}

export const fromAddress = () => env('SMTP_FROM') || env('SMTP_USER');

export async function sendMail(opts: {
  to: string;
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
  fromName?: string;
  attachments?: { filename: string; content: Buffer; contentType?: string }[];
}): Promise<{ sent: boolean; reason?: string }> {
  const t = transporter();
  if (!t) return { sent: false, reason: 'not-configured' };
  try {
    await t.sendMail({
      from: `"${opts.fromName || 'Bar Freezer'}" <${fromAddress()}>`,
      to: opts.to,
      subject: opts.subject,
      html: opts.html,
      text: opts.text,
      replyTo: opts.replyTo,
      attachments: opts.attachments,
    });
    return { sent: true };
  } catch (e) {
    console.error('sendMail failed', (e as Error).message);
    return { sent: false, reason: 'send-failed' };
  }
}
