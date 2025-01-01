import { Measure } from '../../utils/types';
import { Input } from '../Input/Input';
import styles from './InputGroup.module.css';

type InputGroupProps = {
  onChange: (value: string) => void;
  measure: Measure;
  text: string;
  value: string;
};

export const InputGroup = ({
  onChange,
  measure,
  text,
  value,
}: InputGroupProps) => {
  return (
    <div className={styles.inputgroup}>
      <label>
        {text} {measure === 'abv' ? 'ABV' : ''}
      </label>
      <Input
        autoSize
        onChange={onChange}
        value={value}
      />
      <span className={styles.units}> {measure === 'abv' ? '%' : 'proof'}</span>
      .
    </div>
  );
};
