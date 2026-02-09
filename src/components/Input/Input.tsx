import classNames from 'classnames';
import { ChangeEvent, HTMLAttributes } from 'react';

import { AutoSizeInput } from './AutoSizeInput';
import styles from './Input.module.css';

type InputProps = Omit<HTMLAttributes<HTMLInputElement>, 'onChange'> & {
  onChange: (value: string) => void;
  autoFocus?: boolean;
  autoSize?: boolean;
  placeholder?: string;
  type?: 'number' | 'text';
  value?: string | number;
};

export const Input = ({
  autoFocus,
  autoSize,
  className,
  placeholder,
  onChange,
  type,
  ...rest
}: InputProps) => {
  const inputClasses = classNames(styles.input, className, {
    [styles.inputAutosize]: autoSize,
  });

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    onChange(value);
  };

  if (autoSize) {
    return (
      <AutoSizeInput
        {...rest}
        autoFocus={autoFocus}
        className={inputClasses}
        onChange={handleOnChange}
        pattern={type === 'number' ? '\\d*' : '.*'}
        placeholder={placeholder}
        type="text"
      />
    );
  }

  return (
    <input
      {...rest}
      autoFocus={autoFocus}
      className={inputClasses}
      onChange={handleOnChange}
      pattern={type === 'number' ? '\\d*' : '.*'}
      placeholder={placeholder}
      type="text"
    />
  );
};
