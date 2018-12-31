import normalizeUnits from './normalizeUnits';
import setZero from './setZero';
import units from '../consts/units';

function scaleAmount(amount, scaleFactor) {
  const scaledAmount = amount * setZero(scaleFactor);
  return scaledAmount;
}

export default function scale(ingredients, scaleFactor) {
  const ingredientsFormatted = [];

  const regex = /([0-9]*\.?\/?[0-9]*)\s?(\S*)?\s?(.*)/;
  const fractionRegex = /([0-9]*)\/([0-9]*)/;

  const cleanedIngredients = ingredients.filter(item => item !== '');

  cleanedIngredients.map(item => {
    let unit;
    let ingredient;
    let amount;

    const normalizeItem = item.replace(' of ', ' ');
    const match = normalizeItem.match(regex);
    const hasThree = match[3] !== '';

    amount = match[1]; // amount from string
    unit = hasThree ? normalizeUnits(match[2]) : null; // if two strings after amount, set unit
    ingredient = hasThree ? match[3] : match[2]; // if two strings after amount, set ingredient

    // check unit exists, if not set all strings after amount to ingredient
    if (units.indexOf(unit) < 0) {
      unit = null;
      ingredient = hasThree ? `${match[2]} ${match[3]}` : match[2];
    }

    // check fraction, check that unit is blank, convert unit to number
    if (fractionRegex.test(amount)) {
      const numerator = parseInt(amount.match(fractionRegex)[1], 10);
      const denominator = parseInt(amount.match(fractionRegex)[2], 10);
      amount = scaleAmount(numerator / denominator, scaleFactor);
    } else if (amount === '') {
      amount = null;
    } else {
      amount = parseFloat(amount);
      amount = scaleAmount(amount, scaleFactor);
    }

    ingredientsFormatted.push({
      amount,
      unit,
      ingredient
    });
    return ingredientsFormatted;
  });

  return ingredientsFormatted;
}
