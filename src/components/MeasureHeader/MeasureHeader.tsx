import { Measure, VolumeDirection } from '../../utils/types';
import { useDilution } from '../DilutionTools/useDilution';
import { Heading } from '../Heading/Heading';
import { Section } from '../Layout/Section';
import { SegmentedButton } from '../SegmentedButton/SegmentedButton';
import styles from './MeasureHeader.module.css';

export const MeasureHeader = () => {
  const measureOptions = [
    {
      label: 'ABV',
      value: 'abv',
    },
    {
      label: 'Proof',
      value: 'proof',
      default: true,
    },
  ];

  const volumeOptions = [
    {
      label: 'End Amount',
      value: 'end',
    },
    {
      label: 'Start Amount',
      value: 'start',
      default: true,
    },
  ];

  const { setMeasure, setVolume } = useDilution();

  return (
    <Section className={styles.measureHeader}>
      <div className={styles.measureHeaderItem}>
        <Heading as="h4">I want to set my:</Heading>
        <SegmentedButton
          className={styles.measureButtons}
          name="volume"
          onChange={(value) => setVolume(value as VolumeDirection)}
          options={volumeOptions}
        />
      </div>
      <div className={styles.measureHeaderItem}>
        <Heading as="h4">Working with:</Heading>
        <SegmentedButton
          className={styles.measureButtons}
          name="measure"
          onChange={(value) => setMeasure(value as Measure)}
          options={measureOptions}
        />
      </div>
    </Section>
  );
};
