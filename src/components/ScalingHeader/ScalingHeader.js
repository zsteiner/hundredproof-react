import React from 'react';

import { ScalingContext } from '../../contexts/ScalingContext';

import Input from '../Input/Input';

import styles from './ScalingHeader.module.scss';

const ScalingHeader = () => {
  return (
    <ScalingContext.Consumer>
      {context => (
        <section className={`${styles.scalingHeader} hp-section`}>
          I'm serving
          <Input
            autoSize
            onChange={context.setScalingFactor}
            type="number"
            value={context.scalingFactor}
          />
          people.
        </section>
      )}
    </ScalingContext.Consumer>
  );
};

export default ScalingHeader;
