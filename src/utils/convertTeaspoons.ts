import { conversions } from './conversions';
import { round } from './round';

export function convertTeaspoons(amount: number) {
  return round({ value: amount / conversions.ozToTeaspoons, decimals: 2 });
}
