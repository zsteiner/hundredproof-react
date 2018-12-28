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
  readOnly,
  removeItem
}) => {
  return (
    <li className={styles.ingredientsItem}>
      <form onSubmit={onSubmit}>
        <Input
          value={ingredient}
          onChange={onChange}
          className={styles.input}
          type="text"
          disabled={disabled}
          readOnly={readOnly}
        />
      </form>
      {readOnly ? (
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
  readOnly: PropTypes.bool,
  removeItem: PropTypes.func
};

export default IngredientItem;
