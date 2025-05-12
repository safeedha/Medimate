import express from 'express'
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
const mongoregrepository=new MongoRegRepository()
const docsignup=new DocRegister(mongoregrepository)
const doclogin=new DoctorLogin(mongoregrepository)
const docpassreset=new DocPassrest(mongoregrepository)
const docotpverify=new OtpdocVerify(mongoregrepository)
const mongodeotrepository=new MongoDeptRepository()
const getDept=new GetDept(mongodeotrepository)

const mongodocrepository=new MongoDocRepository()
const docprofile=new Docprofile(mongodocrepository)
const doctor=new DoctorController(getDept,docsignup,doclogin,docotpverify,docprofile,docpassreset)

 router.post("/signup", (req, res) => doctor.signup(req, res)) 
 router.post("/login", (req, res) => doctor.login(req, res)) 
 router.post("/verifyotp", (req, res) => doctor.verifyOtp(req, res)) 
router.post("/update",verifyDoctorToken, (req, res) => doctor.updatedocprofile(req, res)) 
router.post("/reset", (req, res) => doctor.resetPassword(req, res)) 

router.get("/department", (req, res) => doctor.getAllDept(req, res)) 
 





export { router as doctorRouter };