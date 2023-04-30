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
      activeIngredient: '',
    };
  }

  setIngredients = (event) => {
    event.preventDefault();
    this.saveIngredients();
  };

  editIngredient = (event, index) => {
    const activeIngredient = event.target.value;
    const ingredients = [...this.state.ingredients];
    const length = ingredients.length;
    ingredients[index] = activeIngredient;

    if (ingredients[length - 1] !== '' && activeIngredient !== '') {
      ingredients.push('');
    }

    this.setState({ ingredients, activeIngredient });
  };

  pasteIngredient = (event) => {
    event.preventDefault();

    const { ingredients } = this.state;
    const last = ingredients.length - 1;
    const activeIngredient = event.clipboardData.getData('Text');
    const split = activeIngredient.split(/\r?\n/);

    if (ingredients[last] === '') {
      ingredients.splice(last, 1);
    }

    const newIngredients = ingredients.concat(split);
    newIngredients.push('');

    this.setState({ ingredients: newIngredients });
  };

  removeItem = (index) => {
    const { ingredients } = this.state;
    const ingredientsLength = ingredients.length;

    if (ingredientsLength === 1 && index > -1) {
      ingredients.splice(index, 1);
      ingredients.push('');
    } else if (index > -1) {
      ingredients.splice(index, 1);
    }

    this.setState(
      {
        ingredients,
      },
      () => {
        this.saveIngredients();
      },
    );
  };

  saveIngredients = () => {
    const { ingredients } = this.state;

    const cleanedIngredients = ingredients.filter((item) => item !== '');
    cleanedIngredients.push('');

    this.setState({
      ingredients: cleanedIngredients,
    });

    this.context.setIngredients(cleanedIngredients);
  };

  showRemoveItem = (index) => {
    const ingredientsLength = this.ingredients.length;

    if (ingredientsLength === index + 1) {
      return false;
    } else {
      return true;
    }
  };

  render() {
    const ingredients = this.state.ingredients.map((item, index) => {
      return (
        <IngredientItem
          index={index}
          ingredient={item}
          key={index}
          onChange={this.editIngredient}
          onPaste={this.pasteIngredient}
          placeholder="1 oz bourbon"
          removeItem={this.removeItem}
          showRemoveItem={this.showRemoveItem}
        />
      );
    });

    return (
      <React.Fragment>
        <ul className={styles.ingredients}>{ingredients}</ul>
        <Button onClick={this.saveIngredients} text="Scale Recipe" />
      </React.Fragment>
    );
  }
}

export default Ingredients;
