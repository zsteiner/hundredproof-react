

import { useContext } from 'react';

import { DilutionContext } from '../../contexts/DilutionContext';
import Input from '../Input/Input';
import UnitSelect from '../UnitSelect/UnitSelect';
import styles from './AmountSelector.module.css';

const AmountSelector = () => {
  const { amount, setAmount, setUnits, updateResults, volume } = useContext(DilutionContext);

  return (
    <form className={styles.amount} onSubmit={updateResults}>
      <label className={styles.amountLabel}>
        {volume === 'end' ? 'I want' : 'I have'}
      </label>
      <Input
        autoFocus
        autoSize
        onChange={setAmount}
        type="number"
        value={amount}
      />
      <UnitSelect
        amount={amount || 0}
        setUnits={setUnits}
      />
    </form>
  );
};

export default AmountSelector;
