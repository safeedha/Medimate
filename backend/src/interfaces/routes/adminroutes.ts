import express from 'express'
import {AdminController} from '../../interfaces/controller/Admincontroller'
import {Login} from '../../application/usecase/dept/adminLogin'
import {AddDept} from '../../application/usecase/dept/addDept'
import {GetDept}  from '../../application/usecase/dept/getDept'
import {MongoDeptRepository} from '../../infrastructure/repository/mongodeptRepository'
import {MongoDocRepository} from '../../infrastructure/repository/mongodocRepository'
import {GetUnverified} from '../../application/usecase/doctor/getunverifed'
import {Getverified } from '../../application/usecase/doctor/getverified'
import {GetUser} from '../../application/usecase/user/getUser'
import {MongoUserRepository} from '../../infrastructure/repository/mongouserRepository'
import {ChangeStatus} from '../../application/usecase/user/changestatus'
import {ChangeDocStatus} from '../../application/usecase/doctor/changestatus'
import {VerifyDoctor} from '../../application/usecase/doctor/verify'
import {verifyAdminAuth} from '../../infrastructure/middleware/verifyAdminToken'
import {EditDept} from "../../application/usecase/dept/editdept"
import {BlockDept} from "../../application/usecase/dept/blockdept"
import{GetdoctorAppointmentByid}  from "../../application/usecase/appoinment/getappoinfordoc"
import{MongoAppointmentRepository} from '../../infrastructure/repository/mongoappRep'
import {GetAdminWallet} from '../../application/usecase/wallet/geadminwallet'
import {MongoWalletRepository} from  '../../infrastructure/repository/mongowalletrep'
const router=express.Router()

const mongouserrepository=new MongoUserRepository()
const mongoAppointmentRepository=new MongoAppointmentRepository()
const mongoWalletRepository=new MongoWalletRepository()
const getdoctorAppointmentByid=new GetdoctorAppointmentByid(mongoAppointmentRepository)
const getUser=new GetUser(mongouserrepository)
const changestatus=new ChangeStatus(mongouserrepository)
const mongodocrepository=new MongoDocRepository()
const getUnverified=new GetUnverified(mongodocrepository)
const getverified=new Getverified(mongodocrepository)
const changedocstat=new ChangeDocStatus(mongodocrepository)
const verifyDoctor=new VerifyDoctor(mongodocrepository)
const mongodeotrepository=new MongoDeptRepository()
const blockDept=new BlockDept(mongodeotrepository)
const editDept=new EditDept(mongodeotrepository)
const addDept=new AddDept(mongodeotrepository)
const getDept=new GetDept(mongodeotrepository)
const getAdminWallet=new GetAdminWallet(mongoWalletRepository)


const login=new Login()
const admin=new AdminController(login,addDept,getDept,getUnverified,getverified
,getUser,changestatus,changedocstat,verifyDoctor,editDept,blockDept,getdoctorAppointmentByid,getAdminWallet)




router.post("/login",(req, res) => admin.adminLogin(req, res))

router.put("/department/:id",verifyAdminAuth,(req, res) => admin.editDepartment(req, res))
router.patch("/department/:id",verifyAdminAuth,(req, res) => admin.blockDepartment(req, res))
router.get("/department",verifyAdminAuth,(req, res) => admin.getDepartment(req, res))
router.post("/department",verifyAdminAuth,(req, res) => admin.createDepartment(req, res))


router.get("/doctor/unverified",verifyAdminAuth, (req, res) => admin.getAllunVerfiedDoctors(req, res))
router.get("/doctor",verifyAdminAuth, (req, res) => admin.getAllVerfiedDoctors(req, res))
router.patch("/doctor/status/:id",verifyAdminAuth, (req, res) => admin.changeDoctorblockstatus(req, res))
router.patch("/doctor/verify/:id", verifyAdminAuth,(req, res) => admin.verification(req, res))


router.get("/user",verifyAdminAuth, (req, res) => admin.getAllUser(req, res))
router.patch("/user/status/:id",verifyAdminAuth,(req, res) => admin.changeUserblockstatus(req, res))

router.get("/appoinment/doctor/:id",verifyAdminAuth,(req, res) => admin.getAllappoinmentbydoctor(req, res))

router.get("/wallet",verifyAdminAuth,(req, res) => admin.getWalletinformation(req, res))
export { router as adminRouter };
