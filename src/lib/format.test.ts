import {
  changeDirection,
  confidenceChangePp,
  formatChangePp,
  formatConfidence,
  formatPercent,
} from './format';

describe('formatPercent', () => {
  it('keeps one decimal place', () => {
    expect(formatPercent(42.6)).toBe('42.6%');
    expect(formatPercent(18)).toBe('18.0%');
  });
});

describe('formatConfidence', () => {
  it('keeps three decimal places', () => {
    expect(formatConfidence(0.942)).toBe('0.942');
    expect(formatConfidence(0.9)).toBe('0.900');
  });
});

describe('confidenceChangePp', () => {
  it('returns the signed change in percentage points without float noise', () => {
    expect(confidenceChangePp(0.942, 0.759)).toBe(-18.3);
    expect(confidenceChangePp(0.942, 0.989)).toBe(4.7);
  });
});

describe('formatChangePp and changeDirection', () => {
  it('describes a drop as a decrease with an unsigned value', () => {
    expect(changeDirection(-18.3)).toBe('decrease');
    expect(formatChangePp(-18.3)).toBe('18.3 pp');
  });

  it('describes a rise as an increase', () => {
    expect(changeDirection(4.7)).toBe('increase');
    expect(formatChangePp(4.7)).toBe('4.7 pp');
  });

  it('treats changes that round to zero as no change', () => {
    expect(changeDirection(0.04)).toBe('none');
    expect(formatChangePp(-0.04)).toBe('No change');
    expect(formatChangePp(0)).toBe('No change');
  });
});
