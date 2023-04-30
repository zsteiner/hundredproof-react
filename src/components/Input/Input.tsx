import classNames from 'classnames';
import { FC, HTMLAttributes } from 'react';
import AutosizeInput from 'react-input-autosize';

import styles from './Input.module.scss';

type InputProps = HTMLAttributes<HTMLInputElement> & {
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
  onFocus,
  onPaste,
  placeholder,
  type,
  ...rest
}) => {
  const inputClasses = classNames({
    [styles.input]: true,
    [styles.inputAutosize]: autoSize,
    [className]: className,
  });

  if (autoSize) {
    return (
      <AutosizeInput
        {...rest}
        autoFocus={autoFocus}
        className={inputClasses}
        onChange={onChange}
        onFocus={onFocus}
        onPaste={onPaste}
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
      onChange={onChange}
      onFocus={onFocus}
      onPaste={onPaste}
      pattern={type === 'number' ? 'd*' : '.*'}
      placeholder={placeholder}
      type="text"
    />
  );
};
export default Input;
