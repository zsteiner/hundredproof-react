import styles from './Footer.module.css';

export const Footer = () => {
  const year = new Date().getFullYear();
  const background = '/images/hp-bottles.svg';
  const backgroundStyles = { backgroundImage: `url(${background})` };

  return (
    <footer
      className={styles.footer}
      style={backgroundStyles}
    >
      <section className={styles.footerSection}>
        &copy; {year} <a href="http://zachsteiner.com">Zach Steiner</a> &amp;{' '}
        <a href="http://jackieglimp.com">Jackie Glimp</a>
      </section>
    </footer>
  );
};
