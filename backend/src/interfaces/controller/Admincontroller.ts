import express,{Request,Response} from 'express'
import {Login} from "../../application/usecase/dept/adminLogin"
import {AddDept} from "../../application/usecase/dept/addDept"
import {GetDept} from "../../application/usecase/dept/getDept"
import {GetUnverified} from "../../application/usecase/doctor/getunverifed"
import {Getverified} from "../../application/usecase/doctor/getverified"
import {GetUser} from "../../application/usecase/user/getUser"
import {ChangeStatus} from "../../application/usecase/user/changestatus"
import {ChangeDocStatus} from "../../application/usecase/doctor/changestatus"
import {VerifyDoctor} from "../../application/usecase/doctor/verify"
import {EditDept} from "../../application/usecase/dept/editdept"
import {BlockDept} from "../../application/usecase/dept/blockdept"
import{GetdoctorAppointmentByid}  from "../../application/usecase/appoinment/getappoinfordoc"
import {GetAdminWallet} from '../../application/usecase/wallet/geadminwallet'
import {Getrefund} from '../../application/usecase/wallet/getRefund'
import {GetPayout} from '../../application/usecase/wallet/getpayout'
import {Paytodoctor} from '../../application/usecase/wallet/paytodoctor'
import {Refundhandle} from '../../application/usecase/wallet/refund'
import {GetsingleUser}  from '../../application/usecase/user/getSingleUser'
import {GetSingledoc}  from '../../application/usecase/doctor/getSingledoc'
import {GetAlldoctor} from '../../application/usecase/doctor/getalldoctor'
import {GetDashbordappoinment} from '../../application/usecase/appoinment/appoinmentdash'
import {GetCountofappforeachDoc}  from '../../application/usecase/appoinment/gecountforeach'
import {GetFilter } from '../../application/usecase/appoinment/getfilter'
export class AdminController{
    constructor(private login:Login,private addDept:AddDept,private getDept:GetDept,private getUnverified:GetUnverified,private getverified:Getverified,private getUser:GetUser,private changestatus:ChangeStatus,private changedocstat:ChangeDocStatus,
      private verifyDoctor:VerifyDoctor,private editDept:EditDept,private blockDept:BlockDept,private getdoctorAppointmentByid:GetdoctorAppointmentByid,private getAdminWallet:GetAdminWallet,private getrefund:Getrefund,private getPayout:GetPayout,
      private paytodoctor:Paytodoctor,private refundhandle:Refundhandle,private getsingleUser:GetsingleUser,private getSingledoc:GetSingledoc,private getAlldoctor:GetAlldoctor,private getDashbordappoinment:GetDashbordappoinment,
      private getCountofappforeachDoc:GetCountofappforeachDoc,private getFilter:GetFilter
    )
    {

    }

    async adminLogin(req:Request,res:Response):Promise<void>
    {  try{
    
       const{email, password}=req.body
    
       const response=await this.login.login(email,password)
          res.cookie("refreshtokenadmin", response.refreshToken,{
            httpOnly:true,
            secure:false,
            maxAge:7*24*60*60*1000,
        })
         res.cookie("accesstokenadmin",response.accessToken, {
          httpOnly: true, 
          secure: false, 
          maxAge: 15 * 60 * 1000, 
        })
       res.status(200).json(response);  
      }
      catch(error)
      {
        res.status(500).json({message:"Internal server error"});
      }
    }

  async  adminLogout(req: Request, res: Response): Promise<void> {
  try {
    res.clearCookie("refreshtokenadmin", {
      httpOnly: true,
      secure: false, 
    });

    res.clearCookie("accesstokenadmin", {
      httpOnly: true,
      secure: false, 
    });

    res.status(200).json({ message: "Admin logged out successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
}



async createDepartment(req: Request, res: Response): Promise<void> {
  try {
    const { deptname, description } = req.body;
    const result = await this.addDept.addDept({ deptname, description });
    res.status(200).json(result);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Internal server error";
    res.status(400).json({ message: errorMessage });
  }
}

async getDepartment(req: Request, res: Response): Promise<void> {
  try {
    const page=parseInt(req.query.page as string)
    const limit=parseInt(req.query.limit as string)
    const search=req.query.search as string
    const result = await this.getDept.getAllDept(page,limit,search);
    res.status(200).json(result);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Internal server error";
    res.status(400).json({ message: errorMessage });
  }
}

async editDepartment(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    console.log(id)
    const { deptname, description } = req.body;
    const data = {_id:id ,deptname, description };
    console.log(data)
    const result = await this.editDept.editDept(data);
    res.status(200).json(result);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Internal server error";
    res.status(400).json({ message: errorMessage });
  }
}

async blockDepartment(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const result = await this.blockDept.blockDept(id);
    res.status(200).json(result);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Internal server error";
    res.status(400).json({ message: errorMessage });
  }
}

async getAllunVerfiedDoctors(req: Request, res: Response): Promise<void> {
  try {
    const page=parseInt(req.query.page as string)
    const limit=parseInt(req.query.limit as string)
    const result = await this.getUnverified.getAllUnverifiedDoctors(page,limit);
    res.status(200).json(result);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Internal server error";
    res.status(400).json({ message: errorMessage });
  }
}
async getAllVerfiedDoctors(req: Request, res: Response): Promise<void> {
  try {
    const page=parseInt(req.query.page as string)
    const limit=parseInt(req.query.limit as string)
     const search=(req.query.search as string)

    const result = await this.getAlldoctor.getAlldoctors(page,limit,search);
    res.status(200).json(result);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Internal server error";
    res.status(400).json({ message: errorMessage });
  }
}

async getSingledoctor(req: Request, res: Response): Promise<void> {
  try {
    const {doctorid}=req.params
    console.log(doctorid)
    const result = await this.getSingledoc.getsingledoc(doctorid);
    res.status(200).json(result);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Internal server error";
    res.status(400).json({ message: errorMessage });
  }
}
async changeDoctorblockstatus(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const result = await this.changedocstat.changesatus(id);
    console.log(result)
    res.status(200).json(result);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Internal server error";
    res.status(400).json({ message: errorMessage });
  }
}

async verification(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const { status } = req.body; // 'Approved' or 'Rejected'
   const reason = req.query.reason as string;
    const result = await this.verifyDoctor.verifyStatus(id,status,reason);
    res.status(200).json(result);
  }
  catch(error)
  {
    const errorMessage = error instanceof Error ? error.message : "Internal server error";
    res.status(400).json({ message: errorMessage });

  }

}


async getAllUser(req: Request, res: Response): Promise<void> {
  try {
     const page=parseInt(req.query.page as string)
    const limit=parseInt(req.query.limit as string)
     const search=(req.query.search as string)
    const result = await this.getUser.getAllUser(page,limit,search);
    res.status(200).json(result);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Internal server error";
    res.status(400).json({ message: errorMessage });
  }
}

async changeUserblockstatus(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const result = await this.changestatus.changesatus(id);
    res.status(200).json(result);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Internal server error";
    res.status(400).json({ message: errorMessage });
  }
}

async getsingleuser(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    const result = await this.getsingleUser.getsingleUser(id);
    res.status(200).json(result);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Internal server error";
    res.status(400).json({ message: errorMessage });
  }
}

async getAllappoinmentbydoctor(req: Request, res: Response): Promise<void> {
  try {
    const { id } = req.params;
    console.log('docter id',id)
    const result = await this.getdoctorAppointmentByid.getallappoinment(id);
    res.status(200).json(result);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Internal server error";
    res.status(400).json({ message: errorMessage });
  }
}

async getAllappoinment(req: Request, res: Response): Promise<void> {
  try {
    const result = await this.getDashbordappoinment.getoverview()
    res.status(200).json(result);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Internal server error";
    res.status(400).json({ message: errorMessage });
  }
}

async getCountforDoc(req: Request, res: Response): Promise<void> {
  try {
    const result = await this.getCountofappforeachDoc.getcount()
    res.status(200).json(result);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Internal server error";
    res.status(400).json({ message: errorMessage });
  }
}

async getAppointmentsFiltered(req: Request, res: Response): Promise<void> {
  try {
    const { status, start, end } = req.query;

    if (!status || !start || !end) {
      res.status(400).json({ message: 'Missing status, start, or end date' });
      return;
    }
     const startDate = new Date(start as string);
    const endDate = new Date(end as string);
    const filteredAppointments = await this.getFilter.getappoinmentrange(
      status as 'completed' | 'cancelled' | 'pending',
      startDate,
      endDate
    );

    res.status(200).json(filteredAppointments);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Internal server error";
    res.status(400).json({ message: errorMessage });
  }
}


async getWalletinformation(req: Request, res: Response): Promise<void> {
  try {
     const page=parseInt(req.query.page as string)
    const limit=parseInt(req.query.limit as string)
    const result=await this.getAdminWallet.getwallet(page,limit)
    res.status(200).json(result);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Internal server error";
    res.status(400).json({ message: errorMessage });
  }
}

// async getRefundinformation(req: Request, res: Response): Promise<void> {
//   try {
//     // const result=await this.getrefund.getrefundable()
//     res.status(200).json(result);
//   } catch (error) {
//     const errorMessage = error instanceof Error ? error.message : "Internal server error";
//     res.status(400).json({ message: errorMessage });
//   }
// }

async payoutinformation(req: Request, res: Response):Promise<void> {
    try {
      console.log("payout")
    const result=await this.getPayout.getrpayoutInfor()
    res.status(200).json(result);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Internal server error";
    res.status(400).json({ message: errorMessage });
  }
}

async payouttodoctor(req: Request, res: Response):Promise<void> {
    try {
    const {transactionId,doctorid}=req.body
    const result=await this.paytodoctor.paymentToDoctor(transactionId,doctorid)
    res.status(200).json(result);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Internal server error";
    res.status(400).json({ message: errorMessage });
  }
}

async refundhandl(req: Request, res: Response):Promise<void> {
    try {
    const {transactionId}=req.body
    const result=await this.refundhandle.refundhandler(transactionId)
    res.status(200).json(result);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Internal server error";
    res.status(400).json({ message: errorMessage });
  }
}



}