import React from 'react';
import { Link } from 'react-router-dom';

import Subheader from '../../components/Header/Subheader';

import styles from './Picker.module.scss';

const Picker = () => {
  return (
    <React.Fragment>
      <Subheader showSubheading />
      <section className={styles.picker}>
        <Link to="/dilute" className={styles.pickerItem}>
          <h2>Dilute</h2>
          <p>Spirits at the perfect strength.</p>
        </Link>
        <Link to="/scale" className={styles.pickerItem}>
          <h2>Scale</h2>
          <p>Cocktails for a thirsty crowd.</p>
        </Link>
      </section>
    </React.Fragment>
  );
};

export default Picker;
