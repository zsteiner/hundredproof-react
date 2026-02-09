import { conversions } from './conversions';
import { Unit } from './types';

type ConvertUnitsParams = {
  amount: number;
  unit: Unit;
};

export default function convertUnits({ amount, unit }: ConvertUnitsParams) {
  if (unit === 'cup') {
    return amount * conversions.ozToCups;
  } else if (unit === 'jigger') {
    return amount * conversions.ozToJigger;
  }

  return amount;
}
