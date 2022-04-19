import type { NextPage } from 'next';
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
    <div>Forsíða</div>
  </Layout>
</>
);

export default Home;
