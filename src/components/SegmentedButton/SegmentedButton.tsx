import classNames from 'classnames';
import { ChangeEvent } from 'react';

import styles from './SegmentedButton.module.css';

type Option = {
  value: string;
  label: string;
  name?: string;
  default?: boolean;
  disabled?: boolean;
};

type SegmentedButtonProps = {
  className: string;
  name: string;
  options: Option[];
  onChange: (value: string) => void;
};

export const SegmentedButton = ({
  className,
  name,
  options,
  onChange,
}: SegmentedButtonProps) => {
  const segmentedButtonClasses = classNames({
    [styles.segmentedButton]: true,
    [className]: className,
  });

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) =>
    onChange(event.target.value);

  return (
    <ul className={segmentedButtonClasses}>
      {options.map((option, index) => (
        <li
          className={styles.segmentedButtonItem}
          key={index}
        >
          <input
            defaultChecked={!!option.default}
            disabled={!!option.disabled}
            id={`${name}${index}`}
            name={name}
            onChange={handleOnChange}
            type="radio"
            value={option.value}
          />
          <label htmlFor={`${name}${index}`}>
            <span>{option.label}</span>
          </label>
        </li>
      ))}
    </ul>
  );
};
