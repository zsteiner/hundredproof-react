import Link from 'next/link';

import styles from './Header.module.css';
import Logo from './Logo';

const Header = () => {
  return (
    <header className={styles.header}>
      <h1 className={`${styles.heading} ${styles.headingLogo}`}>
        <Link href="/">
          <Logo />
        </Link>
      </h1>
    </header>
  );
};

export default Header;
