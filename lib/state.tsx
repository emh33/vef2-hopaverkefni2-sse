import {
  createContext, useContext, useEffect, useState,
} from 'react';
import { User, UserContextType } from '../types';

const defaultUser: User | null = null;
const defaultLoggedin: true | false = false;
export const AppContext = createContext<UserContextType>({
  loggedin: defaultLoggedin,
  user: defaultUser,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  newUser: (user: User | null) => {},
  logoutUser: () => {},
});

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function AppWrapper({ children }: any) : JSX.Element {
  const [user, setUser] = useState<User | null>(null);
  const [loggedin, setLoggedin] = useState<boolean>(false);

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem('user') || 'null');
    setUser(localUser);
    /* async function fetchUser(): Promise <void> {
      const localUser = JSON.parse(localStorage.getItem('user') || 'null');
      let token = 'null';
      if (localUser !== 'null') {
        token = localUser?.token;
      }
      console.info(`Token fundin á localstorage: ${token} `);
      if (token) {
        const res = await fetch('https://vef2-2022-h1-synilausn.herokuapp.com/users/me', {
          headers: {
            'Content-type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        // EF TOKEN er ekki lengur vikur þarf að logga út
        if (!res.ok) {
          await localStorage.setItem('user', 'null');
          setUser(null);
          setLoggedin(false);
        }
        if (res.ok) {
          const result:User = await res.json();
          setUser(result);
          setLoggedin(true);
        }
      }
    }

    fetchUser(); */
  }, []);

  const logoutUser = () : void => {
    localStorage.removeItem('user');
    setUser(null);
    setLoggedin(false);
  };

  const newUser = (sethisUser: User | null) : void => {
    setUser(sethisUser);
    setLoggedin(true);
  };

  return (
      <AppContext.Provider value={{
        loggedin,
        user,
        newUser,
        logoutUser,
      }}
      >
        {children}
      </AppContext.Provider>
  );
}

export function useAppContext() : UserContextType {
  return useContext(AppContext);
}
