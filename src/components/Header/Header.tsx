
import Link from 'next/link'

import styles from './Header.module.scss';
import Logo from './Logo';

const background = '/images/hp-bottles.svg';
const backgroundStyles = { backgroundImage: `url(${background})` };

const Header = () => {
  return (
    <header className={styles.header} style={backgroundStyles}>
      <h1 className={`${styles.heading} ${styles.headingLogo}`}>
        <Link to="/">
          <Logo />
        </Link>
      </h1>
    </header>
  );
};

export default Header;
