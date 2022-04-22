import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import router from 'next/router';
import { useContext, useState } from 'react';
import Image from 'next/image';
import { AdminButton } from '../../components/admin/Button';
import { Button } from '../../components/form/Button';
import { Layout } from '../../components/layout/Layout';
import { NavBar } from '../../components/layout/NavBar';
import { Login } from '../../components/user/Login';
import { deleteOnMenu, getPageMenu, postMenu } from '../../lib/request';
import { AppContext } from '../../lib/userContext';
import {
  Categories, LinksType, Menu as GetMenu, MenuItems,
} from '../../types';
import { InputList } from '../../components/admin/menu/InputList';

export default function Menu(
  { menu, categories } : InferGetServerSidePropsType<typeof getServerSideProps>,
): JSX.Element {
  const { loggedin } = useContext(AppContext);
  const { items: itemsMenu, _links: menuLinks } = (menu) as GetMenu;
  const { items: itemCategory } = (categories) as Categories;

  const [menuRes, setMenuRes] = useState<GetMenu>(menu);
  const [menuList, setMenuList] = useState<MenuItems[]>(itemsMenu);
  const [editValues, setEditValues] = useState<MenuItems[]>(itemsMenu);
  const [pageLinks, setPageLinks] = useState< LinksType >(menuLinks);
  const [newOnMenu, setNewOnMenu] = useState({
    category: '',
    description: '',
    image: '',
    price: '',
    title: '',
  });

  const addItem = async () : Promise <void> => {
    const post = await postMenu(newOnMenu);
    console.info(post);
    /* const post = await postCategories({ title: newCategory });
    if (post) {
      const { id, title } = post;
       setCategory((prevArray) => [...prevArray, { id, title }]);
       setEditValues((prevArray) => [...prevArray, { id, title }]);
    }
     setNewCategory(''); */
  };

  const deleteItem = async (e:any) : Promise <void> => {
    e.preventDefault();
    const id = e.target.value;
    const req = await deleteOnMenu(id);
    if (req) { setMenuList(menuList.filter((item) => item.id !== Number(id))); }
    if (!req) { router.push('/'); }
  };

  const editItem = async (e:any) : Promise <void> => {
    e.preventDefault();
    const { target } = e;
    const id = target.value;
    let value = '';
    editValues.forEach((item) => {
      if (item.id === Number(id)) {
        value = item.title;
      }
    });
    // const patch = await patchCategories({ title: value, id });
  };

  const changeHandler = () => (e:any) => {
    const { name } = e.target;
    let { value } = e.target;
    console.log(name);
    if (name === 'image') {
      value = e.target?.files[0];
      console.log(value);
    }

    setNewOnMenu((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(newOnMenu);
  };

  const pageHandler = async (e: any):Promise<void> => {
    const { value } = e.target;
    if (value === 'next') {
      const res = await
      getPageMenu(`menu?offset=${menuRes.offset + menuRes.limit}&limit=${menuRes.limit}`);
      if (res) {
        const { pageMenu, link, pagesMenu } = res;
        setMenuList(pageMenu);
        setPageLinks(link);
        setMenuRes(pagesMenu);
      }
    }
    if (value === 'prev') {
      const res = await
      getPageMenu(`menu?offset=${Number(menuRes.offset) - menuRes.limit}&limit=${menuRes.limit}`);
      if (res) {
        const { pageMenu, link, pagesMenu } = res;
        setMenuList(pageMenu);
        setPageLinks(link);
        setMenuRes(pagesMenu);
      }
    }
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
        {loggedin && (
          <div>
              <div>
                {menuList.map((item: MenuItems, i:number) => (
                <div key={i}>
                <p>{item.title}</p>
                <p>{item.description}</p>
                <p>{item.price}.kr</p>
                <Image src={item.image} width = {200} height= {200} />
                <AdminButton value={item.id} onClick={deleteItem}>Eyða</AdminButton>

                <form method="post">
                  <InputList
                  label={['Nafn á vöru', 'Verð í krónum', 'Lýsing á vöru']}
                  name={['title', 'price', 'description']}
                  type={['text', 'number', 'text']}
                  onChange={changeHandler()}
                  />

                 <label htmlFor="category"> Flokkur </label>
                  <select name="category"
                   onChange={changeHandler()} >
                    {itemCategory.map((categoryItem, numb:number) => (
                        <option key={numb} value={categoryItem.id}>{categoryItem.title}</option>
                    ))}
                  </select>
                  <input type="file"
                  id="image" name="image"
                  accept="image/png, image/jpeg" required
                  onChange={changeHandler()}></input>
                <AdminButton value={item.id} onClick={editItem}>Breyta</AdminButton>
              </form>

                </div>
                ))}

                {pageLinks.prev && (
                   <AdminButton value='prev' onClick={pageHandler}>Fyrri síða</AdminButton>
                )}
                {pageLinks.next && (
                  <AdminButton value='next' onClick={pageHandler}>Næsta síða</AdminButton>
                )}
              </div>
              <form method="post">
                <InputList
                label={['Nafn á vöru', 'Verð í krónum', 'Lýsing á vöru']}
                name={['title', 'price', 'description']}
                type={['text', 'number', 'text']}
                onChange={changeHandler()}
                />
                 <label htmlFor="category"> Flokkur </label>
                  <select name="category"
                   onChange={changeHandler()} >
                    {itemCategory.map((item, i:number) => (
                        <option key={i} value={item.id}>{item.title}</option>
                    ))}
                  </select>
                  <input type="file"
                  id="image" name="image"
                  accept="image/png, image/jpeg" required
                  onChange={changeHandler()}></input>
                <Button onClick={addItem}>Bæta við vöru</Button>
              </form>
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
  const resMenu = await fetch('https://vef2-2022-h1-synilausn.herokuapp.com/menu');
  const menu: GetMenu = (await resMenu.json()) as GetMenu;
  const resCategory = await fetch('https://vef2-2022-h1-synilausn.herokuapp.com/categories');
  const categories: Categories = (await resCategory.json()) as Categories;
  return !menu && !categories ? { notFound: true } : {
    props: { menu, categories },
  };
};
