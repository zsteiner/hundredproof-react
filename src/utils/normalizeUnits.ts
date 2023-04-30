
import { Unit } from './types';

export default function normalizeUnits(unit: Unit | string): string {
  let formattedUnit: Unit;

  switch (unit) {
    case 'ounce':
    case 'ounces':
    case 'jigger':
    case 'jiggers':
    case 'shot':
    case 'shots':
    case 'oz':
      formattedUnit = 'ounce';
      break;
    case 'c':
    case 'cup':
      formattedUnit = 'cup';
      break;
    case 't':
    case 'teaspoon':
    case 'teaspoons':
      formattedUnit = 'teaspoon';
      break;
    case 'T':
    case 'tablespoon':
    case 'tablespoons':
      formattedUnit = 'tablespoon';
      break;
    case 'dashes':
      formattedUnit = 'dash';
      break;
    default:
      formattedUnit = unit;
  }

  return formattedUnit;
}
