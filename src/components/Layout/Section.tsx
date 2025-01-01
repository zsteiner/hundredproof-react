import classNames from 'classnames';

import styles from './Layout.module.css';

type LayoutProps = {
  children: React.ReactNode;
  className?: string;
};

export const Section = ({ children, className }: LayoutProps) => {
  return (
    <section className={classNames(styles.section, className)}>
      {children}
    </section>
  );
};
