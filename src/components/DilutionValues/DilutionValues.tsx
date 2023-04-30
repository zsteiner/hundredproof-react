import React from 'react';

import { DilutionContext } from '../../contexts/DilutionContext';

import Button from '../Button/Button';
import InputGroup from '../InputGroup/InputGroup';

import styles from './DilutionValues.module.scss';

const DilutionValues = () => {
  return (
    <DilutionContext.Consumer>
      {(context) => (
        <form onSubmit={context.updateResults}>
          <InputGroup
            onChange={context.setStartingABV}
            measure={context.measure}
            text="Starting at"
            value={context.startingABV}
          />
          <InputGroup
            onChange={context.setDesiredABV}
            measure={context.measure}
            text="I want to end with"
            value={context.desiredABV}
          />
          <Button
            onClick={context.updateResults}
            text="calculate"
            className={styles.submitButton}
            disabled={context.error ? true : false}
          />
        </form>
      )}
    </DilutionContext.Consumer>
  );
};

export default DilutionValues;
