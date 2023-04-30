export default function startDilute(amount: number, desiredABV: number, startingABV: number): number {
  return ((startingABV - desiredABV) / desiredABV) * amount;
}
