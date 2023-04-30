import pluralize from 'pluralize';
import { FC } from 'react';

import round from '../../utils/round';
import { Unit } from '../../utils/types';
import styles from '../DilutionResults/DilutionResults.module.scss';

type ResultsBlockProps = {
  amount: number;
  ingredient: string;
  formatIngredient?: boolean;
  showPlus?: boolean;
  unit: Unit;
}

const ResultsBlock: FC<ResultsBlockProps> = ({ amount, unit, ingredient, showPlus }) => {
  const formattedUnit: string = pluralize(unit, amount);
  const formattedAmount = amount ? round(amount, 2) : amount;

  const pluralIngredient: string = pluralize(ingredient);
  const formattedIngredient: string =
    !unit && amount > 1 ? pluralIngredient : ingredient;

  return (
    <>
      {showPlus ? <span> + </span> : null}
      <span className={styles.resultsNumber}>{formattedAmount} </span>{' '}
      {unit ? <span className={styles.unit}>{formattedUnit}</span> : null}{' '}
      {formattedIngredient}
    </>
  );
};

export default ResultsBlock;
