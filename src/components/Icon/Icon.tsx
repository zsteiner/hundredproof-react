import classNames from 'classnames';
import { FC } from 'react';

import styles from './Icon.module.scss';

type IconProps = {
  className: string,
  icon: 'close' | 'cup' | 'jigger' | 'shot'
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
