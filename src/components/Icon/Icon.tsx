import classNames from 'classnames';
import { FC } from 'react';

import { IconType } from '../../utils/types';
import styles from './Icon.module.scss';

type IconProps = {
  className?: string;
  icon: IconType;
};

const Icon: FC<IconProps> = ({ className, icon }) => {
  const iconClasses = classNames({
    [styles.icon]: true,
    [className]: className
  });

  return (
    <svg className={iconClasses}>
      <use xlinkHref={`#icon-${icon}`} />
    </svg>
  );
};


export default Icon;
