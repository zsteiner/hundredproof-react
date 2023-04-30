import React from 'react';

import DilutionTools from '../components/DilutionTools/DilutionTools';
import Subheader from '../components/Header/Subheader';

// import styles from './Dillution.module.scss';

const Dilute = () => {
  return (
    <React.Fragment>
      <Subheader heading="Dilute">
        <p>
          Enter your quantity and starting proof or ABV below for boozy,
          arithmetical awesomeness.
        </p>
      </Subheader>
      <article className="hp-app">
        <DilutionTools />
      </article>
    </React.Fragment>
  );
};

export default Dilute;
