import pluralize from 'pluralize';
import PropTypes from 'prop-types';

import Icon from '../Icon/Icon';
import styles from './UnitSelect.module.scss';

const UnitSelect = ({ amount, setUnits }) => {
  const unitData = [
    {
      value: 'shot',
      label: '1 fluid oz',
      default: true
    },
    {
      value: 'jigger',
      label: '1.5 fluid oz'
    },
    {
      value: 'cup',
      label: '8 fluid oz'
    }
  ];

  const units = unitData.map((item, index) => {
    return (
      <React.Fragment key={index}>
        <input
          defaultChecked={item.default}
          id={`bg2_${index}`}
          name="bg2"
          onClick={setUnits}
          type="radio"
          value={item.value}
        />
        <label htmlFor={`bg2_${index}`}>
          <span className={styles.unit}>{pluralize(item.value, amount)}</span>
          <Icon className={styles.icon} icon={item.value} />
          <span className={styles.conversion}>{item.label}</span>
        </label>
      </React.Fragment>
    );
  });

  return (
    <div className={styles.unit}>
      <div className={styles.buttongroup} id="amount-units">
        {units}
      </div>
    </div>
  );
};

UnitSelect.propTypes = {
  amount: PropTypes.number,
  setUnits: PropTypes.func
};

export default UnitSelect;
