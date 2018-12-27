import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Icon from '../Icon/Icon';

import styles from './UnitSelect.module.scss';

const UnitSelect = ({ amount, setUnits }) => {
  const unitClasses = classNames({
    [styles.unit]: true,
    [styles.plural]: amount !== 1
  });

  return (
    <div className={unitClasses}>
      <div className={styles.buttongroup} id="amount-units">
        <input
          type="radio"
          id="bg2_1"
          name="bg2"
          value="shot"
          onClick={setUnits}
          defaultChecked
        />
        <label htmlFor="bg2_1">
          <span className={styles.unit}>shot</span>
          <Icon icon="shot" className={styles.icon} />
          <span className={styles.conversion}>1 fluid oz</span>
        </label>
        <input
          type="radio"
          id="bg2_2"
          name="bg2"
          value="jigger"
          onClick={setUnits}
        />
        <label htmlFor="bg2_2">
          <span className={styles.unit}>jigger</span>
          <Icon icon="jigger" className={styles.icon} />
          <span className={styles.conversion}>1.5 fluid oz</span>
        </label>
        <input
          type="radio"
          id="bg2_3"
          name="bg2"
          value="cup"
          onClick={setUnits}
        />
        <label htmlFor="bg2_3">
          <span className={styles.unit}>cup</span>
          <Icon icon="cup" className={styles.icon} />
          <span className={styles.conversion}>8 fluid oz</span>
        </label>
      </div>
    </div>
  );
};

UnitSelect.propTypes = {
  amount: PropTypes.number,
  setUnits: PropTypes.func
};

export default UnitSelect;
