import React from 'react';
import { Link } from 'react-router-dom';

import Subheader from '../../components/Header/Subheader';

import styles from './Picker.module.scss';

const Picker = () => {
  return (
    <React.Fragment>
      <Subheader>
        <p>Dilution or Scaling. Something something goes here</p>
      </Subheader>
      <section className={styles.picker}>
        <Link to="/dilute" className={styles.pickerItem}>
          Dilute
        </Link>
        <Link to="/scale" className={styles.pickerItem}>
          Scale
        </Link>
      </section>
    </React.Fragment>
  );
};

export default Picker;
