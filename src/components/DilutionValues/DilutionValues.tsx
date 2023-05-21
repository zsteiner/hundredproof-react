

import { ChangeEvent, useContext } from 'react';

import { DilutionContext } from '../../contexts/DilutionContext';
import Button from '../Button/Button';
import InputGroup from '../InputGroup/InputGroup';
import styles from './DilutionValues.module.css';

const DilutionValues = () => {
  const { updateResults, measure, setStartingABV, desiredABV, startingABV, setDesiredABV, error } = useContext(DilutionContext);

  return (
    <form onSubmit={updateResults}>
      <InputGroup
        measure={measure}
        onChange={(event: ChangeEvent<HTMLInputElement>) => setStartingABV(event.target.value)}
        text="Starting at"
        value={startingABV}
      />
      <InputGroup
        measure={measure}
        onChange={(event: ChangeEvent<HTMLInputElement>) => setDesiredABV(event.target.value)}
        text="I want to end with"
        value={desiredABV}
      />
      <Button
        className={styles.submitButton}
        disabled={error ? true : false}
        onClick={updateResults}
      >
        calculate
      </Button>
    </form>);
};

export default DilutionValues;
