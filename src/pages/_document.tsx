import Document, { Head, Html, Main, NextScript } from 'next/document';

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
            name="viewport"
          />
          <link href="%PUBLIC_URL%/favicon.ico" rel="shortcut icon" />
          <link
            href="%PUBLIC_URL%/apple-touch-icon.png"
            rel="apple-touch-icon"
            sizes="180x180"
          />
          <link
            href="%PUBLIC_URL%/favicon-32x32.png"
            rel="icon"
            sizes="32x32"
            type="image/png"
          />
          <link
            href="%PUBLIC_URL%/favicon-16x16.png"
            rel="icon"
            sizes="16x16"
            type="image/png"
          />
          <link href="%PUBLIC_URL%/site.webmanifest" rel="manifest" />
          <link
            color="#f6921e"
            href="%PUBLIC_URL%/safari-pinned-tab.svg"
            rel="mask-icon"
          />
          <meta content="#f6921e" name="msapplication-TileColor" />
          <meta content="#f6921e" name="theme-color" />
          <link href="https://fonts.gstatic.com" rel="preconnect" />
          <link
            href="https://fonts.googleapis.com/css2?family=Homemade+Apple&family=Lora:ital@0;1&family=Raleway:wght@700&display=swap"
            rel="stylesheet"
          />
          <meta content="Hundred Proof" property="og:title" />
          <meta content="Math for the modern mixologist." property="og:description" />
          <meta content="%PUBLIC_URL%/images/splash.png" property="og:image" />
          <meta content="https://hundredproof.zachsteiner.com" property="og:url" />
          <meta content="summary_large_image" name="twitter:card" />
          <meta content="Hundred Proof" property="og:site_name" />
          <meta content="Math for the modern mixologist." name="twitter:image:alt" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;