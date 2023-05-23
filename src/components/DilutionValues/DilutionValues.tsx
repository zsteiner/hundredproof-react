

import { useContext, useEffect, useState } from 'react';

import { DilutionContext } from '../../contexts/DilutionContext';
import Button from '../Button/Button';
import InputGroup from '../InputGroup/InputGroup';
import styles from './DilutionValues.module.css';

const DilutionValues = () => {
  const { measure, setStartingABV, desiredABV, startingABV, setDesiredABV, error, setShowResults } = useContext(DilutionContext);
  const [startingABVInput, setStartingABVInput] = useState<string>(startingABV?.toString());
  const [desiredABVInput, setDesiredABVInput] = useState<string>(desiredABV?.toString());

  useEffect(() => {
    setStartingABVInput(startingABV?.toString());
    setDesiredABVInput(desiredABV?.toString());
  }, [startingABV, desiredABV]);

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
    </div >);
};

export default DilutionValues;
