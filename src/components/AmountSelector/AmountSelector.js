import React from 'react';

import { DilutionContext } from '../../contexts/DilutionContext';

import Input from '../Input/Input';
import UnitSelect from '../UnitSelect/UnitSelect';

import styles from './AmountSelector.module.scss';

const AmountSelector = () => {
  return (
    <DilutionContext.Consumer>
      {context => (
        <div className={styles.amount}>
          <p className={styles.amountLabel}>I have</p>
          <form className={styles.amount} onSubmit={context.updateResults}>
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
        </div>
      )}
    </DilutionContext.Consumer>
  );
};

export default AmountSelector;
