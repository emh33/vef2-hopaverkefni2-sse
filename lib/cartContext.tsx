import {
  createContext, useContext, useEffect, useState,
} from 'react';
import { Cart, CartContextType } from '../types';

const cartId: Cart | null = null;
export const AppContext = createContext<CartContextType>({
  cart: cartId,
});

export function CartContext({ children }: any) : JSX.Element {
  const [cart, setCart] = useState<Cart | null>(null);
  console.log('cltest:', cart);
  useEffect(() => {
    const url = 'https://vef2-2022-h1-synilausn.herokuapp.com/cart';
    const fetchData = async () => {
      try {
        const response = await fetch(url, { method: 'POST' });
        const json = await response.json();
        setCart(json);
      } catch (error) {
        console.log('error', error);
      }
    };
    fetchData();
  }, []);
  console.log('cltest2:', cart);
  return (
      <AppContext.Provider value={{
        cart,
      }}
      >
        {children}
      </AppContext.Provider>
  );
}

export function useAppContext() : CartContextType {
  return useContext(AppContext);
}
