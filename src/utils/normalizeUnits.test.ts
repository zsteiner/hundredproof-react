import normalizeUnits from './normalizeUnits';
import { Unit } from './types';

describe('normalizeUnits', () => {
  it('normalizes plural ounces to ounce', () => {
    expect(normalizeUnits('ounces')).toBe('ounce');
    expect(normalizeUnits('ounce')).toBe('ounce');
  });

  it('normalizes oz abbreviation to ounce', () => {
    expect(normalizeUnits('oz')).toBe('ounce');
  });

  it('normalizes shots and jiggers to ounce', () => {
    expect(normalizeUnits('shot')).toBe('ounce');
    expect(normalizeUnits('shots')).toBe('ounce');
    expect(normalizeUnits('jigger')).toBe('ounce');
    expect(normalizeUnits('jiggers')).toBe('ounce');
  });

  it('normalizes cup abbreviation', () => {
    expect(normalizeUnits('c')).toBe('cup');
    expect(normalizeUnits('cup')).toBe('cup');
  });

  it('normalizes teaspoon variants', () => {
    expect(normalizeUnits('t')).toBe('teaspoon');
    expect(normalizeUnits('teaspoon')).toBe('teaspoon');
    expect(normalizeUnits('teaspoons')).toBe('teaspoon');
  });

  it('normalizes tablespoon variants', () => {
    expect(normalizeUnits('T')).toBe('tablespoon');
    expect(normalizeUnits('tablespoon')).toBe('tablespoon');
    expect(normalizeUnits('tablespoons')).toBe('tablespoon');
  });

  it('normalizes dash variants', () => {
    expect(normalizeUnits('dash')).toBe('dash');
    expect(normalizeUnits('dashes')).toBe('dash');
  });

  it('returns undefined for unknown units', () => {
    expect(normalizeUnits('ml' as Unit)).toBeUndefined();
    expect(normalizeUnits('liter' as Unit)).toBeUndefined();
  });
});
