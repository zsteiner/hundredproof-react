import React from 'react';
import PropTypes from 'prop-types';

import Input from '../Input/Input';
import Icon from '../Icon/Icon';

import styles from './Ingredients.module.scss';

const IngredientItem = ({
  disabled,
  index,
  ingredient,
  onChange,
  onFocus,
  onPaste,
  onSubmit,
  placeholder,
  removeItem,
}) => {
  return (
    <li>
      <form onSubmit={onSubmit} className={styles.ingredientsItem}>
        <Input
          value={ingredient}
          onChange={(event) => onChange(event, index)}
          onFocus={onFocus}
          onPaste={onPaste}
          className={styles.input}
          type="text"
          disabled={disabled}
          placeholder={placeholder}
        />
        {removeItem ? (
          <button
            className={styles.button}
            tabIndex="-1"
            onClick={() => removeItem(index)}
          >
            <Icon icon="close" />
          </button>
        ) : null}
      </form>
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
  onSubmit: PropTypes.func,
  placeholder: PropTypes.string,
  removeItem: PropTypes.func,
};

export default IngredientItem;
