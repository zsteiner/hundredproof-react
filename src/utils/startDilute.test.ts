import startDilute from './startDilute';

describe('startDilute', () => {
  it('calculates water needed for standard dilution', () => {
    // 10 oz at 50% ABV, want 25% ABV
    // ((50 - 25) / 25) * 10 = 10
    expect(startDilute({ amount: 10, desiredABV: 25, startingABV: 50 })).toBe(
      10,
    );
  });

  it('calculates for smaller dilution', () => {
    // 10 oz at 50% ABV, want 40% ABV
    // ((50 - 40) / 40) * 10 = 2.5
    expect(startDilute({ amount: 10, desiredABV: 40, startingABV: 50 })).toBe(
      2.5,
    );
  });

  it('returns 0 when starting and desired are equal', () => {
    expect(startDilute({ amount: 10, desiredABV: 50, startingABV: 50 })).toBe(
      0,
    );
  });

  it('returns 0 when amount is 0', () => {
    expect(startDilute({ amount: 0, desiredABV: 25, startingABV: 50 })).toBe(0);
  });

  it('handles 1 oz amount', () => {
    // 1 oz at 100 proof (50% ABV), want 50 proof (25% ABV)
    // ((50 - 25) / 25) * 1 = 1
    expect(startDilute({ amount: 1, desiredABV: 25, startingABV: 50 })).toBe(1);
  });
});
