import { Button } from '../Button/Button';
import { useScaling } from '../ScalingTools/useScaling';
import { IngredientItem } from './IngredientItem';
import styles from './Ingredients.module.css';

export const Ingredients = () => {
  const { ingredients, processedIngredients, setShowResults, setError } =
    useScaling();

  const saveIngredients = () => {
    if (
      processedIngredients.find(
        (item) => !item.amount || !item.unit || !item.ingredient,
      )
    ) {
      setError(7);
    } else {
      setError(undefined);
      setShowResults(true);
    }
  };

  return (
    <>
      <ul className={styles.ingredients}>
        {ingredients.map((item) => {
          return (
            <IngredientItem
              ingredient={item}
              key={item.id}
              placeholder="1 oz bourbon"
            />
          );
        })}
      </ul>
      <Button onClick={saveIngredients}>Scale Recipe</Button>
    </>
  );
};
