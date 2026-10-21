// Number formatting without Intl. The first toLocaleString call in a page load initialises locale data and
// blocks the main thread for tens of milliseconds; this gives the same en-AU output for prices and counts.
export function fmtNum(n: number): string {
  if (n == null || Number.isNaN(n)) return '';
  const fixed = String(Math.round(n * 1000) / 1000);
  const [int, dec] = fixed.split('.');
  const neg = int.startsWith('-');
  const digits = neg ? int.slice(1) : int;
  return (neg ? '-' : '') + digits.replace(/\B(?=(\d{3})+(?!\d))/g, ',') + (dec ? '.' + dec : '');
}
