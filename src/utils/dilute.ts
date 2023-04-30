import convertCups from './convertCups';
import convertUnits from './convertUnits';
import endDilute from './endDilute.ts';
import round from './round';
import setZero from './setZero';
import startDilute from './startDilute';
import translateResults from './translateResults';

export default function dilute(amount, desiredABV, startingABV, unit, volume) {
  amount = setZero(Number(amount));
  desiredABV = setZero(Number(desiredABV));
  startingABV = setZero(Number(startingABV));

  amount = convertUnits(amount, unit);

  let amountWaterOz;

  if (volume === 'end') {
    amountWaterOz = endDilute(amount, desiredABV, startingABV);
  } else {
    amountWaterOz = startDilute(amount, desiredABV, startingABV);
  }

  const useCups = amountWaterOz >= 2;

  const resultsOz = round(amountWaterOz, 2);
  const resultsTranslated = translateResults(useCups, amountWaterOz);

  const isCups = unit === 'cup';
  const isVolEnd = volume === 'end';

  const translatedUnit = useCups ? 'cup' : 'teaspoon';
  const displayUnits = isCups ? 'cup' : 'ounce';

  const finalAmount = isVolEnd ? amount : amount + resultsOz;
  const finalAmountSpirit = amount - resultsOz;
  const finalAmountSpiritTranslated = translateResults(
    useCups,
    finalAmountSpirit
  );
  const displayResults = isCups ? convertCups(finalAmount) : finalAmount;

  const results = {
    finalAmountSpirit,
    finalAmountSpiritTranslated,
    resultsOz,
    displayUnits,
    displayResults,
    resultsTranslated,
    translatedUnit
  };

  return results;
}
