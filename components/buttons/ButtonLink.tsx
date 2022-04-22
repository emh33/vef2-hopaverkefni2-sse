import classnames from 'classnames';
import Link from 'next/link';
import s from './ButtonLink.module.scss';

type Props = {
  children: React.ReactNode;
  href:string,
  disabled?: boolean;
};

export function ButtonLink({ children, href, disabled = false }:Props): JSX.Element {
  return (
      <button
      className={classnames(s.buttonLink, { [s.disabled]: disabled })}
        disabled={disabled}
        type="button">
            <Link href={href}>{children}</Link>
       </button>
  );
}
