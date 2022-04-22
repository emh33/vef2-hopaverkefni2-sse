import type { NextPage } from 'next';
import Image from 'next/image';
import { useContext } from 'react';
import { Layout } from '../components/layout/Layout';
import { NavBar } from '../components/layout/NavBar';
import { Login } from '../components/user/Login';
import { AppContextCart } from '../lib/cartContext';

const Cart: NextPage = () => {
  const context = useContext(AppContextCart);

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
          {context.cart?.lines && (
            context.cart.lines.map((item, i) => (
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
