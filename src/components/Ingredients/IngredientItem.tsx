import { ChangeEvent, FC } from 'react';

import Icon from '../Icon/Icon';
import Input from '../Input/Input';
import styles from './Ingredients.module.scss';

type IngredientItemProps = {
  disabled?: boolean,
  onChange: (newIngredient: string) => void,
  onPaste?: () => void,
  onFocus?: () => void,
  placeholder?: string,
  removeItem: () => void,
  value: string,
};

const IngredientItem: FC<IngredientItemProps> = ({
  // disabled,
  onChange,
  onFocus,
  onPaste,
  placeholder,
  removeItem,
  value,
}) => {


  return (
    <li className={styles.ingredientsItem}>
      <Input
        className={styles.input}
        onChange={(event: ChangeEvent<HTMLInputElement>) => onChange(event.target.value)}
        onFocus={onFocus}
        onPaste={onPaste}
        placeholder={placeholder}
        type="text"
        value={value}
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
