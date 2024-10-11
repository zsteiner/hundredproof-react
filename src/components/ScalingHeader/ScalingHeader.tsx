

import { useContext, useEffect, useState } from 'react';

import { ScalingContext } from '../../contexts/ScalingContext';
import Input from '../Input/Input';
import styles from './ScalingHeader.module.css';

const ScalingHeader = () => {
  const { scalingFactor, setScalingFactor } = useContext(ScalingContext);
  const [inputValue, setInputValue] = useState<string>(scalingFactor?.toString());

  useEffect(() => {
    setScalingFactor(parseInt(inputValue));
  }, [inputValue]);

  return (
    <section className={`${styles.scalingHeader} hp-section`}>
      <div className={styles.scale}>
        <label>I'm serving</label>
        <Input
          autoSize
          onChange={setInputValue}
          value={inputValue}
        />
        <label>people.</label>
      </div>
    </section>
  );
};

export default ScalingHeader;
