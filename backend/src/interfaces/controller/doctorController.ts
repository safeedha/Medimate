import { Request, Response } from 'express';
import { GetDept } from '../../application/usecase/dept/getDept';
import {DocRegister} from '../../application/usecase/reg/docsignup'
import {DoctorLogin} from '../../application/usecase/reg/doclogin'
import {OtpdocVerify} from '../../application/usecase/otp/otpdocverify'
import {Docprofile} from "../../application/usecase/doctor/docProfile"
import {DocPassrest} from '../../application/usecase/reg/resetdocter'
import {DocReapply} from '../../application/usecase/reg/reapply'
import {generateOtp} from '../../application/service/otpservice'
import {OtpdocCretion} from '../../application/usecase/otp/otpdoccreation'
import {sendMail} from '../../application/service/emailservice'
import {CreateSlot} from '../../application/usecase/slot/createslot'
import {GetRecurringSlot} from '../../application/usecase/slot/getAllrecslot'
import {GetdoctorAppointment} from  '../../application/usecase/appoinment/getdoctorappoi'
import {CancelRecurringSlot} from '../../application/usecase/slot/cancelslot'
import {ChangestatusAppointment} from '../../application/usecase/appoinment/changestatus'
import {GetsingleUser} from "../../application/usecase/user/getSingleUser"
interface CustomRequest extends Request {
  id?: string;
}

export class DoctorController {
  constructor(private getDept: GetDept,private docsignup:DocRegister,private doclogin:DoctorLogin,private otpdocverify:OtpdocVerify,private docprofile:Docprofile,private docPassrest:DocPassrest,
     private docreapply:DocReapply,private otpdoccreation:OtpdocCretion, private createslot:CreateSlot,private getallrecslot:GetRecurringSlot,private getdoctorAppointment:GetdoctorAppointment,
     private cancelRecurringSlot:CancelRecurringSlot,private changestatusAppointment:ChangestatusAppointment,private getsingleUser:GetsingleUser
  ) {}
  


  async signup(req: Request, res: Response): Promise<void> {
   try{
    const { firstname, lastname, email, phone, specialisation, experience, password, fee, additionalInfo, profilePicture, medicalLicence } = req.body;
    console.log(req.body)
     const result = await this.docsignup.signup({
      firstname,
      lastname,
      email,
      phone,
      specialisation,
      experience,
      password,
      fee,
      additionalInfo,
      profilePicture,
      medicalLicence})
      console.log(result)
      res.status(201).json(result);
   }

   catch(error)
   {
    if (error instanceof Error) {
       console.log(error.message)
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Internal server error' });
    }
   
   }
  }


  async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;
      const response = await this.doclogin.login(email, password);
       res.cookie("refreshtokendoctor", response.refreshToken, {
        httpOnly: true, 
        secure: false,
        maxAge: 7 * 24 * 60 * 60 * 1000, 
      });
      res.cookie("accesstokendoctor", response.accessToken, {
      httpOnly: true,     
      secure: false,     
      maxAge: 15 * 60 * 1000, 
    });
         res.status(200).json({message:response.message,doctor:response.doctor, accessToken:response.accessToken});
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Internal server error' });
      }
    }
  }
   
   async reapplication(req: Request, res: Response): Promise<void> {
    try{
          const{email,specialisation,experience,fee,medicalLicence}=req.body
          const result=await this.docreapply.docreapply(email,specialisation,experience,fee,medicalLicence)
          res.status(200).json(result)
      }  
    catch(error)
    {
      const errorMessage = error instanceof Error
        ? error.message
        : 'Internal server error';
      res.status(400).json({ message: errorMessage })
    }
   }
   
   async sendOtp(req: Request, res: Response): Promise<void> {
       try {
         const { email } = req.body;
         const otp = generateOtp();
         await this.otpdoccreation.createOtp(email, otp);
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
       const isValid = await this.otpdocverify.verifyOtp(email, otp);
        res.status(200).json({ message: 'OTP verified successfully' });
     
    } catch (error) {
      const errorMessage = error instanceof Error
        ? error.message
        : 'Internal server error';
      res.status(400).json({ message: errorMessage });
    }
  }

  async updatedocprofile(req: Request, res: Response): Promise<void> {
    try {
       const {firstname,lastname,experience,fee,image,email,phone,specialisation,qualification} = req.body;
         await this.docprofile.updateprofile(firstname,lastname,experience,fee,image,email,phone,specialisation,qualification)
        res.status(200).json({ message: 'Profile updated suceesfully' });
      } catch (error) {
      const errorMessage = error instanceof Error
        ? error.message
        : 'Internal server error';
      res.status(400).json({ message: errorMessage });
    }
  }





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

   async resetPassword(req: Request, res: Response):Promise<void>{
     try{
          const { email, password } = req.body
          const response =await this.docPassrest.passwordrest(email,password)
          res.status(200).json(response)
     }
     catch(error)
     {
        const errorMessage = error instanceof Error
        ? error.message
        : 'Internal server error';
      res.status(400).json({ message: errorMessage });
     }
  }


  async createAppoinment(req: Request, res: Response):Promise<void>{
    try{
       const {doctorId}=req.body
        const {startDate,endDate,selectedDays,startTime,endTime,interval,frequency}=req.body
        const result=await this.createslot.createSlots(doctorId,startDate,endDate,selectedDays,startTime,endTime,interval,frequency)
        console.log(result)
      res.status(201).json(result)
    }
    catch(error)
    {
         const errorMessage = error instanceof Error
        ? error.message
        : 'Internal server error';
      res.status(400).json({ message: errorMessage });

    }
  }

  async getAllrecurringslots(req:Request,res:Response):Promise<void>{
    try{
    
          const {id}=req.params
          const result=await this.getallrecslot.getSlots(id)
          console.log(result)
          res.status(200).json({result})
    }
    catch(error)
    {
      console.log(error)
       const errorMessage = error instanceof Error
        ? error.message
        : 'Internal server error';
      res.status(400).json({ message: errorMessage });
    }
  }
 
 async getAllappoinment(req: CustomRequest, res: Response): Promise<void> {
  try {
    const { id } = req;
      console.log(id)
    if (!id) {
      res.status(401).json({ message: "Unauthorized access: No doctor ID" });
      return;
    }


    const appointments = await this.getdoctorAppointment.getallappoinment(id)

    res.status(200).json({appoi: appointments} );

  } catch (error) {
    console.error("Error fetching appointments:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Internal server error";
    res.status(500).json({ message: errorMessage });
  }
}


async cancelappoinment(req: CustomRequest, res: Response): Promise<void> {
  try {
   const {id}=req.params
   const result=await this.cancelRecurringSlot.cancelSlots(id)

    res.status(200).json({message:result});

  } catch (error) {
    console.error("Error fetching appointments:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Internal server error";
    res.status(500).json({ message: errorMessage });
  }
}

async changestatusappoinment(req: CustomRequest, res: Response): Promise<void> {
  try {
   const {id,userid}=req.params
   const {reason}=req.body
    const result=await this.changestatusAppointment.changestus(id)
    const user=await this.getsingleUser.getsingleUser(userid)
    let subject:string="Reason for  appoinmentCancellation"
    console.log(user.email)
     await sendMail(user.email, 'undefined',subject,reason);
     
    res.status(200).json(result)

  } catch (error) {
    console.error("Error fetching appointments:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Internal server error";
    res.status(500).json({ message: errorMessage });
  }
}



}
