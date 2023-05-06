
import { useContext } from 'react';

import { ScalingContext } from '../../contexts/ScalingContext';
import { IngredientParams } from '../../utils/types';
import Button from '../Button/Button';
import IngredientItem from './IngredientItem';
import styles from './Ingredients.module.scss';

const Ingredients = () => {
  const { ingredients, setIngredients, setShowResults } = useContext(ScalingContext);

  const handleIngredientChange = ({ id, value }: IngredientParams) => {
    const currentItemIndex = ingredients.findIndex(item => item.id === id);

    console.log('handleOnChange', value, id, currentItemIndex);

    if (currentItemIndex >= 0) {
      ingredients[currentItemIndex].value = value;
      setIngredients([...ingredients]);
    } else {
      setIngredients([...ingredients, { id, value }]);
    }
  };

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

  const removeItem = (id: number) => {
    setIngredients(ingredients.filter(item => item.id !== id));
  };

  return (
    <>
      <ul className={styles.ingredients}>{ingredients.map((item, id) => {
        return (
          <IngredientItem
            ingredient={item}
            key={item.id}
            onChange={handleIngredientChange}
            placeholder="1 oz bourbon"
            removeItem={() => removeItem(id)}
          />
        );
      })}</ul>
      <Button onClick={saveIngredients}>Scale Recipe</Button>
    </>
  );

};

export default Ingredients;
