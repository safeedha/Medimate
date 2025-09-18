import{AuthController} from '../../../interfaces/controller/userController/authController'
import {AuthRecoveryController} from '../../../interfaces/controller/userController/authRecoveryController'
import {DoctorController} from '../../../interfaces/controller/userController/doctorController'
import {DepartmentController} from '../../../interfaces/controller/userController/departmentController'
import {UserProfileController } from '../../../interfaces/controller/userController/userController'
import {PaymentController} from '../../../interfaces/controller/userController/paymentController'
import {ReviewController} from '../../../interfaces/controller/userController/reviewController'
import {ConversationController} from '../../../interfaces/controller/userController/messageController'
import {AppointmentUserController}  from '../../../interfaces/controller/userController/appoinmentController'
import {UserWalletController}  from '../../../interfaces/controller/userController/walletController'
import {NotificationController} from '../../../interfaces/controller/userController/notificationController'
// import {DoctorSlotController} from '../../../interfaces/controller/userController/slotController'

import {UserRegistration} from '../../../application/usecase/registration/UserRegistration'
import {UserLogin} from '../../../application/usecase/registration/UserLog'
import {GoogleAuth} from '../../../application/usecase/registration/UserGoogle'
import {OtpCretion} from '../../../application/usecase/otp/UserOtpCreation'
import {OtpVerify} from '../../../application/usecase/otp/OtpVerification'
import {UserPasswordRest} from '../../../application/usecase/registration/UserPasswordRest'
import {GetAllUnblockedDept} from '../../../application/usecase/department/GetAllUnblockedDept'
import {FetchSingleDoctor} from '../../../application/usecase/doctor/GetSingleDoctor'
import {FetchVerifiedDoctor} from '../../../application/usecase/doctor/GetVerifiedDoctors'
import {FetchSortedDoctors} from '../../../application/usecase/doctor/GetSortedDoctors'
import {UpdatesingleUser} from '../../../application/usecase/user/UpdatesingleUser' 
import { GetsingleUser} from '../../../application/usecase/user/GetSingleUser'
import {Createreview} from '../../../application/usecase/review/Createreview'
import {GetAverage} from '../../../application/usecase/review/GetAverage'
import {Getreview} from '../../../application/usecase/review/Getreview'
import {GetAllMessages} from '../../../application/usecase/conversation/GetAllMessages'
import {GetUnreadCountMessage} from '../../../application/usecase/conversation/GetUnreadMessageCount'
import {Deletemessage}  from '../../../application/usecase/conversation/DeleteMessage'
import {GetSlotByDate} from '../../../application/usecase/slot/GetSlotByDate'
import {CreateAppointment} from '../../../application/usecase/appoinment/CreateAppointment'
import {GetfutureAppointment} from '../../../application/usecase/appoinment/GetFutureAppointments'
import {ChangestatusAppointment} from '../../../application/usecase/appoinment/ChangeAppointmentStatus'
import { CreateLockslot } from '../../../application/usecase/appoinment/CreateLockSlot'
import {GetPage} from '../../../application/usecase/appoinment/GetUsersPage'
import {Getreport} from '../../../application/usecase/report/Getreport'
import {GetUserallet}  from '../../../application/usecase/wallet/GetUserWallet'
import {AddUserwallet} from '../../../application/usecase/wallet/AddUserwallet'
import {Getunreadnotification} from '../../../application/usecase/notification/Getunreadnotification'
import {Readnotification} from '../../../application/usecase/notification/Readnotification'
import {MessageTimeUpdation} from '../../../application/usecase/conversation/MessageTimeUpdation'

import {MongoRegRepository} from '../../repository/RegistrationRepositoryImpl'
import {MongoDeptRepository} from '../../repository/DepartmentRepositoryImpl'
import {MongoDocRepository} from '../../repository/DoctorRepositoryImpl.ts'
import {MongoUserRepository } from '../../repository/UserRepositoryImpl'
import { MongoReviewRepository} from '../../repository/ReviewRepositoryImpl'
import {MongoConversationRepo} from '../../repository/ConversationRepositoryImpl.ts'
import {MongoAppointmentRepository}  from '../../repository/AppointmentRepositoryImpl'
import {MongoSlotRepostory} from  '../../repository/SlotRepositoryImpl'
import {MongoWalletRepository} from '../../repository/WalletRepositoryImpl'
import {MongoreportRepository} from '../../repository/ReportRepositoryImpl'
import {MongoNotification} from '../../repository/NotificationRepositoryImpl'

const mongoregRepository=new MongoRegRepository()
const mongodeptRepository=new MongoDeptRepository()
const mongodocRepository=new MongoDocRepository()
const mongoUserRepository =new MongoUserRepository()
const mongoReviewRepository=new MongoReviewRepository
const mongoConversationRepo=new MongoConversationRepo()
const mongoAppointmentRepository=new MongoAppointmentRepository()
const mongoSlotRepostory=new MongoSlotRepostory()
const mongoWalletRepository=new MongoWalletRepository()
const mongoreportRepository=new MongoreportRepository()
const mongoNotification=new MongoNotification()

const userRegistration = new UserRegistration(mongoUserRepository);
const userLogin = new UserLogin(mongoUserRepository );
const googleAuth = new GoogleAuth(mongoUserRepository );
export const auth = new AuthController(userRegistration, userLogin, googleAuth)

const otpcreation=new OtpCretion(mongoregRepository)
const otpVerification=new OtpVerify(mongoregRepository)
const passwordReset=new UserPasswordRest(mongoregRepository) 
export const authcontroller=new AuthRecoveryController(otpcreation,otpVerification,passwordReset)

const getallunblockedept=new GetAllUnblockedDept(mongodeptRepository)
export const department=new DepartmentController(getallunblockedept)

const fetchSingleDoctor=new FetchSingleDoctor(mongodocRepository)
const fetchVerifiedDoctor=new FetchVerifiedDoctor(mongodocRepository)
const fetchSortedDoctors=new FetchSortedDoctors(mongodocRepository)
const messagetimeUpdation=new MessageTimeUpdation(mongoConversationRepo)
export const doctor=new DoctorController(fetchSingleDoctor,fetchVerifiedDoctor,fetchSortedDoctors,messagetimeUpdation)

const getsingleUser=new GetsingleUser(mongoUserRepository)
const updatesingleUser=new UpdatesingleUser(mongoUserRepository)
export const user=new UserProfileController(getsingleUser,updatesingleUser)

export const payment=new PaymentController()

const createreview=new Createreview(mongoReviewRepository)
const getAverage=new GetAverage(mongoReviewRepository)
const getreview=new Getreview(mongoReviewRepository)
export const review =new ReviewController(createreview,getAverage,getreview)

const getAllMessages=new GetAllMessages(mongoConversationRepo)
const getUnreadCountMessage=new GetUnreadCountMessage(mongoConversationRepo)
const deletemessage=new Deletemessage(mongoConversationRepo)
export const message=new ConversationController(getAllMessages,getUnreadCountMessage,deletemessage)

const getSlotsByDate=new GetSlotByDate(mongoSlotRepostory)
const createAppointment=new CreateAppointment(mongoAppointmentRepository,mongoSlotRepostory,mongoWalletRepository)
const getfutureAppointment=new GetfutureAppointment(mongoAppointmentRepository)
const changestatusAppointment=new ChangestatusAppointment(mongoAppointmentRepository,mongoSlotRepostory,mongoWalletRepository)
const createlockSlot=new CreateLockslot(mongoSlotRepostory)
const getpageforappoinment=new GetPage(mongoAppointmentRepository)
const getreport=new Getreport(mongoreportRepository)
export const appoinment=new AppointmentUserController(getSlotsByDate,createAppointment,getfutureAppointment,changestatusAppointment,createlockSlot,getpageforappoinment,getreport)


const getUserallet=new GetUserallet(mongoWalletRepository)
const adduserWalet=new AddUserwallet(mongoWalletRepository)
export const wallet =new UserWalletController(getUserallet,adduserWalet)


const getunreadnotification=new Getunreadnotification(mongoNotification)
const readnotification=new Readnotification(mongoNotification)
export const notification=new NotificationController(getunreadnotification,readnotification)

