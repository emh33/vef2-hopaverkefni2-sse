import s from './menuListItem.module.scss';

type Props = any;

export function MenuListItem({ item }: Props): JSX.Element {
  return (
    <li>
      <div>
        <p>{item.title}</p>
        <p>{item.description}</p>
      </div>
    </li>
  );
}
