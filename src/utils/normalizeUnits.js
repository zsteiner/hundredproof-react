export default function normalizeUnits(unit) {
  let formattedUnit;

  switch (unit) {
    case 'ounce':
    case 'ounces':
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
    default:
      formattedUnit = unit;
  }

  return formattedUnit;
}
