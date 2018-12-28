import React from 'react';

import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from '../DilutionResults/DilutionResults.module.scss';

const ResultsBlock = ({ amount, unit, liquid, showPlus }) => {
  const resultsClasses = classNames({
    [styles.unit]: true,
    [styles.plural]: unit && amount !== 1
  });
  const formattedUnit = unit === 'dash' && amount !== 1 ? 'dashe' : unit;
  return (
    <React.Fragment>
      {showPlus ? <span> + </span> : null}
      <div>
        <span className={styles.resultsNumber}>{amount} </span>
        <span className={resultsClasses}>{formattedUnit}</span> {liquid}
      </div>
    </React.Fragment>
  );
};

ResultsBlock.propTypes = {
  amount: PropTypes.number,
  liquid: PropTypes.string,
  unit: PropTypes.oneOf(['ounce', 'oz', 'cup', 'teaspoon', 'dash'])
};

export default ResultsBlock;
