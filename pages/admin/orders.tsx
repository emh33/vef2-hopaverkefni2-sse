/* eslint-disable no-underscore-dangle */
import router from 'next/router';
import { useContext, useEffect, useState } from 'react';
import { ButtonPage } from '../../components/buttons/ButtonPage';
import { Button } from '../../components/form/Button';
import { Layout } from '../../components/layout/Layout';
import { NavBar } from '../../components/layout/NavBar';
import { Login } from '../../components/user/Login';
import { getPageOrder, postNextState } from '../../lib/request';
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
      if (loggedin && !orders) {
        if (localUser !== 'null') {
          token = localUser.token;
        }
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
            const getOrder:OrdersType = await res.json();
            setLoading(false);
            setOrders(getOrder);
          }
        }
      }
    }
    fetchOrders();
  }, [loggedin, setLoading, setOrders, orders]);

  const nextStep = (state:string) => async (e:any) => {
    e.preventDefault();
    const { value: id } = e.target;
    let nextState = 'FINISHED';
    if (state !== 'FINISHED') {
      if (state === 'NEW') {
        nextState = 'PREPARE';
      }
      if (state === 'PREPARE') {
        nextState = 'COOKING';
      }
      if (state === 'COOKING') {
        nextState = 'READY';
      }
    }
    const status = await postNextState(id, nextState);
    if (status && orders) {
      const res = await
      getPageOrder(`orders?offset=${orders.offset}&limit=${orders.limit}`);
      if (res) {
        const { pagesOrder } = res;
        setOrders(pagesOrder);
      }
    }
  };

  const pageHandler = async (e:any):Promise<void> => {
    const { value } = e.target;
    if (orders) {
      if (value === 'next') {
        const res = await
        getPageOrder(`orders?offset=${orders.offset + orders.limit}&limit=${orders.limit}`);
        if (res) {
          const { pagesOrder } = res;
          setOrders(pagesOrder);
        }
      }
      if (value === 'prev') {
        const res = await
        getPageOrder(`orders?offset=${Number(orders.offset) - orders.limit}&limit=${orders.limit}`);
        if (res) {
          const { pagesOrder } = res;
          setOrders(pagesOrder);
        }
      }
    }
  };

  if (loading) {
    return (<>
      <Layout
        title="Veitingarstaðurinn Góði"
        header={(<NavBar cartItems={0}/>)}
        footer={(
          <Login />
        )}
      >
        {loggedin && (
        <h2>Sækir Pantanir...</h2>
        )}
        {!loggedin && (
         <h3>ekki er heimild til að skoða þessa síðu.</h3>
        )}
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
                <p>{item.current_state_created}</p>
                <p>STAÐA: {item.current_state}</p>
                <Button
                value={item.id}
                onClick={nextStep(item.current_state)}
                disabled={false}>Setja í næsta skref</Button>
              </div>
            ))}

             <div>
             {orders._links.prev && (
                <ButtonPage value='prev' onClick={pageHandler}>Fyrri síða</ButtonPage>
             )}
             {orders._links.next && (
                <ButtonPage value='next' onClick={pageHandler}>Næsta síða</ButtonPage>
             )}
             </div>
            </div>
            )
          )}
          </Layout>
        </>
  );
}
