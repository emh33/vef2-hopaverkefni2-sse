import Link from 'next/link';
import { CategoriesItems } from '../types';
import s from './categoryNav.module.scss';

export function CategoriesNav(
  { category }: { category:CategoriesItems },
): JSX.Element {
  return (
    <Link href={`/categories/${category.id.toString()}`}>
      <li className={s.catLink} >
      {category.title}
      </li>
    </Link>
  );
}
