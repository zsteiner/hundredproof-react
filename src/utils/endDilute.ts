type DiluteParams = {
  amount: number;
  desiredABV: number;
  startingABV: number;
};

export function endDilute({
  amount,
  desiredABV,
  startingABV,
}: DiluteParams): number {
  return amount - amount * (desiredABV / startingABV);
}
