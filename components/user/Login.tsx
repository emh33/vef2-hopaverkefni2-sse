import Link from 'next/link';
import Router from 'next/router';
import { useContext } from 'react';
import { AppContext } from '../../lib/userContext';

export function Login():JSX.Element {
  const context = useContext(AppContext);

  const onLogout = (e:React.MouseEvent<HTMLButtonElement>):void => {
    e.preventDefault();
    context.logoutUser();
    Router.push('/');
  };

  if (context.loggedin) {
    return (
      <>
        <p>
          Þú ert skráður inn sem <strong>{context.user?.username}</strong>
        </p>
        <p>
        <Link href="/admin">Fara á starfsmannavef</Link>
      </p>
        <button type="button" onClick={onLogout}>Útskrá</button>
      </>
    );
  }

  return (
    <>
      <p>
        <Link href="/admin/login">Innskráning starfsmanna</Link>
      </p>
    </>
  );
}
