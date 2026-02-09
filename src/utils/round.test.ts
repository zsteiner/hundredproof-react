import { round } from './round';

describe('round', () => {
  it('rounds to 2 decimal places', () => {
    expect(round({ value: 1.2345, decimals: 2 })).toBe(1.23);
    expect(round({ value: 1.235, decimals: 2 })).toBe(1.24);
    expect(round({ value: 1.005, decimals: 2 })).toBe(1.01);
  });

  it('rounds to 0 decimal places', () => {
    expect(round({ value: 1.5, decimals: 0 })).toBe(2);
    expect(round({ value: 1.4, decimals: 0 })).toBe(1);
  });

  it('rounds to 3 decimal places', () => {
    expect(round({ value: 1.23456, decimals: 3 })).toBe(1.235);
  });

  it('handles 0', () => {
    expect(round({ value: 0, decimals: 2 })).toBe(0);
  });

  it('handles negative numbers', () => {
    expect(round({ value: -1.235, decimals: 2 })).toBe(-1.23);
  });

  it('handles large numbers', () => {
    expect(round({ value: 1000.555, decimals: 2 })).toBe(1000.56);
  });
});
