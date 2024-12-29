export default function endDilute(
  amount: number,
  desiredABV: number,
  startingABV: number,
): number {
  return amount - amount * (desiredABV / startingABV);
}
