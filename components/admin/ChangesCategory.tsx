import { useState } from 'react';
import { deleteCategories, patchCategories, postCategories } from '../../lib/request';
import { Categories, CategoriesItems } from '../../types';
import { Button } from '../form/Button';
import { Input } from '../form/Input';

export function AdminCategory({ categories }:any): JSX.Element {
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
    }
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
        </>
  );
}
