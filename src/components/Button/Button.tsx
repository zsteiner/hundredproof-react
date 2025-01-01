import classNames from 'classnames';
import { ButtonHTMLAttributes } from 'react';

import styles from './Button.module.css';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({
  className,
  children,
  disabled,
  ...rest
}: ButtonProps) => {
  const buttonClasses = classNames({
    [styles.button]: true,
    [className]: className,
    [styles.disabled]: !!disabled,
  });

  return (
    <button
      {...rest}
      className={buttonClasses}
      type="button"
    >
      {children}
    </button>
  );
};
