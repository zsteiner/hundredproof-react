
import { Unit } from './types';

const unitMap = {
  'ounce': 'ounce',
  'ounces': 'ounce',
  'jigger': 'ounce',
  'jiggers': 'ounce',
  'shot': 'ounce',
  'shots': 'ounce',
  'oz': 'ounce',
  'c': 'cup',
  'cup': 'cup',
  't': 'teaspoon',
  'teaspoon': 'teaspoon',
  'teaspoons': 'teaspoon',
  'T': 'tablespoon',
  'tablespoon': 'tablespoon',
  'tablespoons': 'tablespoon',
  'dashes': 'dash',
  'dash': 'dash',
};

export default function normalizeUnits(unit: Unit): string {
  return unitMap[unit as keyof typeof unitMap];
}
