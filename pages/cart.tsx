import type { NextPage } from 'next';
import { useContext } from 'react';
import { AppContext } from '../lib/cartContext';
import styles from '../styles/Home.module.css';

const Cart: NextPage = () => {
  const context = useContext(AppContext);
  return (
      <div className={styles.container}>
          <p>karfa: {context.cart?.id}</p>
      </div>
  );
};

export default Cart;
