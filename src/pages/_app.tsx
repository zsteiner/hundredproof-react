import Head from 'next/head';
import { Component } from 'react';

import Footer from '../components/Footer/Footer';
import IconSet from '../components/IconSet/IconSet';
import styles from './app.module.scss';

type AppProps = {
  Component: React.ElementType;
  pageProps: object;
};


const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
      <title>Hundred Proof</title>
      </Head>
      <IconSet />
        <div className={styles.pagewrap}>
          <Component {...pageProps} />
        </div>
        <Footer />
    </>
  );
};

export default MyApp;
