import PropTypes from 'prop-types';


import Input from '../Input/Input';
import styles from './InputGroup.module.scss';

const InputGroup = ({ onChange, measure, text, value }) => {
  return (
    <div className={styles.inputgroup}>
      <label>
        {text} {measure === 'abv' ? 'ABV' : ''}
      </label>
      <Input autoSize onChange={onChange} type="number" value={value} />
      <span className={styles.units}> {measure === 'abv' ? '%' : 'proof'}</span>
      .
    </div>
  );
};

InputGroup.propTypes = {
  onChange: PropTypes.func,
  measure: PropTypes.string,
  text: PropTypes.string,
  value: PropTypes.any
};

export default InputGroup;
