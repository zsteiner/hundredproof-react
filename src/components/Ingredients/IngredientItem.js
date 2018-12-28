import React from 'react';
import PropTypes from 'prop-types';

import Input from '../Input/Input';

import styles from './Ingredients.module.scss';

const IngredientItem = ({
  disabled,
  ingredient,
  onChange,
  onSubmit,
  readOnly
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
    </li>
  );
};

IngredientItem.propTypes = {
  disabled: PropTypes.bool,
  ingredient: PropTypes.string,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  readOnly: PropTypes.bool
};

export default IngredientItem;
