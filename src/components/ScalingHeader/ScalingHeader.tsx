

import { ScalingContext } from '../../contexts/ScalingContext';
import Input from '../Input/Input';
import styles from './ScalingHeader.module.scss';

const ScalingHeader = () => {
  return (
    <ScalingContext.Consumer>
      {(context) => (
        <section className={`${styles.scalingHeader} hp-section`}>
          <div className={styles.scale}>
            <label>I'm serving</label>
            <Input
              autoSize
              onChange={context.setScalingFactor}
              type="number"
              value={context.scalingFactor}
            />
            <label>people.</label>
          </div>
        </section>
      )}
    </ScalingContext.Consumer>
  );
};

export default ScalingHeader;
