import express from 'express'
import {AdminController} from '../controller/admin.controller'
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
import errorHandler from '../../infrastructure/middleware/errorHandler';
const router=express.Router()

const mongouserrepository=new MongoUserRepository()
const mongoAppointmentRepository=new MongoAppointmentRepository()
const mongoWalletRepository=new MongoWalletRepository()
const mongodocrepository=new MongoDocRepository()

const getFilter=new GetFilter(mongoAppointmentRepository)
const getAlldoctor=new GetAlldoctor(mongodocrepository)
const getsingledoc=new GetSingledoc(mongodocrepository)
const getsingleUser=new GetsingleUser(mongouserrepository)
const refundhandle=new Refundhandle(mongoWalletRepository)
const paytodoctor=new Paytodoctor(mongoWalletRepository)
const getPayout=new GetPayout(mongoWalletRepository)
const getdoctorAppointmentByid=new GetdoctorAppointmentByid(mongoAppointmentRepository)
const getUser=new GetUser(mongouserrepository)
const changestatus=new ChangeStatus(mongouserrepository)
const getDashbordappoinment=new GetDashbordappoinment(mongoAppointmentRepository)
const getCountofappforeachDoc=new GetCountofappforeachDoc(mongoAppointmentRepository)
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
const getrefund =new Getrefund( mongoWalletRepository)

const login=new Login()
const admin=new AdminController(login,addDept,getDept,getUnverified,getverified
,getUser,changestatus,changedocstat,verifyDoctor,editDept,blockDept,getdoctorAppointmentByid,getAdminWallet,
getrefund ,getPayout,paytodoctor,refundhandle,getsingleUser,getsingledoc,getAlldoctor,getDashbordappoinment,
 getCountofappforeachDoc,getFilter
)




router.post("/login", (req, res, next) => admin.adminLogin(req, res, next));
router.get("/logout", (req, res, next) => admin.adminLogout(req, res, next));


router.put("/department/:id", verifyAdminAuth, (req, res, next) => admin.editDepartment(req, res, next));
router.patch("/department/:id", verifyAdminAuth, (req, res, next) => admin.blockDepartment(req, res, next));
router.get("/department", verifyAdminAuth, (req, res, next) => admin.getDepartment(req, res, next));
router.post("/department", verifyAdminAuth, (req, res, next) => admin.createDepartment(req, res, next));



router.get("/doctor/unverified", verifyAdminAuth, (req, res, next) => admin.getAllunVerfiedDoctors(req, res, next));
router.get("/doctor", verifyAdminAuth, (req, res, next) => admin.getAllVerfiedDoctors(req, res, next));
router.get("/doctor/:doctorid", verifyAdminAuth, (req, res, next) => admin.getSingledoctor(req, res, next));
router.patch("/doctor/status/:id", verifyAdminAuth, (req, res, next) => admin.changeDoctorblockstatus(req, res, next));
router.patch("/doctor/verify/:id", verifyAdminAuth, (req, res, next) => admin.verification(req, res, next));



router.get("/user", verifyAdminAuth, (req, res, next) => admin.getAllUser(req, res, next));
router.patch("/user/status/:id", verifyAdminAuth, (req, res, next) => admin.changeUserblockstatus(req, res, next));
router.patch("/user/:id", verifyAdminAuth, (req, res, next) => admin.getsingleuser(req, res, next));


router.get("/appoinment/doctor/:id",verifyAdminAuth,(req, res,next) => admin.getAllappoinmentbydoctor(req, res,next))
router.get("/appoinment", verifyAdminAuth, (req, res, next) => admin.getAllappoinment(req, res, next));
router.get("/appoinment/count", verifyAdminAuth, (req, res, next) => admin.getCountforDoc(req, res, next));
router.get("/appoinment/filter", verifyAdminAuth, (req, res, next) => admin.getAppointmentsFiltered(req, res, next));
router.get("/wallet", verifyAdminAuth, (req, res, next) => admin.getWalletinformation(req, res, next));

// router.get("/wallet/refund",verifyAdminAuth,(req, res) => admin.getRefundinformation(req, res))
router.get("/wallet/pay", verifyAdminAuth, (req, res, next) => admin.payoutinformation(req, res, next));
router.post("/wallet/pay", verifyAdminAuth, (req, res, next) => admin.payouttodoctor(req, res, next));
router.post("/wallet/refund", verifyAdminAuth, (req, res, next) => admin.refundhandl(req, res, next));


router.use(errorHandler)
export { router as adminRouter };
