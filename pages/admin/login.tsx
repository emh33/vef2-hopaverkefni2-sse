import { useContext, useState } from 'react';
import { Button } from '../../components/form/Button';
import { Errors as ErrorsComponent } from '../../components/form/Errors';
import { Input } from '../../components/form/Input';
import { Layout } from '../../components/layout/Layout';
import { postLogin } from '../../lib/request';
import { AppContext } from '../../lib/state';
import { Login as LoginComponent } from '../../components/user/Login';
import { NavBar } from '../../components/layout/NavBar';

export default function Login(): JSX.Element {
  const context = useContext(AppContext);
  const [username, setUSername] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setError] = useState<string[]>([]);
  const onChangeUsername = (e: React.ChangeEvent<HTMLInputElement>):void => {
    setUSername(e.target.value);
    console.info(username);
  };

  const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>):void => {
    setPassword(e.target.value);
  };

  const submit = async () : Promise <void> => {
    const login = await postLogin({ username, password });
    if (login.user) {
      console.warn(login.user);
      context.newUser(login.user.user);
      setError([]);
      /// router.push('/');
    }

    if (login.message) {
      setError(login.message.errors.map((error:any) => error.msg));
      console.info(errors);
    }
  };

  return (
    <>
      <Layout
        title="Veitingarstaðurinn Góði"
        header={(<NavBar cartItems={0}/>)}
        footer={(
          <LoginComponent />
        )}
      >
        <div>
          <h2>Innskráning starfsmanna</h2>
          <form method="post">
            <Input
              label="Notendanafn"
              name="username"
              type="text"
              onChange={onChangeUsername}
            />
            <Input
              label="Lykilorð"
              name="password"
              type="password"
              onChange={onChangePassword}
            />
            <Button onClick={submit}>Innskrá</Button>
          </form>
          <ErrorsComponent errors={errors}/>
        </div>
      </Layout>
    </>
  );
}
