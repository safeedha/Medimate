import express,{Request} from 'express'
const router=express.Router()
import {DoctorController} from '../controller/doctor.controller'
import {GetDept} from '../../application/usecase/dept/getDept'
import {MongoDeptRepository} from '../../infrastructure/repository/mongodeptRepository'
import {DocRegister} from '../../application/usecase/reg/docsignup'
import {MongoRegRepository} from '../../infrastructure/repository/mongoregRepository'
import {DoctorLogin} from '../../application/usecase/reg/doclogin'
import {OtpdocVerify} from '../../application/usecase/otp/otpdocverify'
import {Docprofile} from '../../application/usecase/doctor/docProfile'
import { MongoDocRepository } from '../../infrastructure/repository/mongodocRepository'
import {DocPassrest} from '../../application/usecase/reg/resetdocter'
import {verifyDoctorToken } from '../../infrastructure/middleware/verifyDoctorToke'
import {verifyDoctor} from '../../infrastructure/middleware/verifyDoctor'
import {DocReapply} from '../../application/usecase/reg/reapply'
import {OtpdocCretion} from '../../application/usecase/otp/otpdoccreation'
import {CreateSlot} from '../../application/usecase/slot/createslot'
import{MongoSlotRepostory} from'../../infrastructure/repository/mongoslotrep'
import {GetRecurringSlot} from '../../application/usecase/slot/getAllrecslot'
import {GetdoctorAppointment} from  '../../application/usecase/appoinment/getdoctorappoi'
import{MongoAppointmentRepository} from '../../infrastructure/repository/mongoappRep'
import {CancelRecurringSlot} from '../../application/usecase/slot/cancelslot'
import {ChangestatusAppointment} from '../../application/usecase/appoinment/changestatus'
import {GetsingleUser} from "../../application/usecase/user/getSingleUser"
import {MongoUserRepository } from '../../infrastructure/repository/mongouserRepository'
import {GetSlotByDate} from '../../application/usecase/slot/getslotbydate'
import {CancelSlot} from '../../application/usecase/slot/deleteslot'
import {GetUser} from "../../application/usecase/user/getUser"
import {MongoConversationRepo}  from '../../infrastructure/repository/mongoconverRep'
import {GetAllmessage} from '../../application/usecase/conversation/getallmessage'
import{Addreport} from '../../application/usecase/report/addreport'
import {MongoreportRepository} from '../../infrastructure/repository/mongoreportRep'
import {GetDoctorWallet}  from '../../application/usecase/doctorwallet/getdoctorwallet'
import {MongoWalletRepository} from  '../../infrastructure/repository/mongowalletrep'
import {GetSingleappoinment} from  '../../application/usecase/appoinment/getSingleappoinment'
import {Getallunblockeddept}from '../../application/usecase/dept/getunblocked';
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

const mongoregrepository=new MongoRegRepository()
const mongoslotrepository=new MongoSlotRepostory()
const  mongoapporespository=new MongoAppointmentRepository()
const  mongoUserrepository=new MongoUserRepository () 
const mongoConversationRepo=new MongoConversationRepo()
const mongoreportRepository=new MongoreportRepository()
const mongoWalletRepository=new MongoWalletRepository()
const mongodocRepository=new MongoDocRepository()

const getUserBysort=new GetUserBysort(mongoUserrepository)
const messageTimeUpdation=new MessageTimeUpdation(mongoConversationRepo)
const deletemessage=new Deletemessage(mongoConversationRepo)
const getsingledoc=new GetSingledoc(mongodocRepository)
const getPage=new GetPage(mongoapporespository)
const createfollowup=new Createfollowup(mongoapporespository,mongoslotrepository)
const getFilterfordoc=new GetFilterfordoc( mongoapporespository)
const getdoctorAppointmentCount=new GetdoctorAppointmentCount( mongoapporespository)
const reshedule=new Reshedule(mongoapporespository,mongoslotrepository)
const getunreadcount=new Getunreadcount(mongoConversationRepo)
const getsingleappoinment=new GetSingleappoinment( mongoapporespository)
const getDoctorWallet=new GetDoctorWallet(mongoWalletRepository)
const addreport=new Addreport(mongoreportRepository)
const cancelslot=new CancelSlot(mongoslotrepository)
const getslotbydate=new GetSlotByDate(mongoslotrepository)
const changestatusAppointment=new ChangestatusAppointment(mongoapporespository,mongoslotrepository,mongoWalletRepository)
const getsingleUser=new GetsingleUser(mongoUserrepository)
const docsignup=new DocRegister(mongoregrepository)
const doclogin=new DoctorLogin(mongoregrepository)
const docpassreset=new DocPassrest(mongoregrepository)
const docotpverify=new OtpdocVerify(mongoregrepository)
const docreapply=new DocReapply(mongoregrepository)
const otpdoccreation=new OtpdocCretion(mongoregrepository)
const mongodeotrepository=new MongoDeptRepository()
const getallunblockeddept=new Getallunblockeddept(mongodeotrepository)
const getDept=new GetDept(mongodeotrepository)
const createslot=new CreateSlot(mongoslotrepository)
const getrecSlot=new GetRecurringSlot(mongoslotrepository)
const mongodocrepository=new MongoDocRepository()
const getallmessage=new GetAllmessage(mongoConversationRepo)
const docprofile=new Docprofile(mongodocrepository)
const getdoctorAppointment=new GetdoctorAppointment(mongoapporespository)
const cancelRecurringSlot=new CancelRecurringSlot(mongoslotrepository)
const getUser=new GetUser(mongoUserrepository)
const refreshToken=new RefreshToken()
const doctor=new DoctorController(getDept,docsignup,doclogin,docotpverify,docprofile,docpassreset,docreapply,otpdoccreation,createslot,getrecSlot,getdoctorAppointment,cancelRecurringSlot,changestatusAppointment,getsingleUser,getslotbydate,cancelslot,getUser,getallmessage,addreport,getDoctorWallet,getsingleappoinment,getallunblockeddept,getunreadcount,reshedule,getdoctorAppointmentCount,getFilterfordoc,createfollowup,getPage,refreshToken,getsingledoc,deletemessage,messageTimeUpdation,getUserBysort)
interface CustomRequest extends Request {
  id: string;
}
 router.post("/signup", (req, res) => doctor.signup(req, res)) 
 router.post("/login", (req, res) => doctor.login(req, res))
  router.get("/logout", (req, res) => doctor.logout(req, res))
 router.put("/reapply",(req, res) => doctor.reapplication(req, res)) 
 router.post("/sendotp", (req, res) => doctor.sendOtp(req, res))
 router.post("/verifyotp", (req, res) => doctor.verifyOtp(req, res)) 
router.post("/update",verifyDoctor, (req, res) => doctor.updatedocprofile(req, res)) 
router.post("/reset", (req, res) => doctor.resetPassword(req, res)) 
router.post("/refresh-token", (req, res) => doctor.refreshTokencontroller(req, res))
router.get("/user",verifyDoctor, (req, res) => doctor.getAllUser(req as CustomRequest, res))
router.get("/department", (req, res) => doctor.getAllDept(req, res)) 
router.get('/status',verifyDoctor, (req, res) => doctor.getStatus(req as CustomRequest, res))

router.patch('/user/:reciever',verifyDoctor, (req, res) => doctor.updatemessagetime(req as CustomRequest, res))
router.post("/slot/recurring",verifyDoctor, (req, res) => doctor.createAppoinment(req as CustomRequest, res)) 
router.get("/page",verifyDoctor,(req, res) => doctor.getpage(req, res)) 
router.post('/appoinment/reshedule',verifyDoctor,(req, res) => doctor.createresedule(req as CustomRequest, res))
router.get("/slots/recurring/:id",(req, res) => doctor.getAllrecurringslots(req, res)) 
router.get("/appoinment",verifyDoctor,(req, res) => doctor.getAllappoinment(req as CustomRequest, res)) 
router.delete('/slots/recurring/:id',verifyDoctor,(req, res) => doctor.cancelappoinment(req as CustomRequest, res))
router.patch("/appoinment/:id/:userid",verifyDoctor,(req, res) => doctor.changestatusappoinment(req as CustomRequest, res)) 
router.patch("/appoinment/:id",verifyDoctor,(req, res) => doctor.changecompletstatusappoinment(req as CustomRequest, res)) 
router.get("/appoinment/count",verifyDoctor,(req, res) => doctor.getOverview(req as CustomRequest, res)) 
router.get("/appoinment/filter",verifyDoctor,(req, res) => doctor.getfilter(req as CustomRequest, res)) 
router.get("/appoinment/:id",verifyDoctor,(req, res) => doctor.getsingleappoinment(req as CustomRequest, res))
router.post(`/appoinment/followup`, verifyDoctor, (req, res) => {
  doctor.createfollowp(req as CustomRequest, res);
})
router.get("/slots",verifyDoctor,(req, res) => doctor.getSlotsofdoctor(req as CustomRequest, res)) 
router.delete("/slots/:slotid",verifyDoctor,(req, res) => doctor.cancelSlots(req as CustomRequest, res))

router.get("/messages", verifyDoctor, (req, res) => {
  doctor.getAllmessages(req as CustomRequest, res);
})
router.delete("/messages/:messageid", verifyDoctor, (req, res) => {
  doctor.deletemessages(req as CustomRequest, res);
})

router.post("/report", verifyDoctor, (req, res) => {
  doctor.Addreport(req as CustomRequest, res);
})

router.get("/wallet", verifyDoctor, (req, res) => {
  doctor.getWallet(req as CustomRequest, res);
})

router.get("/messages/unread-counts", verifyDoctor, (req, res) => {
  doctor.getUnreadcount(req as CustomRequest, res);
})
export { router as doctorRouter };