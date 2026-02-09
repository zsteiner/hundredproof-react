import translateResults from './translateResults';

describe('translateResults', () => {
  it('converts to cups when useCups is true', () => {
    const result = translateResults(true, 8);
    expect(result).toBe(1);
  });

  it('converts to teaspoons when useCups is false', () => {
    const result = translateResults(false, 1);
    expect(result).toBe(6);
  });

  it('handles 0 for cups', () => {
    expect(translateResults(true, 0)).toBe(0);
  });

  it('handles 0 for teaspoons', () => {
    expect(translateResults(false, 0)).toBe(0);
  });
});
