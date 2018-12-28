import normalizeUnits from './normalizeUnits';
import setZero from './setZero';

export default function scale(ingredients, scaleFactor) {
  const ingredientsFormatted = [];

  const regex = /([0-9]*.?\/?[0-9]*)\s?(\S*)?\s?(.*)/;
  const fractionRegex = /([0-9]*)\/([0-9]*)/;

  ingredients.map(item => {
    const normalizeItem = item.replace(' of ', ' ');
    const match = normalizeItem.match(regex);
    const hasThree = match[3] !== '';

    let amount = match[1];
    const unit = hasThree ? normalizeUnits(match[2]) : null;
    const ingredient = hasThree ? match[3] : match[2];

    if (fractionRegex.test(amount)) {
      const numerator = parseInt(amount.match(fractionRegex)[1], 10);
      const denominator = parseInt(amount.match(fractionRegex)[2], 10);
      amount = numerator / denominator;
    } else {
      amount = parseFloat(amount);
    }

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