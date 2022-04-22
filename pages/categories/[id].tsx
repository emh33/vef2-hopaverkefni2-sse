import { GetServerSideProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import { useContext } from 'react';
import { MenuListItem } from '../../components/MenuListItem';
import { Layout } from '../../components/layout/Layout';
import { NavBar } from '../../components/layout/NavBar';
import { Login } from '../../components/user/Login';
import styles from '../../styles/Home.module.css';
import { CategoriesItems, MenuItems } from '../../types';
import { AppContextCart } from '../../lib/cartContext';

function Category({ category, filtered } :any): JSX.Element {
  const cart = useContext(AppContextCart);
  return (
   <div>
    <Head>
     <title>{category.title}</title>
    </Head>
    <Layout
      title="Veitingarstaðurinn Góði"
      header={(<NavBar cartItems={cart.cartCounter}/>)}
      footer={(
        <Login />
      )}
    >
      <main>
        <h1>{category.title}</h1>
        <ul className={styles.menuList}>
          {filtered.map((item:MenuItems, i:number) => (
            <MenuListItem key={i} item={item}/>
          ))}
        </ul>
      </main>
    </Layout>
   </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch('https://vef2-2022-h1-synilausn.herokuapp.com/categories');
  const categories = await res.json();
  // console.log(categories)
  const paths = categories.items.map((category:CategoriesItems) => ({
    params: { id: category.id.toString() },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetServerSideProps = async ({ params }) => {
  const id = params?.id;
  const res = await fetch(`https://vef2-2022-h1-synilausn.herokuapp.com/categories/${id}`);
  const category = await res.json();
  const menuRes = await fetch('https://vef2-2022-h1-synilausn.herokuapp.com/menu');
  const menu = await menuRes.json();
  // eslint-disable-next-line  prefer-arrow-callback
  const filtered = menu.items.filter(function (item: MenuItems) {
    return item.category === category.id;
  });
  return { props: { category, filtered } };
};

export default Category;
