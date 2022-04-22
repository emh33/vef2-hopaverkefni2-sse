import Image from 'next/image';
import s from './menuListItem.module.scss';
import AddToCart from './AddToCartButton';

type Props = any;

export function MenuListItem({ item }: Props): JSX.Element {
  return (
    <li className={s.menuItem}>
      <div className={s.menuImgWrapper}>
        <Image className={s.menuImg} src={item.image} layout='fill' />
      </div>
      <p className={s.menuItemTitle}>{item.title}</p>
      <p className={s.menuItemPrice}>{item.price} kr.</p>
      <p className={s.menuItemDesc}>{item.description}</p>
      <AddToCart />
    </li>
  );
}
