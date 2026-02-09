import pluralize from 'pluralize';
import { ChangeEvent } from 'react';

import { IconType } from '../../utils/types';
import { Icon } from '../Icon/Icon';
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

export const UnitSelect = ({ amount, setUnits }: UnitSelectProps) => {
  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) =>
    setUnits(event.target.value);

  return (
    <div className={styles.unit}>
      <div
        aria-label="Unit selection"
        className={styles.buttongroup}
        id="amount-units"
        role="radiogroup"
      >
        {unitData.map((item) => (
          <div key={item.value}>
            <input
              defaultChecked={item.default}
              id={`amount-units-${item.value}`}
              name="amount-units"
              onChange={handleOnChange}
              type="radio"
              value={item.value}
            />
            <label htmlFor={`amount-units-${item.value}`}>
              <span className={styles.unit}>
                {pluralize(item.value, amount)}
              </span>
              <Icon
                className={styles.icon}
                icon={item.value}
              />
              <span className={styles.conversion}>{item.label}</span>
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};
