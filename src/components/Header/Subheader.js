import React from 'react';
import PropTypes from 'prop-types';

import styles from './Header.module.scss';

const Subheader = ( { children }) => {
  return (
  		<section className={styles.subheader}>  
      <h2 className={`${styles.heading} ${styles.headingSubheading}`}>Math for the modern mixologist.</h2>
      { children }
  		</section>
  );
};

Subheader.propTypes = {
  children: PropTypes.node
};

export default Subheader;
