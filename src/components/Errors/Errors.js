import React from 'react';
import PropTypes from 'prop-types';

import errorText from './ErrorText.js'

import styles from './Errors.module.scss';

const Errors = ({ errorCode }) => {
  let errorDisplay = <span>&nbsp;</span>;
  
  if (errorCode) {
    errorDisplay = errorText[Number(errorCode)]
  }
  
  return (
    <p className={styles.error}>{ errorDisplay }</p>
  );
};

Errors.propTypes = {
  errorCode: PropTypes.number
};

export default Errors;
