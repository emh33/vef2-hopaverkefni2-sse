import {
  useContext,
} from 'react';
import { ButtonLink } from '../../components/admin/ButtonLink';
import { AdminLayout } from '../../components/admin/index/Layout';
import { Layout } from '../../components/layout/Layout';
import { NavBar } from '../../components/layout/NavBar';
import { Login } from '../../components/user/Login';
import { AppContext } from '../../lib/userContext';

export default function Admin(): JSX.Element {
  const { loggedin } = useContext(AppContext);
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
          <div>
            <h2>Velkominn á starfsmanna síðuna</h2>
            <AdminLayout/>
          </div>
        )}
        {!loggedin && (
          <h3>ekki er heimild til að skoða þessa síðu.</h3>
        )}
        </Layout>
      </>
  );
}
