import {
  useContext,
} from 'react';
import { Layout } from '../../components/layout/Layout';
import { NavBar } from '../../components/layout/NavBar';
import { Login } from '../../components/user/Login';
import { AppContext } from '../../lib/userContext';

export default function Order(): JSX.Element {
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
                <h2>pantana síða fyrir admin</h2>
            </div>
          )}
          {!loggedin && (
            <h3>ekki er heimild til að skoða þessa síðu.</h3>
          )}
          </Layout>
        </>
  );
}
