import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';

import styles from './Header.module.scss';

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
