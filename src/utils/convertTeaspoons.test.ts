import { convertTeaspoons } from './convertTeaspoons';

describe('convertTeaspoons', () => {
  it('converts ounces to teaspoons', () => {
    const result = convertTeaspoons(1);
    expect(result).toBe(6);
  });

  it('converts fractional ounces', () => {
    const result = convertTeaspoons(0.5);
    expect(result).toBe(3);
  });

  it('handles 0', () => {
    expect(convertTeaspoons(0)).toBe(0);
  });

  it('handles larger amounts', () => {
    const result = convertTeaspoons(2);
    expect(result).toBe(12);
  });
});
