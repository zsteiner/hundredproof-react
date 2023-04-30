import { Measure } from './types';

export default function convertABV(measure: Measure, value: number) {
  return measure === 'proof' ? value * 2 : value / 2;
}
