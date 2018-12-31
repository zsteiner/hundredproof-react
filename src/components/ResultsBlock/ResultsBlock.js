import React from 'react';
import PropTypes from 'prop-types';

import pluralize from 'pluralize';
import units from '../../consts/units';
import round from '../../utils/round';

import styles from '../DilutionResults/DilutionResults.module.scss';

const ResultsBlock = ({ amount, unit, liquid, showPlus }) => {
  const formattedUnit = unit ? pluralize(unit, amount) : null;
  const formattedAmount = round(amount, 2);
  return (
    <React.Fragment>
      {showPlus ? <span> + </span> : null}
      <div>
        <span className={styles.resultsNumber}>{formattedAmount} </span>
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
