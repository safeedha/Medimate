import{AuthController} from '../../../interfaces/controller/adminController/authController'
import {DepartmentController} from '../../../interfaces/controller/adminController/departmentController'
import {DoctorController} from '../../../interfaces/controller/adminController/doctorControlller'
import {UserController} from '../../../interfaces/controller/adminController/userController'
import {AppointmentController} from '../../../interfaces/controller/adminController/appoinmentController'
import {WalletController}from '../../../interfaces/controller/adminController/walletController'


import {Login} from '../../../application/usecase/reg/adminLogin'
import {AddDept} from'../../../application/usecase/dept/addDept'
import {GetDept} from'../../../application/usecase/dept/getDept'
import {EditDept} from'../../../application/usecase/dept/editdept'
import {BlockDept} from'../../../application/usecase/dept/blockdept'
import {GetUnverified} from'../../../application/usecase/doctor/getunverifed'
import {ChangeDocStatus} from'../../../application/usecase/doctor/changestatus'
import{VerifyDoctor} from'../../../application/usecase/doctor/verify'
import {FetchSingleDoctor }  from'../../../application/usecase/doctor/getSingledoc'
import {GetAlldoctor} from'../../../application/usecase/doctor/getalldoctor'
import {GetUser} from'../../../application/usecase/user/getUser'
import {ChangeStatus}  from'../../../application/usecase/user/changestatus'
import{GetsingleUser}  from'../../../application/usecase/user/getSingleUser'
import {GetCountofappforeachDoc } from'../../../application/usecase/appoinment/gecountforeach'
import {GetFilter}  from'../../../application/usecase/appoinment/getfilter'
import {GetDashbordappoinment}  from'../../../application/usecase/appoinment/appoinmentdash'
import {GetAdminWallet}  from'../../../application/usecase/wallet/geadminwallet'
import {GetPayout}  from'../../../application/usecase/wallet/getpayout'
import {Paytodoctor} from'../../../application/usecase/wallet/paytodoctor'
import {GetdepartmentSummary}  from'../../../application/usecase/appoinment/getdepartmentsummary'

import {MongoDeptRepository} from '../../repository/mongodeptRepository'
import {MongoDocRepository} from '../../repository/mongodocRepository'
import {MongoUserRepository } from '../../repository/mongouserRepository'
import {MongoAppointmentRepository}  from '../../repository/mongoappRep'
import {MongoWalletRepository} from '../../repository/mongowalletrep'

const mongoDeptRepository=new MongoDeptRepository()
const mongodocRepository=new MongoDocRepository()
const mongoUserRepository =new MongoUserRepository()
const mongoAppointmentRepository=new MongoAppointmentRepository()
const mongoWalletRepository=new MongoWalletRepository()

const login=new Login()
export const auth=new AuthController(login)


const addDept = new AddDept(mongoDeptRepository);
const getDept = new GetDept(mongoDeptRepository);
const editDept = new EditDept(mongoDeptRepository);
const blockDept = new BlockDept(mongoDeptRepository);
export const department=new DepartmentController(addDept,getDept,editDept,blockDept)


const getUnverified = new GetUnverified(mongodocRepository);
const changeDocStatus = new ChangeDocStatus(mongodocRepository);
const verifyDoctor = new VerifyDoctor(mongodocRepository);
const fetchSingleDoctor = new FetchSingleDoctor(mongodocRepository);
const getAllDoctor = new GetAlldoctor(mongodocRepository);
export const doctor=new DoctorController(getUnverified,changeDocStatus,verifyDoctor,fetchSingleDoctor,getAllDoctor)


const getUser = new GetUser(mongoUserRepository);
const changeStatus = new ChangeStatus(mongoUserRepository);
const getSingleUser = new GetsingleUser(mongoUserRepository);
export const user=new UserController(getUser,changeStatus,getSingleUser)


const getCountofappforeachDoc = new GetCountofappforeachDoc(mongoAppointmentRepository);
const getFilter = new GetFilter(mongoAppointmentRepository);
const getDashbordappoinment = new GetDashbordappoinment(mongoAppointmentRepository);
const getdepartmentSummary=new GetdepartmentSummary(mongoAppointmentRepository)
export const appoinment=new AppointmentController(getDashbordappoinment,getCountofappforeachDoc,getFilter,getdepartmentSummary)

const getAdminWallet = new GetAdminWallet(mongoWalletRepository);
const getPayout = new GetPayout(mongoWalletRepository);
const payToDoctor = new Paytodoctor(mongoWalletRepository);
export const wallet=new WalletController(getAdminWallet,getPayout,payToDoctor)