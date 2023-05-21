
import { useContext } from 'react';

import { ScalingContext } from '../../contexts/ScalingContext';
import Button from '../Button/Button';
import IngredientItem from './IngredientItem';
import styles from './Ingredients.module.css';

const Ingredients = () => {
  const { ingredients, setShowResults, setError } = useContext(ScalingContext);

  const saveIngredients = () => {
    if (ingredients.find(item => !item.ingredient)) {
      setError(7);
    } else {
      setShowResults(true);
    }
  };

  return (
    <>
      <ul className={styles.ingredients}>{ingredients.map((item) => {
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
