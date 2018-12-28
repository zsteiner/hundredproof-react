import normalizeUnits from './normalizeUnits';
import setZero from './setZero';

export default function scale(ingredients, scaleFactor) {
  const ingredientsFormatted = [];

  const regex = /([0-9]*.?\/?[0-9]*)\s(\S*)\s(.*)/;
  const fractionRegex = /([0-9]*)\/([0-9]*)/;

  ingredients.map(item => {
    const normalizeItem = item.replace(' of ', ' ');
    let amount = normalizeItem.match(regex)[1];
    let unit = normalizeItem.match(regex)[2];
    const ingredient = normalizeItem.match(regex)[3];

    if (fractionRegex.test(amount)) {
      const numerator = parseInt(amount.match(fractionRegex)[1], 10);
      const denominator = parseInt(amount.match(fractionRegex)[2], 10);
      amount = numerator / denominator;
    } else {
      amount = parseFloat(amount);
    }

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
