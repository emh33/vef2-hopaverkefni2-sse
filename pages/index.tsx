import type { NextPage } from 'next';
import { Index } from '../components/Index';
import { Layout } from '../components/layout/Layout';
import { NavBar } from '../components/layout/NavBar';
import { Login } from '../components/user/Login';

const Home: NextPage = () => (
  <>
  <Layout
    title="Veitingarstaðurinn Góði"
    header={(<NavBar cartItems={0}/>)}
    footer={(
      <Login />
    )}
    >
      <Index/>
  </Layout>
</>
);

export default Home;
