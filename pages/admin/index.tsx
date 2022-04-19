import Router from 'next/router';
import {
  useCallback, useContext, useEffect, useState,
} from 'react';
import { AdminButton } from '../../components/admin/Button';
import { Button } from '../../components/form/Button';
import { Input } from '../../components/form/Input';
import { Layout } from '../../components/layout/Layout';
import { NavBar } from '../../components/layout/NavBar';
import { Login } from '../../components/user/Login';
import { deleteCategories, postCategories } from '../../lib/request';
import { AppContext } from '../../lib/userContext';
import { Categories, CategoriesItems } from '../../types';

export default function Admin({ categories }:any): JSX.Element {
  const { loggedin, user } = useContext(AppContext);
  const [newCategory, setNewCategory] = useState('');

  useEffect(() => {
    if (!loggedin && !user) {
      Router.push('/admin/login');
    }
  }, [loggedin, user]);
  // Búa til-> from, eyða-> takki , breyta flokk category-> edit
  // Búa til, eyða, breyta vöru á matseðli
  // Skoða lista af pöntunum og velja pöntun

  const onChangeCategoryForm = (e: React.ChangeEvent<HTMLInputElement>):void => {
    setNewCategory(e.target.value);
  };
  const submit = async () : Promise <void> => {
    const post = await postCategories({ title: newCategory });
    console.info(post);
  };

  /* const deleteCategory = async () : Promise <void> => {
    const post = await postCategories({ title: newCategory });
    console.info(id);
  }; */

  const deleteCategory = async (e:any) : Promise <void> => {
    const id = e.currentTarget.getAttribute('data-id');
    console.info(id);
    const req = await deleteCategories(id);
    console.info(req);
  };
  return (
      <>
        <Layout
          title="Veitingarstaðurinn Góði"
          header={(<NavBar cartItems={0}/>)}
          footer={(
            <Login />
          )}
        >
          <h3>Búa til, eyða eða breyta flokkum: </h3>
          <ul>
            {categories.items.map((item: CategoriesItems, i:number) => (
              <div key={i}>
                <li> {item.title} </li>
                <button onClick={deleteCategory} data-id={item.id}>Eyða</button>
                <button>Breyta</button>
              </div>
            ))}
          </ul>
          <p>Bæta við flokki</p>
          <form method="post">
            <Input
              label="Flokkur"
              name="categories"
              type="text"
              onChange={onChangeCategoryForm}
            />
            <Button onClick={submit}>Bæta við flokki</Button>
          </form>

        </Layout>
      </>
  );
}

export const getServerSideProps = async () => {
  const res = await fetch('https://vef2-2022-h1-synilausn.herokuapp.com/categories');
  const categories = (await res.json()) as Categories;
  return !categories ? { notFound: true } : {
    props: { categories },
  };
};
