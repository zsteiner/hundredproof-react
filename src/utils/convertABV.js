export default function convertABV(measure, value) {
  return measure === 'proof' ? value * 2 : value / 2;
}
