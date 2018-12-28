import React, { Component } from 'react';

import { ScalingContext } from '../../contexts/ScalingContext';

import Errors from '../Errors/Errors';
import ScalingHeader from '../ScalingHeader/ScalingHeader';
import ScalingResults from '../ScalingResults/ScalingResults';

class ScalingTools extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ingredients: [
        {
          amount: 1,
          unit: 'oz',
          ingredient: 'gin'
        }
      ],
      scalingFactor: 2,
      setScalingFactor: this.setScalingFactor
    };
  }

  componentDidMount() {
    // this.updateResults();
  }

  setScalingFactor = event => {};

  render() {
    const { error, showResults } = this.state;

    return (
      <ScalingContext.Provider value={this.state}>
        <ScalingHeader />
        <section className="hp-section hp-app__row">
          <div className="hp-app__col">
            <h3 className="hp-heading">Original Recipe</h3>
            <Errors errorCode={this.state.error} />
          </div>
          <div className="hp-app__col">
            {!error && showResults ? <ScalingResults /> : null}
          </div>
        </section>
      </ScalingContext.Provider>
    );
  }
}

export default ScalingTools;
