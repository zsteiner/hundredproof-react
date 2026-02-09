import { endDilute } from './endDilute';

describe('endDilute', () => {
  it('calculates water needed for end volume dilution', () => {
    // Want 10 oz total at 25% ABV, starting with 50% ABV
    // 10 - 10 * (25 / 50) = 10 - 5 = 5
    expect(endDilute({ amount: 10, desiredABV: 25, startingABV: 50 })).toBe(5);
  });

  it('calculates for larger end volume', () => {
    // Want 20 oz total at 25% ABV, starting with 50% ABV
    // 20 - 20 * (25 / 50) = 20 - 10 = 10
    expect(endDilute({ amount: 20, desiredABV: 25, startingABV: 50 })).toBe(10);
  });

  it('returns 0 when starting and desired are equal', () => {
    // 10 - 10 * (50 / 50) = 0
    expect(endDilute({ amount: 10, desiredABV: 50, startingABV: 50 })).toBe(0);
  });

  it('returns 0 when amount is 0', () => {
    expect(endDilute({ amount: 0, desiredABV: 25, startingABV: 50 })).toBe(0);
  });

  it('handles small dilution', () => {
    // Want 10 oz total at 40% ABV, starting with 50% ABV
    // 10 - 10 * (40 / 50) = 10 - 8 = 2
    expect(endDilute({ amount: 10, desiredABV: 40, startingABV: 50 })).toBe(2);
  });
});
