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
        <section className={`${styles.measureHeader} hp-section`} key="0">
          <div>
            <h4 className="hp-heading">I want to set my:</h4>
            <SegmentedButton
              name="volume"
              options={volumeOptions}
              onChange={this.setVolume}
              className={styles.measureButtons}
            />
          </div>
          <div>
            <h4 className="hp-heading">Working with:</h4>
            <SegmentedButton
              name="measure"
              options={measureOptions}
              onChange={this.setMeasure}
              className={styles.measureButtons}
            />
          </div>
        </section>
      )}
    </DilutionContext.Consumer>
  );
};

export default MeasureHeader;
