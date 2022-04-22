import { MenuItems } from '../../types';
import s from './Select.module.scss';

type Props = {
  label: string,
  name:string,
  type: string,
  onChange: React.ChangeEventHandler<HTMLInputElement>
  list:MenuItems[]
};

export function Input({
  label, name, list,
}:Props): JSX.Element {
  return (
    <div className={s.select}>
      <label htmlFor={name}>{label}:</label>
      <select name={name}>
        {list.map((item:MenuItems, i:number) => (
            <option key={i} value={item.title}>{item.title}</option>
        ))}
        </select>
    </div>
  );
}
