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
  id?:number,
  title:string
};
