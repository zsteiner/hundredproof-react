import convertCups from './convertCups';

describe('convertCups', () => {
  it('converts ounces to cups (divides by 8)', () => {
    expect(convertCups(8)).toBe(1);
    expect(convertCups(16)).toBe(2);
    expect(convertCups(4)).toBe(0.5);
  });

  it('rounds to 2 decimal places', () => {
    expect(convertCups(3)).toBe(0.38);
    expect(convertCups(10)).toBe(1.25);
  });

  it('handles 0', () => {
    expect(convertCups(0)).toBe(0);
  });
});
