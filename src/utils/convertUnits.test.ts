import convertUnits from './convertUnits';

describe('convertUnits', () => {
  it('multiplies cups by 8', () => {
    expect(convertUnits({ amount: 1, unit: 'cup' })).toBe(8);
    expect(convertUnits({ amount: 2, unit: 'cup' })).toBe(16);
  });

  it('multiplies jiggers by 1.5', () => {
    expect(convertUnits({ amount: 1, unit: 'jigger' })).toBe(1.5);
    expect(convertUnits({ amount: 2, unit: 'jigger' })).toBe(3);
  });

  it('passes through shots unchanged', () => {
    expect(convertUnits({ amount: 1, unit: 'shot' })).toBe(1);
    expect(convertUnits({ amount: 5, unit: 'shot' })).toBe(5);
  });

  it('passes through ounces unchanged', () => {
    expect(convertUnits({ amount: 1, unit: 'ounce' })).toBe(1);
    expect(convertUnits({ amount: 10, unit: 'oz' })).toBe(10);
  });

  it('passes through teaspoons unchanged', () => {
    expect(convertUnits({ amount: 3, unit: 'teaspoon' })).toBe(3);
  });
});
