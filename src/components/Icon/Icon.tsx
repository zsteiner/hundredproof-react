import classNames from 'classnames';

import { IconType } from '../../utils/types';
import styles from './Icon.module.css';

type IconProps = {
  className?: string;
  icon: IconType;
};

export const Icon = ({ className, icon }: IconProps) => {
  const iconClasses = classNames(styles.icon, className);

  return (
    <svg
      aria-hidden="true"
      className={iconClasses}
    >
      <use href={`#icon-${icon}`} />
    </svg>
  );
};
