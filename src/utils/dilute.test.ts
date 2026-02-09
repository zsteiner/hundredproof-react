import dilute from './dilute';

describe('dilute', () => {
  it('returns correct result shape', () => {
    const result = dilute(1, 25, 50, 'shot', 'start');
    expect(result).toHaveProperty('resultsOz');
    expect(result).toHaveProperty('resultsTranslated');
    expect(result).toHaveProperty('displayUnits');
    expect(result).toHaveProperty('translatedUnit');
    expect(result).toHaveProperty('displayResults');
    expect(result).toHaveProperty('finalAmountSpirit');
    expect(result).toHaveProperty('finalAmountSpiritTranslated');
  });

  describe('start volume mode', () => {
    it('calculates dilution for 1 shot at 50% to 25%', () => {
      const result = dilute(1, 25, 50, 'shot', 'start');
      expect(result.resultsOz).toBe(1);
      expect(result.displayUnits).toBe('ounce');
    });

    it('uses teaspoons for amounts under 2 oz', () => {
      const result = dilute(1, 40, 50, 'shot', 'start');
      expect(result.translatedUnit).toBe('teaspoon');
    });

    it('uses cups for amounts >= 2 oz', () => {
      const result = dilute(10, 25, 50, 'shot', 'start');
      expect(result.translatedUnit).toBe('cup');
    });
  });

  describe('end volume mode', () => {
    it('calculates dilution for end volume', () => {
      const result = dilute(10, 25, 50, 'shot', 'end');
      expect(result.resultsOz).toBe(5);
    });
  });

  describe('different units', () => {
    it('handles jigger units (1.5x)', () => {
      const result = dilute(1, 25, 50, 'jigger', 'start');
      expect(result.resultsOz).toBe(1.5);
    });

    it('handles cup units (8x) and displays in cups', () => {
      const result = dilute(1, 25, 50, 'cup', 'start');
      expect(result.resultsOz).toBe(8);
      expect(result.displayUnits).toBe('cup');
    });
  });

  describe('edge cases', () => {
    it('handles 0 amount', () => {
      const result = dilute(0, 25, 50, 'shot', 'start');
      expect(result.resultsOz).toBe(0);
    });

    it('handles NaN inputs gracefully', () => {
      const result = dilute(NaN, 25, 50, 'shot', 'start');
      expect(result.resultsOz).toBe(0);
    });
  });
});
