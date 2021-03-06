import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import styles from './Icon.module.scss';

const Icon = ({ className, icon }) => {
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

Icon.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.string
};

export default Icon;
