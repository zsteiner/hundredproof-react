import { ReactNode } from 'react';

import styles from './Header.module.css';

type SubheaderProps = {
  children?: ReactNode;
  heading: string;
};

export const Subheader = ({ children, heading }: SubheaderProps) => {
  return (
    <section className={styles.subheader}>
      <h2 className={`${styles.heading} ${styles.headingSubheading}`}>
        {heading}
      </h2>
      {children}
    </section>
  );
};
