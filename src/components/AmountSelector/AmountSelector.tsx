import React from 'react';

import { DilutionContext } from '../../contexts/DilutionContext';
import Input from '../Input/Input';
import UnitSelect from '../UnitSelect/UnitSelect';
import styles from './AmountSelector.module.scss';

const AmountSelector = () => {
  return (
    <DilutionContext.Consumer>
      {(context) => (
        <form className={styles.amount} onSubmit={context.updateResults}>
          <label className={styles.amountLabel}>
            {context.volume === 'end' ? 'I want' : 'I have'}
          </label>
          <Input
            autoFocus
            autoSize
            onChange={context.setAmount}
            type="number"
            value={context.amount}
          />
          <UnitSelect
            amount={context.amount ? parseInt(context.amount, 10) : 0}
            setUnits={context.setUnits}
          />
        </form>
      )}
    </DilutionContext.Consumer>
  );
};

export default AmountSelector;
