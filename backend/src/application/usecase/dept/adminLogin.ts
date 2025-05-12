import {AdminResponse} from '../../../interfaces/repository/adminresponse'
import jwt from 'jsonwebtoken'

export class Login{
  constructor(){

  }
  async login(email:string, password:string):Promise<AdminResponse>
  {
    if(email==="admin@gmail.com"&&password==="admin@123")
    {
      const accesstoken=jwt.sign({email:email},process.env.JWT_SECRET!, { expiresIn: "15m" });
      const refreshtoken=jwt.sign({email:email }, process.env.JWT_REFRESH_SECRET!, { expiresIn: "7d" })
      return {
        message:"admin login sucessfull",
        accessToken:accesstoken,
        refreshToken:refreshtoken
        

      }
    }
    else{
      return {
        message:"invalid credential"
      }
    }
  }
}