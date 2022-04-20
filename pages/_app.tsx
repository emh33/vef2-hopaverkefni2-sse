import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { UserContext } from '../lib/userContext';
import { CartContext } from '../lib/cartContext';

export default function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <CartContext>
      <UserContext>
        <Component {...pageProps} />
      </UserContext>
    </CartContext>
  );
}
