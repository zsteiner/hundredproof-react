import classNames from 'classnames';

import styles from './Heading.module.css';

type HeadingProps = {
  children: React.ReactNode;
  as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
};

export const Heading = ({ children, as }: HeadingProps) => {
  const Component = as;

  return (
    <Component className={classNames(styles.heading, styles[as])}>
      {children}
    </Component>
  );
};
