import { cn } from './utils';

describe('cn', () => {
  it('keeps a custom font-size token next to a text colour', () => {
    expect(cn('text-card-subtitle', 'text-muted-foreground')).toBe(
      'text-card-subtitle text-muted-foreground',
    );
  });

  it('lets a later custom font-size token replace an earlier size', () => {
    expect(cn('text-sm', 'text-stat')).toBe('text-stat');
  });
});
