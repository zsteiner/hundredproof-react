import React from 'react';

import ResultsBlock from '../ResultsBlock/ResultsBlock';

import styles from './ScalingResults.module.scss';

const ScalingResults = ({ results }) => {
  const ingredients = results.map((ingredient, index) => {
    return (
      <li key={index}>
        <ResultsBlock text={ingredient} />
      </li>
    );
  });

  return (
    <React.Fragment>
      <h3 className="hp-heading">Scaled Recipe</h3>
      <ul className={`${styles.results} hp-clearlist`}>{ingredients}</ul>
    </React.Fragment>
  );
};

export default ScalingResults;
