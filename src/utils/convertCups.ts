import { conversions } from './conversions';
import round from './round';

export default function convertCups(amount: number) {
  return round({ value: amount / conversions.ozToCups, decimals: 2 });
}
