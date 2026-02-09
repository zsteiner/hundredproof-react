import { translateResults } from './translateResults';

describe('translateResults', () => {
  it('converts to cups when useCups is true', () => {
    const result = translateResults({ useCups: true, amount: 8 });
    expect(result).toBe(1);
  });

  it('converts to teaspoons when useCups is false', () => {
    const result = translateResults({ useCups: false, amount: 1 });
    expect(result).toBe(6);
  });

  it('handles 0 for cups', () => {
    expect(translateResults({ useCups: true, amount: 0 })).toBe(0);
  });

  it('handles 0 for teaspoons', () => {
    expect(translateResults({ useCups: false, amount: 0 })).toBe(0);
  });
});
