import React from 'react';

import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from '../DilutionResults/DilutionResults.module.scss';

const ResultsBlock = ({ amount, unit, liquid, showPlus }) => {
  const resultsClasses = classNames({
    [styles.unit]: true,
    [styles.plural]: amount !== 1
  });

  return (
    <React.Fragment>
      {showPlus ? <span> + </span> : null}
      <div>
        <span className={styles.resultsNumber}>{amount} </span>
        <span className={resultsClasses}>{unit}</span> {liquid}
      </div>
    </React.Fragment>
  );
};

ResultsBlock.propTypes = {
  amount: PropTypes.number,
  liquid: PropTypes.oneOf(['spirits', 'water']),
  unit: PropTypes.oneOf(['ounce', 'cup', 'teaspoon'])
};

export default ResultsBlock;
