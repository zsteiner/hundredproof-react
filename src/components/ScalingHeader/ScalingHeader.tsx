'use client';
import { useContext, useEffect, useState } from 'react';

import { ScalingContext } from '../../contexts/ScalingContext';
import { Input } from '../Input/Input';
import { Section } from '../Layout/Section';
import styles from './ScalingHeader.module.css';

export const ScalingHeader = () => {
  const { scalingFactor, setScalingFactor } = useContext(ScalingContext);
  const [inputValue, setInputValue] = useState<string>(
    scalingFactor?.toString(),
  );

  useEffect(() => {
    setScalingFactor(parseInt(inputValue));
  }, [inputValue, setScalingFactor]);

  return (
    <Section className={styles.scalingHeader}>
      <div className={styles.scale}>
        <label>I'm serving</label>
        <Input
          autoSize
          onChange={setInputValue}
          value={inputValue}
        />
        <label>people.</label>
      </div>
    </Section>
  );
};
