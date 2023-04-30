export default function convertABV(measure: string, value: number) {
  return measure === 'proof' ? value * 2 : value / 2;
}
