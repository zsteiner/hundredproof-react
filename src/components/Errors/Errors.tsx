import { FC } from 'react';

import { errorCodes } from './errorCodes';
import styles from './Errors.module.css';

type ErrorProps = {
  errorCode: number;
};

const Errors: FC<ErrorProps> = ({ errorCode }) => {
  let errorDisplay;

  if (errorCode) {
    errorDisplay = errorCodes[errorCode as keyof typeof errorCodes];
  }

  return <p className={styles.error}>{errorDisplay}</p>;
};

export default Errors;
