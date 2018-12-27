import React from 'react';

import { DilutionContext } from '../../contexts/DilutionContext';

import Input from '../Input/Input';
import UnitSelect from '../UnitSelect/UnitSelect';

import styles from './AmountSelector.module.scss';

const AmountSelector = () => {
  return (
    <DilutionContext.Consumer>
      {context => (
        <div className={styles.inputgroup}>
          <p>I have</p>
          <Input
            autoFocus
            autoSize
            className={styles.input}
            onChange={context.setAmount}
            type="number"
            value={context.amount}
          />
          <UnitSelect
            amount={context.amount ? parseInt(context.amount, 10) : 0}
            setUnits={context.setUnits}
          />
        </div>
      )}
    </DilutionContext.Consumer>
  );
};

export default AmountSelector;
