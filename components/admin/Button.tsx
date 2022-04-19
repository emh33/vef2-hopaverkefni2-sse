import classnames from 'classnames';
import { ButtonHTMLAttributes } from 'react';
import s from './Button.module.scss';

type Props = {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLElement>,
  disabled?: boolean;
};

export function AdminButton({ children, onClick, disabled = false }: Props): JSX.Element {
  return (
    <button
      className={classnames(s.button, { [s.disabled]: disabled })}
      disabled={disabled}
      type="button"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
