import classNames from 'classnames';
import PropTypes from 'prop-types';


import styles from './SegmentedButton.module.scss';

const SegmentedButton = ({ className, name, options, onChange }) => {
  const updateValue = event => {
    onChange(event.target.value);
  };

  const optionsContents = options.map(function makeRows(option, index) {
    return (
      <li className={styles.segmentedButtonItem} key={index}>
        <input
          defaultChecked={!!option.default}
          disabled={!!option.disabled}
          id={name + index}
          name={name}
          onClick={updateValue}
          type="radio"
          value={option.value}
        />
        <label htmlFor={name + index}>
          <span>{option.label}</span>
        </label>
      </li>
    );
  });

  const segmentedButtonClasses = classNames({
    [styles.segmentedButton]: true,
    [className]: className
  });

  return <ul className={segmentedButtonClasses}>{optionsContents}</ul>;
};

SegmentedButton.propTypes = {
  className: PropTypes.string,
  name: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired
};

export default SegmentedButton;
