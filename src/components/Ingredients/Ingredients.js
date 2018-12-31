import React, { Component } from 'react';

import { ScalingContext } from '../../contexts/ScalingContext';

import Button from '../Button/Button';
import IngredientItem from './IngredientItem';

import styles from './Ingredients.module.scss';

class Ingredients extends Component {
  static contextType = ScalingContext;

  constructor(props, context) {
    super(props);

    this.state = {
      ingredients: context.ingredientsRaw,
      activeIngredient: ''
    };
  }

  setIngredients = event => {
    event.preventDefault();
    this.saveIngredients();
  };

  editIngredient = (event, index) => {
    const activeIngredient = event.target.value;
    let ingredients = [...this.state.ingredients];
    const length = ingredients.length;
    ingredients[index] = activeIngredient;

    if (ingredients[length - 1] !== '' && activeIngredient !== '') {
      ingredients.push('');
    }

    this.setState({ ingredients, activeIngredient });
  };

  pasteIngredient = event => {
    event.preventDefault();

    const { ingredients } = this.state;
    const last = ingredients.length - 1;
    const activeIngredient = event.clipboardData.getData('Text');
    const split = activeIngredient.split(/\r?\n/);

    if (ingredients[last] === '') {
      ingredients.splice(last, 1);
    }

    let newIngredients = ingredients.concat(split);
    newIngredients.push('');

    this.setState({ ingredients: newIngredients });
  };

  removeItem = index => {
    const { ingredients } = this.state;
    if (ingredients.length === 1 && index > -1) {
      ingredients.splice(index, 1);
      ingredients.push('');
    } else if (index > -1) {
      ingredients.splice(index, 1);
    }

    this.setState(
      {
        ingredients
      },
      () => {
        this.saveIngredients();
      }
    );
  };

  saveIngredients = () => {
    const { ingredients } = this.state;

    let cleanedIngredients = ingredients.filter(item => item !== '');
    cleanedIngredients.push('');

    this.setState({
      ingredients: cleanedIngredients
    });

    this.context.setIngredients(cleanedIngredients);
  };

  render() {
    const ingredients = this.state.ingredients.map((item, index) => {
      return (
        <IngredientItem
          key={index}
          index={index}
          ingredient={item}
          removeItem={this.removeItem}
          onChange={this.editIngredient}
          onSubmit={this.setIngredients}
          onPaste={this.pasteIngredient}
          placeholder="1 oz bourbon"
        />
      );
    });

    return (
      <React.Fragment>
        <ul className={styles.ingredients}>{ingredients}</ul>
        <Button text="Scale Recipe" onClick={this.saveIngredients} />
      </React.Fragment>
    );
  }
}

export default Ingredients;
