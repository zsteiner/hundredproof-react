import classNames from 'classnames';
import PropTypes from 'prop-types';
import React from 'react';

import styles from './Button.module.scss';

const Button = ({ className, disabled, onClick, text }) => {
  const buttonClasses = classNames({
    [styles.button]: true,
    [className]: className,
    [styles.disabled]: disabled
  });

  return (
    <button className={buttonClasses} disabled={disabled} onClick={onClick}>
      {text}
    </button>
  );
};

Button.propTypes = {
  className: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  text: PropTypes.string
};

export default Button;
