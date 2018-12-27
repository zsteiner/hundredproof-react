import { setZero } from '../../utils/setZero';
import { round } from '../../utils/round';

const ozToTeaspoons = 0.1666666666666667;
const ozToCups = 8;
const ozToJigger = 1.5;

export function convertABV(measure, value) {
  return measure === 'proof' ? value * 2 : value / 2;
}

function convert(amount, unit) {
  if (unit === 'cup') {
    amount = amount * ozToCups;
  } else if (unit === 'jigger') {
    amount = amount * ozToJigger;
  }

  return amount;
}

function startDilute(amount, desiredABV, startingABV) {
  return ((startingABV - desiredABV) / desiredABV) * amount;
}

function endDilute(amount, desiredABV, startingABV) {
  return amount - amount * (desiredABV / startingABV);
}

export function dilute(amount, desiredABV, startingABV, unit, volume) {
  amount = setZero(Number(amount));
  desiredABV = setZero(Number(desiredABV));
  startingABV = setZero(Number(startingABV));

  amount = convert(amount, unit);

  let amountWaterOz;

  if (volume === 'end') {
    amountWaterOz = endDilute(amount, desiredABV, startingABV);
  } else {
    amountWaterOz = startDilute(amount, desiredABV, startingABV);
  }

  const amountWaterTeaspoon = round(amountWaterOz / ozToTeaspoons, 2);
  const amountWaterCups = round(amountWaterOz / ozToCups, 2);

  const useCups = amountWaterOz >= 2;

  const resultsOz = round(amountWaterOz, 2);
  const resultsTranslated = useCups ? amountWaterCups : amountWaterTeaspoon;
  const translatedUnit = useCups ? 'cup' : 'teaspoon';

  const isCups = unit === 'cup';
  const isVolEnd = volume === 'end';
  const finalAmount = isVolEnd ? amount : amount + resultsOz;
  const finalAmountSpirit = amount - resultsOz;
  const displayUnits = isCups ? 'cup' : 'ounce';
  const displayResults = isCups ? finalAmount / ozToCups : finalAmount;

  const results = {
    finalAmount,
    finalAmountSpirit,
    resultsOz,
    displayUnits,
    displayResults,
    resultsTranslated,
    translatedUnit
  };

  return results;
}
