import React from 'react';
import PropTypes from 'prop-types';

import Input from '../Input/Input';

import styles from './Ingredients.module.scss';

const IngredientItem = ({
  disabled,
  index,
  ingredient,
  onChange,
  onSubmit,
  placeholder,
  removeItem
}) => {
  return (
    <li className={styles.ingredientsItem}>
      <form onSubmit={onSubmit}>
        <Input
          autoFocus
          value={ingredient}
          onChange={event => onChange(event, index)}
          className={styles.input}
          type="text"
          disabled={disabled}
          placeholder={placeholder}
        />
      </form>
      {removeItem ? (
        <button className={styles.button} onClick={() => removeItem(index)}>
          x
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
  onSubmit: PropTypes.func,
  placeholder: PropTypes.string,
  removeItem: PropTypes.func
};

export default IngredientItem;
