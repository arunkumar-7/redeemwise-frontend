/** Formatting utilities — all backend BigDecimals arrive as JSON numbers (§6 notes). */

/** Formats a number as Indian Rupees, e.g. 12500 → "₹12,500.00" (or without decimals when whole). */
export function formatCurrency(value: number, options: { decimals?: boolean } = {}): string {
  const showDecimals = options.decimals ?? !Number.isInteger(value);
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: showDecimals ? 2 : 0,
    maximumFractionDigits: showDecimals ? 2 : 0,
  }).format(value);
}

/** Formats points with Indian grouping, e.g. 50000 → "50,000". */
export function formatPoints(value: number): string {
  return new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(value);
}

/** Formats a VPP rate, e.g. 0.25 → "₹0.25" (up to 4dp, trailing zeros trimmed). */
export function formatValuePerPoint(value: number): string {
  const formatted = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 4,
  }).format(value);
  return formatted;
}

/** Formats a category enum into display text, e.g. AIR_MILES_TRANSFER → "Air Miles Transfer". */
export function formatCategory(category: string): string {
  return category
    .toLowerCase()
    .split('_')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/** Formats an enum word in Title Case (single words), e.g. MASTERCARD → "Mastercard". */
export function formatEnumTitle(value: string): string {
  return value.charAt(0) + value.slice(1).toLowerCase();
}

/**
 * Formats a backend ISO-8601 local timestamp for display. Backend timestamps
 * carry no timezone — render as-is (deliberate localization, §6 notes).
 */
export function formatBackendTimestamp(iso: string): string {
  return iso;
}
