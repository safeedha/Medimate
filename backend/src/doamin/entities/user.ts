export interface Iuser{
  _id?:string,
  firstname:string,
  lastname?:string,
  email:string,
  password?:string,
  phone:string|null,
  googleIds?:string|null,
  isBlocked:boolean,
  googleVerified?:boolean,
  gender?:"male"|"female"|"other"
}