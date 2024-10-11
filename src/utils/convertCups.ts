import { conversions } from './conversions';
import round from './round';

export default function convertCups(amount: number) {
  return round(amount / conversions.ozToCups, 2);
}
