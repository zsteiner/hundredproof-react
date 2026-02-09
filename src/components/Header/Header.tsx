import classNames from 'classnames';
import Link from 'next/link';

import styles from './Header.module.css';
import { Logo } from './Logo';

export const Header = () => {
  return (
    <header className={styles.header}>
      <h1 className={classNames(styles.heading, styles.headingLogo)}>
        <Link href="/">
          <Logo />
        </Link>
      </h1>
    </header>
  );
};
