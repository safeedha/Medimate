import {DoctorAuthController} from '../../../interfaces/controller/doctorController/authController'
import {DepartmentController} from '../../../interfaces/controller/doctorController/departnemntController'
import {MessageController} from '../../../interfaces/controller/doctorController/messageController'
import {ReportController} from '../../../interfaces/controller/doctorController/reportController'
import {DoctorWalletController}  from '../../../interfaces/controller/doctorController/walletController'
import {UserManagementController} from '../../../interfaces/controller/doctorController/userController'
import {DoctorAppointmentController}    from '../../../interfaces/controller/doctorController/appoinmentController'
import {DoctorSlotController} from '../../../interfaces/controller/doctorController/slotController'
import {DoctorProfileController} from '../../../interfaces/controller/doctorController/doctorProfileController'

import {DocRegister} from '../../../application/usecase/reg/docsignup'
import {DoctorLogin} from '../../../application/usecase/reg/doclogin'
import {DocReapply} from '../../../application/usecase/reg/reapply'
import {OtpdocCretion} from '../../../application/usecase/otp/otpdoccreation'
import {DoctorOtpVerify} from '../../../application/usecase/otp/otpdocverify'
import {DoctorPasswordRest} from '../../../application/usecase/reg/resetdocter'
import {GetAllUnblockedDept} from '../../../application/usecase/dept/getunblocked'
import {GetAllMessages} from '../../../application/usecase/conversation/getallmessage'
import {GetUnreadCountMessage} from '../../../application/usecase/conversation/getunreadcount'
import {Deletemessage}  from '../../../application/usecase/conversation/deletemessage'
import {Addreport} from '../../../application/usecase/report/addreport'
import {GetDoctorWallet} from '../../../application/usecase/wallet/getdoctorwallet'
import {GetUserBysort }from '../../../application/usecase/user/getallsort'
import {GetdoctorAppointment} from '../../../application/usecase/appoinment/getdoctorappoi'
import {ChangestatusAppointment}  from '../../../application/usecase/appoinment/changestatus'
import {GetSingleappoinment}  from '../../../application/usecase/appoinment/getSingleappoinment'
import {Reshedule} from '../../../application/usecase/appoinment/reshedule'
import {GetdoctorAppointmentCount} from '../../../application/usecase/appoinment/getCount'
import {GetFilterfordoc} from '../../../application/usecase/appoinment/getfilterfordoc'
import{Createfollowup} from '../../../application/usecase/appoinment/createfolloup'
import {GetPage} from '../../../application/usecase/appoinment/getPage'
import {CreateSlot} from '../../../application/usecase/slot/createslot'
import {GetRecurringSlot} from '../../../application/usecase/slot/getAllrecslot'
import {CancelRecurringSlot} from '../../../application/usecase/slot/cancelslot'
import {CancelSlot} from '../../../application/usecase/slot/deleteslot'
import{GetSlotByDate} from '../../../application/usecase/slot/getslotbydate'
import {EditSlot} from '../../../application/usecase/slot/editrecslot'
import {FetchSingleDoctor} from '../../../application/usecase/doctor/getSingledoc'
import {Docprofile} from '../../../application/usecase/doctor/docProfile'
import {MessageTimeUpdation} from '../../../application/usecase/conversation/messagtime'


import {MongoRegRepository} from '../../repository/mongoregRepository'
import {MongoDeptRepository} from '../../repository/mongodeptRepository'
import {MongoConversationRepo} from '../../repository/mongoconverRep'
import {MongoreportRepository}  from '../../repository/mongoreportRep'
import {MongoWalletRepository} from '../../repository/mongowalletrep'
import {MongoUserRepository } from '../../repository/mongouserRepository'
import {MongoAppointmentRepository}  from '../../repository/mongoappRep'
import {MongoSlotRepostory} from  '../../repository/mongoslotrep'
import {MongoDocRepository} from '../../repository/mongodocRepository'


const mongoregrepository=new MongoRegRepository()
const mongodeptRepository=new MongoDeptRepository()
const mongoConversationRepo=new MongoConversationRepo()
const mongoreportrepository=new MongoreportRepository()
const mongoWalletRepository=new MongoWalletRepository()
const mongoUserRepository =new MongoUserRepository()
const mongoAppointmentRepository=new MongoAppointmentRepository()
const mongoSlotRepostory=new MongoSlotRepostory()
const mongodocRepository=new MongoDocRepository()

const doctorregister=new DocRegister(mongoregrepository)
const doclogin=new DoctorLogin(mongoregrepository)
const docreapply=new DocReapply(mongoregrepository)
const otpdocCreation=new OtpdocCretion(mongoregrepository)
const doctorotpverify=new DoctorOtpVerify(mongoregrepository)
const doctorpassreset=new DoctorPasswordRest(mongoregrepository)
export const auth=new DoctorAuthController(doctorregister,doclogin,docreapply,otpdocCreation,doctorotpverify,doctorpassreset)

const getallunblockedept=new GetAllUnblockedDept(mongodeptRepository)
export const department=new DepartmentController(getallunblockedept)

const getAllMessages=new GetAllMessages(mongoConversationRepo)
const getUnreadCountMessage=new GetUnreadCountMessage(mongoConversationRepo)
const deletemessage=new Deletemessage(mongoConversationRepo)
export const message=new MessageController(getAllMessages,deletemessage,getUnreadCountMessage)

const addreport=new Addreport(mongoreportrepository)
export const report =new ReportController(addreport)

const getDoctorWallet=new GetDoctorWallet(mongoWalletRepository)
export const wallet=new DoctorWalletController(getDoctorWallet)

const getsortuser=new GetUserBysort(mongoUserRepository)
const meassgeupdation= new MessageTimeUpdation(mongoConversationRepo)
export const user=new UserManagementController(getsortuser,meassgeupdation)


const getDoctorAppointment = new GetdoctorAppointment(mongoAppointmentRepository);
const changeStatusAppointment = new ChangestatusAppointment(mongoAppointmentRepository,mongoSlotRepostory,mongoWalletRepository);
const getSingleAppointment = new GetSingleappoinment(mongoAppointmentRepository);
const reschedule = new Reshedule(mongoAppointmentRepository,mongoSlotRepostory);
const getDoctorAppointmentCount = new GetdoctorAppointmentCount(mongoAppointmentRepository);
const getFilterForDoc = new GetFilterfordoc(mongoAppointmentRepository);
const createFollowUp = new Createfollowup(mongoAppointmentRepository,mongoSlotRepostory);
const getPage = new GetPage(mongoAppointmentRepository);
export const appointment = new DoctorAppointmentController(
  getDoctorAppointment,
  changeStatusAppointment,
  getSingleAppointment,
  reschedule,
  getDoctorAppointmentCount,
  getFilterForDoc,
  createFollowUp,
  getPage
);


const createSlot = new CreateSlot(mongoSlotRepostory);
const getRecurringSlot = new GetRecurringSlot(mongoSlotRepostory);
const cancelRecurringSlot = new CancelRecurringSlot(mongoSlotRepostory);
const cancelSlot = new CancelSlot(mongoSlotRepostory);
const getSlotByDate = new GetSlotByDate(mongoSlotRepostory);
const editrecslot=new EditSlot(mongoSlotRepostory);
export const slot = new DoctorSlotController(
  createSlot,
  getRecurringSlot,
  cancelRecurringSlot,
  cancelSlot,
  getSlotByDate,
  editrecslot
);

const fetchSingleDoctor=new FetchSingleDoctor(mongodocRepository)
const docprofile=new Docprofile(mongodocRepository)
export const doctor=new DoctorProfileController(docprofile,fetchSingleDoctor,)