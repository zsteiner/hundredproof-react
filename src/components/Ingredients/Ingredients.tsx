
import { useContext } from 'react';

import { ScalingContext } from '../../contexts/ScalingContext';
import Button from '../Button/Button';
import IngredientItem from './IngredientItem';
import styles from './Ingredients.module.scss';

const Ingredients = () => {
  const { ingredients, setShowResults } = useContext(ScalingContext);


  const saveIngredients = () => {
    setShowResults(true);
  };

  // const pasteIngredient = (event) => {
  //   event.preventDefault();

  //   const last = ingredients.length - 1;
  //   const activeIngredient = event.clipboardData.getData('Text');
  //   const split = activeIngredient.split(/\r?\n/);

  //   if (ingredients[last] === '') {
  //     ingredients.splice(last, 1);
  //   }

  //   const newIngredients = ingredients.concat(split);
  //   newIngredients.push('');

  //   setIngredients(newIngredients);
  // };

  return (
    <>
      <ul className={styles.ingredients}>{ingredients.map((item, id) => {
        return (
          <IngredientItem
            ingredient={item}
            key={item.id}
            placeholder="1 oz bourbon"
          />
        );
      })}</ul>
      <Button onClick={saveIngredients}>Scale Recipe</Button>
    </>
  );

};

export default Ingredients;
