import Image from 'next/image';
import { useContext } from 'react';
import { MenuItems } from '../types';
import s from './menuListItem.module.scss';
import AddToCart from './AddToCartButton';
import { postOnCart } from '../lib/request';
import { AppContextCart } from '../lib/cartContext';

export function MenuListItem({ item }:{ item:MenuItems }): JSX.Element {
  const context = useContext(AppContextCart);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const addToCart = async (e:any) : Promise <void> => {
    e.preventDefault();
    const { value: id } = e.target;
    if (context.cart) {
      const post = await postOnCart(id, 1, context.cart.id);
      console.info(post);
      context.counter();
    }
  };
  return (
    <li className={s.menuItem}>
      <div className={s.menuImgWrapper}>
        <Image className={s.menuImg} src={item.image} layout='fill' />
      </div>
      <p className={s.menuItemTitle}>{item.title}</p>
      <p className={s.menuItemPrice}>{item.price} kr.</p>
      <p className={s.menuItemDesc}>{item.description}</p>
      <AddToCart value={item.id} onClick={addToCart}/>
    </li>
  );
}
