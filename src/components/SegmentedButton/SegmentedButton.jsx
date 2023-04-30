import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './SegmentedButton.module.scss';

const SegmentedButton = ({ className, name, options, onChange }) => {
  const updateValue = event => {
    onChange(event.target.value);
  };

  const optionsContents = options.map(function makeRows(option, index) {
    return (
      <li key={index} className={styles.segmentedButtonItem}>
        <input
          id={name + index}
          type="radio"
          name={name}
          value={option.value}
          defaultChecked={!!option.default}
          disabled={!!option.disabled}
          onClick={updateValue}
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
