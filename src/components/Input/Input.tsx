import classNames from 'classnames';
import { FC, HTMLAttributes } from 'react';
import AutosizeInput from 'react-input-autosize';

import styles from './Input.module.css';

type InputProps = Omit<HTMLAttributes<HTMLInputElement>, 'onChange'> & {
  onChange: (value: string) => void;
  autoFocus?: boolean;
  autoSize?: boolean;
  type?: 'number' | 'text';
  value?: string | number;
}

const Input: FC<InputProps> = ({
  autoFocus,
  autoSize,
  className,
  onChange,
  type,
  ...rest
}) => {
  const inputClasses = classNames({
    [styles.input]: true,
    [styles.inputAutosize]: autoSize,
    [className]: className,
  });

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    onChange(value);
  };

  if (autoSize) {
    return (
      <AutosizeInput
        {...rest}
        autoFocus={autoFocus}
        className={inputClasses}
        onChange={handleOnChange}
        pattern={type === 'number' ? 'd*' : '.*'}
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
      type="text"
    />
  );
};
export default Input;
