import { normalizeUnits } from './normalizeUnits';
import { Ingredient, Unit } from './types';
import { units } from './units';

export const processIngredients = (ingredients: Ingredient[]) => {
  const regex = /([0-9]*\.?\/?[0-9]*)\s?(\S*)?\s?(.*)/;
  const fractionRegex = /([0-9]*)\/([0-9]*)/;
  const cleanedIngredients = ingredients.filter((item) => item.value !== '');

  return cleanedIngredients.map((item) => {
    const { id, value } = item;
    let unit: string | undefined;
    let ingredient: string;

    const normalizeItem = (value ?? '').replace(' of ', ' ');
    const match = normalizeItem.match(regex);

    if (!match) {
      return {
        id,
        amount: undefined,
        unit: undefined as Unit,
        ingredient: value ?? '',
        value,
      };
    }

    const hasTwoStringsAfterAmount = match[3] !== '';

    const amountString = match[1];
    let amount: number | undefined = 0;
    unit = hasTwoStringsAfterAmount ? normalizeUnits(match[2] as Unit) : '';
    ingredient = hasTwoStringsAfterAmount ? match[3] : match[2];

    // check unit exists, if not set all strings after amount to ingredient
    if (!unit || units.indexOf(unit as (typeof units)[number]) < 0) {
      unit = undefined;
      ingredient = hasTwoStringsAfterAmount
        ? `${match[2]} ${match[3]}`
        : match[2];
    }

    if (fractionRegex.test(amountString)) {
      const fractionMatch = amountString.match(fractionRegex);
      if (fractionMatch) {
        const numerator = parseInt(fractionMatch[1], 10);
        const denominator = parseInt(fractionMatch[2], 10);
        amount = numerator / denominator;
      }
    } else if (!amountString || amountString === '') {
      amount = undefined;
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
