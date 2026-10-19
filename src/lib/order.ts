import { REPLY } from '../config/reply';

export interface PayField { label: string; value: string }

export function makeOrderNumber(prefix: string = REPLY.orderPrefix): string {
  const t = Date.now().toString(36).toUpperCase().slice(-4);
  const alphabet = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const bytes: ArrayLike<number> =
    typeof crypto !== 'undefined' && crypto.getRandomValues
      ? crypto.getRandomValues(new Uint8Array(2))
      : [Math.floor(Math.random() * 256), Math.floor(Math.random() * 256)];
  let r = '';
  for (let i = 0; i < bytes.length; i++) r += alphabet[bytes[i] % alphabet.length];
  return `${prefix}-${t}${r}`;
}

export const ORDER_REF_RE = new RegExp(`^${REPLY.orderPrefix}-[A-Z0-9]{4,8}$`);

const KNOWN_LABELS = [
  'account name', 'account number', 'bsb', 'bank name', 'sort code', 'routing number', 'beneficiary name', 'beneficiary',
  'swift code', 'swift', 'iban', 'payid', 'wallet address', 'wallet', 'network', 'coin', 'memo', 'destination tag', 'tag',
  'payment link', 'reference', 'amount',
].sort((a, b) => b.length - a.length);

const LABEL_PATTERN = new RegExp(`^(${KNOWN_LABELS.map((l) => l.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})\\s*[:-]?\\s+(.+)$`, 'i');

const titleCase = (s: string) => s.replace(/\S+/g, (w) => w[0].toUpperCase() + w.slice(1).toLowerCase());

// Splits one pasted blob into individually copyable fields (any country, any payment rail).
export function parsePaymentDetail(text: string): PayField[] {
  const lines = String(text || '').split('\n').map((l) => l.trim()).filter(Boolean);
  let unlabeled = 0;
  return lines.map((line) => {
    const i = line.indexOf(':');
    if (i > 0 && i < line.length - 1) return { label: line.slice(0, i).trim(), value: line.slice(i + 1).trim() };
    const m = line.match(LABEL_PATTERN);
    if (m) return { label: titleCase(m[1]), value: m[2].trim() };
    unlabeled += 1;
    return { label: unlabeled > 1 ? `Detail ${unlabeled}` : 'Detail', value: line };
  });
}

export function money(n: number | null | undefined): string {
  if (typeof n !== 'number' || !isFinite(n)) return '';
  return `${REPLY.currency.symbol}${n.toLocaleString(REPLY.currency.locale, { minimumFractionDigits: 0, maximumFractionDigits: 2 })} ${REPLY.currency.code}`;
}

export function findMethod(idOrLabel: string) {
  const s = String(idOrLabel || '').toLowerCase();
  return REPLY.methods.find((m) => m.id === s || m.label.toLowerCase() === s) || null;
}

export const paymentTermsLines = (): string[] => REPLY.terms;
