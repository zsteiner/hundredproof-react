import React from 'react';
import { Link } from 'react-router-dom';

import Subheader from '../../components/Header/Subheader';

import styles from './Picker.module.scss';
import buttonStyles from '../../components/Button/Button.module.scss';

const Picker = () => {
  return (
    <React.Fragment>
      <Subheader heading="Math for the modern mixologist." />
      <section className={styles.picker}>
        <div className={styles.pickerItem}>
          <h2>Dilute</h2>
          <h3 className={styles.tagline}>Spirits at the perfect strength.</h3>
          <p>
            Got a bottle of uncut whiskey and unsure how much water to add for
            sipping?
          </p>
          <Link to="/dilute" className={buttonStyles.button}>
            get started
          </Link>
        </div>
        <div className={styles.pickerItem}>
          <h2>Scale</h2>
          <h3 className={styles.tagline}>Cocktails for a thirsty crowd.</h3>
          <p>
            Want to make a batch of your favorite drink to share at a party?
          </p>
          <Link to="/scale" className={buttonStyles.button}>
            get started
          </Link>
        </div>
      </section>
    </React.Fragment>
  );
};

export default Picker;
