
import { useContext, useState } from 'react';

import { ScalingContext } from '../../contexts/ScalingContext';
import Button from '../Button/Button';
import IngredientItem from './IngredientItem';
import styles from './Ingredients.module.scss';
import { Ingredient } from '../../utils/types';

const Ingredients = () => {
  const { ingredients, setIngredients } = useContext(ScalingContext);

  const [activeIngredient, setActiveIngredient] = useState('');

  const editIngredient = (event, index) => {
    const newIngredient = event.target.value as Ingredient;
    const length = ingredients.length;
    ingredients[index] = activeIngredient;

    if (ingredients[length - 1] !== '' && activeIngredient !== '') {
      ingredients.push('');
    }

    setIngredients([...ingredients, newIngredient]);
    setActiveIngredient(newIngredient);
  };

  const pasteIngredient = (event) => {
    event.preventDefault();

    const last = ingredients.length - 1;
    const activeIngredient = event.clipboardData.getData('Text');
    const split = activeIngredient.split(/\r?\n/);

    if (ingredients[last] === '') {
      ingredients.splice(last, 1);
    }

    const newIngredients = ingredients.concat(split);
    newIngredients.push('');

    setIngredients(newIngredients);
  };

  const removeItem = (index) => {
    const ingredientsLength = ingredients.length;

    if (ingredientsLength === 1 && index > -1) {
      ingredients.splice(index, 1);
      ingredients.push('');
    } else if (index > -1) {
      ingredients.splice(index, 1);
    }

    setIngredient(ingredients);
  };

  const saveIngredients = () => {
    const cleanedIngredients = ingredients.filter((item) => item !== '');
    cleanedIngredients.push('');


    setIngredients(cleanedIngredients);
  };

  const showRemoveItem = (index) => {
    const ingredientsLength = ingredients.length;

    if (ingredientsLength === index + 1) {
      return false;
    } else {
      return true;
    }
  };

  return (
    <>
      <ul className={styles.ingredients}>{ingredients.map((item, index) => {
        return (
          <IngredientItem
            index={index}
            ingredient={item}
            key={index}
            onChange={editIngredient}
            onPaste={pasteIngredient}
            placeholder="1 oz bourbon"
            removeItem={removeItem}
            showRemoveItem={showRemoveItem}
          />
        );
      })}</ul>
      <Button onClick={saveIngredients} text="Scale Recipe" />
    </>
  );

}

export default Ingredients;
