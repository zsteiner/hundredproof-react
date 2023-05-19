import normalizeUnits from './normalizeUnits';
import { Ingredient, Unit } from './types';
import { units } from './units';

export const processIngredients = (ingredients: Ingredient[]) => {
  const regex = /([0-9]*\.?\/?[0-9]*)\s?(\S*)?\s?(.*)/;
  const fractionRegex = /([0-9]*)\/([0-9]*)/;
  const cleanedIngredients = ingredients.filter(item => item.value !== '');

  return cleanedIngredients.map(item => {
    const { id, value } = item;
    let unit: string;
    let ingredient: string;

    const normalizeItem = value.replace(' of ', ' ');
    const match = normalizeItem.match(regex);
    const hasTwoStringsAfterAmount = match[3] !== '';

    const amountString = match[1]; // amount from string
    let amount = 0;
    unit = hasTwoStringsAfterAmount ? normalizeUnits(match[2]) : ''; // if two strings after amount, set unit
    ingredient = hasTwoStringsAfterAmount ? match[3] : match[2]; // if two strings after amount, set ingredient

    // check unit exists, if not set all strings after amount to ingredient
    if (units.indexOf(unit as Unit) < 0) {
      unit = null;
      ingredient = hasTwoStringsAfterAmount ? `${match[2]} ${match[3]}` : match[2];
    }

    if (fractionRegex.test(amountString)) {
      const numerator = parseInt(amountString.match(fractionRegex)[1], 10);
      const denominator = parseInt(amountString.match(fractionRegex)[2], 10);
      amount = numerator / denominator;
    } else if (!amountString || amountString === '') {
      amount = null;
    } else {
      amount = parseFloat(amountString);
    }

    return {
      id,
      amount,
      unit: unit as Unit,
      ingredient,
      value,
    };
  });
};
