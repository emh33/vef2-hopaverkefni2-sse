import type { NextPage } from 'next';
import { useContext } from 'react';
import { Index } from '../components/Index';
import { Layout } from '../components/layout/Layout';
import { NavBar } from '../components/layout/NavBar';
import { Login } from '../components/user/Login';
import { AppContextCart } from '../lib/cartContext';

const Home: NextPage = () => {
  const context = useContext(AppContextCart);
  // console.info(context);
  return (
  <>
  <Layout
    title="Veitingarstaðurinn Góði"
    header={(<NavBar cartItems={context.cartCounter}/>)}
    footer={(
      <Login />
    )}
    >
      <Index/>
  </Layout>
</>
  );
};

export default Home;
