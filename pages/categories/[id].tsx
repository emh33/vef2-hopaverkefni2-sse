import { GetServerSideProps, GetStaticPaths } from 'next';
import Head from 'next/head';
import { MenuListItem } from '../../components/MenuListItem';

function Category({ category, filtered }:any) {
  return (
   <div>
    <Head>
     <title>{category.title}</title>
    </Head>
    <h1>{category.title}</h1>
    <ul>
      {filtered.map((item: any, i:number) => (
        <MenuListItem key={i} item={item}/>
      ))}
    </ul>
   </div>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch('https://vef2-2022-h1-synilausn.herokuapp.com/categories');
  const categories = await res.json();
  // console.log(categories)
  const paths = categories.items.map((category:any) => ({
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
  const filtered = menu.items.filter(function (item: any) {
    return item.category === category.id;
  });
  return { props: { category, filtered } };
};

export default Category;
