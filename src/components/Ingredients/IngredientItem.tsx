import PropTypes from 'prop-types';


import Icon from '../Icon/Icon';
import Input from '../Input/Input';
import styles from './Ingredients.module.scss';

const IngredientItem = ({
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

IngredientItem.propTypes = {
  disabled: PropTypes.bool,
  index: PropTypes.number,
  ingredient: PropTypes.string,
  onChange: PropTypes.func,
  onPaste: PropTypes.func,
  onFocus: PropTypes.func,
  placeholder: PropTypes.string,
  removeItem: PropTypes.func,
};

export default IngredientItem;
