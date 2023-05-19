import { ClipboardEvent, useContext, useEffect, useState } from 'react';
import { ChangeEvent, FC } from 'react';

import { ScalingContext } from '../../contexts/ScalingContext';
import { Ingredient } from '../../utils/types';
import Icon from '../Icon/Icon';
import Input from '../Input/Input';
import styles from './Ingredients.module.scss';

type IngredientItemProps = {
  disabled?: boolean,
  ingredient: Ingredient,
  placeholder?: string,
};

const IngredientItem: FC<IngredientItemProps> = ({
  ingredient,
  placeholder,
}) => {
  const [activeIngredient, setActiveIngredient] = useState<string>(ingredient.value);
  const { ingredients, setIngredients } = useContext(ScalingContext);

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) =>
    setActiveIngredient(event.target.value);

  const removeItem = () =>
    setIngredients(ingredients.filter(item => item.id !== ingredient.id));

  const handlePaste = (event: ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();

    const { id } = ingredient;
    const stagedIngredients = [...ingredients];
    const ingredientList = event.clipboardData.getData('Text');
    const newIngredients = ingredientList.split(/\r?\n/).map((value, index) => {
      return { id: id + index, value } as Ingredient;
    });
    stagedIngredients.splice(ingredients.findIndex(item => item.id === id), 0, ...newIngredients);


    if (ingredients[ingredients.length - 1].value !== '') {
      newIngredients.push({ id: id + newIngredients.length, value: '' });
    }

    const newItemId = stagedIngredients.filter(item => item.id === id)[0].value;
    const returnIngredients = stagedIngredients.map((item, index) => ({
      ...item,
      id: index,
    }));

    console.log({ returnIngredients });

    setActiveIngredient(newItemId);
    setIngredients(returnIngredients);
  };

  useEffect(() => {
    const { id } = ingredient;
    const value = activeIngredient;
    const currentItemIndex = ingredients.findIndex(item => item.id === id);
    const hasItems = ingredients.length >= 0;
    const newItem = { id: ingredients.length, value: '' };

    if (id === ingredients.length - 1 && value !== '') {
      setIngredients([...ingredients, newItem]);
    }
    else if (hasItems) {
      ingredients[currentItemIndex].value = value;
      setIngredients([...ingredients]);
    } else {
      setIngredients([
        ...ingredients,
        { id, value },
        newItem
      ]);
    }
  }, [activeIngredient]);

  return (
    <li className={styles.ingredientsItem}>
      <Input
        className={styles.input}
        onChange={handleOnChange}
        onPaste={handlePaste}
        placeholder={placeholder}
        type="text"
        value={activeIngredient}
      />
      {removeItem ? (
        <button
          className={styles.button}
          onClick={removeItem}
        >
          <Icon icon="close" />
        </button>
      ) : null}
    </li>
  );
};

export default IngredientItem;
