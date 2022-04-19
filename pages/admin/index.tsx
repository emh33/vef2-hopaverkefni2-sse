import Router from 'next/router';
import { useContext, useEffect } from 'react';
import { Layout } from '../../components/layout/Layout';
import { NavBar } from '../../components/layout/NavBar';
import { Login } from '../../components/user/Login';
import { AppContext } from '../../lib/userContext';

export default function Admin(): JSX.Element {
  const { loggedin, user } = useContext(AppContext);
  useEffect(() => {
    if (!loggedin && !user) {
      Router.push('/admin/login');
    }
  }, [loggedin]);
  // Búa til, eyða, breyta flokk category
  // Búa til, eyða, breyta vöru á matseðli
  // Skoða lista af pöntunum og velja pöntun
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
