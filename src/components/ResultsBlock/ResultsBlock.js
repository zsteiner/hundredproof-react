import React from 'react';
import PropTypes from 'prop-types';

import pluralize from 'pluralize';

import styles from '../DilutionResults/DilutionResults.module.scss';

const ResultsBlock = ({ amount, unit, liquid, showPlus }) => {
  const formattedUnit = pluralize(unit, amount);

  return (
    <React.Fragment>
      {showPlus ? <span> + </span> : null}
      <div>
        <span className={styles.resultsNumber}>{amount} </span>
        <span className={styles.unit}>{formattedUnit}</span> {liquid}
      </div>
    </React.Fragment>
  );
};

ResultsBlock.propTypes = {
  amount: PropTypes.number,
  liquid: PropTypes.string,
  unit: PropTypes.oneOf(['ounce', 'oz', 'cup', 'teaspoon', 'jigger', 'dash'])
};

export default ResultsBlock;
