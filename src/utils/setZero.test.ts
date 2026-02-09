import { setZero } from './setZero';

describe('setZero', () => {
  it('returns 0 for NaN', () => {
    expect(setZero(NaN)).toBe(0);
  });

  it('passes through 0', () => {
    expect(setZero(0)).toBe(0);
  });

  it('passes through positive numbers', () => {
    expect(setZero(42)).toBe(42);
    expect(setZero(1.5)).toBe(1.5);
  });

  it('passes through negative numbers', () => {
    expect(setZero(-10)).toBe(-10);
  });
});
