import React from 'react';

import styles from './ScalingResults.module.scss';

const ScalingResults = () => {
  return (
    <React.Fragment>
      <h3 className="hp-heading">Scaled Recipe</h3>
      <div className={styles.results}>Results</div>
    </React.Fragment>
  );
};

export default ScalingResults;
