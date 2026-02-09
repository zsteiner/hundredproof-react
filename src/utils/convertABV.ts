import { Measure } from './types';

type ConvertABVParams = {
  measure: Measure;
  value: number;
};

export function convertABV({ measure, value }: ConvertABVParams) {
  return measure === 'proof' ? value * 2 : value / 2;
}
