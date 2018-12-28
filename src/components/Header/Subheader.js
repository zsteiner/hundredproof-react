import React from 'react';
import PropTypes from 'prop-types';

import styles from './Header.module.scss';

const Subheader = ({ children, showSubheading }) => {
  return (
    <section className={styles.subheader}>
      {showSubheading ? (
        <h2 className={`${styles.heading} ${styles.headingSubheading}`}>
          Math for the modern mixologist.
        </h2>
      ) : null}
      {children}
    </section>
  );
};

Subheader.propTypes = {
  children: PropTypes.node,
  showSubheading: PropTypes.bool
};

export default Subheader;
