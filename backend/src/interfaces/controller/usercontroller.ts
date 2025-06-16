import { Request, Response } from 'express';
import { GetDept } from '../../application/usecase/dept/getDept';
import {UserReg} from '../../application/usecase/reg/userreg'
import {UserLog} from '../../application/usecase/reg/userlog'
import {generateOtp} from '../../application/service/otpservice'
import {createPayment} from '../../application/service/createpayment'
import {verifypayment} from '../../application/service/verfypayment'
import {sendMail} from '../../application/service/emailservice'
import {OtpCretion} from '../../application/usecase/otp/otpcre'
import {OtpVerify} from '../../application/usecase/otp/otpverify'
import {UserPassrest} from '../../application/usecase/reg/resetuser';
import {Getverified} from '../../application/usecase/doctor/getverified'
import {Googleuser} from '../../application/usecase/reg/ugoogle'
import {GetsingleUser} from '../../application/usecase/user/getSingleUser'
import {updatesingleUser } from '../../application/usecase/user/updateUser'
import {GetSingledoc } from '../../application/usecase/doctor/getSingledoc'
import {GetSlotByDate} from '../../application/usecase/slot/getslotbydate'
import {CreateAppointment} from '../../application/usecase/appoinment/createappoi'
import {GetfutureAppointment} from '../../application/usecase/appoinment/getfuturappoi'
import {GetpastAppointment} from '../../application/usecase/appoinment/getpastappoi'
import {ChangestatusAppointment} from '../../application/usecase/appoinment/changestatus'
import {GetAllmessage} from '../../application/usecase/conversation/getallmessage'
import {StreamToken} from '../../application/usecase/streamtoken/streamtoken'
import {GetUserallet} from '../../application/usecase/wallet/getuserwallet'
import{Getreport} from '../../application/usecase/report/getreport'
import{CreateLockslot} from '../../application/usecase/appoinment/createlockslot'
import {Getallunblockeddept}from '../../application/usecase/dept/getunblocked';
import {Getunreadcount} from '../../application/usecase/conversation/getunreadcount';
interface CustomRequest extends Request {
  id: string;
}

export class UserController {
  constructor(private getDept: GetDept,private userreg:UserReg,private userlog:UserLog,private otpcration:OtpCretion,private otpverify:OtpVerify,
    private userpasssrest:UserPassrest,private getverified:Getverified,private googleuser:Googleuser,private getsingleuser:GetsingleUser,
    private updatesingleUser:updatesingleUser,private getsingledoc:GetSingledoc,private getslotbydate:GetSlotByDate,private createAppointment:CreateAppointment,
    private getfutureAppointment:GetfutureAppointment,private getpastAppointment:GetpastAppointment,private changestatusAppointment:ChangestatusAppointment,
    private getallmessage:GetAllmessage,private streamToken:StreamToken,private getreport:Getreport,private getUserallet:GetUserallet,private createlockslot:CreateLockslot,
    private getallunblockeddept:Getallunblockeddept,private getunreadcount:Getunreadcount
    
  ) {}

 
  async getAllDept(req: Request, res: Response): Promise<void> {
    try {
      console.log('from dept')
      const result = await this.getallunblockeddept.getAllunblockedDept();

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
      const search=req.query.search as string | undefined
       const page = parseInt(req.query.page as string) 
      const limit= parseInt(req.query.limit as string) 
      const result = await this.getverified.getAllVerifiedDoctors(page,limit,department,search);
      res.status(200).json(result);
    } catch (error) {
      const errorMessage = error instanceof Error
        ? error.message
        : 'Internal server error';
      res.status(400).json({ message: errorMessage });
    }
  }

  async getSingleDoct(req: Request, res: Response):Promise<void>{
    try{
      const { id } = req.params;
      const doctor=await this.getsingledoc.getsingledoc(id)
      res.status(200).json(doctor);
    }
    catch(error)
    {
      const errorMessage = error instanceof Error
        ? error.message
        : 'Internal server error';
      res.status(400).json({ message: errorMessage });
    }
  }

  async getSlotedoctor(req: Request, res: Response):Promise<void>{
    try {
      const { id } = req.params;
      const date = req.query.date as Date| undefined;
      if (!date) {
        throw new Error('Date is required');
      }
      const result = await this.getslotbydate.getSlotsByDate(id, new Date(date));
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

    res.cookie("accessusertoken", result.accessToken, {
      httpOnly: true,
      secure: false, // true in production
      maxAge: 15 * 60 * 1000, // 15 minutes
    });

  
    res.cookie("refreshusertoken", result.refreshToken, {
      httpOnly: true,
      secure: false, // true in production
      maxAge: 15 * 60 * 1000,  // 7 days
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

async logout(req: Request, res: Response): Promise<void> {
  try {
    res.clearCookie('accessusertoken',
      { httpOnly: true,
      secure: false, 
    })
      res.clearCookie("refreshusertoken",
      { httpOnly: true,
      secure: false, 
    })
     res.status(200).json({ message: 'Logged out successfully' });

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
      console.log(otp)
      await this.otpcration.createOtp(email, otp);
       let subject:string="Otp verification"
      await sendMail(email, otp,subject,undefined);
       
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

  async createLockslot(req: CustomRequest, res: Response): Promise<void> {
    try{
      const {slotid,doctorid}=req.body
      const result=await this.createlockslot.createLock(slotid,doctorid)
       res.status(201).json({message:result})
    }
    catch(error)
    {
      const errorMessage = error instanceof Error
        ? error.message
        : 'Internal server error';
        console.log(errorMessage)
      res.status(409).json({ message: errorMessage });
    }
  }
    

  async createPayment(req: CustomRequest, res: Response): Promise<void> {
    try {
      const { amount } = req.body;
      console.log("hello")
      const order = await createPayment(amount);

      res.status(200).json(order);
    } catch (error) {
      const errorMessage = error instanceof Error
        ? error.message
        : 'Internal server error';
        console.log(errorMessage)
      res.status(400).json({ message: errorMessage });
    }

  }

async verifyPayment(req: CustomRequest, res: Response): Promise<void> {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
    const result = await verifypayment(razorpay_order_id, razorpay_payment_id, razorpay_signature);
    res.status(200).json({ message: result.message });
    
  } catch (error) {
    const errorMessage = error instanceof Error
      ? error.message
      : 'Internal server error';
    res.status(400).json({ message: errorMessage });
  }
  }

  async createappoinment(req: CustomRequest, res: Response): Promise<void> {
    try {
      const id=req.id
      const { doctorId, slot, name, email,age, gender, reason, amount} = req.body;
       const result=await this.createAppointment.createAppointment(id, doctorId, slot, name, email, age,gender, reason,amount)
      res.status(200).json(result);
    }
    catch (error) {
      const errorMessage = error instanceof Error
        ? error.message
        : 'Internal server error';
      res.status(400).json({ message: errorMessage });
    }
  }

  async getfutureAppoinment(req: CustomRequest, res: Response){
    try{
      const id=req.id
      const result=await this.getfutureAppointment.getfutureappoinment(id)
      res.status(200).json(result)
    }
    catch(error)
    {
      const errorMessage = error instanceof Error
        ? error.message
        : 'Internal server error';
      res.status(400).json({ message: errorMessage });
    }
  }

    async getpasteAppoinments(req: CustomRequest, res: Response){
    try{
         const id=req.id
         const result=await this.getpastAppointment.getpastappoinment(id)
         res.status(200).json(result)
    }
    catch(error)
    {
      const errorMessage = error instanceof Error
        ? error.message
        : 'Internal server error';
      res.status(400).json({ message: errorMessage });
    }
  }


  async changestatusAppoinments(req: CustomRequest, res: Response):Promise<void>{
   try{
         const id=req.id
         const {appoinmentid}=req.body
         console.log(appoinmentid)
           const status: 'pending' |  'cancelled' | 'completed'= 'cancelled';
         const result=await this.changestatusAppointment.changestus(appoinmentid,status)
         res.status(200).json(result)
    }
    catch(error)
    {
      const errorMessage = error instanceof Error
        ? error.message
        : 'Internal server error';
      res.status(400).json({ message: errorMessage });
    }

  }


async getAllmessages(req: CustomRequest, res: Response): Promise<void> {
  try {
    const id = req.id;
    const { sender} = req.query;

    if (!sender) {
      res.status(400).json({ message: "Receiver is required" });
      return; 
    }

    if (typeof sender !== 'string') {
      res.status(400).json({ message: 'Invalid or missing receiver' });
      return; 
    }

    const result = await this.getallmessage.getallmessage(sender, id);
    res.status(200).json(result);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Internal server error';
    res.status(400).json({ message: errorMessage });
  }
}

async gettoken(req: CustomRequest, res: Response): Promise<void> {
  try{
      const id = req.id;
      const result=await this.streamToken.gettoken(id)
      res.status(200).json(result);
  }
  catch(error)
  {
     const errorMessage =
      error instanceof Error ? error.message : 'Internal server error';
    res.status(400).json({ message: errorMessage });
  }
}

async reportget(req: CustomRequest, res: Response): Promise<void> {
 try{
      const id = req.id;
      const {appId}=req.params
      const result=await this.getreport.getreport(appId)
      res.status(200).json(result);
  }
  catch(error)
  {
     const errorMessage =
      error instanceof Error ? error.message : 'Internal server error';
    res.status(400).json({ message: errorMessage });
  }
}

async walletget(req: CustomRequest, res: Response): Promise<void> {
 try{
      const id = req.id;  
      const page = parseInt(req.query.page as string) 
      const limit= parseInt(req.query.limit as string)   
      const result=await this. getUserallet.getwallet(id,page,limit)
      res.status(200).json(result);
  }
  catch(error)
  {
     const errorMessage =
      error instanceof Error ? error.message : 'Internal server error';
    res.status(400).json({ message: errorMessage });
  }
}

async getSingleuser(req: CustomRequest, res: Response): Promise<void> {
 try{
      const id = req.id;    
      const result=await this.getsingleuser.getsingleUser(id)
      res.status(200).json(result);
  }
  catch(error)
  {
     const errorMessage =
      error instanceof Error ? error.message : 'Internal server error';
    res.status(400).json({ message: errorMessage });
  }
}

async getUnreadcount(req: CustomRequest, res: Response): Promise<void> {
  try {
    const id = req.id as string;
    const result=await this.getunreadcount.getcount(id)
    console.log(result) 
     res.status(200).json(result);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Internal server error';
    res.status(400).json({ message: errorMessage });
  }
}



}
