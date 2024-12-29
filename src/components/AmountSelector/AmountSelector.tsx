import { useContext, useState } from 'react';

import { DilutionContext } from '../../contexts/DilutionContext';
import Input from '../Input/Input';
import UnitSelect from '../UnitSelect/UnitSelect';
import styles from './AmountSelector.module.css';

const AmountSelector = () => {
  const { amount, setAmount, setUnits, volume } = useContext(DilutionContext);

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

export default AmountSelector;
