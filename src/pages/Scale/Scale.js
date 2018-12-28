import React, { Component } from 'react';

import Subheader from '../../components/Header/Subheader';
import ScalingTools from '../../components/ScalingTools/ScalingTools';

class Scale extends Component {
  render() {
    return (
      <React.Fragment>
        <Subheader>
          <p>Scale your favorite cocktail recipe for a crowd.</p>
          <p>
            Enter each ingredient like "1 oz gin" or "1.5 shots of whisky" or "2
            dashes of dry vermouth"
          </p>
        </Subheader>
        <ScalingTools />
      </React.Fragment>
    );
  }
}

export default Scale;
