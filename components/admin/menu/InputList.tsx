import { Input } from '../../form/Input';

type Props = {
  label: string[],
  name:string[],
  type: string[],
  onChange:React.ChangeEventHandler<HTMLInputElement>
};

export function InputList({
  label, name, type, onChange,
}:Props): JSX.Element {
  return (
  <>
    {label.map((item, i) => (
    <Input
      key={i}
      label={label[i]}
      name={name[i]}
      type={type[i]}
      onChange={onChange}
      />
    ))}
  </>
  );
}
