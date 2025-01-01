import classNames from 'classnames';

import { IconType } from '../../utils/types';
import styles from './Icon.module.css';

type IconProps = {
  className?: string;
  icon: IconType;
};

export const Icon = ({ className, icon }: IconProps) => {
  const iconClasses = classNames({
    [styles.icon]: true,
    [className]: className,
  });

  return (
    <svg className={iconClasses}>
      <use xlinkHref={`#icon-${icon}`} />
    </svg>
  );
};
