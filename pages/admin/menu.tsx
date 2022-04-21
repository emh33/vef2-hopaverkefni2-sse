import { GetServerSideProps } from 'next';
import {
  useContext,
} from 'react';
import { Layout } from '../../components/layout/Layout';
import { NavBar } from '../../components/layout/NavBar';
import { Login } from '../../components/user/Login';
import { AppContext } from '../../lib/userContext';
import { Menu as GetMenu } from '../../types';

export default function Menu(): JSX.Element {
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
              <h2>Menu síða fyrir admin</h2>
          </div>
        )}
        {!loggedin && (
          <h3>ekki er heimild til að skoða þessa síðu.</h3>
        )}
        </Layout>
      </>
  );
}
export const getServerSideProps : GetServerSideProps = async () => {
  const res = await fetch('https://vef2-2022-h1-synilausn.herokuapp.com/menu');
  const menu: GetMenu = (await res.json()) as GetMenu;
  return !menu ? { notFound: true } : {
    props: { menu },
  };
};
