import Link from 'next/link';
import { useContext } from 'react';
import { AppContext } from '../../lib/state';

export function Login():JSX.Element {
  const context = useContext(AppContext);

  const onLogout = (e:React.MouseEvent<HTMLButtonElement>):void => {
    e.preventDefault();
    context.logoutUser();
  };

  if (context.loggedin) {
    return (
      <>
        <p>
          Þú ert skráður inn sem <strong>{context.user?.username}</strong>
        </p>
        <button type="button" onClick={onLogout}>Útskrá</button>
      </>
    );
  }

  return (
    <>
      <p>
        <Link href="/">Forsíða</Link>
      </p>
      <p>
        <Link href="/users/login">Innskráning starfsmanna</Link>
      </p>
    </>
  );
}
