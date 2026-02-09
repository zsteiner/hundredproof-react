import { errorCodes } from './errorCodes';

describe('errorCodes', () => {
  it('has a message for error code 0 (no error)', () => {
    expect(errorCodes[0]).toBe('No Error');
  });

  it('has a message for missing amount (code 1)', () => {
    expect(errorCodes[1]).toBe('You need an amount.');
  });

  it('has a message for invalid ABV (code 2)', () => {
    expect(errorCodes[2]).toBe('Your ABV needs to be a number.');
  });

  it('has a message for desired >= starting ABV (code 4)', () => {
    expect(errorCodes[4]).toContain('starting ABV needs to be higher');
  });

  it('has a message for ABV too high (code 5)', () => {
    expect(errorCodes[5]).toContain('ABV is too high');
  });

  it('has a message for proof too high (code 6)', () => {
    expect(errorCodes[6]).toContain('proof is too high');
  });

  it('has a message for invalid ingredients (code 7)', () => {
    expect(errorCodes[7]).toContain('valid ingredients');
  });
});
