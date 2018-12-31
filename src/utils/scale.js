import normalizeUnits from './normalizeUnits';
import setZero from './setZero';
import units from '../consts/units';

export default function scale(ingredients, scaleFactor) {
  const ingredientsFormatted = [];

  const regex = /([0-9]*.?\/?[0-9]*)\s?(\S*)?\s?(.*)/;
  const fractionRegex = /([0-9]*)\/([0-9]*)/;

  const cleanedIngredients = ingredients.filter(item => item !== '');

  cleanedIngredients.map(item => {
    let unit;
    let ingredient;

    const normalizeItem = item.replace(' of ', ' ');
    const match = normalizeItem.match(regex);
    const hasThree = match[3] !== '';

    let amount = match[1];
    unit = hasThree ? normalizeUnits(match[2]) : null;
    ingredient = hasThree ? match[3] : match[2];

    if (units.indexOf(unit) < 0) {
      console.log('no match', unit);
      unit = null;
      ingredient = hasThree ? `${match[2]} ${match[3]}` : match[2];
    }

    if (fractionRegex.test(amount)) {
      const numerator = parseInt(amount.match(fractionRegex)[1], 10);
      const denominator = parseInt(amount.match(fractionRegex)[2], 10);
      amount = numerator / denominator;
    } else {
      amount = parseFloat(amount);
    }
    console.log('amount', amount);
    amount = amount * setZero(scaleFactor);

    ingredientsFormatted.push({
      amount,
      unit,
      ingredient
    });
    return ingredientsFormatted;
  });

  return ingredientsFormatted;
}
