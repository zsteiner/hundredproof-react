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
            measure={context.measure}
            onChange={context.setStartingABV}
            text="Starting at"
            value={context.startingABV}
          />
          <InputGroup
            measure={context.measure}
            onChange={context.setDesiredABV}
            text="I want to end with"
            value={context.desiredABV}
          />
          <Button
            className={styles.submitButton}
            disabled={context.error ? true : false}
            onClick={context.updateResults}
            text="calculate"
          />
        </form>
      )}
    </DilutionContext.Consumer>
  );
};

export default DilutionValues;
