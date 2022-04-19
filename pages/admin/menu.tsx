import Router from 'next/router';
import { useContext, useEffect } from 'react';
import { Layout } from '../../components/layout/Layout';
import { NavBar } from '../../components/layout/NavBar';
import { Login } from '../../components/user/Login';
import { AppContext } from '../../lib/userContext';

export default function Menu(): JSX.Element {
  const { loggedin } = useContext(AppContext);
  useEffect(() => {
    if (!loggedin) {
      Router.push('/admin/login');
    }
  }, []);

  return (
      <>
        <Layout
          title="Veitingarstaðurinn Góði"
          header={(<NavBar cartItems={0}/>)}
          footer={(
            <Login />
          )}
        >
          <div>Admin page</div>
        </Layout>
      </>
  );
}
