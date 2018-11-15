import React from 'react';

import DilutionTools from '../../components/DilutionTools/DilutionTools';
import Subheader from '../../components/Header/Subheader';

// import styles from './Dillution.module.scss';

const Dilute = () => {
  return [
    <Subheader key='0'>
      <p>Got a bottle of uncut whiskey and unsure how much water to add for sipping?</p>
      <p>Making homemade liqueur and not sure how much to dilute to get a desired proof?</p>
      <p>Enter your quantity, starting proof/ABV below for boozy, arithmetical awesomeness. Let's get this party started.</p>
    </Subheader>,
    <article className='hp-app' key='1'>
      <DilutionTools />
    </article>
  ];
};

export default Dilute;