import { scaleIngredients } from './scaleIngredients';

describe('scaleIngredients', () => {
  it('scales ingredient amounts by the scaling factor', () => {
    const result = scaleIngredients({
      ingredients: [
        { id: 0, amount: 1, unit: 'ounce', ingredient: 'gin', value: '1 oz gin' },
        { id: 1, amount: 1, unit: 'ounce', ingredient: 'Campari', value: '1 oz Campari' },
      ],
      scalingFactor: 4,
    });
    expect(result[0].amount).toBe(4);
    expect(result[1].amount).toBe(4);
  });

  it('filters out items without a value', () => {
    const result = scaleIngredients({
      ingredients: [
        { id: 0, amount: 1, unit: 'ounce', ingredient: 'gin', value: '1 oz gin' },
        { id: 1, value: '' },
      ],
      scalingFactor: 2,
    });
    expect(result).toHaveLength(1);
  });

  it('defaults NaN scaling factor to 1', () => {
    const result = scaleIngredients({
      ingredients: [
        { id: 0, amount: 2, unit: 'ounce', ingredient: 'gin', value: '2 oz gin' },
      ],
      scalingFactor: NaN,
    });
    expect(result[0].amount).toBe(2);
  });

  it('handles scaling factor of 0', () => {
    const result = scaleIngredients({
      ingredients: [
        { id: 0, amount: 2, unit: 'ounce', ingredient: 'gin', value: '2 oz gin' },
      ],
      scalingFactor: 0,
    });
    expect(result[0].amount).toBe(0);
  });

  it('handles fractional scaling factor', () => {
    const result = scaleIngredients({
      ingredients: [
        { id: 0, amount: 4, unit: 'ounce', ingredient: 'gin', value: '4 oz gin' },
      ],
      scalingFactor: 0.5,
    });
    expect(result[0].amount).toBe(2);
  });

  it('preserves other ingredient properties', () => {
    const result = scaleIngredients({
      ingredients: [
        { id: 0, amount: 1, unit: 'ounce', ingredient: 'gin', value: '1 oz gin' },
      ],
      scalingFactor: 3,
    });
    expect(result[0].unit).toBe('ounce');
    expect(result[0].ingredient).toBe('gin');
    expect(result[0].id).toBe(0);
  });
});
