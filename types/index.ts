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
  id:string,
  created:string,
  lines?:LinesItem[]
};

export type CartContextType = {
  cart: Cart | null,
  counter: () => void;
  cartCounter: string,
};
export type LinesItem = {
  id: number,
  product_id: number,
  title: string,
  description: string,
  image: string,
  category: number,
  quantity: number,
  price: number,
  total: number
};
export type CartItem = {
  id: number,
  product_id: number,
  cart_id: number,
  quantity: number
};

export type Menu = {
  limit: number,
  offset: number,
  items: MenuItems[],
  _links:LinksType
};

export type MenuItems = {
  id:number,
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
