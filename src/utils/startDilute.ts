type DiluteParams = {
  amount: number;
  desiredABV: number;
  startingABV: number;
};

export function startDilute({
  amount,
  desiredABV,
  startingABV,
}: DiluteParams): number {
  return ((startingABV - desiredABV) / desiredABV) * amount;
}
