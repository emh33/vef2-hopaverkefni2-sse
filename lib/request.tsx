/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { CategoriesItems, User } from '../types/index';

const BASE_URL = 'https://vef2-2022-h1-synilausn.herokuapp.com/';

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

const findTOKEN = () => {
  const localUser = JSON.parse(localStorage.getItem('user') || 'null');
  let token = 'null';
  if (localUser !== 'null') {
    token = localUser.token;
  }
  return token;
};

export const postCategories = async ({ title }:CategoriesItems) => {
  const token = findTOKEN();
  const response = await fetch(`${BASE_URL}categories`, {
    method: 'POST',
    body: JSON.stringify({ title }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  // Ef ekki gengur að ná setja in category á að taka user af localstorage
  if (!response.ok) {
    await localStorage.setItem('user', 'null');
    const message = await response.json();
    return ({ message });
  }

  const catagory : CategoriesItems = await response.json();
  return ({ catagory });
};

export const deleteCategories = async (id:string) => {
  const token = findTOKEN();
  const response = await fetch(`${BASE_URL}categories/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    await localStorage.setItem('user', 'null');
    const message = await response.json();
    return ({ message });
  }

  return true;
};
