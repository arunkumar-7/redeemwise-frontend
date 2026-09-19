/** Points validation — backend rejects availablePoints < 1 with 400 (§5.1, §8). */
export const POINTS_MAX = 999_999_999; // 9 digits — sane overflow cap (§8)

export type PointsValidation =
  | { valid: true; value: number }
  | { valid: false; error: string };

/** Parses a raw points string; returns a typed error or the parsed integer. */
export function validatePoints(raw: string): PointsValidation {
  const trimmed = raw.trim().replace(/,/g, '');

  if (trimmed === '') {
    return { valid: false, error: 'Please enter your reward points balance.' };
  }
  if (!/^\d+$/.test(trimmed)) {
    return { valid: false, error: 'Points must be a whole number — no decimals or symbols.' };
  }

  const value = Number.parseInt(trimmed, 10);

  if (!Number.isSafeInteger(value)) {
    return { valid: false, error: 'That number is too large. Please check your points balance.' };
  }
  if (value < 1) {
    return { valid: false, error: 'Points must be at least 1 to find redemptions.' };
  }
  if (value > POINTS_MAX) {
    return { valid: false, error: `Points cannot exceed ${POINTS_MAX.toLocaleString('en-IN')}.` };
  }

  return { valid: true, value };
}
