import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import router from 'next/router';
import {
  useContext, useEffect, useState,
} from 'react';
import { Layout } from '../../components/layout/Layout';
import { NavBar } from '../../components/layout/NavBar';
import { Login } from '../../components/user/Login';
import { AppContext } from '../../lib/userContext';
import { OrdersType } from '../../types';

export default function Order(): JSX.Element {
  const { loggedin } = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<OrdersType | null >(null);

  useEffect(() => {
    async function fetchOrders(): Promise<void> {
      const localUser = JSON.parse(localStorage.getItem('user') || 'null');
      let token = 'null';
      if (localUser !== 'null') {
        token = localUser.token;
      }
      console.info(token);
      if (token !== 'null') {
        const res = await fetch('https://vef2-2022-h1-synilausn.herokuapp.com/orders', {
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          const message = await res.json();
          // ef notandi er með expired token dettur hann út af síðunni
          if (message.error === 'expired token' || message.error === 'invalid token') {
            await localStorage.setItem('user', 'null');
            router.push('/');
          }
        }
        if (res.ok) {
          const getOrder = await res.json();
          setLoading(false);
          setOrders(getOrder);
        }
      }
    }

    fetchOrders();
  }, [loggedin]);

  if (loading) {
    return (<>
      <Layout
        title="Veitingarstaðurinn Góði"
        header={(<NavBar cartItems={0}/>)}
        footer={(
          <Login />
        )}
      >
        <h2>Sækir Pantanir...</h2>
      </Layout>
    </>);
  }

  return (
        <>
          <Layout
            title="Veitingarstaðurinn Góði"
            header={(<NavBar cartItems={0}/>)}
            footer={(
              <Login />
            )}
          >
          {loggedin && (
            orders && (
            <div>
            {orders.items.map((item, i) => (
              <div key={i}>
                <p>{item.id}</p>
                <p>{item.current_state}</p>
              </div>
            ))}
            </div>
            )
          )}
          {!loggedin && (
            <h3>ekki er heimild til að skoða þessa síðu.</h3>
          )}
          </Layout>
        </>
  );
}
