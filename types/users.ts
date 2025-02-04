export interface User {
  id?: string;
  name?: string;
  username?: string;
  email?: string;
  phoneNumber?: string;
  phone?: string;
  joinedDate?: string;
  location?: string;
  platform?: string;
  avatar?: string;
  date?: string;
  accounts?:Account[]
}
export  type Account ={
  id:string,
  name:string,
  role?:role
}
export type role={
  id: string,
  name:string
}

export type User_Info={
  userName:string|null,
  accountId:string|null,
  roleId:string|null,
  roleName:string|null,
  token?:string|null
}

export type SortField = 'name' | 'email' | 'joinedDate' | 'location';
