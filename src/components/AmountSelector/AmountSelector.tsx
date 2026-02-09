import { useState } from 'react';

import { useDilution } from '../DilutionTools/useDilution';
import { Input } from '../Input/Input';
import { UnitSelect } from '../UnitSelect/UnitSelect';
import styles from './AmountSelector.module.css';

export const AmountSelector = () => {
  const { amount, setAmount, setUnits, volume } = useDilution();

  const [inputValue, setInputValue] = useState<string>(amount?.toString());

  const handleOnChange = (value: string) => {
    setAmount(value);
    setInputValue(value);
  };

  return (
    <div className={styles.amount}>
      <label className={styles.amountLabel}>
        {volume === 'end' ? 'I want' : 'I have'}
      </label>
      <Input
        autoFocus
        autoSize
        onChange={handleOnChange}
        value={inputValue}
      />
      <UnitSelect
        amount={amount || 0}
        setUnits={setUnits}
      />
    </div>
  );
};
