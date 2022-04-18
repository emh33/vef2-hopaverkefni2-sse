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
