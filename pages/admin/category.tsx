import { InferGetServerSidePropsType } from 'next';
import { useContext } from 'react';
import { AdminCategory } from '../../components/admin/ChangesCategory';
import { Layout } from '../../components/layout/Layout';
import { NavBar } from '../../components/layout/NavBar';
import { Login } from '../../components/user/Login';
import { AppContext } from '../../lib/userContext';
import { Categories } from '../../types';

export default function Category(
  { categories } : InferGetServerSidePropsType<typeof getServerSideProps>,
): JSX.Element {
  // ATH hvort við erum admin
  // setja sem : Ef reynt er að skoða síðu sem ekki er heimild
  // til að skoða skal birta að ekki sé heimild til að skoða.
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
            <AdminCategory categories={categories}/>
          )}
          {!loggedin && (
            <h3>ekki er heimild til að skoða þessa síðu.</h3>
          )}
          </Layout>
        </>
  );
}

export const getServerSideProps = async () => {
  const res = await fetch('https://vef2-2022-h1-synilausn.herokuapp.com/categories');
  const categories: Categories = (await res.json()) as Categories;
  return !categories ? { notFound: true } : {
    props: { categories },
  };
};
