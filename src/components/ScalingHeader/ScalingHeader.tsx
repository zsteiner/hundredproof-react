

import { useContext } from 'react';

import { ScalingContext } from '../../contexts/ScalingContext';
import Input from '../Input/Input';
import styles from './ScalingHeader.module.scss';

const ScalingHeader = () => {
  const { setScalingFactor, scalingFactor } = useContext(ScalingContext);
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const valueAsNumber = parseInt(value);
    const returnValue: number | undefined = isNaN(valueAsNumber) ? undefined : valueAsNumber;
    setScalingFactor(returnValue);
  };

  return (
    <section className={`${styles.scalingHeader} hp-section`}>
      <div className={styles.scale}>
        <label>I'm serving</label>
        <Input
          autoSize
          onChange={handleOnChange}
          value={scalingFactor}
        />
        <label>people.</label>
      </div>
    </section>
  );
};

export default ScalingHeader;
