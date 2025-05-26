import express,{Request} from 'express'
const router=express.Router()
import {DoctorController} from '../../interfaces/controller/doctorController'
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

const mongoregrepository=new MongoRegRepository()
const mongoslotrepository=new MongoSlotRepostory()
const  mongoapporespository=new MongoAppointmentRepository()
const docsignup=new DocRegister(mongoregrepository)
const doclogin=new DoctorLogin(mongoregrepository)
const docpassreset=new DocPassrest(mongoregrepository)
const docotpverify=new OtpdocVerify(mongoregrepository)
const docreapply=new DocReapply(mongoregrepository)
const otpdoccreation=new OtpdocCretion(mongoregrepository)
const mongodeotrepository=new MongoDeptRepository()
const getDept=new GetDept(mongodeotrepository)
const createslot=new CreateSlot(mongoslotrepository)
const getrecSlot=new GetRecurringSlot(mongoslotrepository)
const mongodocrepository=new MongoDocRepository()
const docprofile=new Docprofile(mongodocrepository)
const getdoctorAppointment=new GetdoctorAppointment(mongoapporespository)
const doctor=new DoctorController(getDept,docsignup,doclogin,docotpverify,docprofile,docpassreset,docreapply,otpdoccreation,createslot,getrecSlot,getdoctorAppointment)
interface CustomRequest extends Request {
  id: string;
}
 router.post("/signup", (req, res) => doctor.signup(req, res)) 
 router.post("/login", (req, res) => doctor.login(req, res))
 router.put("/reapply",(req, res) => doctor.reapplication(req, res)) 
 router.post("/sendotp", (req, res) => doctor.sendOtp(req, res))
 router.post("/verifyotp", (req, res) => doctor.verifyOtp(req, res)) 
router.post("/update",verifyDoctorToken, (req, res) => doctor.updatedocprofile(req, res)) 
router.post("/reset", (req, res) => doctor.resetPassword(req, res)) 

router.get("/department", (req, res) => doctor.getAllDept(req, res)) 
 

router.post("/slot/recurring",verifyDoctorToken, (req, res) => doctor.createAppoinment(req, res)) 


router.get("/slots/recurring/:id",(req, res) => doctor.getAllrecurringslots(req, res)) 
router.get("/doctor/appoinment",verifyDoctor,(req, res) => doctor.getAllappoinment(req as CustomRequest, res)) 


export { router as doctorRouter };