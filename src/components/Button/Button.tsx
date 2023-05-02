import classNames from 'classnames';
import { ButtonHTMLAttributes, FC } from 'react';

import styles from './Button.module.scss';

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

const Button: FC<ButtonProps> = ({ className, children, disabled, ...rest }) => {
  const buttonClasses = classNames({
    [styles.button]: true,
    [className]: className,
    [styles.disabled]: !!disabled
  });

  return (
    <button {...rest} className={buttonClasses}>
      {children}
    </button>
  );
};



export default Button;
