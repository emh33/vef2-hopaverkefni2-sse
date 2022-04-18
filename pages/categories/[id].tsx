import { GetServerSideProps, GetStaticPaths } from 'next';
import Head from 'next/head';

function Category({ category }:any) {
  return (
   <div>
    <Head>
     <title>{category.title}</title>
    </Head>
    <h1>{category.title}</h1>
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
  return { props: { category } };
};

export default Category;
