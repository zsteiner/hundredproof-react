import convertUnits from './convertUnits';

describe('convertUnits', () => {
  it('multiplies cups by 8', () => {
    expect(convertUnits(1, 'cup')).toBe(8);
    expect(convertUnits(2, 'cup')).toBe(16);
  });

  it('multiplies jiggers by 1.5', () => {
    expect(convertUnits(1, 'jigger')).toBe(1.5);
    expect(convertUnits(2, 'jigger')).toBe(3);
  });

  it('passes through shots unchanged', () => {
    expect(convertUnits(1, 'shot')).toBe(1);
    expect(convertUnits(5, 'shot')).toBe(5);
  });

  it('passes through ounces unchanged', () => {
    expect(convertUnits(1, 'ounce')).toBe(1);
    expect(convertUnits(10, 'oz')).toBe(10);
  });

  it('passes through teaspoons unchanged', () => {
    expect(convertUnits(3, 'teaspoon')).toBe(3);
  });
});
