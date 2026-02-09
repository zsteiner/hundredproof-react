import { errorCodes } from './errorCodes';
import styles from './Errors.module.css';

type ErrorProps = {
  errorCode: number;
};

export const Errors = ({ errorCode }: ErrorProps) => {
  let errorDisplay;

  if (errorCode) {
    errorDisplay = errorCodes[errorCode as keyof typeof errorCodes];
  }

  return (
    <p
      className={styles.error}
      role="alert"
    >
      {errorDisplay}
    </p>
  );
};
