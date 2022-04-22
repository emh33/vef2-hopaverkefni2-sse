import React from 'react';
import s from './menuListItem.module.scss';

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onClick?: any;
  value?:number | string,
  name?:string,
};
export default function AddToCart({
  onClick, value, name,
}: Props) : JSX.Element {
  return (
    <div className={s.addCartWrapper}>
      <button
      className={s.addCartButton}
      onClick={onClick}
      value={value}
      name={name}>
        Setja í körfu</button>
    </div>
  );
}
