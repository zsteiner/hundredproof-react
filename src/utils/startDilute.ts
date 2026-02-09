type DiluteParams = {
  amount: number;
  desiredABV: number;
  startingABV: number;
};

export default function startDilute({
  amount,
  desiredABV,
  startingABV,
}: DiluteParams): number {
  return ((startingABV - desiredABV) / desiredABV) * amount;
}
