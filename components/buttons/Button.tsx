import classnames from 'classnames';
import s from './Button.module.scss';

type Props = {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLElement>,
  value?:number | string,
  disabled?: boolean;
};

export function AdminButton({
  children, onClick, value, disabled = false,
}: Props): JSX.Element {
  return (
    <button
      className={classnames(s.button, { [s.disabled]: disabled })}
      disabled={disabled}
      type="button"
      onClick={onClick}
      value={value}
    >
      {children}
    </button>
  );
}
