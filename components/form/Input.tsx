import s from './Input.module.scss';

type Props = {
  label: string,
  name:string,
  type: string,
  onChange: React.ChangeEventHandler<HTMLInputElement>
};

export function Input({
  label, name, type, onChange,
}:Props): JSX.Element {
  return (
    <div className={s.input}>
      <label htmlFor={name}>{label}:</label>
      <input type={type} name={name} id={name} onChange={onChange} />
    </div>
  );
}
