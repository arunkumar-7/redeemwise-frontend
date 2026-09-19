/** Strips everything but digits and leading zeros; used by points entry fields. */
export function digitsOnly(raw: string): string {
  return raw.replace(/[^0-9]/g, '').replace(/^0+(?=\d)/, '');
}
