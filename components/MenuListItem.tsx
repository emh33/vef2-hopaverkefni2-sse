import Image from 'next/image';
import { MenuItems } from '../types';
import s from './menuListItem.module.scss';

export function MenuListItem({ item }:{ item:MenuItems }): JSX.Element {
  return (
    <li className={s.menuItem}>
      <div className={s.menuImgWrapper}>
        <Image className={s.menuImg} src={item.image} layout='fill' />
      </div>
      <p className={s.menuItemTitle}>{item.title}</p>
      <p>{item.price}</p>
      <p className={s.menuItemDesc}>{item.description}</p>
    </li>
  );
}
