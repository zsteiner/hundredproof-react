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

    this.setState({
      activeIngredient: '',
      ingredients: [...this.state.ingredients, this.state.activeIngredient]
    });
  };

  setIngredientItem = event => {
    const activeIngredient = event.target.value;
    this.setState({ activeIngredient });
  };

  removeItem = index => {
    const { ingredients } = this.state;
    console.log('index', index);

    if (index > -1) {
      ingredients.splice(index, 1);
      this.setState({
        ingredients
      });
    }
  };

  saveIngredients = () => {
    this.setIngredients();
    this.context.setIngredients(this.state.ingredients);
  };

  render() {
    const ingredients = this.state.ingredients.map((item, index) => {
      return (
        <IngredientItem
          key={index}
          index={index}
          ingredient={item}
          removeItem={this.removeItem}
          disabled
          readOnly
        />
      );
    });

    return (
      <React.Fragment>
        <ul className={styles.ingredients}>
          {ingredients}
          <IngredientItem
            ingredient={this.state.activeIngredient}
            onChange={this.setIngredientItem}
            onSubmit={this.setIngredients}
          />
        </ul>
        <Button text="Scale Recipe" onClick={this.saveIngredients} />
      </React.Fragment>
    );
  }
}

export default Ingredients;
