

import { ChangeEvent, useContext } from 'react';

import { DilutionContext } from '../../contexts/DilutionContext';
import { Measure, VolumeDirection } from '../../utils/types';
import SegmentedButton from '../SegmentedButton/SegmentedButton';
import styles from './MeasureHeader.module.css';

const MeasureHeader = () => {
  const measureOptions = [
    {
      label: 'ABV',
      value: 'abv'
    },
    {
      label: 'Proof',
      value: 'proof',
      default: true
    }
  ];

  const volumeOptions = [
    {
      label: 'End Amount',
      value: 'end'
    },
    {
      label: 'Start Amount',
      value: 'start',
      default: true
    }
  ];

  const { setMeasure, setVolume, } = useContext(DilutionContext);

  return (
    <section className={`${styles.measureHeader} hp-section`}>
      <div className={styles.measureHeaderItem}>
        <h4 className="hp-heading">I want to set my:</h4>
        <SegmentedButton
          className={styles.measureButtons}
          name="volume"
          onChange={(event: ChangeEvent<HTMLInputElement>) => setVolume(event.target.value as VolumeDirection)}
          options={volumeOptions}
        />
      </div>
      <div className={styles.measureHeaderItem}>
        <h4 className="hp-heading">Working with:</h4>
        <SegmentedButton
          className={styles.measureButtons}
          name="measure"
          onChange={(event: ChangeEvent<HTMLInputElement>) => setMeasure(event.target.value as Measure)}
          options={measureOptions}
        />
      </div>
    </section>
  );
};

export default MeasureHeader;
