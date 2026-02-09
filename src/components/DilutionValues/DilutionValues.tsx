'use client';
import { useContext } from 'react';

import { DilutionContext } from '../../contexts/DilutionContext';
import { Button } from '../Button/Button';
import { InputGroup } from '../InputGroup/InputGroup';
import styles from './DilutionValues.module.css';

export const DilutionValues = () => {
  const {
    measure,
    setStartingABV,
    desiredABV,
    startingABV,
    setDesiredABV,
    error,
    setShowResults,
  } = useContext(DilutionContext);
  const startingABVInput = startingABV?.toString();
  const desiredABVInput = desiredABV?.toString();

  return (
    <div>
      <InputGroup
        measure={measure}
        onChange={setStartingABV}
        text="Starting at"
        value={startingABVInput}
      />
      <InputGroup
        measure={measure}
        onChange={setDesiredABV}
        text="I want to end with"
        value={desiredABVInput}
      />
      <Button
        className={styles.submitButton}
        disabled={error ? true : false}
        onClick={() => setShowResults(true)}
      >
        calculate
      </Button>
    </div>
  );
};
