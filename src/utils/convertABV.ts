import { Measure } from './types';

type ConvertABVParams = {
  measure: Measure;
  value: number;
};

export default function convertABV({ measure, value }: ConvertABVParams) {
  return measure === 'proof' ? value * 2 : value / 2;
}
