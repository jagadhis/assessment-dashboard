export type ChangeDirection = 'increase' | 'decrease' | 'none';

const roundToTenth = (value: number) => Math.round(value * 10) / 10;

export function formatPercent(value: number): string {
  return `${value.toFixed(1)}%`;
}

export function formatConfidence(value: number): string {
  return value.toFixed(3);
}

/** Change from reference to assessed confidence (both 0–1), in percentage points. */
export function confidenceChangePp(reference: number, assessed: number): number {
  return roundToTenth((assessed - reference) * 100);
}

export function changeDirection(changePp: number): ChangeDirection {
  const rounded = roundToTenth(changePp);
  if (rounded === 0) return 'none';
  return rounded > 0 ? 'increase' : 'decrease';
}

/** "18.3 pp" for a non-zero change, "No change" when it rounds to zero. The sign is carried by the direction. */
export function formatChangePp(changePp: number): string {
  if (changeDirection(changePp) === 'none') return 'No change';
  return `${Math.abs(roundToTenth(changePp)).toFixed(1)} pp`;
}
