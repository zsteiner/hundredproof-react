import conversions from '../consts/conversions';
import round from './round';

export default function convertCups(amount) {
  return round(amount / conversions.ozToCups, 2);
}
