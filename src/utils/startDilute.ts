export default function startDilute(amount, desiredABV, startingABV) {
  return ((startingABV - desiredABV) / desiredABV) * amount;
}
