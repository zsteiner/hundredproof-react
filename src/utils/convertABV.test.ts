import convertABV from './convertABV';

describe('convertABV', () => {
  it('converts to proof by multiplying by 2', () => {
    expect(convertABV('proof', 50)).toBe(100);
    expect(convertABV('proof', 25)).toBe(50);
  });

  it('converts to abv by dividing by 2', () => {
    expect(convertABV('abv', 100)).toBe(50);
    expect(convertABV('abv', 50)).toBe(25);
  });

  it('handles 0', () => {
    expect(convertABV('proof', 0)).toBe(0);
    expect(convertABV('abv', 0)).toBe(0);
  });

  it('handles 100', () => {
    expect(convertABV('proof', 100)).toBe(200);
    expect(convertABV('abv', 200)).toBe(100);
  });
});
