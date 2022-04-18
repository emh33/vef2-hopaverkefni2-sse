import '../styles/globals.css';
import type { AppProps } from 'next/app';
import React from 'react';

const cartIdContext = React.createContext('test')

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
