import { ChangeEvent, FC } from 'react';

import { Ingredient, IngredientParams } from '../../utils/types';
import Icon from '../Icon/Icon';
import Input from '../Input/Input';
import styles from './Ingredients.module.scss';

type IngredientItemProps = {
  disabled?: boolean,
  ingredient: Ingredient,
  onChange: (params: IngredientParams) => void,
  onPaste?: () => void,
  onFocus?: () => void,
  placeholder?: string,
  removeItem: () => void,
};

const IngredientItem: FC<IngredientItemProps> = ({
  // disabled,
  ingredient,
  onChange,
  onFocus,
  onPaste,
  placeholder,
  removeItem,
}) => {

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    const { id } = ingredient;

    onChange({ value, id });
  };

  return (
    <li className={styles.ingredientsItem}>
      <Input
        className={styles.input}
        onChange={handleOnChange}
        onFocus={onFocus}
        onPaste={onPaste}
        placeholder={placeholder}
        type="text"
        value={ingredient.value}
      />
      {removeItem ? (
        <button
          className={styles.button}
          onClick={removeItem}
          tabIndex={-1}
        >
          <Icon icon="close" />
        </button>
      ) : null}
    </li>
  );
};

export default IngredientItem;
