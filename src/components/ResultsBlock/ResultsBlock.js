import React from 'react';
import PropTypes from 'prop-types';

import pluralize from 'pluralize';

import units from '../../consts/units';

import styles from '../DilutionResults/DilutionResults.module.scss';

const ResultsBlock = ({ amount, unit, liquid, showPlus }) => {
  const formattedUnit = unit ? pluralize(unit, amount) : null;

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
  unit: PropTypes.oneOf(units)
};

export default ResultsBlock;
