import normalizeUnits from './normalizeUnits';
import setZero from './setZero';

export default function scale(ingredients, scaleFactor) {
  const ingredientsFormatted = [];

  const regexAmount = /(.?\/?[0-9]*)\s(\S*)\s(.*)/;

  ingredients.map(item => {
    const normalizeItem = item.replace(' of ', ' ');
    let amount = parseFloat(normalizeItem.match(regexAmount)[1]);
    let unit = normalizeItem.match(regexAmount)[2];
    const ingredient = normalizeItem.match(regexAmount)[3];

    amount = amount * setZero(scaleFactor);
    unit = normalizeUnits(unit);

    ingredientsFormatted.push({
      amount,
      unit,
      ingredient
    });
    return ingredientsFormatted;
  });

  return ingredientsFormatted;
}
