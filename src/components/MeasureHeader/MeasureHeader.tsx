import React from 'react';

import { DilutionContext } from '../../contexts/DilutionContext';

import SegmentedButton from '../SegmentedButton/SegmentedButton';

import styles from './MeasureHeader.module.scss';

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

  return (
    <DilutionContext.Consumer>
      {context => (
        <section className={`${styles.measureHeader} hp-section`}>
          <div className={styles.measureHeaderItem}>
            <h4 className="hp-heading">I want to set my:</h4>
            <SegmentedButton
              name="volume"
              options={volumeOptions}
              onChange={context.setVolume}
              className={styles.measureButtons}
            />
          </div>
          <div className={styles.measureHeaderItem}>
            <h4 className="hp-heading">Working with:</h4>
            <SegmentedButton
              name="measure"
              options={measureOptions}
              onChange={context.setMeasure}
              className={styles.measureButtons}
            />
          </div>
        </section>
      )}
    </DilutionContext.Consumer>
  );
};

export default MeasureHeader;
