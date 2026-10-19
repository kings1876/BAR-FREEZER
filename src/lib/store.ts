import { getRedis } from './redis';
import { REPLY } from '../config/reply';

export interface StoredOrder {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  address?: string;
  items: { name: string; quantity: number; lineTotal: number | null }[];
  amountDue: number;
  paymentMethod: string;
  notes?: string;
  status: 'pending' | 'payment-sent' | 'payment-confirmed';
  channel: 'whatsapp' | 'email';
  createdAt: string;
  paymentDetails?: { methodId: string; fields: { label: string; value: string }[]; sentAt: string };
}

export interface StoredEnquiry {
  id: string;
  type: 'contact' | 'quote' | 'trade' | 'warranty' | 'newsletter';
  name: string;
  email: string;
  phone?: string;
  message: string;
  meta?: Record<string, string>;
  items?: { name: string; sku?: string; qty?: number; price?: number | null }[];
  status: 'new' | 'replied';
  createdAt: string;
}

const P = REPLY.orderPrefix.toLowerCase();
const OKEY = `${P}:orders`;
const EKEY = `${P}:enquiries`;

const parse = (v: any) => (typeof v === 'string' ? JSON.parse(v) : v);
const byNewest = (a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();

async function list<T>(key: string): Promise<T[]> {
  const r = getRedis();
  if (!r) return [];
  const all = await r.hgetall(key);
  if (!all) return [];
  return (Object.values(all).map(parse) as any[]).sort(byNewest);
}
async function get<T>(key: string, id: string): Promise<T | null> {
  const r = getRedis();
  if (!r) return null;
  const raw = await r.hget(key, id);
  return raw ? (parse(raw) as T) : null;
}
async function put(key: string, id: string, v: unknown) {
  const r = getRedis();
  if (!r) return false;
  await r.hset(key, { [id]: JSON.stringify(v) });
  return true;
}
async function del(key: string, id: string) {
  const r = getRedis();
  if (r) await r.hdel(key, id);
}

export const saveOrder = (o: StoredOrder) => put(OKEY, o.orderNumber, o);
export const listOrders = () => list<StoredOrder>(OKEY);
export const getOrder = (id: string) => get<StoredOrder>(OKEY, id);
export const deleteOrder = (id: string) => del(OKEY, id);
export async function markOrderSent(id: string, paymentDetails: StoredOrder['paymentDetails']) {
  const o = await getOrder(id);
  if (!o) return;
  o.status = 'payment-sent';
  o.paymentDetails = paymentDetails;
  await saveOrder(o);
}
export async function markPaymentConfirmed(id: string) {
  const o = await getOrder(id);
  if (!o) return;
  o.status = 'payment-confirmed';
  await saveOrder(o);
}

export const saveEnquiry = (e: StoredEnquiry) => put(EKEY, e.id, e);
export const listEnquiries = () => list<StoredEnquiry>(EKEY);
export const getEnquiry = (id: string) => get<StoredEnquiry>(EKEY, id);
export const deleteEnquiry = (id: string) => del(EKEY, id);
export async function markEnquiryReplied(id: string) {
  const e = await getEnquiry(id);
  if (!e) return;
  e.status = 'replied';
  await saveEnquiry(e);
}
