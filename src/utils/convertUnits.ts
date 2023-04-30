import conversions from './conversions';
import { Unit } from './types'

export default function convertUnits(amount: number, unit: Unit) {
  if (unit === 'cup') {
    amount = amount * conversions.ozToCups;
  } else if (unit === 'jigger') {
    amount = amount * conversions.ozToJigger;
  }

  return amount;
}
