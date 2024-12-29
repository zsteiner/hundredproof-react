import pluralize from 'pluralize';
import { ChangeEvent, FC } from 'react';

import { IconType } from '../../utils/types';
import Icon from '../Icon/Icon';
import styles from './UnitSelect.module.css';

type UnitSelectProps = {
  amount: number;
  setUnits: (value: string) => void;
};

type UnitData = {
  value: IconType;
  label: string;
  default?: boolean;
};

const UnitSelect: FC<UnitSelectProps> = ({ amount, setUnits }) => {
  const unitData: UnitData[] = [
    {
      value: 'shot',
      label: '1 fluid oz',
      default: true,
    },
    {
      value: 'jigger',
      label: '1.5 fluid oz',
    },
    {
      value: 'cup',
      label: '8 fluid oz',
    },
  ];

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) =>
    setUnits(event.target.value);

  const units = unitData.map((item, index) => {
    return (
      <div key={index}>
        <input
          defaultChecked={item.default}
          id={`bg2_${index}`}
          name="bg2"
          onChange={handleOnChange}
          type="radio"
          value={item.value}
        />
        <label htmlFor={`bg2_${index}`}>
          <span className={styles.unit}>{pluralize(item.value, amount)}</span>
          <Icon
            className={styles.icon}
            icon={item.value}
          />
          <span className={styles.conversion}>{item.label}</span>
        </label>
      </div>
    );
  });

  return (
    <div className={styles.unit}>
      <div
        className={styles.buttongroup}
        id="amount-units"
      >
        {units}
      </div>
    </div>
  );
};

export default UnitSelect;
