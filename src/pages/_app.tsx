import { Component } from 'react';

import Footer from '../components/Footer/Footer';
import IconSet from '../components/IconSet/IconSet';

import styles from './app.module.scss';

import Head from 'next/head';

type AppProps = {
  Component: React.ElementType;
  pageProps: object;
};


const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Head>
        <meta charset="utf-8" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="%PUBLIC_URL%/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="%PUBLIC_URL%/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="%PUBLIC_URL%/favicon-16x16.png"
        />
        <link rel="manifest" href="%PUBLIC_URL%/site.webmanifest" />
        <link
          rel="mask-icon"
          href="%PUBLIC_URL%/safari-pinned-tab.svg"
          color="#f6921e"
        />
        <meta name="msapplication-TileColor" content="#f6921e" />
        <meta name="theme-color" content="#f6921e" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Homemade+Apple&family=Lora:ital@0;1&family=Raleway:wght@700&display=swap"
          rel="stylesheet"
        />
        <meta property="og:title" content="Hundred Proof" />
        <meta property="og:description" content="Math for the modern mixologist." />
        <meta property="og:image" content="%PUBLIC_URL%/images/splash.png" />
        <meta property="og:url" content="https://hundredproof.zachsteiner.com" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="og:site_name" content="Hundred Proof" />
        <meta name="twitter:image:alt" content="Math for the modern mixologist." />
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
