import React from 'react';
import styles from './Footer.module.scss';

const Footer = () => {
  return (
		<footer className={styles.footer}> 
    		<section className={styles.footerSection}>&copy; 2018 <a href="http://zachsteiner.com">Zach Steiner</a> &amp; <a href="http://jackieglimp.com">Jackie Glimp</a></section>
		</footer>
  );
};

export default Footer;
