/* eslint-disable @typescript-eslint/explicit-function-return-type */
import {
  CategoriesItems, Menu, OrdersType, User,
} from '../types/index';

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
    token = localUser?.token;
  }
  return token;
};
export type PostCategory = {
  title:string
};

export const postCategories = async ({ title }:PostCategory) => {
  const token = findTOKEN();
  console.info(token);
  const response = await fetch(`${BASE_URL}categories`, {
    method: 'POST',
    body: JSON.stringify({ title }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  console.info(response);
  // Ef ekki gengur að ná setja in category á að taka user af localstorage
  if (!response.ok) {
    await localStorage.setItem('user', 'null');
    return false;
  }

  const catagory = await response.json();
  return (catagory);
};

export const deleteCategories = async (id:string) => {
  const token = findTOKEN();
  console.info(token);
  const response = await fetch(`${BASE_URL}categories/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    await localStorage.setItem('user', 'null');
    return false;
  }

  return true;
};

export const patchCategories = async ({ title, id }:CategoriesItems) => {
  const token = findTOKEN();
  const response = await fetch(`${BASE_URL}categories/${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ title }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  console.info(response);
  if (!response.ok) {
    // await localStorage.setItem('user', 'null');
    return false;
  }

  const catagory = await response.json();
  return (catagory);
};

export const getPageMenu = async (url : string) => {
  const response = await
  fetch(`${BASE_URL}${url}`, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
    },
  });
  if (!response.ok) {
    // await localStorage.setItem('user', 'null');
    return false;
  }

  const getMenu : Menu = await response.json();

  return ({
    pageMenu: getMenu.items,
    // eslint-disable-next-line no-underscore-dangle
    link: getMenu._links,
    pagesMenu: getMenu,
  });
};

export const deleteOnMenu = async (id:string) => {
  const token = findTOKEN();
  const response = await fetch(`${BASE_URL}menu/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    const message = await response.json();
    if (message.error === 'expired token' || message.error === 'invalid token') {
      await localStorage.setItem('user', 'null');
    }
    return false;
  }
  console.info(response);

  return true;
};

export const postMenu = async ({
  category, description, image, price, title,
// eslint-disable-next-line @typescript-eslint/no-explicit-any
}:any) => {
  const token = findTOKEN();
  const formData = new FormData();
  formData.append('title', title);
  formData.append('price', price);
  formData.append('description', description);
  formData.append('category', category);
  formData.append('image', image);

  const response = await fetch(`${BASE_URL}menu`, {
    method: 'POST',
    body: formData,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const message = await response.json();
    if (message.error === 'expired token' || message.error === 'invalid token') {
      await localStorage.setItem('user', 'null');
    }
    return ({ message });
  }
  const data = await response.json();
  return ({ data });
};

export const patchMenu = async ({
  category, description, image, price, title, id,
// eslint-disable-next-line @typescript-eslint/no-explicit-any
}:any) => {
  const token = findTOKEN();
  const formData = new FormData();
  formData.append('title', title);
  formData.append('price', price);
  formData.append('description', description);
  formData.append('category', category);
  formData.append('image', image);
  const response = await fetch(`${BASE_URL}menu/${id}`, {
    method: 'PATCH',
    body: formData,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    const message = await response.json();
    return ({ message });
  }

  const editMenu: Menu = await response.json();
  return ({ editMenu });
};

export const getPageOrder = async (url : string) => {
  const token = findTOKEN();
  const response = await
  fetch(`${BASE_URL}${url}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    // await localStorage.setItem('user', 'null');
    return false;
  }

  const getOrder : OrdersType = await response.json();

  return ({
    pagesItems: getOrder.items,
    pagesOrder: getOrder,
  });
};

export const postNextState = async (id:string, status:string) => {
  const token = findTOKEN();
  const response = await fetch(`${BASE_URL}orders/${id}/status`, {
    method: 'POST',
    body: JSON.stringify({ status }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  // Ef ekki gengur að ná setja in category á að taka user af localstorage
  if (!response.ok) {
    const message = await response.json();
    console.info(message);
    // await localStorage.setItem('user', 'null');
    return false;
  }

  const orderState = await response.json();
  return (orderState);
};
