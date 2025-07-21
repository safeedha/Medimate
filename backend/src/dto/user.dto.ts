export interface UserRegisterDTO {
  firstname: string;
  lastname?: string;
  email: string;
  password: string;
  phone: string;
  gender?: "male" | "female" | "other";
  age?: number;
}

export interface UserDTO {
   id?:string;
  _id?: string;              
  firstname: string;
  lastname?: string;
  email: string;
  phone?: string | null;
  googleVerified?: boolean;
  isBlocked?:boolean;
  gender?: "male" | "female" | "other";
  age?: number;
}

export interface UserLoginDTO {
  email: string;
  password: string;
}