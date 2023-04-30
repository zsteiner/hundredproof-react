import conversions from '../consts/conversions';

export default function convertUnits(amount, unit) {
  if (unit === 'cup') {
    amount = amount * conversions.ozToCups;
  } else if (unit === 'jigger') {
    amount = amount * conversions.ozToJigger;
  }

  return amount;
}
