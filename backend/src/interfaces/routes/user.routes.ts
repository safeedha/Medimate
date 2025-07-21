import express from 'express'
import { Request } from "express";
const router=express.Router()
import {UserController} from '../controller/user.controller'
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
import {GetUserallet} from '../../application/usecase/wallet/getuserwallet'
import{CreateLockslot} from '../../application/usecase/appoinment/createlockslot'
import {Getallunblockeddept}from '../../application/usecase/dept/getunblocked';
import {Getunreadcount} from '../../application/usecase/conversation/getunreadcount';
import {Createreview} from '../../application/usecase/review/createReview'
import {MongoReviewRepository}  from '../../infrastructure/repository/mongoreviewRep'
import {GetAverage}  from '../../application/usecase/review/getAverage'
import {Getreview} from '../../application/usecase/review/getReview'
import {GetPage} from '../../application/usecase/appoinment/getpageforuser'
import{RefreshToken} from '../../application/usecase/user/refreshtoken'
import {Deletemessage} from '../../application/usecase/conversation/deletemessage'
import {MessageTimeUpdation} from '../../application/usecase/conversation/messagetimeuser'
import {GetAllSort}  from '../../application/usecase/doctor/getSort'
import errorHandler from '../../infrastructure/middleware/errorHandler';
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
const mongoReviewRepository=new MongoReviewRepository()

const getAllSort=new GetAllSort(mongodocRepository)
const messageTimeUpdation=new MessageTimeUpdation(mongoConversationRepo)
const deletemessage=new Deletemessage(mongoConversationRepo)
const getPage=new GetPage(mongoappoinmentRepository)
const getAverage=new GetAverage(mongoReviewRepository)
const getreview=new Getreview(mongoReviewRepository) 
const createreview=new Createreview(mongoReviewRepository)
const getunreadcount=new Getunreadcount(mongoConversationRepo)
const createlockslot=new CreateLockslot(mongoslotRepository)
const getUserallet=new GetUserallet(mongoWalletRepository)
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

const refreshToken=new RefreshToken()
const getDept=new GetDept(mongodeotrepository)
const getallunblockeddept=new Getallunblockeddept(mongodeotrepository)
const getslotbydate=new GetSlotByDate(mongoslotRepository)
const createappoinment=new CreateAppointment(mongoappoinmentRepository,mongoslotRepository,mongoWalletRepository)
const getfutureAppointment=new GetfutureAppointment(mongoappoinmentRepository)
const getpastAppointment=new GetpastAppointment(mongoappoinmentRepository)
const changestatusAppointment=new ChangestatusAppointment(mongoappoinmentRepository,mongoslotRepository,mongoWalletRepository)
const getallmessage=new GetAllmessage(mongoConversationRepo)
const getsingleUser=new GetsingleUser(mongouserRepository)
const updateuser=new updatesingleUser(mongouserRepository)
const user=new UserController(getDept,userreg,userlog,otpcration,otpverify,userrest,userdoc,usergoogle,getsingleUser,updateuser,getsingledoc,getslotbydate,createappoinment,getfutureAppointment,getpastAppointment,changestatusAppointment,getallmessage,streamToken,getreport,getUserallet,createlockslot,getallunblockeddept,getunreadcount,createreview,getAverage,getreview,getPage,refreshToken,deletemessage,messageTimeUpdation,getAllSort)



// router.get("/department", (req, res,next) => user.getAllDept(req, res,next)) 
// router.post("/register", (req, res,next) => user.register(req, res,next)) 
// router.post("/login", (req, res) => user.login(req, res)) 
// router.get("/logout", (req, res) => user.logout(req, res))
router.post("/refresh-token", (req, res) => user.refreshTokencontroller(req, res))

// router.post("/sendotp", (req, res) => user.sendOtp(req, res))
// router.post("/verifyotp", (req, res) => user.verifyOtp(req, res))
// router.post("/reset",(req, res) => user.resetPassword(req, res))
// router.post("/googlelogin",(req, res) => user.googleLogin(req, res))
// router.get("/doctors",verifyUserAuth, (req, res) => user.getAllDoct(req, res))
// router.get("/doctors/sort",verifyUserAuth, (req, res) => user.getAllDoctbySort(req, res))  
// router.get("/doctor/:id",verifyUserAuth, (req, res) => user.getSingleDoct(req, res))
// router.get("/doctor/slot/:id",verifyUserAuth, (req, res) => user.getSlotedoctor(req, res)) 
router.get("/department",verifyUserAuth, (req, res,next) => user.getAllDept(req, res,next)) 
// router.get("/profile", verifyUserAuth, (req, res) => {
//   user.getUserdetail(req as CustomRequest, res);
// });

router.patch('/doctor/:reciever',verifyUserAuth, (req, res) => user.updatemessagetime(req as CustomRequest, res))
// router.post("/profile", verifyUserAuth, (req, res) => {
//   user.updateUserdetail(req as CustomRequest, res);
// });

// router.post("/lockslot", verifyUserAuth, (req, res) => {
//   user.createLockslot(req as CustomRequest, res);
// })
// router.post("/bookappoinment", verifyUserAuth, (req, res) => {
//   user.createpayment(req as CustomRequest, res);
// })
// router.post("/verify-payment", verifyUserAuth, (req, res) => {
//   user.verifyPayment(req as CustomRequest, res);
// })

// router.post("/createappoinment", verifyUserAuth, (req, res) => {
//   user.createappoinment(req as CustomRequest, res);
// })
// router.get("/appointments/future", verifyUserAuth, (req, res) => {
//   user.getfutureAppoinment(req as CustomRequest, res);
// })
// router.get("/page", verifyUserAuth, (req, res) => {
//   user.getPages(req as CustomRequest, res);
// })
// router.get("/appointments/past", verifyUserAuth, (req, res) => {
//   user.getpasteAppoinments(req as CustomRequest, res);
// })

// router.patch("/appointment", verifyUserAuth, (req, res) => {
//   user.changestatusAppoinments(req as CustomRequest, res);
// })

// router.get("/messages", verifyUserAuth, (req, res) => {
//   user.getAllmessages(req as CustomRequest, res);
// })
// router.delete("/messages/:messageid", verifyUserAuth, (req, res) => {
//   user.deletemessages(req as CustomRequest, res);
// })

router.get("/gettoken", verifyUserAuth, (req, res) => {
  user.gettoken(req as CustomRequest, res);
})


router.get("/report/:appId", verifyUserAuth, (req, res) => {
  user.reportget(req as CustomRequest, res);
})

router.get("/report/:appId", verifyUserAuth, (req, res) => {
  user.reportget(req as CustomRequest, res);
})

router.get("/wallet", verifyUserAuth, (req, res) => {
  user.walletget(req as CustomRequest, res);
})

router.get("/status", verifyUserAuth, (req, res) => {
  user.getSingleuser(req as CustomRequest, res);
})

// router.get("/messages/unread-counts", verifyUserAuth, (req, res) => {
//   user.getUnreadcount(req as CustomRequest, res);
// })

// router.post("/review", verifyUserAuth, (req, res) => {
//   user.createReview(req as CustomRequest, res);
// })
// router.get("/review", verifyUserAuth, (req, res) => {
//   user.getreviews(req as CustomRequest, res);
// })
// router.get("/review/count", verifyUserAuth, (req, res) => {
//   user.average(req as CustomRequest, res);
// })

router.use(errorHandler)
export { router as userRouter };