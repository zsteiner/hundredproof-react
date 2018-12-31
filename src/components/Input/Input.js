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
  onPaste,
  placeholder,
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
        pattern={type === 'number' ? 'd*' : '.*'}
        type={type ? type : 'text'}
        value={value}
        onChange={onChange}
        onPaste={onPaste}
        readOnly={readOnly}
      />
    );
  }

  return (
    <input
      autoFocus={autoFocus}
      className={inputClasses}
      pattern={type === 'number' ? 'd*' : '.*'}
      type={type ? type : 'text'}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      onPaste={onPaste}
      readOnly={readOnly}
    />
  );
};

Input.propTypes = {
  autoFocus: PropTypes.bool,
  className: PropTypes.string,
  onChange: PropTypes.func,
  onPaste: PropTypes.func,
  placeholder: PropTypes.string,
  type: PropTypes.oneOf(['number', 'text']),
  value: PropTypes.any
};

export default Input;
