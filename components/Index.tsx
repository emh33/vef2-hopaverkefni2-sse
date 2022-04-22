import Image from 'next/image';
import s from './Index.module.scss';

export function Index(): JSX.Element {
  return (
    <div className={s.index} >
        <div className={s.index__text}>
          <p>Endilega skoðið matseðill okkar hann er rosa ljúffengur !</p>
        </div>
        <div className={s.index__img}>
        <Image
     // eslint-disable-next-line max-len
        src={'https://res.cloudinary.com/dhy3vquyz/image/upload/v1646263923/vef2-2022-h1/pinar-kucuk-Ae7jQFDTPk4-unsplash.jpg'}
        width = {500} height= {500}
        />
        </div>
      </div>
  );
}
