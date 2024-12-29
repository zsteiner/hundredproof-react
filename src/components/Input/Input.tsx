import classNames from 'classnames';
import { ChangeEvent, FC, HTMLAttributes } from 'react';

import { AutoSizeInput } from './AutoSizeInput';
import styles from './Input.module.css';

type InputProps = Omit<HTMLAttributes<HTMLInputElement>, 'onChange'> & {
  onChange: (value: string) => void;
  autoFocus?: boolean;
  autoSize?: boolean;
  placeholder?: string;
  type?: 'number' | 'text';
  value?: string | number;
}

const Input: FC<InputProps> = ({
  autoFocus,
  autoSize,
  className,
  placeholder,
  onChange,
  type,
  ...rest
}) => {
  const inputClasses = classNames({
    [styles.input]: true,
    [styles.inputAutosize]: autoSize,
    [className]: className,
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
        pattern={type === 'number' ? 'd*' : '.*'}
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
      pattern={type === 'number' ? 'd*' : '.*'}
      placeholder={placeholder}
      type="text"
    />
  );
};
export default Input;
