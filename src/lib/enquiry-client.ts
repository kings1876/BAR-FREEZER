// Client helpers: collect any form's fields by label and send them to /api/enquiry.
export type EnquiryType = 'order' | 'quote' | 'trade' | 'contact' | 'warranty' | 'newsletter';

export function collectForm(form: HTMLFormElement): Record<string, string> {
  const out: Record<string, string> = {};
  const used = new Set<string>();
  const els = Array.from(form.elements) as (HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement)[];
  els.forEach((el, idx) => {
    if (!('name' in el) || el.disabled) return;
    const type = (el as HTMLInputElement).type;
    if (['button', 'submit', 'reset', 'hidden', 'file'].includes(type)) return;
    if (type === 'radio' && !(el as HTMLInputElement).checked) return;
    let key = el.name || '';
    if (!key) {
      const wrap = el.closest('div');
      const lab = (el.closest('label') || wrap?.querySelector('label')) as HTMLElement | null;
      key = (lab?.innerText || el.getAttribute('aria-label') || (el as HTMLInputElement).placeholder || el.id || `Field ${idx + 1}`).replace(/\*/g, '').replace(/\(.*?\)/g, '').trim();
    }
    key = key.replace(/\s+/g, ' ').slice(0, 60) || `Field ${idx + 1}`;
    let value: string;
    if (type === 'checkbox') value = (el as HTMLInputElement).checked ? 'Yes' : 'No';
    else value = String(el.value || '').trim();
    if (!value) return;
    let k = key;
    let n = 2;
    while (used.has(k)) k = `${key} ${n++}`;
    used.add(k);
    out[k] = value;
  });
  return out;
}

export interface EnquiryItem { name: string; sku?: string; qty?: number; price?: number | null }
export interface EnquiryTotals { subtotal: number; delivery: number; total: number }

export async function sendEnquiry(
  type: EnquiryType,
  fields: Record<string, string>,
  extra: { items?: EnquiryItem[]; totals?: EnquiryTotals } = {}
): Promise<{ ref: string }> {
  let res: Response;
  try {
    res = await fetch('/api/enquiry/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type, fields, items: extra.items || [], totals: extra.totals || null })
    });
  } catch {
    throw new Error('We could not reach the server. Please check your connection and try again, or call us on 1300 858 290.');
  }
  let data: any = null;
  try { data = await res.json(); } catch {}
  if (res.ok && data?.ok) return { ref: data.ref };
  if (data?.error && data.error !== 'not-configured') throw new Error(data.error);
  throw new Error('We could not send your request right now. Please call us on 1300 858 290 or email sales@barfreezer.com.au and we will help you directly.');
}
