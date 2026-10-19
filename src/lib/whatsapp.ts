import { REPLY } from '../config/reply';
import { money } from './order';
import type { PayField } from './order';

const NAME = 'Bar Freezer';
export const WA_HEADER = `*${NAME}*`;
export const whatsappEnabled = () => Boolean(REPLY.channels.whatsapp);
const digits = (p: string) => String(p || '').replace(/\D/g, '');

// Customer -> business: always opens with a literal greeting.
export function waLink(body: string | string[]): string {
  const lines = Array.isArray(body) ? body : [body];
  return `https://wa.me/${digits(REPLY.channels.whatsapp)}?text=${encodeURIComponent([`Hi ${NAME},`, '', ...lines].join('\n'))}`;
}

export function waOrderLink(ref: string, customer: { name: string; phone: string }, items: { name: string; quantity: number }[], total: number): string {
  return waLink([
    `New order request ${ref}`,
    ...items.map((i) => `${i.quantity} x ${i.name}`),
    `Total: ${money(total)}`,
    `Name: ${customer.name}`,
    `Phone: ${customer.phone}`,
  ]);
}

// Admin -> customer: bold brand header, same parsed fields as the email.
export function waPaymentDetailsText(orderNumber: string, amount: number, fields: PayField[], link: string, terms: string[]): string {
  return [
    WA_HEADER,
    '',
    `Payment details for order ${orderNumber}`,
    `Amount due: ${money(amount)}`,
    '',
    ...fields.map((f) => `${f.label}: ${f.value}`),
    '',
    `Tap-to-copy page: ${link}`,
    '',
    ...terms,
  ].join('\n');
}

export function waLinkTo(phone: string, text: string): string {
  return `https://wa.me/${digits(phone)}?text=${encodeURIComponent(text)}`;
}
