import conversions from '../consts/conversions';
import round from './round';

export default function convertTeaspoons(amount: number) {
  return round(amount / conversions.ozToTeaspoons, 2);
}
