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
import {GetSlotByDate} from '../../application/usecase/slot/getslotbydate'
import {CancelSlot} from '../../application/usecase/slot/deleteslot'
import {GetUser} from "../../application/usecase/user/getUser"
import {GetAllmessage} from '../../application/usecase/conversation/getallmessage'
import {GetDoctorWallet}  from '../../application/usecase/doctorwallet/getdoctorwallet'
import{Addreport} from '../../application/usecase/report/addreport'
import {GetSingleappoinment} from  '../../application/usecase/appoinment/getSingleappoinment'
import {Getallunblockeddept} from '../../application/usecase/dept/getunblocked';
import {Getunreadcount} from '../../application/usecase/conversation/getunreadcount';
import {Reshedule} from '../../application/usecase/appoinment/reshedule'
import {GetdoctorAppointmentCount} from '../../application/usecase/appoinment/getCount'
import {GetFilterfordoc} from '../../application/usecase/appoinment/getfilterfordoc'
import {Createfollowup } from '../../application/usecase/appoinment/createfolloup'
import {GetPage} from '../../application/usecase/appoinment/getPage'
import {RefreshToken} from '../../application/usecase/doctor/refreshtoken'
import {GetSingledoc} from '../../application/usecase/doctor/getSingledoc'
import {Deletemessage} from '../../application/usecase/conversation/deletemessage'
import {MessageTimeUpdation} from '../../application/usecase/conversation/messagtime'
import {GetUserBysort} from '../../application/usecase/user/getallsort'

interface CustomRequest extends Request {
  id?: string;
}

export class DoctorController {
  constructor(private getDept: GetDept,private docsignup:DocRegister,private doclogin:DoctorLogin,private otpdocverify:OtpdocVerify,private docprofile:Docprofile,private docPassrest:DocPassrest,
     private docreapply:DocReapply,private otpdoccreation:OtpdocCretion, private createslot:CreateSlot,private getallrecslot:GetRecurringSlot,private getdoctorAppointment:GetdoctorAppointment,
     private cancelRecurringSlot:CancelRecurringSlot,private changestatusAppointment:ChangestatusAppointment,private getsingleUser:GetsingleUser,private getslotbydate:GetSlotByDate,private cancelSlot:CancelSlot,
     private getUser:GetUser, private getallmessage:GetAllmessage,private addreport:Addreport,private getDoctorWallet:GetDoctorWallet,private getSingleappoinment:GetSingleappoinment,private getallunblockeddept:Getallunblockeddept,
     private getunreadcount:Getunreadcount,private reshedule:Reshedule,private getdoctorAppointmentCount:GetdoctorAppointmentCount,private getFilterfordoc:GetFilterfordoc,private createfollowup:Createfollowup,
     private getPage:GetPage,private refreshtoken:RefreshToken,private getSingledoc:GetSingledoc,private deletemessage:Deletemessage,private messageTimeUpdation:MessageTimeUpdation,
     private getUserBysort:GetUserBysort,
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
        secure: true,
        maxAge: 7 * 24 * 60 * 60 * 1000, 
        sameSite: "none"
      })
         res.status(200).json({message:response.message,doctor:response.doctor, accessToken:response.accessToken});
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'Internal server error' });
      }
    }
  }

  async logout(req: Request, res: Response): Promise<void> {
  try {
   
    res.clearCookie("refreshtokendoctor", {
      httpOnly: true,
      secure: true,
      sameSite: "none",
    });


    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Logout error:", error);
    res.status(500).json({ message: "Internal server error during logout" });
  }
}

async refreshTokencontroller(req: Request, res: Response): Promise<void> {
   try {
            const token=req.cookies?.refreshtokendoctor;
            const newaccesstoken=await this.refreshtoken.refresh(token);
            res.status(200).json({ token: newaccesstoken });
        } catch (err: any) {
          res.status(400).json({ message: err.message });
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
       const {firstname,lastname,experience,fee,image,email,phone,specialisation,qualification,medicalLicence} = req.body;
         const result=await this.docprofile.updateprofile(firstname,lastname,experience,fee,image,email,phone,specialisation,qualification,medicalLicence)
        res.status(200).json(result);
      } catch (error) {
      const errorMessage = error instanceof Error
        ? error.message
        : 'Internal server error';
      res.status(400).json({ message: errorMessage });
    }
  }





  async getAllDept(req: Request, res: Response): Promise<void> {
      try {
  
      const result = await this.getallunblockeddept.getAllunblockedDept();

      res.status(200).json(result);
    } catch (error) {
      const errorMessage = error instanceof Error
        ? error.message
        : 'Internal server error';
      res.status(400).json({ message: errorMessage });
    }
  }

   async getStatus(req: CustomRequest, res: Response):Promise<void>{
    try{
       const {id}=req
        const result=await this.getSingledoc.getsingledoc(id!)

 
      res.status(201).json({staus:result?.isBlocked})
    }
    catch(error)
    {
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

   async createfollowp(req: CustomRequest, res: Response):Promise<void>{
    try{
           const {slotId,appoinmentId}=req.body
           const result=await this.createfollowup.createfollowpappinment(slotId,appoinmentId)
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

    async updatemessagetime(req: CustomRequest, res: Response):Promise<void>{
    try{
       const {id}=req
        const {reciever}=req.params
         if (typeof reciever !== 'string') {
          res.status(400).json({ message: 'Invalid reciever ID' });
          return;
        }
       const result=await this.messageTimeUpdation.update(id!,reciever)
 
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

  async createAppoinment(req: CustomRequest, res: Response):Promise<void>{
    try{
       const {id}=req
        const {startDate,endDate,selectedDays,startTime,endTime,interval,frequency}=req.body
        const result=await this.createslot.createSlots(id!,startDate,endDate,selectedDays,startTime,endTime,interval,frequency)
 
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
  
  async getAllUser(req: CustomRequest, res: Response): Promise<void> {
  try {
    const search=req.query.search as string
    const result = await this.getUserBysort.getAllSortUser(search);
    res.status(200).json(result);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Internal server error";
    res.status(400).json({ message: errorMessage });
  }
}

  async getAllrecurringslots(req:Request,res:Response):Promise<void>{
    try{   
          const {id}=req.params
         const page=parseInt(req.query.page as string)
         const limit=parseInt(req.query.limit as string)
          const result=await this.getallrecslot.getSlots(id,page,limit)
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
    const page=parseInt(req.query.page as string)
    const limit=parseInt(req.query.limit as string)
    if (!id) {
      res.status(401).json({ message: "Unauthorized access: No doctor ID" });
      return;
    }
    const appointments = await this.getdoctorAppointment.getallappoinment(id,page,limit)
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
   const {reason,email}=req.body
     const status: 'pending' |  'cancelled' | 'completed'= 'cancelled';
    const result=await this.changestatusAppointment.changestus(id,status)
    let subject:string="Reason for  appoinmentCancellation"
    console.log(email)
     await sendMail(email, undefined,subject,reason);
     
    res.status(200).json(result)

  } catch (error) {
    console.error("Error fetching appointments:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Internal server error";
    res.status(500).json({ message: errorMessage });
  }
}

async getpage(req: CustomRequest, res: Response): Promise<void> {
  try {
   const { id } = req;
   const  originalId=req.query.originalId as string
    const limit=parseInt(req.query.limit as string)
     const result=await this.getPage.getpage(id!,originalId,limit)
    res.status(200).json(result)

  } catch (error) {
    console.error("Error fetching appointments:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Internal server error";
    res.status(500).json({ message: errorMessage });
  }
}

async createresedule(req: CustomRequest, res: Response): Promise<void> {
  try{
    
     const {canceledslot,reason,userid,email,newslot}=req.body
     console.log(reason)
    const status: 'pending' |  'cancelled' | 'completed'= 'cancelled';
    const reschedule=true
    const result=await this.changestatusAppointment.changestus(canceledslot,status,reschedule)
    const response=await this.reshedule.createresedule(canceledslot,newslot)
    let subject:string="Reason for  appoinment Cancellation"
    await sendMail(email, undefined,subject,reason);
      res.status(200).json(response)

  }
  catch(error)
  {
     const errorMessage =
        error instanceof Error ? error.message : 'Internal server error';
        console.log(errorMessage)
      res.status(400).json({ message: errorMessage });
  }
}

async changecompletstatusappoinment(req: CustomRequest, res: Response): Promise<void> {
  try {
   const {id}=req.params
    const status: 'pending' |  'cancelled' | 'completed'= 'completed';
    const result=await this.changestatusAppointment.changestus(id,status)    
    res.status(200).json(result)
  } catch (error) {
    console.error("Error fetching appointments:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Internal server error";
    res.status(500).json({ message: errorMessage });
  }
}

async getsingleappoinment(req: CustomRequest, res: Response): Promise<void> {
  try {
   const {id}=req.params 
    const result=await this.getSingleappoinment.getsingleappoinment(id)   
    res.status(200).json(result)
  } catch (error) {
    console.error("Error fetching appointments:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Internal server error";
    res.status(500).json({ message: errorMessage });
  }
}

async getOverview(req: CustomRequest, res: Response): Promise<void> {
  try {
   const {id}=req 
   console.log('hey',id)
    const result=await this.getdoctorAppointmentCount.getcountofappoinment(id!)   
    res.status(200).json(result)
  } catch (error) {
    console.error("Error fetching appointments:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Internal server error";
    res.status(500).json({ message: errorMessage });
  }
}

async getfilter(req: CustomRequest, res: Response): Promise<void> {
  try {
    console.log("hello world")
   const {id}=req 
    const { status, start, end } = req.query;
    if (!status || !start || !end) {
      res.status(400).json({ message: 'Missing status, start, or end date' });
      return;
    }
    const startDate = new Date(start as string);
    const endDate = new Date(end as string);
    const result=await this.getFilterfordoc.getappoinmentrange( status as 'completed' | 'cancelled' | 'pending',startDate,endDate,id!)   
    res.status(200).json(result)
  } catch (error) {
    console.error("Error fetching appointments:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Internal server error";
    res.status(500).json({ message: errorMessage });
  }
}


async getSlotsofdoctor(req: CustomRequest, res: Response): Promise<void> {
  try{
      const { id } = req;
     const date = req.query.date as Date| undefined;
     console.log(date)
      if (!date) {
        throw new Error('Date is required');
      }
      const result = await this.getslotbydate.getSlotsByDate(id!, new Date(date));
      res.status(200).json(result)
    }
  catch(error)
  {
    const errorMessage =
      error instanceof Error ? error.message : "Internal server error";
    res.status(500).json({ message: errorMessage });
  }
}

async cancelSlots (req: CustomRequest, res: Response): Promise<void> {
  try{
     const { id } = req;
     const {slotid}=req.params
    const result = await this.cancelSlot.cancelSlot(slotid)
      res.status(200).json(result)
    }
  catch(error)
  {
    const errorMessage =
      error instanceof Error ? error.message : "Internal server error";
    res.status(500).json({ message: errorMessage });
  }
}


async getAllmessages(req: CustomRequest, res: Response): Promise<void> {
  try {
    const id = req.id as string;
    const {sender} = req.query;
    if (!sender) {
      res.status(400).json({ message: "Receiver is required" });
      return; 
    }
    if (typeof sender!== 'string') {
      res.status(400).json({ message: 'Invalid or missing receiver' });
      return; 
    }
    const result = await this.getallmessage.getallmessage(sender,id);
    res.status(200).json(result);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Internal server error';
    res.status(400).json({ message: errorMessage });
  }
}

async deletemessages(req: CustomRequest, res: Response): Promise<void> {
  try {
    const { messageid } = req.params;
    const { sender, reciever } = req.query;

    if (typeof sender !== 'string' || typeof reciever !== 'string') {
      throw new Error('Invalid sender or receiver');
    }

    const result = await this.deletemessage.delete(messageid, sender, reciever);
    res.status(200).json(result);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Internal server error';
    res.status(400).json({ message: errorMessage });
  }
}

async Addreport(req: CustomRequest, res: Response): Promise<void> {
  try {
    const id = req.id as string;
    const {htmlcontent,appoinmentId,userId}=req.body
    const report =await  this.addreport.addReport(htmlcontent,appoinmentId,userId)
     res.status(201).json(report);
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Internal server error';
    res.status(400).json({ message: errorMessage });
  }
}

async getWallet(req: CustomRequest, res: Response): Promise<void> {
  try {
    const id = req.id as string;
    const page=parseInt(req.query.page as string)
   const limit=parseInt(req.query.limit as string)
    const wallet=await this.getDoctorWallet.getwallet(id,page,limit)
    console.log('wallet',wallet)
     res.status(200).json(wallet);
  } catch (error) {
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
