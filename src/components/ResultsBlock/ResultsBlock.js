import React from 'react';

import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from '../DilutionResults/DilutionResults.module.scss';

const ResultsBlock = ({ amount, unit, liquid, showPlus, text }) => {
  const resultsClasses = classNames({
    [styles.unit]: true,
    [styles.plural]: amount !== 1
  });

  return (
    <React.Fragment>
      {showPlus ? <span> + </span> : null}
      {!text ? (
        <div>
          <span className={styles.resultsNumber}>{amount} </span>
          <span className={resultsClasses}>{unit}</span> {liquid}
        </div>
      ) : (
        text
      )}
    </React.Fragment>
  );
};

ResultsBlock.propTypes = {
  amount: PropTypes.number,
  liquid: PropTypes.string,
  unit: PropTypes.oneOf(['ounce', 'oz', 'cup', 'teaspoon'])
};

export default ResultsBlock;
