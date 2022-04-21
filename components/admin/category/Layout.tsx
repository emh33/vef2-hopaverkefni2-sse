/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { deleteCategories, patchCategories, postCategories } from '../../../lib/request';
import { Categories, CategoriesItems } from '../../../types';
import { Button } from '../../form/Button';
import { AdminButton } from '../Button';
import { InputAdmin } from '../input';
import s from './Layout.module.scss';

export function AdminCategoryLayout({ categories }:any): JSX.Element {
  const { items } = (categories) as Categories;
  const [newCategory, setNewCategory] = useState('');
  const [category, setCategory] = useState<CategoriesItems[]>(items);
  const [editValues, setEditValues] = useState<CategoriesItems[]>(items);

  const onChangeCategoryForm = (e: React.ChangeEvent<HTMLInputElement>):void => {
    setNewCategory(e.target.value);
  };

  const changeHandler = (index:number) => (e:React.ChangeEvent<HTMLInputElement>) => {
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
    }
    setNewCategory('');
  };

  const deleteCategory = async (e:any) : Promise <void> => {
    e.preventDefault();
    const id = e.target.value;
    const req = await deleteCategories(id);
    if (req) {
      setCategory(category.filter((item) => item.id !== Number(id)));
      setEditValues(editValues.filter((item) => item.id !== Number(id)));
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
    const patch = await patchCategories({ title: value, id });
    if (!patch) {
      console.warn(patch);
    }

    setCategory(
      category.map((item) => (item.id === Number(id)
        ? { ...item, title: value }
        : item)),
    );
  };

  return (
      <div className={s.layout} >
        <div className={s.layout__container}>
            <div className={s.layout__container__items}>
            <p className={s.layout__container__items__title}>EYÐA</p>
            {category.map((item: CategoriesItems, i:number) => (
              <div key={i} className={s.layout__container__items__delete}>
                <p>{item.title}</p>
                <AdminButton value={item.id} onClick={deleteCategory}>Eyða</AdminButton>
              </div>
            ))}
            </div>
            <div className={s.layout__container__items}>
            <p className={s.layout__container__items__title}>BREYTA</p>
            {editValues.map((item: CategoriesItems, i:number) => (
                <div key={i}>
                  <form method="post" className={s.layout__container__items__edit}>
                    <InputAdmin
                    value={item.title}
                    name="title"
                    type="text"
                    onChange={changeHandler(item.id)}/>
                    <AdminButton value={item.id} onClick={editCategory}>Breyta</AdminButton>
                  </form>
                </div>
            ))}
            </div>
            <div className={s.layout__container__items}>
            <p className={s.layout__container__items__title}>BÆTA VIÐ</p>
                <form method="post" >
                  <InputAdmin
                    value={newCategory}
                    name="categories"
                    type="text"
                    onChange={onChangeCategoryForm}
                  />
                  <Button onClick={addCategory}>Bæta við flokki</Button>
                </form>
            </div>
        </div>
    </div>
  );
}
