import type { NextPage } from 'next';
import Image from 'next/image';
import { useContext, useEffect, useState } from 'react';
import { Layout } from '../components/layout/Layout';
import { NavBar } from '../components/layout/NavBar';
import { Login } from '../components/user/Login';
import { AppContextCart } from '../lib/cartContext';
import { Cart as CartType } from '../types';

const Cart: NextPage = () => {
  const context = useContext(AppContextCart);
  const [inCart, setInCart] = useState<CartType | null>(context.cart);
  useEffect(() => {
    async function fetchCart(): Promise<void> {
      if (context.cart?.id) {
        const res = await
        fetch(`https://vef2-2022-h1-synilausn.herokuapp.com/cart/${context.cart?.id}`, {
          headers: {
            'Content-type': 'application/json',
          },
        });
        if (res.ok) {
          const json :CartType = await res.json();
          setInCart(json);
        }
      }
    }
    fetchCart();
  }, []);

  return (
    <>
    <Layout
      title="Veitingarstaðurinn Góði"
      header={(<NavBar cartItems={context.cartCounter}/>)}
      footer={(
        <Login />
      )}
      >
      <div>
          <p>Karfan þín</p>
          {inCart?.lines && (
            inCart.lines.map((item, i) => (
              <div key={i}>
                  <Image src={item.image} width = {400} height= {400} />
                  <p>{item.title}</p>
                  <p>{item.description}</p>
                  <p>{item.price}.kr</p>
              </div>
            )))}
      </div>
    </Layout>
  </>
  );
};

export default Cart;
