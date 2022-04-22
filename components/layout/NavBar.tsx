import Link from 'next/link';
import s from './NavBar.module.scss';

type Props = {
  cartItems:string;
};

export function NavBar({ cartItems }: Props) : JSX.Element {
  return (
    <div className={s.navBar}>
      <ul className={s.navBar__ul}>
      <li className={s.navBar__list}>
        <Link href="/">Veitingarstaðurinn Góði</Link>
      </li>
      <li className={s.navBar__list}>
        <Link href="/menu">Matseðill</Link>
      </li>
     <li className={s.navBar__list}>
        <Link href="/cart" passHref>
        <a href="replace">Karfa {cartItems}</a>
        </Link>
      </li>
      </ul>
    </div>
  );
}
