import PropTypes from 'prop-types';
import React from 'react';

import styles from './Header.module.scss';

const Subheader = ({ children, heading }) => {
  return (
    <section className={styles.subheader}>
      <h2 className={`${styles.heading} ${styles.headingSubheading}`}>
        {heading}
      </h2>
      {children}
    </section>
  );
};

Subheader.propTypes = {
  children: PropTypes.node,
  heading: PropTypes.string,
};

export default Subheader;
