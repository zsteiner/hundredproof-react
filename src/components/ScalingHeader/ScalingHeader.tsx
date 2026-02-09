'use client';
import { useEffect, useState } from 'react';

import { Input } from '../Input/Input';
import { Section } from '../Layout/Section';
import { useScaling } from '../ScalingTools/useScaling';
import styles from './ScalingHeader.module.css';

export const ScalingHeader = () => {
  const { scalingFactor, setScalingFactor } = useScaling();
  const [inputValue, setInputValue] = useState<string>(
    scalingFactor?.toString() ?? '',
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
