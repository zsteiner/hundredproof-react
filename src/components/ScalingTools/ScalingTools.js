import React, { Component } from 'react';

import { ScalingContext } from '../../contexts/ScalingContext';

import scale from '../../utils/scale';
// import stringifyIngredient from '../../utils/stringifyIngredient';
// import { defaultRecipe } from '../../consts/defaultRecipe';

import Errors from '../Errors/Errors';
import Ingredients from '../Ingredients/Ingredients';
import ScalingHeader from '../ScalingHeader/ScalingHeader';
import ScalingResults from '../ScalingResults/ScalingResults';

class ScalingTools extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ingredients: [],
      ingredientsRaw: [''],
      scalingFactor: 2,
      setScalingFactor: this.setScalingFactor,
      setIngredients: this.setIngredients
    };
  }

  checkForError(value, code) {
    if (isNaN(value) || value === '') {
      this.setState({
        scalingFactor: 1
      });
      console.error('ERROR!');
      return '';
    } else {
      this.setState({
        error: null
      });
      return value.trim();
    }
  }

  setScalingFactor = event => {
    const scalingFactor = this.checkForError(event.target.value, 1);

    this.setState(
      {
        scalingFactor
      },
      () => {
        this.setIngredients(this.state.ingredientsRaw);
      }
    );
  };

  setIngredients = ingredientsRaw => {
    const ingredients = scale(ingredientsRaw, this.state.scalingFactor);

    this.setState({
      ingredients,
      ingredientsRaw,
      showResults: true
    });
  };

  render() {
    const { error, showResults } = this.state;

    return (
      <ScalingContext.Provider value={this.state}>
        <ScalingHeader />
        <section className="hp-section hp-app__row">
          <div className="hp-app__col">
            <h3 className="hp-heading">Original Recipe</h3>
            <Ingredients />
            <Errors errorCode={this.state.error} />
          </div>
          <div className="hp-app__col">
            {!error && showResults ? (
              <ScalingResults results={this.state.ingredients} />
            ) : null}
          </div>
        </section>
      </ScalingContext.Provider>
    );
  }
}

export default ScalingTools;
