import { processIngredients } from './processIngredients';

describe('processIngredients', () => {
  it('parses a simple ingredient string', () => {
    const result = processIngredients([{ id: 0, value: '1 oz gin' }]);
    expect(result).toEqual([
      {
        id: 0,
        amount: 1,
        unit: 'ounce',
        ingredient: 'gin',
        value: '1 oz gin',
      },
    ]);
  });

  it('parses decimal amounts', () => {
    const result = processIngredients([{ id: 0, value: '1.5 oz whisky' }]);
    expect(result[0].amount).toBe(1.5);
    expect(result[0].unit).toBe('ounce');
    expect(result[0].ingredient).toBe('whisky');
  });

  it('parses fractions', () => {
    const result = processIngredients([{ id: 0, value: '1/2 oz lime juice' }]);
    expect(result[0].amount).toBe(0.5);
    expect(result[0].unit).toBe('ounce');
    expect(result[0].ingredient).toBe('lime juice');
  });

  it('strips the word "of" from ingredients', () => {
    const result = processIngredients([
      { id: 0, value: '2 dashes of bitters' },
    ]);
    expect(result[0].amount).toBe(2);
    expect(result[0].unit).toBe('dash');
    expect(result[0].ingredient).toBe('bitters');
  });

  it('handles ingredients without a recognized unit', () => {
    const result = processIngredients([{ id: 0, value: '2 lemon wedges' }]);
    expect(result[0].amount).toBe(2);
    expect(result[0].unit).toBeNull();
    expect(result[0].ingredient).toBe('lemon wedges');
  });

  it('filters out empty values', () => {
    const result = processIngredients([
      { id: 0, value: '1 oz gin' },
      { id: 1, value: '' },
    ]);
    expect(result).toHaveLength(1);
  });

  it('parses multiple ingredients', () => {
    const result = processIngredients([
      { id: 0, value: '1 oz gin' },
      { id: 1, value: '1 oz Campari' },
      { id: 2, value: '1 oz sweet vermouth' },
    ]);
    expect(result).toHaveLength(3);
    expect(result[0].ingredient).toBe('gin');
    expect(result[1].ingredient).toBe('Campari');
    expect(result[2].ingredient).toBe('sweet vermouth');
  });

  it('parses teaspoon abbreviation', () => {
    const result = processIngredients([{ id: 0, value: '1 t sugar' }]);
    expect(result[0].unit).toBe('teaspoon');
    expect(result[0].ingredient).toBe('sugar');
  });

  it('parses tablespoon abbreviation', () => {
    const result = processIngredients([{ id: 0, value: '1 T honey' }]);
    expect(result[0].unit).toBe('tablespoon');
    expect(result[0].ingredient).toBe('honey');
  });

  it('parses cup abbreviation', () => {
    const result = processIngredients([{ id: 0, value: '1 c ice' }]);
    expect(result[0].unit).toBe('cup');
    expect(result[0].ingredient).toBe('ice');
  });
});
