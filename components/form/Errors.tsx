import s from './Errors.module.scss';

type Props = {
  errors:string[],
};

export function Errors({ errors }: Props): JSX.Element {
  return (
        <div className={s.errors}>
          {errors.map((e: string, i) => (
            <li key={i}>
              {e}
            </li>
          ))}
        </div>
  );
}
