

import { ChangeEvent, useContext, useState } from 'react';

import { DilutionContext } from '../../contexts/DilutionContext';
import Button from '../Button/Button';
import InputGroup from '../InputGroup/InputGroup';
import styles from './DilutionValues.module.css';

const DilutionValues = () => {
  const { updateResults, measure, setStartingABV, desiredABV, startingABV, setDesiredABV, error } = useContext(DilutionContext);
  const [startingABVInput, setStartingABVInput] = useState<string>(startingABV?.toString());
  const [desiredABVInput, setDesiredABVInput] = useState<string>(desiredABV?.toString());

  const handleStartingABVChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setStartingABVInput(value);
    setStartingABV(value);
  };

  const handleDesiredABVChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    setDesiredABVInput(value);
    setDesiredABV(value);
  };

  return (
    <form onSubmit={updateResults}>
      <InputGroup
        measure={measure}
        onChange={handleStartingABVChange}
        text="Starting at"
        value={startingABVInput}
      />
      <InputGroup
        measure={measure}
        onChange={handleDesiredABVChange}
        text="I want to end with"
        value={desiredABVInput}
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
