import './index.css';

import classNames from 'classnames';
import type { Metadata } from 'next';
import { Homemade_Apple, Lora, Raleway } from 'next/font/google';
import { ReactNode } from 'react';

import { Footer } from '../components/Footer/Footer';
import { Header } from '../components/Header/Header';
import { IconSet } from '../components/IconSet/IconSet';

const fontFamilyHomemadeApple = Homemade_Apple({
  subsets: ['latin'],
  style: ['normal'],
  weight: '400',
});

const fontFamilyRaleway = Raleway({
  subsets: ['latin'],
  style: ['normal', 'italic'],
});

const fontFamilyLora = Lora({
  subsets: ['latin'],
  style: ['normal', 'italic'],
});

export const metadata: Metadata = {
  title: 'Hundred Proof',
  description: 'Math for the modern mixologist.',
  icons: [
    {
      url: '/favicon.ico',
      sizes: '16x16',
      type: 'image/png',
    },
    {
      url: '/favicon-32x32.png',
      sizes: '32x32',
      type: 'image/png',
    },
    {
      url: '/favicon-16x16.png',
      sizes: '16x16',
      type: 'image/png',
    },
    {
      url: '/apple-touch-icon.png',
      sizes: '180x180',
      type: 'image/png',
    },
    {
      url: '/safari-pinned-tab.svg',
      color: '#f6921e',
    },
  ],
  manifest: '/site.webmanifest',
  themeColor: '#f6921e',
  openGraph: {
    images: '/images/splash.png',
    title: 'Hundred Proof',
    description: 'Math for the modern mixologist.',
    url: 'https://hundredproof.zachsteiner.com',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={classNames(
          fontFamilyHomemadeApple.className,
          fontFamilyLora.className,
          fontFamilyRaleway.className,
        )}
      >
        <IconSet />
        <div className="pagewrap">
          <Header />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
