

import { FC } from 'react';

import { Ingredient } from '../../utils/types';
import ResultsBlock from '../ResultsBlock/ResultsBlock';
import styles from './ScalingResults.module.scss';

type ScalingResultsProps = {
  results: Ingredient[]
}

const ScalingResults: FC<ScalingResultsProps> = ({ results }) => {
  return <ul className={`${styles.results} hp-clearlist`}>{results.map((ingredient, index) => {
    return (
      <li className={styles.resultsItem} key={index}>
        <ResultsBlock
          amount={ingredient.amount}
          formatIngredient
          ingredient={ingredient.ingredient}
          unit={ingredient.unit}
        />
      </li>
    );
  })}</ul>;
};

export default ScalingResults;
