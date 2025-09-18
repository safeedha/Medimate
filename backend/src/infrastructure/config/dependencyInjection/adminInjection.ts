import{AuthController} from '../../../interfaces/controller/adminController/authController'
import {DepartmentController} from '../../../interfaces/controller/adminController/departmentController'
import {DoctorController} from '../../../interfaces/controller/adminController/doctorControlller'
import {UserController} from '../../../interfaces/controller/adminController/userController'
import {AppointmentController} from '../../../interfaces/controller/adminController/appoinmentController'
import {WalletController}from '../../../interfaces/controller/adminController/walletController'


import {Login} from '../../../application/usecase/registration/AdminLogin'
import {AddDept} from'../../../application/usecase/department/AddDepartment'
import {GetDept} from'../../../application/usecase/department/GetDepartment'
import {EditDept} from'../../../application/usecase/department/EditDepartment'
import {BlockDept} from'../../../application/usecase/department/BlockDepartment'
import {GetUnverified} from'../../../application/usecase/doctor/GetUnverified'
import {ChangeDocStatus} from'../../../application/usecase/doctor/ChangeDoctorStatus'
import{VerifyDoctor} from'../../../application/usecase/doctor/VerifyDocto'
import {FetchSingleDoctor }  from'../../../application/usecase/doctor/GetSingleDoctor'
import {GetAlldoctor} from'../../../application/usecase/doctor/GetAllDoctor'
import {GetUser} from'../../../application/usecase/user/GetUser'
import {ChangeStatus}  from'../../../application/usecase/user/ChangeStatus'
import{GetsingleUser}  from'../../../application/usecase/user/GetSingleUser'
import {GetAppointmentsPerDoctor } from'../../../application/usecase/appoinment/GetAppointmentsPerDoctor'
import {GetFilter}  from'../../../application/usecase/appoinment/GetFilteredAppointment'
import {GetDashbordappoinment}  from'../../../application/usecase/appoinment/GetAppointmentDashboard'
import {GetAdminWallet}  from'../../../application/usecase/wallet/GetAdminWallet'
import {GetPayout}  from'../../../application/usecase/wallet/GetPayout'
import {Paytodoctor} from'../../../application/usecase/wallet/PaytoDoctor'
import {GetdepartmentSummary}  from'../../../application/usecase/appoinment/GetDepartmentSummary'

import {MongoDeptRepository} from '../../repository/DepartmentRepositoryImpl'
import {MongoDocRepository} from '../../repository/DoctorRepositoryImpl.ts'
import {MongoUserRepository } from '../../repository/UserRepositoryImpl'
import {MongoAppointmentRepository}  from '../../repository/AppointmentRepositoryImpl'
import {MongoWalletRepository} from '../../repository/WalletRepositoryImpl'

const mongoDeptRepository=new MongoDeptRepository()
const mongodocRepository=new MongoDocRepository()
const mongoUserRepository =new MongoUserRepository()
const mongoAppointmentRepository=new MongoAppointmentRepository()
const mongoWalletRepository=new MongoWalletRepository()

const login=new Login()
export const auth=new AuthController(login)


const addDept = new AddDept(mongoDeptRepository,mongoDeptRepository);
const getDept = new GetDept(mongoDeptRepository);
const editDept = new EditDept(mongoDeptRepository);
const blockDept = new BlockDept(mongoDeptRepository);
export const department=new DepartmentController(addDept,getDept,editDept,blockDept)


const getUnverified = new GetUnverified(mongodocRepository);
const changeDocStatus = new ChangeDocStatus(mongodocRepository);
const verifyDoctor = new VerifyDoctor(mongodocRepository,mongodocRepository);
const fetchSingleDoctor = new FetchSingleDoctor(mongodocRepository);
const getAllDoctor = new GetAlldoctor(mongodocRepository);
export const doctor=new DoctorController(getUnverified,changeDocStatus,verifyDoctor,fetchSingleDoctor,getAllDoctor)


const getUser = new GetUser(mongoUserRepository);
const changeStatus = new ChangeStatus(mongoUserRepository);
const getSingleUser = new GetsingleUser(mongoUserRepository);
export const user=new UserController(getUser,changeStatus,getSingleUser)


const getCountofappforeachDoc = new GetAppointmentsPerDoctor(mongoAppointmentRepository);
const getFilter = new GetFilter(mongoAppointmentRepository);
const getDashbordappoinment = new GetDashbordappoinment(mongoAppointmentRepository);
const getdepartmentSummary=new GetdepartmentSummary(mongoAppointmentRepository)
export const appoinment=new AppointmentController(getDashbordappoinment,getCountofappforeachDoc,getFilter,getdepartmentSummary)

const getAdminWallet = new GetAdminWallet(mongoWalletRepository);
const getPayout = new GetPayout(mongoWalletRepository);
const payToDoctor = new Paytodoctor(mongoWalletRepository);
export const wallet=new WalletController(getAdminWallet,getPayout,payToDoctor)