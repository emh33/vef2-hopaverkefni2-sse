import { useContext } from 'react';
import { AdminLayout } from '../../components/admin/index/Layout';
import { Layout } from '../../components/layout/Layout';
import { NavBar } from '../../components/layout/NavBar';
import { Login } from '../../components/user/Login';
import { AppContextCart } from '../../lib/cartContext';
import { AppContext } from '../../lib/userContext';

export default function Admin(): JSX.Element {
  const { loggedin } = useContext(AppContext);
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
