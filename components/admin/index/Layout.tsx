import { ButtonLink } from '../ButtonLink';
import s from './Layout.module.scss';

export function AdminLayout() : JSX.Element {
  return (
      <div className={s.layout}>
        <div className={s.layout__group}>
            <p>Búa til, eyða eða breyta:</p>
           <ButtonLink href={'/admin/category'}>Flokkur</ButtonLink>
           <ButtonLink href={'/admin/menu'}>Matseðill</ButtonLink>
        </div>
        <div className={s.layout__group}>
            <p>Skoða lista af pöntunum og velja pöntun:</p>
            <ButtonLink href={'/admin/orders'}>Skoða Pantanir</ButtonLink>
         </div>
        </div>
  );
}
