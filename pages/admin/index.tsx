import { InferGetServerSidePropsType } from 'next';
import Router from 'next/router';
import {
  useCallback, useContext, useEffect, useRef, useState,
} from 'react';
import { AdminButton } from '../../components/admin/Button';
import { Button } from '../../components/form/Button';
import { Input } from '../../components/form/Input';
import { Layout } from '../../components/layout/Layout';
import { NavBar } from '../../components/layout/NavBar';
import { Login } from '../../components/user/Login';
import { deleteCategories, patchCategories, postCategories } from '../../lib/request';
import { AppContext } from '../../lib/userContext';
import { Categories, CategoriesItems } from '../../types';

export default function Admin(
  { categories } : InferGetServerSidePropsType<typeof getServerSideProps>,
): JSX.Element {
  // ATH hvort við erum admin
  // setja sem : Ef reynt er að skoða síðu sem ekki er heimild
  // til að skoða skal birta að ekki sé heimild til að skoða.
  const { loggedin, user } = useContext(AppContext);
  useEffect(() => {
    if (!loggedin && !user) {
      Router.push('/admin/login');
    }
  }, [loggedin, user]);

  const { items } = (categories) as Categories;
  const [newCategory, setNewCategory] = useState('');
  const [category, setCategory] = useState<CategoriesItems[]>(items);
  const [editValues, setEditValues] = useState<CategoriesItems[]>(items);

  const onChangeCategoryForm = (e: React.ChangeEvent<HTMLInputElement>):void => {
    setNewCategory(e.target.value);
  };

  const changeHandler = (index:any) => (e: any) => {
    const { name, value } = e.target;
    setEditValues(
      editValues.map((item) => (index === item.id
        ? { ...item, [name]: value }
        : item)),
    );
  };

  const addCategory = async () : Promise <void> => {
    const post = await postCategories({ title: newCategory });
    if (post) {
      const { id, title } = post;
      setCategory((prevArray) => [...prevArray, { id, title }]);
      setEditValues((prevArray) => [...prevArray, { id, title }]);
    } else {
      Router.reload();
    }
  };

  const deleteCategory = async (e:any) : Promise <void> => {
    e.preventDefault();
    const id = e.target.value;
    const req = await deleteCategories(id);
    if (req) {
      setCategory(category.filter((item) => item.id !== Number(id)));
      setEditValues(editValues.filter((item) => item.id !== Number(id)));
    } else {
      Router.reload();
    }
  };

  const editCategory = async (e:any) : Promise <void> => {
    e.preventDefault();
    const { target } = e;
    const id = target.value;
    console.info(id);
    let value = '';
    editValues.forEach((item) => {
      if (item.id === Number(id)) {
        value = item.title;
      }
    });
    console.info(value);
    const patch = await patchCategories({ title: value, id });
    console.log(patch);

    setCategory(
      category.map((item) => (item.id === Number(id)
        ? { ...item, title: value }
        : item)),
    );
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
            {category.map((item: CategoriesItems, i:number) => (
              <div key={i}>
                <div>
                    <div>{item.title}
                      <span><button value={item.id} onClick={deleteCategory}>Eyða</button></span>
                    </div>
                </div>
              </div>
            ))}
            {editValues.map((item: CategoriesItems, i:number) => (
                <div key={i}>
                  <form method="post">
                    <input value={item.title} name="title" onChange={changeHandler(item.id)}/>
                    <button value={item.id} onClick={editCategory}>Breyta</button>
                  </form>
                </div>
            ))}
          </ul>
          <form method="post">
            <Input
              label="Flokkur"
              name="categories"
              type="text"
              onChange={onChangeCategoryForm}
            />
            <Button onClick={addCategory}>Bæta við flokki</Button>
          </form>
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
