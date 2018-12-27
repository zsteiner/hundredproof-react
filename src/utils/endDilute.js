export default function endDilute(amount, desiredABV, startingABV) {
  return amount - amount * (desiredABV / startingABV);
}
