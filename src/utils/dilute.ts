import convertCups from './convertCups';
import convertUnits from './convertUnits';
import endDilute from './endDilute';
import round from './round';
import setZero from './setZero';
import startDilute from './startDilute';
import translateResults from './translateResults';
import { Unit, VolumeDirection } from './types';

type DiluteParams = {
  amount: number;
  desiredABV: number;
  startingABV: number;
  unit: Unit;
  volume: VolumeDirection;
};

export default function dilute({
  amount,
  desiredABV,
  startingABV,
  unit,
  volume,
}: DiluteParams) {
  amount = setZero(Number(amount));
  desiredABV = setZero(Number(desiredABV));
  startingABV = setZero(Number(startingABV));

  amount = convertUnits({ amount, unit });

  let amountWaterOz: number;

  if (volume === 'end') {
    amountWaterOz = endDilute({ amount, desiredABV, startingABV });
  } else {
    amountWaterOz = startDilute({ amount, desiredABV, startingABV });
  }

  const useCups = amountWaterOz >= 2;

  const resultsOz = round({ value: amountWaterOz, decimals: 2 });
  const resultsTranslated = translateResults({
    useCups,
    amount: amountWaterOz,
  });

  const isCups = unit === 'cup';
  const isVolEnd = volume === 'end';

  const translatedUnit = useCups ? 'cup' : ('teaspoon' as Unit);
  const displayUnits = isCups ? 'cup' : ('ounce' as Unit);

  const finalAmount = isVolEnd ? amount : amount + resultsOz;
  const finalAmountSpirit = amount - resultsOz;
  const finalAmountSpiritTranslated = translateResults({
    useCups,
    amount: finalAmountSpirit,
  });
  const displayResults = isCups ? convertCups(finalAmount) : finalAmount;

  return {
    finalAmountSpirit,
    finalAmountSpiritTranslated,
    resultsOz,
    displayUnits,
    displayResults,
    resultsTranslated,
    translatedUnit,
  };
}
