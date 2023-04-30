import normalizeUnits from './normalizeUnits';
import setZero from './setZero';
import { Ingredient, Unit } from './types';
import { units } from './units';

function scaleAmount(amount: number, scaleFactor: number) {
  const scaledAmount = amount * setZero(scaleFactor);
  return scaledAmount;
}

export default function scale(ingredients: string[], scaleFactor: number) {
  const ingredientsFormatted = [] as Ingredient[];

  const regex = /([0-9]*\.?\/?[0-9]*)\s?(\S*)?\s?(.*)/;
  const fractionRegex = /([0-9]*)\/([0-9]*)/;

  const cleanedIngredients = ingredients.filter(item => item !== '');

  cleanedIngredients.map(item => {
    let unit: string;
    let ingredient: string;
    let computedAmount: number;

    const normalizeItem = item.replace(' of ', ' ');
    const match = normalizeItem.match(regex);
    const hasThree = match[3] !== '';

    const amount = match[1]; // amount from string
    unit = hasThree ? normalizeUnits(match[2]) : ''; // if two strings after amount, set unit
    ingredient = hasThree ? match[3] : match[2]; // if two strings after amount, set ingredient

    // check unit exists, if not set all strings after amount to ingredient
    if (units.indexOf(unit as Unit) < 0) {
      unit = null;
      ingredient = hasThree ? `${match[2]} ${match[3]}` : match[2];
    }

    // check fraction, check that unit is blank, convert unit to number
    if (fractionRegex.test(amount)) {
      const numerator = parseInt(amount.match(fractionRegex)[1], 10);
      const denominator = parseInt(amount.match(fractionRegex)[2], 10);
      computedAmount = scaleAmount(numerator / denominator, scaleFactor);
    } else if (!amount || amount === '') {
      computedAmount = null;
    } else {
      computedAmount = parseFloat(amount);
      computedAmount = scaleAmount(computedAmount, scaleFactor);
    }

    ingredientsFormatted.push({
      amount: computedAmount,
      unit: unit as Unit,
      ingredient
    });

    return ingredientsFormatted;
  });

  return ingredientsFormatted;
}
