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
export function UserContext({ children }: any) : JSX.Element {
  const [user, setUser] = useState<User | null>(null);
  const [loggedin, setLoggedin] = useState<boolean>(false);

  useEffect(() => {
    const localUser = JSON.parse(localStorage.getItem('user') || 'null');
    setUser(localUser?.user);
    if (localUser !== null) {
      setLoggedin(true);
    } else {
      setLoggedin(false);
    }
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
