import pluralize from 'pluralize';
import PropTypes from 'prop-types';
import React from 'react';

import units from '../../consts/units';
import round from '../../utils/round';
import styles from '../DilutionResults/DilutionResults.module.scss';

const ResultsBlock = ({ amount, unit, ingredient, showPlus }) => {
  const formattedUnit = unit ? pluralize(unit, amount) : null;
  const formattedAmount = amount ? round(amount, 2) : amount;
  const formattedIngredient =
    !unit && amount > 1 ? pluralize(ingredient) : ingredient;

  return (
    <React.Fragment>
      {showPlus ? <span> + </span> : null}
      <span className={styles.resultsNumber}>{formattedAmount} </span>{' '}
      {unit ? <span className={styles.unit}>{formattedUnit}</span> : null}{' '}
      {formattedIngredient}
    </React.Fragment>
  );
};

ResultsBlock.propTypes = {
  amount: PropTypes.number,
  ingredient: PropTypes.string,
  unit: PropTypes.oneOf(units),
};

export default ResultsBlock;
