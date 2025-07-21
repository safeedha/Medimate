
import jwt from 'jsonwebtoken'
import { ILogin } from "../../../domain/useCaseInterface/auth/IAdminLogin";

export class Login implements ILogin{
  constructor(){

  }
  async login(email:string, password:string):Promise< {
   message:string
  refreshToken?: string;
  accessToken?: string;
}>
  {
    if(email==="admin@gmail.com"&&password==="admin@123")
    {
       const accessToken = jwt.sign(
        { email: email, role: 'admin' },  // or 'user'
        process.env.JWT_SECRET!,
        { expiresIn: '15m' }
      );

      const refreshToken = jwt.sign(
        { email: email, role: 'admin' },  // or 'user'
        process.env.JWT_REFRESH_SECRET!,
        { expiresIn: '7d' }
      );
      return {
        message:"admin login sucessfull",
        accessToken:accessToken,
        refreshToken:refreshToken
        

      }
    }
    else{
      return {
        message:"invalid credential"
      }
    }
  }
}