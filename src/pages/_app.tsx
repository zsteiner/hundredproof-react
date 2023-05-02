import './index.css';
import './normalize.css';

import Head from 'next/head';

import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import IconSet from '../components/IconSet/IconSet';

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
      <div className="pagewrap">
        <Header />
        <Component {...pageProps} />
        <Footer />
      </div>
    </>
  );
};

export default MyApp;
