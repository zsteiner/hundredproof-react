
import { useContext, useState } from 'react';

import { ScalingContext } from '../../contexts/ScalingContext';
import Button from '../Button/Button';
import IngredientItem from './IngredientItem';
import styles from './Ingredients.module.scss';

const Ingredients = () => {
  const { ingredients, setIngredients } = useContext(ScalingContext);

  const [activeIngredient, setActiveIngredient] = useState('');

  const editIngredient = (newIngredient: string) => {
    console.log(newIngredient);
    setIngredients([...ingredients, newIngredient])
  };

  const saveIngredients = () => {
    setIngredients(ingredients)
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

  const removeItem = (ingredient: string) => {
    setIngredients(ingredients.filter(item => item !== ingredient));
  };

  return (
    <>
      <ul className={styles.ingredients}>{ingredients.map((item) => {
        return (
          <IngredientItem
            key={item}
            onChange={editIngredient}
            // onPaste={pasteIngredient}
            placeholder="1 oz bourbon"
            removeItem={() => removeItem(item)}
            value={item}
          />
        );
      })}</ul>
      <Button onClick={saveIngredients}>Scale Recipe</Button>
    </>
  );

}

export default Ingredients;
