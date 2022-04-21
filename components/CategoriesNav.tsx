import Link from 'next/link';
import s from './categoryNav.module.scss';

type Props = any;

export function CategoriesNav({ category }: Props): JSX.Element {
  return (
    <Link href={`/categories/${category.id.toString()}`}>
      <li className={s.catLink} >{category.title}</li>
    </Link>
  );
}
