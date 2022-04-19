import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { UserContext } from '../lib/userContext';

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <UserContext>
      <Component {...pageProps} />
    </UserContext>
  );
}
