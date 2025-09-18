import {DoctorAuthController} from '../../../interfaces/controller/doctorController/authController'
import {DepartmentController} from '../../../interfaces/controller/doctorController/departnemntController'
import {MessageController} from '../../../interfaces/controller/doctorController/messageController'
import {ReportController} from '../../../interfaces/controller/doctorController/reportController'
import {DoctorWalletController}  from '../../../interfaces/controller/doctorController/walletController'
import {UserManagementController} from '../../../interfaces/controller/doctorController/userController'
import {DoctorAppointmentController}    from '../../../interfaces/controller/doctorController/appoinmentController'
import {DoctorSlotController} from '../../../interfaces/controller/doctorController/slotController'
import {DoctorProfileController} from '../../../interfaces/controller/doctorController/doctorProfileController'

import {DocRegister} from '../../../application/usecase/registration/DocRegister'
import {DoctorLogin} from '../../../application/usecase/registration/DoctorLogin'
import {DocReapply} from '../../../application/usecase/registration/DoctorReapply'
import {OtpdocCretion} from '../../../application/usecase/otp/DoctorOtpCreation'
import {DoctorOtpVerify} from '../../../application/usecase/otp/OtpDoctorVerification'
import {DoctorPasswordRest} from '../../../application/usecase/registration/DoctorPasswordRest'
import {GetAllUnblockedDept} from '../../../application/usecase/department/GetAllUnblockedDept'
import {GetAllMessages} from '../../../application/usecase/conversation/GetAllMessages'
import {GetUnreadCountMessage} from '../../../application/usecase/conversation/GetUnreadMessageCount'
import {Deletemessage}  from '../../../application/usecase/conversation/DeleteMessage'
import {Addreport} from '../../../application/usecase/report/Addreport'
import {GetDoctorWallet} from '../../../application/usecase/wallet/GetDoctorWallet'
import {GetUserBysort }from '../../../application/usecase/user/GetUserBysort'
import {GetdoctorAppointment} from '../../../application/usecase/appoinment/GetDoctorAppointments'
import {ChangestatusAppointment}  from '../../../application/usecase/appoinment/ChangeAppointmentStatus'
import {GetSingleappoinment}  from '../../../application/usecase/appoinment/GetSingleAppoinment'
import {Reshedule} from '../../../application/usecase/appoinment/RescheduleAppoinment'
import {GetdoctorAppointmentCount} from '../../../application/usecase/appoinment/GetDoctorAppointmentCount'
import {GetFilterfordoc} from '../../../application/usecase/appoinment/GetFilterforDoc'
import{Createfollowup} from '../../../application/usecase/appoinment/CreateFollowUp'
import {GetPage} from '../../../application/usecase/appoinment/GetPage'
import {CreateSlot} from '../../../application/usecase/slot/CreateSlot'
import {GetRecurringSlot} from '../../../application/usecase/slot/GetRecurringSlot'
import {CancelRecurringSlot} from '../../../application/usecase/slot/CancelRecurringSlot'
import {CancelSlot} from '../../../application/usecase/slot/CancelSlot'
import{GetSlotByDate} from '../../../application/usecase/slot/GetSlotByDate'
import {EditSlot} from '../../../application/usecase/slot/EditSlot'
import {FetchSingleDoctor} from '../../../application/usecase/doctor/GetSingleDoctor'
import {Docprofile} from '../../../application/usecase/doctor/UpdateDoctorProfile'
import {MessageTimeUpdation} from '../../../application/usecase/conversation/MessageTimeUpdationForDoc'
import {GetDept}  from '../../../application/usecase/department/GetDepartment'

import {MongoRegRepository} from '../../repository/RegistrationRepositoryImpl'
import {MongoDeptRepository} from '../../repository/DepartmentRepositoryImpl'
import {MongoConversationRepo} from '../../repository/ConversationRepositoryImpl.ts'
import {MongoreportRepository}  from '../../repository/ReportRepositoryImpl'
import {MongoWalletRepository} from '../../repository/WalletRepositoryImpl'
import {MongoUserRepository } from '../../repository/UserRepositoryImpl'
import {MongoAppointmentRepository}  from '../../repository/AppointmentRepositoryImpl'
import {MongoSlotRepostory} from  '../../repository/SlotRepositoryImpl'
import {MongoDocRepository} from '../../repository/DoctorRepositoryImpl.ts'


const mongoregrepository=new MongoRegRepository()
const mongodeptRepository=new MongoDeptRepository()
const mongoConversationRepo=new MongoConversationRepo()
const mongoreportrepository=new MongoreportRepository()
const mongoWalletRepository=new MongoWalletRepository()
const mongoUserRepository =new MongoUserRepository()
const mongoAppointmentRepository=new MongoAppointmentRepository()
const mongoSlotRepostory=new MongoSlotRepostory()
const mongodocRepository=new MongoDocRepository()

const doctorregister=new DocRegister(mongodocRepository)
const doclogin=new DoctorLogin(mongodocRepository)
const docreapply=new DocReapply(mongodocRepository)
const otpdocCreation=new OtpdocCretion(mongoregrepository)
const doctorotpverify=new DoctorOtpVerify(mongoregrepository)
const doctorpassreset=new DoctorPasswordRest(mongoregrepository)
export const auth=new DoctorAuthController(doctorregister,doclogin,docreapply,otpdocCreation,doctorotpverify,doctorpassreset)

const getallunblockedept=new GetAllUnblockedDept(mongodeptRepository)
const gGetDept=new GetDept(mongodeptRepository)
export const department=new DepartmentController(getallunblockedept,gGetDept)

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
const reschedule = new Reshedule(mongoAppointmentRepository,mongoAppointmentRepository,mongoSlotRepostory);
const getDoctorAppointmentCount = new GetdoctorAppointmentCount(mongoAppointmentRepository);
const getFilterForDoc = new GetFilterfordoc(mongoAppointmentRepository);
const createFollowUp = new Createfollowup(mongoAppointmentRepository,mongoAppointmentRepository,mongoSlotRepostory);
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


const createSlot = new CreateSlot(mongoSlotRepostory,mongoSlotRepostory);
const getRecurringSlot = new GetRecurringSlot(mongoSlotRepostory);
const cancelRecurringSlot = new CancelRecurringSlot(mongoSlotRepostory);
const cancelSlot = new CancelSlot(mongoSlotRepostory,mongoSlotRepostory);
const getSlotByDate = new GetSlotByDate(mongoSlotRepostory);
const editrecslot=new EditSlot(mongoSlotRepostory,mongoSlotRepostory);
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