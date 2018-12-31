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
    if (event) {
      event.preventDefault();
    }

    const { ingredients, activeIngredient } = this.state;

    let newIngredients =
      activeIngredient === ''
        ? ingredients
        : [...ingredients, activeIngredient];

    newIngredients.push('');

    this.setState({
      activeIngredient: '',
      ingredients: newIngredients
    });
  };

  editIngredient = (event, index) => {
    const activeIngredient = event.target.value;
    let ingredients = [...this.state.ingredients];
    ingredients[index] = activeIngredient;
    this.setState({ ingredients });
  };

  pasteIngredient = event => {
    event.preventDefault();
    const activeIngredient = event.clipboardData.getData('Text');
    const split = activeIngredient.split(/\r?\n/);
    this.setState({ ingredients: split });
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

    this.setIngredients();
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
