import classNames from 'classnames';

import styles from './Layout.module.css';

type LayoutProps = {
  children: React.ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  return (
    <section className={classNames(styles.section, styles.row)}>
      {children}
    </section>
  );
};

const Column = ({ children }: LayoutProps) => {
  return <section className={styles.column}>{children}</section>;
};
Layout.Column = Column;
