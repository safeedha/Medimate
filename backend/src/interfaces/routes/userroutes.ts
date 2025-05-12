import express from 'express'
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

const mongoregRepository=new MongoRegRepository()
const mongodocRepository=new MongoDocRepository

const usergoogle=new Googleuser(mongoregRepository)
const userdoc=new Getverified(mongodocRepository)
const userreg=new UserReg(mongoregRepository)
const userlog=new UserLog(mongoregRepository)
const userrest=new UserPassrest(mongoregRepository)

const otpcration=new OtpCretion(mongoregRepository)
const otpverify=new OtpVerify(mongoregRepository)

const mongodeotrepository=new MongoDeptRepository()
const getDept=new GetDept(mongodeotrepository)
const user=new UserController(getDept,userreg,userlog,otpcration,otpverify,userrest,userdoc,usergoogle)



router.get("/department", (req, res) => user.getAllDept(req, res)) 
router.post("/register", (req, res) => user.register(req, res)) 
router.post("/login", (req, res) => user.login(req, res)) 
router.post("/sendotp", (req, res) => user.sendOtp(req, res))
router.post("/verifyotp", (req, res) => user.verifyOtp(req, res))
router.post("/reset",(req, res) => user.resetPassword(req, res))
router.post("/googlelogin",(req, res) => user.googleLogin(req, res))

router.get("/doctors",verifyUserAuth, (req, res) => user.getAllDoct(req, res)) 

// router.post("/verifyotp", (req, res) => user.verifyOtp(req, res))
export { router as userRouter };