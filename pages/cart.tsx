import type { NextPage } from 'next';
import { useContext } from 'react';
import { Layout } from '../components/layout/Layout';
import { NavBar } from '../components/layout/NavBar';
import { Login } from '../components/user/Login';
import { AppContextCart } from '../lib/cartContext';
import styles from '../styles/Home.module.css';

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
      <div className={styles.container}>
          <p>karfa: {context.cart?.id}</p>
      </div>
    </Layout>
  </>
  );
};

export default Cart;
