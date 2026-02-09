type DiluteParams = {
  amount: number;
  desiredABV: number;
  startingABV: number;
};

export default function endDilute({
  amount,
  desiredABV,
  startingABV,
}: DiluteParams): number {
  return amount - amount * (desiredABV / startingABV);
}
