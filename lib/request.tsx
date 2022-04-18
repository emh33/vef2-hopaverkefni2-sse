import { User } from '../types/index';

const BASE_URL = 'https://vef2-2022-h1-synilausn.herokuapp.com/';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const postLogin = async ({ username, password }: User) => {
  const response = await fetch(`${BASE_URL}users/login`, {
    method: 'POST',
    body: JSON.stringify({ username, password }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    await localStorage.setItem('user', 'null');
    const message = await response.json();
    return ({ message });
  }

  const user = await response.json();
  await localStorage.setItem('user', JSON.stringify(user));
  return ({ user });
};
