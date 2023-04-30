import classNames from 'classnames';
import { FC, MouseEvent } from 'react';

import styles from './SegmentedButton.module.scss';

type Option = {
  value: string;
  label: string;
  name?: string;
  default?: boolean;
  disabled?: boolean;
}

type SegmentedButtonProps = {
  className: string;
  name: string;
  options: Option[];
  onChange: (event: MouseEvent<HTMLButtonElement>) => void;
}

const SegmentedButton: FC<SegmentedButtonProps> = ({ className, name, options, onChange }) => {
  const updateValue = (event: MouseEvent<HTMLButtonElement>) => {
    onChange(event.target.value);
  };

  const segmentedButtonClasses = classNames({
    [styles.segmentedButton]: true,
    [className]: className
  });

  return <ul className={segmentedButtonClasses}>{options.map((option, index) => (
    <li className={styles.segmentedButtonItem} key={index}>
      <input
        defaultChecked={!!option.default}
        disabled={!!option.disabled}
        id={`${name}${index}`}
        name={name}
        onClick={updateValue}
        type="radio"
        value={option.value}
      />
      <label htmlFor={`${name}${index}`}>
        <span>{option.label}</span>
      </label>
    </li>
  ))}</ul>;
};

export default SegmentedButton;
