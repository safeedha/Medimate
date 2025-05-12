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



export class AdminController{
    constructor(private login:Login,private addDept:AddDept,private getDept:GetDept,private getUnverified:GetUnverified,private getverified:Getverified,private getUser:GetUser,private changestatus:ChangeStatus,private changedocstat:ChangeDocStatus,
      private verifyDoctor:VerifyDoctor
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
    const result = await this.getDept.getAllDept();
    res.status(200).json(result);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Internal server error";
    res.status(400).json({ message: errorMessage });
  }
}

async getAllunVerfiedDoctors(req: Request, res: Response): Promise<void> {
  try {
    const result = await this.getUnverified.getAllUnverifiedDoctors();
    res.status(200).json(result);
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Internal server error";
    res.status(400).json({ message: errorMessage });
  }
}
async getAllVerfiedDoctors(req: Request, res: Response): Promise<void> {
  try {
    const result = await this.getverified.getAllVerifiedDoctors();
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
    const result = await this.verifyDoctor.verifyStatus(id,status);
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
    const result = await this.getUser.getAllUser();
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
}