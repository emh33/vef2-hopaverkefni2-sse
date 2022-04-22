import {
  createContext, useContext, useEffect, useState,
} from 'react';
import { Cart, CartContextType } from '../types';

const cartId: Cart | null = null;

export const AppContextCart = createContext<CartContextType>({
  cart: cartId,
  counter: () => {},
  cartCounter: '0',
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function CartContext({ children }: any) : JSX.Element {
  const [cart, setCart] = useState<Cart | null>(null);
  const [cartCounter, setCartCounter] = useState('0');

  useEffect(() => {
    async function fetchCart(): Promise<void> {
      const localCart = JSON.parse(localStorage.getItem('cart') || 'null');
      setCart(localCart);
      if (!localCart) {
        const res = await fetch('https://vef2-2022-h1-synilausn.herokuapp.com/cart', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json',
          },
        });
        if (res.ok) {
          const json :Cart = await res.json();
          console.info('jsn: ', json);
          await localStorage.setItem('cart', JSON.stringify(json));
          setCart(json);
        }
      }
      if (localCart) {
        const res = await
        fetch(`https://vef2-2022-h1-synilausn.herokuapp.com/cart/${localCart.id}`, {
          headers: {
            'Content-type': 'application/json',
          },
        });
        if (res.ok) {
          const json :Cart = await res.json();
          setCart(json);
          const items = json.lines;
          setCartCounter(`${items?.length}`);
        }
      }
    }

    fetchCart();
  }, []);

  const counter = () : void => {
    const numb = Number(cartCounter) + 1;
    setCartCounter(`${numb}`);
  };

  return (
      <AppContextCart.Provider value={{
        cart,
        counter,
        cartCounter,
      }}
      >
        {children}
      </AppContextCart.Provider>
  );
}

export function useAppContext() : CartContextType {
  return useContext(AppContextCart);
}
