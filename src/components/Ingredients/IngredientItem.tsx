import { FC } from 'react';

import Icon from '../Icon/Icon';
import Input from '../Input/Input';
import styles from './Ingredients.module.scss';

type IngredientItemProps = {
  disabled: boolean,
  index: number,
  ingredient: string,
  onChange: () => void,
  onPaste: () => void,
  onFocus: () => void,
  placeholder: string,
  removeItem: () => void,
};

const IngredientItem: FC<IngredientItemProps> = ({
  disabled,
  index,
  ingredient,
  onChange,
  onFocus,
  onPaste,
  placeholder,
  removeItem,
}) => {
  return (
    <li className={styles.ingredientsItem}>
      <Input
        className={styles.input}
        disabled={disabled}
        onChange={(event) => onChange(event, index)}
        onFocus={onFocus}
        onPaste={onPaste}
        placeholder={placeholder}
        type="text"
        value={ingredient}
      />
      {removeItem ? (
        <button
          className={styles.button}
          onClick={() => removeItem(index)}
          tabIndex="-1"
        >
          <Icon icon="close" />
        </button>
      ) : null}
    </li>
  );
};

export default IngredientItem;
