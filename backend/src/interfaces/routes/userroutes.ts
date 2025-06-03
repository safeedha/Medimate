import express from 'express'
import { Request } from "express";
const router=express.Router()
import {UserController} from '../../interfaces/controller/usercontroller'
import {GetDept} from '../../application/usecase/dept/getDept'
import {MongoDeptRepository} from '../../infrastructure/repository/mongodeptRepository'
import {UserReg} from '../../application/usecase/reg/userreg'
import {MongoRegRepository} from '../../infrastructure/repository/mongoregRepository'
import { MongoDocRepository}  from '../../infrastructure/repository/mongodocRepository'
import {UserLog} from '../../application/usecase/reg/userlog'
import {OtpCretion} from '../../application/usecase/otp/otpcre'
import {OtpVerify} from '../../application/usecase/otp/otpverify'
import {UserPassrest} from '../../application/usecase/reg/resetuser'
import {Getverified} from '../../application/usecase/doctor/getverified'
import { Googleuser} from '../../application/usecase/reg/ugoogle'
import {verifyUserAuth} from '../../infrastructure/middleware/verifyUserToken'
import {GetsingleUser} from '../../application/usecase/user/getSingleUser'
import {MongoUserRepository } from '../../infrastructure/repository/mongouserRepository'
import {updatesingleUser} from '../../application/usecase/user/updateUser'
import {GetSingledoc } from '../../application/usecase/doctor/getSingledoc'
import {GetSlotByDate} from '../../application/usecase/slot/getslotbydate'
import {MongoSlotRepostory}from '../../infrastructure/repository/mongoslotrep'
import{MongoAppointmentRepository} from '../../infrastructure/repository/mongoappRep'
import {CreateAppointment} from '../../application/usecase/appoinment/createappoi'
import {GetfutureAppointment} from '../../application/usecase/appoinment/getfuturappoi'
import {GetpastAppointment} from '../../application/usecase/appoinment/getpastappoi'
import {ChangestatusAppointment} from '../../application/usecase/appoinment/changestatus'
import {MongoWalletRepository}  from '../../infrastructure/repository/mongowalletrep'
import {MongoConversationRepo}  from '../../infrastructure/repository/mongoconverRep'
import {GetAllmessage} from '../../application/usecase/conversation/getallmessage'
import {StreamToken} from '../../application/usecase/streamtoken/streamtoken'
import{Getreport} from '../../application/usecase/report/getreport'
import {MongoreportRepository} from '../../infrastructure/repository/mongoreportRep'
export interface CustomRequest extends Request {
  id: string;
}
const mongoConversationRepo=new MongoConversationRepo()
const mongoregRepository=new MongoRegRepository()
const mongodocRepository=new MongoDocRepository()
const mongouserRepository=new MongoUserRepository()
const mongoslotRepository=new MongoSlotRepostory()
const mongoappoinmentRepository=new MongoAppointmentRepository()
const mongoWalletRepository=new MongoWalletRepository()
const mongoreportRepository=new MongoreportRepository()

const getreport=new Getreport(mongoreportRepository)
const usergoogle=new Googleuser(mongoregRepository)
const userdoc=new Getverified(mongodocRepository)
const getsingledoc=new GetSingledoc(mongodocRepository)
const streamToken=new StreamToken()
const userreg=new UserReg(mongoregRepository)
const userlog=new UserLog(mongoregRepository)
const userrest=new UserPassrest(mongoregRepository)

const otpcration=new OtpCretion(mongoregRepository)
const otpverify=new OtpVerify(mongoregRepository)

const mongodeotrepository=new MongoDeptRepository()
const getDept=new GetDept(mongodeotrepository)

const getslotbydate=new GetSlotByDate(mongoslotRepository)
const createappoinment=new CreateAppointment(mongoappoinmentRepository,mongoslotRepository,mongoWalletRepository)
const getfutureAppointment=new GetfutureAppointment(mongoappoinmentRepository)
const getpastAppointment=new GetpastAppointment(mongoappoinmentRepository)
const changestatusAppointment=new ChangestatusAppointment(mongoappoinmentRepository,mongoslotRepository)
const getallmessage=new GetAllmessage(mongoConversationRepo)
const getsingleUser=new GetsingleUser(mongouserRepository)
const updateuser=new updatesingleUser(mongouserRepository)
const user=new UserController(getDept,userreg,userlog,otpcration,otpverify,userrest,userdoc,usergoogle,getsingleUser,updateuser,getsingledoc,getslotbydate,createappoinment,getfutureAppointment,getpastAppointment,changestatusAppointment,getallmessage,streamToken,getreport)



router.get("/department", (req, res) => user.getAllDept(req, res)) 
router.post("/register", (req, res) => user.register(req, res)) 
router.post("/login", (req, res) => user.login(req, res)) 
router.post("/sendotp", (req, res) => user.sendOtp(req, res))
router.post("/verifyotp", (req, res) => user.verifyOtp(req, res))
router.post("/reset",(req, res) => user.resetPassword(req, res))
router.post("/googlelogin",(req, res) => user.googleLogin(req, res))

router.get("/doctors",verifyUserAuth, (req, res) => user.getAllDoct(req, res)) 
router.get("/doctor/:id",verifyUserAuth, (req, res) => user.getSingleDoct(req, res))
router.get("/doctor/slot/:id",verifyUserAuth, (req, res) => user.getSlotedoctor(req, res)) 
router.get("/department",verifyUserAuth, (req, res) => user.getAllDept(req, res)) 
router.get("/profile", verifyUserAuth, (req, res) => {
  user.getUserdetail(req as CustomRequest, res);
});


router.post("/profile", verifyUserAuth, (req, res) => {
  user.updateUserdetail(req as CustomRequest, res);
});


router.post("/bookappoinment", verifyUserAuth, (req, res) => {
  user.createPayment(req as CustomRequest, res);
})
router.post("/verify-payment", verifyUserAuth, (req, res) => {
  user.verifyPayment(req as CustomRequest, res);
})

router.post("/createappoinment", verifyUserAuth, (req, res) => {
  user.createappoinment(req as CustomRequest, res);
})
router.get("/appointments/future", verifyUserAuth, (req, res) => {
  user.getfutureAppoinment(req as CustomRequest, res);
})
router.get("/appointments/past", verifyUserAuth, (req, res) => {
  user.getpasteAppoinments(req as CustomRequest, res);
})
router.patch("/appointment", verifyUserAuth, (req, res) => {
  user.changestatusAppoinments(req as CustomRequest, res);
})

router.get("/messages", verifyUserAuth, (req, res) => {
  user.getAllmessages(req as CustomRequest, res);
})

router.get("/gettoken", verifyUserAuth, (req, res) => {
  user.gettoken(req as CustomRequest, res);
})


router.get("/report/:appId", verifyUserAuth, (req, res) => {
  user.reportget(req as CustomRequest, res);
})
export { router as userRouter };