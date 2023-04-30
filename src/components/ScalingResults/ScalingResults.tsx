import React from 'react';

import ResultsBlock from '../ResultsBlock/ResultsBlock';
import styles from './ScalingResults.module.scss';

const ScalingResults = ({ results }) => {
  const ingredients = results.map((ingredient, index) => {
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
  });

  return <ul className={`${styles.results} hp-clearlist`}>{ingredients}</ul>;
};

export default ScalingResults;
