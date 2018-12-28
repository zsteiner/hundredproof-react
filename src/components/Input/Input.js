/* eslint-disable no-useless-escape */

import React from 'react';
import PropTypes from 'prop-types';
import AutosizeInput from 'react-input-autosize';
import classNames from 'classnames';

import styles from './Input.module.scss';

const Input = ({
  autoFocus,
  autoSize,
  className,
  onChange,
  readOnly,
  type,
  value
}) => {
  const inputClasses = classNames({
    [styles.input]: true,
    [styles.inputAutosize]: autoSize,
    [className]: className
  });

  if (autoSize) {
    return (
      <AutosizeInput
        autoFocus={autoFocus}
        className={inputClasses}
        pattern={type === 'number' ? 'd*' : '[A-Za-z0-9 ]'}
        type={type ? type : 'text'}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
      />
    );
  }

  return (
    <input
      autoFocus={autoFocus}
      className={inputClasses}
      pattern={type === 'number' ? 'd*' : '[A-Za-z0-9 ./]*'}
      type={type ? type : 'text'}
      value={value}
      onChange={onChange}
      readOnly={readOnly}
    />
  );
};

Input.propTypes = {
  autoFocus: PropTypes.bool,
  className: PropTypes.string,
  onChange: PropTypes.func,
  type: PropTypes.oneOf(['number', 'text']),
  value: PropTypes.any
};

export default Input;
