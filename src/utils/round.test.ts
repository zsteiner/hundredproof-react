import round from './round';

describe('round', () => {
  it('rounds to 2 decimal places', () => {
    expect(round(1.2345, 2)).toBe(1.23);
    expect(round(1.235, 2)).toBe(1.24);
    expect(round(1.005, 2)).toBe(1.01);
  });

  it('rounds to 0 decimal places', () => {
    expect(round(1.5, 0)).toBe(2);
    expect(round(1.4, 0)).toBe(1);
  });

  it('rounds to 3 decimal places', () => {
    expect(round(1.23456, 3)).toBe(1.235);
  });

  it('handles 0', () => {
    expect(round(0, 2)).toBe(0);
  });

  it('handles negative numbers', () => {
    expect(round(-1.235, 2)).toBe(-1.23);
  });

  it('handles large numbers', () => {
    expect(round(1000.555, 2)).toBe(1000.56);
  });
});
