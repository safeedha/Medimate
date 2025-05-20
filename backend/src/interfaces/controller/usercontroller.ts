import { Request, Response } from 'express';
import { GetDept } from '../../application/usecase/dept/getDept';
import {UserReg} from '../../application/usecase/reg/userreg'
import {UserLog} from '../../application/usecase/reg/userlog'
import {generateOtp} from '../../application/service/otpservice'
import {sendMail} from '../../application/service/emailservice'
import {OtpCretion} from '../../application/usecase/otp/otpcre'
import {OtpVerify} from '../../application/usecase/otp/otpverify'
import {UserPassrest} from '../../application/usecase/reg/resetuser';
import {Getverified} from '../../application/usecase/doctor/getverified'
import {Googleuser} from '../../application/usecase/reg/ugoogle'
import {GetsingleUser} from '../../application/usecase/user/getSingleUser'
import {updatesingleUser } from '../../application/usecase/user/updateUser'
interface CustomRequest extends Request {
  id: string;
}

export class UserController {
  constructor(private getDept: GetDept,private userreg:UserReg,private userlog:UserLog,private otpcration:OtpCretion,private otpverify:OtpVerify,
    private userpasssrest:UserPassrest,private getverified:Getverified,private googleuser:Googleuser,private getsingleuser:GetsingleUser,
    private updatesingleUser:updatesingleUser
  ) {}

  // ← Make sure this method is *inside* the class body
  async getAllDept(req: Request, res: Response): Promise<void> {
    try {
      const result = await this.getDept.getAllDept();
      res.status(200).json(result);
    } catch (error) {
      const errorMessage = error instanceof Error
        ? error.message
        : 'Internal server error';
      res.status(400).json({ message: errorMessage });
    }
  }

  async getAllDoct(req: Request, res: Response):Promise<void>{
     try {
      const department = req.query.department as string | undefined;
      const result = await this.getverified.getAllVerifiedDoctors(department);
      res.status(200).json(result);
    } catch (error) {
      const errorMessage = error instanceof Error
        ? error.message
        : 'Internal server error';
      res.status(400).json({ message: errorMessage });
    }
  }



  async register(req: Request, res: Response): Promise<void> {
    try {
      console.log("request ht")
      const {firstname,
      lastname,
      email,
      phone,
      password,
      gender}=req.body
      console.log(firstname)
      const result= await this.userreg.signup({
        firstname,
        lastname,
        email,
        phone,
        password,
        gender})
      res.status(201).json({ message: 'Registration successful' });
    } catch (error) {
      const errorMessage = error instanceof Error
        ? error.message
        : 'Internal server error';
      res.status(400).json({ message: errorMessage });
    }
  }




async login(req: Request, res: Response): Promise<void> {
  try {
    const { email, password } = req.body;
    const result = await this.userlog.login({ email, password });

    // Set access token in cookie with custom name
    res.cookie("accessusertoken", result.accessToken, {
      httpOnly: true,
      secure: false, // true in production
      maxAge: 15 * 60 * 1000, // 15 minutes
    });

  
    res.cookie("refreshusertoken", result.refreshToken, {
      httpOnly: true,
      secure: false, // true in production
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(200).json({
      message: 'Login successful',
      user: result.user
    });

  } catch (error) {
    const errorMessage = error instanceof Error
      ? error.message
      : 'Internal server error';
    res.status(400).json({ message: errorMessage });
  }
}




  async sendOtp(req: Request, res: Response): Promise<void> {
    try {
      const { email } = req.body;
      const otp = generateOtp();
      await this.otpcration.createOtp(email, otp);

      await sendMail(email, otp);
       
      res.status(200).json({ message: 'OTP sent successfully' });
    } catch (error) {
      
      const errorMessage = error instanceof Error
        ? error.message
        : 'Internal server error';
       console.log(errorMessage)
      res.status(400).json({ message: errorMessage });
    }
  }



  async verifyOtp(req: Request, res: Response): Promise<void> {
    try {
       const { email, otp } = req.body;
       const isValid = await this.otpverify.verifyOtp(email, otp);
        res.status(200).json({ message: 'OTP verified successfully' });
     
    } catch (error) {
      const errorMessage = error instanceof Error
        ? error.message
        : 'Internal server error';
      res.status(400).json({ message: errorMessage });
    }
  }



  async resetPassword(req: Request, res: Response):Promise<void>{
     try{
          const { email, password } = req.body
          const response =await this.userpasssrest.passwordrest(email,password)
          res.status(200).json(response)
     }
     catch(error)
     {
        if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Unexpected error occurred during user registration");
     }
  }


 async googleLogin(req: Request, res: Response):Promise<void>{
     try{
          const {credential} = req.body
          console.log(credential)
          const result =await this.googleuser.login(credential)
           res.cookie("accessusertoken", result.accessToken, {
            httpOnly: true,
            secure: false, // true in production
            maxAge: 15 * 60 * 1000, // 15 minutes
          });

  
          res.cookie("refreshusertoken", result.refreshToken, {
            httpOnly: true,
            secure: false, // true in production
            maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
          });

          res.status(200).json({ message: 'Login successful', user: result.user });
     }
     catch(error)
     {
        if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Unexpected error occurred during user registration");
     }
  }


  async getUserdetail(req:CustomRequest, res: Response):Promise<void>{
    try{
        const id=req.id
        console.log("hell")
        console.log(id)
        const result=await this.getsingleuser.getsingleUser(id)
        console.log(result)
        res.status(200).json({ message: 'get single user', user: result})
    }
    catch(error)
    {
          if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Unexpected error occurred during getting single user");
    }
  }


  async updateUserdetail(req:CustomRequest, res: Response):Promise<void>{
    try{
        const id=req.id
       const {firstname,lastname,phone,age,gender}=req.body
       const result=await this.updatesingleUser.updatesingleUser(id,firstname,lastname,phone,age,gender)
       res.status(200).json({message:"updation successfull"})
    }
    catch(error)
    {
          if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Unexpected error occurred during getting single user");
    }
  }


  

}
