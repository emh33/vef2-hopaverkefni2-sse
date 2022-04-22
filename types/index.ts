export type User = {
  id?:number,
  username:string,
  email?:string,
  password?:string,
  admin?:boolean,
  created?:string,
  updated?:string
};

export type UserLogin = {
  user:User,
  token:string,
  expiresIn:string
};

export type UserContextType = {
  loggedin:boolean;
  user: User | null;
  newUser: (user: User | null) => void;
  logoutUser: () => void;
};

export type Categories = {
  limit: number,
  offset: number,
  items: CategoriesItems[],
  _links:{
    self:{
      href:string
    }
  }
};

export type CategoriesItems = {
  id:number,
  title:string
};

export type Cart = {
  id?:string
};

export type CartContextType = {
  cart: Cart | null
};

export type Menu = {
  limit: number,
  offset: number,
  items: MenuItems[],
  _links:LinksType
};

export type MenuItems = {
  id?:number,
  title:string,
  price:number,
  description:string,
  image:string,
  category:number,
  created?:string,
  updated?:string
};

export type LinksType = {
  self:{
    href:string
  }
  next?:{
    href:string
  }
  prev?:{
    href:string
  }
};

export type OrdersType = {
  limit: number,
  offset: number,
  items: OrdersItems[],
  _links:LinksType
};

export type OrdersItems = {
  id:string,
  created:string,
  current_state:string,
  current_state_created:string,
};
