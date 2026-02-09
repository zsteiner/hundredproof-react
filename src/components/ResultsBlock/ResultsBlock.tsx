import pluralize from 'pluralize';

import { round } from '../../utils/round';
import { Ingredient } from '../../utils/types';
import styles from '../DilutionResults/DilutionResults.module.css';

type ResultsBlockProps = {
  result: Ingredient;
  showPlus?: boolean;
};

export const ResultsBlock = ({ result, showPlus }: ResultsBlockProps) => {
  const { amount, unit, ingredient } = result;
  const formattedUnit = unit ? pluralize(unit, amount) : '';
  const formattedAmount = amount
    ? round({ value: amount, decimals: 2 })
    : amount;

  const pluralIngredient = ingredient ? pluralize(ingredient) : '';
  const formattedIngredient =
    !unit && (amount ?? 0) > 1 ? pluralIngredient : (ingredient ?? '');

  return (
    <>
      {showPlus ? <span> + </span> : null}
      <span className={styles.resultsNumber}>{formattedAmount} </span>{' '}
      {unit ? <span className={styles.unit}>{formattedUnit}</span> : null}{' '}
      {formattedIngredient}
    </>
  );
};
