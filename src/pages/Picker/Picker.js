import React from 'react';
import { Link } from 'react-router-dom';

import Subheader  from '../../components/Header/Subheader';

import styles from './Picker.module.scss';

const Picker = () => {
  return [
    <Subheader key='0'>
      <p>Dilution or Scaling. Something something goes here</p>
    </Subheader>,
    <section className={styles.picker} key='1'>
      <Link to='/dilute' className={styles.pickerItem}>Dilute</Link>
      <Link to='/scale' className={styles.pickerItem}>Scale</Link>
    </section>
  ];
};

export default Picker;
