import React, { useContext } from 'react';
import s from './menuListItem.module.scss';

export default function AddToCart() {
  return (
    <div className={s.addCartWrapper}>
      <button className={s.addCartButton}>Setja í körfu</button>
    </div>
  );
}
