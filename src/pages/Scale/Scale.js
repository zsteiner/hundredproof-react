import React, { Component } from 'react';

import Subheader from '../../components/Header/Subheader';
import ScalingTools from '../../components/ScalingTools/ScalingTools';

class Scale extends Component {
  render() {
    return (
      <React.Fragment>
        <Subheader heading="Scale">
          <p>
            Enter each ingredient like "1 oz gin" or "1.5 shots of whisky" or "2
            dashes of dry vermouth". Let's this party started.
          </p>
        </Subheader>
        <article className="hp-app">
          <ScalingTools />
        </article>
      </React.Fragment>
    );
  }
}

export default Scale;
