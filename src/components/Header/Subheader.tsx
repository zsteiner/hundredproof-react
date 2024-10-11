import { FC, ReactNode } from 'react';

import styles from './Header.module.css';

type SubheaderProps = {
  children?: ReactNode,
  heading: string,
};

const Subheader: FC<SubheaderProps> = ({ children, heading }) => {
  return (
    <section className={styles.subheader}>
      <h2 className={`${styles.heading} ${styles.headingSubheading}`}>
        {heading}
      </h2>
      {children}
    </section>
  );
};

export default Subheader;
