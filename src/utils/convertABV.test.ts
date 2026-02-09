import { convertABV } from './convertABV';

describe('convertABV', () => {
  it('converts to proof by multiplying by 2', () => {
    expect(convertABV({ measure: 'proof', value: 50 })).toBe(100);
    expect(convertABV({ measure: 'proof', value: 25 })).toBe(50);
  });

  it('converts to abv by dividing by 2', () => {
    expect(convertABV({ measure: 'abv', value: 100 })).toBe(50);
    expect(convertABV({ measure: 'abv', value: 50 })).toBe(25);
  });

  it('handles 0', () => {
    expect(convertABV({ measure: 'proof', value: 0 })).toBe(0);
    expect(convertABV({ measure: 'abv', value: 0 })).toBe(0);
  });

  it('handles 100', () => {
    expect(convertABV({ measure: 'proof', value: 100 })).toBe(200);
    expect(convertABV({ measure: 'abv', value: 200 })).toBe(100);
  });
});
