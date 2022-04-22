import router from 'next/router';
import Image from 'next/image';
import { useState } from 'react';
import {
  deleteOnMenu, getPageMenu, patchMenu, postMenu,
} from '../../../lib/request';
import {
  Categories, LinksType, Menu as GetMenu, MenuItems,
} from '../../../types';
import { Button } from '../../form/Button';
import { InputList } from './InputList';
import s from './Layout.module.scss';
import { ButtonPage } from '../../buttons/ButtonPage';
import { Errors as ErrorsComponent } from '../../form/Errors';

export function AdminMenuLayout({ menu, categories } : any): JSX.Element {
  const { items: itemsMenu, _links: menuLinks } = (menu) as GetMenu;
  const { items: itemCategory } = (categories) as Categories;

  const [menuRes, setMenuRes] = useState<GetMenu>(menu);
  const [menuList, setMenuList] = useState<MenuItems[]>(itemsMenu);
  const [errors, setError] = useState<string[]>([]);
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
    if (post.data) {
      setError([]);
      const res = await
      getPageMenu(`menu?offset=${menuRes.offset}&limit=${menuRes.limit}`);
      if (res) {
        const { pageMenu, link, pagesMenu } = res;
        setMenuList(pageMenu);
        setPageLinks(link);
        setMenuRes(pagesMenu);
      }
    }
    if (post.message) {
      setError(post.message.errors.map((error: { msg: string; }) => error.msg));
    }
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
    let editMenu = editValues[0];
    editValues.forEach((item:MenuItems) => {
      if (item.id === Number(id)) {
        editMenu = item;
      }
    });
    const patch = await patchMenu(editMenu);
    console.log(`patch${patch.editMenu}`);

    setMenuList(
      menuList.map((item) => (item.id === Number(id)
        ? editMenu
        : item)),
    );
  };

  const changeHandlerNewMenu = () => (e:any) => {
    const { name } = e.target;
    let { value } = e.target;
    if (name === 'image') {
      value = e.target?.files[0];
    }
    setNewOnMenu((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const changeHandlerEditMenu = (index:number) => (e:any) => {
    const { name } = e.target;
    let { value } = e.target;
    if (name === 'image') {
      value = e.target?.files[0];
    }
    setEditValues(
      editValues.map((item) => (index === item.id
        ? { ...item, [name]: value }
        : item)),
    );
  };

  const pageHandler = async (e: any):Promise<void> => {
    const { value } = e.target;
    if (value === 'next') {
      const res = await
      getPageMenu(`menu?offset=${menuRes.offset + menuRes.limit}&limit=${menuRes.limit}`);
      if (res) {
        const { pageMenu, link, pagesMenu } = res;
        setMenuList(pageMenu);
        setEditValues(pageMenu);
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
        setEditValues(pageMenu);
        setPageLinks(link);
        setMenuRes(pagesMenu);
      }
    }
  };
  return (
    <div className={s.layout} >
        <div className={s.layout__menulist}>
            {menuList.map((item: MenuItems, i:number) => (
            <div key={i} className={s.layout__menulist__changes}>
            <div className={s.layout__menulist__item}>
                <div className={s.layout__menulist__item__delete}>
                    <Image src={item.image} width = {400} height= {400} />
                </div>
                <div className={s.layout__menulist__item__delete}>
                    <p>{item.title}</p>
                    <p>{item.description}</p>
                    <p>{item.price}.kr</p>

                    <Button value={item.id} onClick={deleteItem}>Eyða</Button>
                </div>
            </div>
            <div className={s.layout__menulist__item}>
              <form method="post">

                  <InputList
                  label={['Nafn á vöru', 'Verð í krónum', 'Lýsing á vöru']}
                  name={['title', 'price', 'description']}
                  type={['text', 'number', 'text']}
                  onChange={changeHandlerEditMenu(item.id)}
                  />
                    <label htmlFor="category"> Flokkur </label>
                    <select name="category"
                   onChange={changeHandlerEditMenu(item.id)} >
                    {itemCategory.map((categoryItem, numb) => (
                        <option key={numb} value={categoryItem.id}>{categoryItem.title}</option>
                    ))}
                    </select>
                    <input type="file"
                    id="image" name="image"
                    accept="image/png, image/jpeg"
                    onChange={changeHandlerEditMenu(item.id)}></input>
                    <Button value={item.id} onClick={editItem}>Breyta</Button>
              </form>
            </div>
        </div>
            ))}
            <div className={s.layout__menulist__pagebutton}>
                {pageLinks.prev && (
                   <ButtonPage value='prev' onClick={pageHandler}>Fyrri síða</ButtonPage>
                )}
                {pageLinks.next && (
                  <ButtonPage value='next' onClick={pageHandler}>Næsta síða</ButtonPage>
                )}
            </div>
              </div>
              <form method="post">
                <InputList
                label={['Nafn á vöru *', 'Verð í krónum *', 'Lýsing á vöru']}
                name={['title', 'price', 'description']}
                type={['text', 'number', 'text']}
                onChange={changeHandlerNewMenu()}
                />
                 <label htmlFor="category"> Flokkur *</label>
                  <select name="category"
                   onChange={changeHandlerNewMenu()} >
                    {itemCategory.map((item, i) => (
                        <option key={i} value={item.id}>{item.title}</option>
                    ))}
                  </select>
                  <input type="file"
                  id="image" name="image"
                  accept="image/png, image/jpeg" required
                  onChange={changeHandlerNewMenu()}></input>
                <Button onClick={addItem}>Bæta við vöru</Button>
              </form>
              <ErrorsComponent errors={errors}/>
          </div>
  );
}
