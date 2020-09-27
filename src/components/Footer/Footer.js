import React from "react";
import styles from "./Footer.module.scss";

const year = new Date().getFullYear();

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <section className={styles.footerSection}>
        &copy; {year} <a href="http://zachsteiner.com">Zach Steiner</a> &amp;{" "}
        <a href="http://jackieglimp.com">Jackie Glimp</a>
      </section>
    </footer>
  );
};

export default Footer;
