import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { useContext } from 'react';
import { Layout } from '../../components/layout/Layout';
import { NavBar } from '../../components/layout/NavBar';
import { Login } from '../../components/user/Login';
import { AppContext } from '../../lib/userContext';
import { Categories, Menu as GetMenu } from '../../types';
import { AdminMenuLayout } from '../../components/admin/menu/Layout';
import { AppContextCart } from '../../lib/cartContext';

export default function Menu(
  { menu, categories } : InferGetServerSidePropsType<typeof getServerSideProps>,
): JSX.Element {
  const { loggedin } = useContext(AppContext);
  const cart = useContext(AppContextCart);

  return (
      <>
        <Layout
          title="Veitingarstaðurinn Góði"
          header={(<NavBar cartItems={cart.cartCounter}/>)}
          footer={(
            <Login />
          )}
        >
        {loggedin && (
        <AdminMenuLayout menu={menu} categories={categories} ></AdminMenuLayout>
        )}
        {!loggedin && (
          <h3>ekki er heimild til að skoða þessa síðu.</h3>
        )}
        </Layout>
      </>
  );
}
export const getServerSideProps : GetServerSideProps = async () => {
  const resMenu = await fetch('https://vef2-2022-h1-synilausn.herokuapp.com/menu');
  const menu: GetMenu = (await resMenu.json()) as GetMenu;
  const resCategory = await fetch('https://vef2-2022-h1-synilausn.herokuapp.com/categories');
  const categories: Categories = (await resCategory.json()) as Categories;
  return !menu && !categories ? { notFound: true } : {
    props: { menu, categories },
  };
};
