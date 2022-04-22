import classnames from 'classnames';
import s from './Button.module.scss';

type Props = {
  children: React.ReactNode;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick?: any;
  disabled?: boolean;
  value?:number | string,
  name?:string,
};

export function Button({
  children, onClick, disabled = false, value, name,
}: Props): JSX.Element {
  return (
    <button
      className={classnames(s.button, { [s.disabled]: disabled })}
      disabled={disabled}
      type="button"
      onClick={onClick}
      value={value}
      name={name}
    >
      {children}
    </button>
  );
}
