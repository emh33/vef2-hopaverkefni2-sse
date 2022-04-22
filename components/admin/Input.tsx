import s from './Input.module.scss';

type Props = {
  name:string,
  type: string,
  value:string,
  onChange?: React.ChangeEventHandler<HTMLInputElement>
};

export function Input({
  name, value, type, onChange,
}:Props): JSX.Element {
  return (
    <div className={s.input}>
      <input type={type} name={name} id={name} value={value} onChange={onChange} />
    </div>
  );
}
