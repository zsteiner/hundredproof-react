import PropTypes from 'prop-types';


import styles from './Errors.module.scss';
import errorText from './ErrorText.jsx';

const Errors = ({ errorCode }) => {
  let errorDisplay = <span>&nbsp;</span>;

  if (errorCode) {
    errorDisplay = errorText[errorCode];
  }

  return <p className={styles.error}>{errorDisplay}</p>;
};

Errors.propTypes = {
  errorCode: PropTypes.number,
};

export default Errors;
