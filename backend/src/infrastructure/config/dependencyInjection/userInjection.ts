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

import {UserRegistration} from '../../../application/usecase/reg/userreg'
import {UserLogin} from '../../../application/usecase/reg/userlog'
import {GoogleAuth} from '../../../application/usecase/reg/ugoogle'
import {OtpCretion} from '../../../application/usecase/otp/otpcre'
import {OtpVerify} from '../../../application/usecase/otp/otpverify'
import {UserPasswordRest} from '../../../application/usecase/reg/resetuser'
import {GetAllUnblockedDept} from '../../../application/usecase/dept/getunblocked'
import {FetchSingleDoctor} from '../../../application/usecase/doctor/getSingledoc'
import {FetchVerifiedDoctor} from '../../../application/usecase/doctor/getverified'
import {FetchSortedDoctors} from '../../../application/usecase/doctor/getSort'
import {UpdatesingleUser} from '../../../application/usecase/user/updateUser' 
import { GetsingleUser} from '../../../application/usecase/user/getSingleUser'
import {Createreview} from '../../../application/usecase/review/createReview'
import {GetAverage} from '../../../application/usecase/review/getAverage'
import {Getreview} from '../../../application/usecase/review/getReview'
import {GetAllMessages} from '../../../application/usecase/conversation/getallmessage'
import {GetUnreadCountMessage} from '../../../application/usecase/conversation/getunreadcount'
import {Deletemessage}  from '../../../application/usecase/conversation/deletemessage'
import {GetSlotByDate} from '../../../application/usecase/slot/getslotbydate'
import {CreateAppointment} from '../../../application/usecase/appoinment/createappoi'
import {GetfutureAppointment} from '../../../application/usecase/appoinment/getfuturappoi'
import {ChangestatusAppointment} from '../../../application/usecase/appoinment/changestatus'
import { CreateLockslot } from '../../../application/usecase/appoinment/createlockslot'
import {GetPage} from '../../../application/usecase/appoinment/getpageforuser'
import {Getreport} from '../../../application/usecase/report/getreport'
import {GetUserallet}  from '../../../application/usecase/wallet/getuserwallet'
import {AddUserwallet} from '../../../application/usecase/wallet/addmoney'
import {Getunreadnotification} from '../../../application/usecase/notification/getunreadnotification'
import {Readnotification} from '../../../application/usecase/notification/readnotification'

import {MongoRegRepository} from '../../repository/mongoregRepository'
import {MongoDeptRepository} from '../../repository/mongodeptRepository'
import {MongoDocRepository} from '../../repository/mongodocRepository'
import {MongoUserRepository } from '../../repository/mongouserRepository'
import { MongoReviewRepository} from '../../repository/mongoreviewRep'
import {MongoConversationRepo} from '../../repository/mongoconverRep'
import {MongoAppointmentRepository}  from '../../repository/mongoappRep'
import {MongoSlotRepostory} from  '../../repository/mongoslotrep'
import {MongoWalletRepository} from '../../repository/mongowalletrep'
import {MongoreportRepository} from '../../repository/mongoreportRep'
import {MongoNotification} from '../../repository/mongonotfictionRepo'

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

const userRegistration = new UserRegistration(mongoregRepository);
const userLogin = new UserLogin(mongoregRepository);
const googleAuth = new GoogleAuth(mongoregRepository);
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
export const doctor=new DoctorController(fetchSingleDoctor,fetchVerifiedDoctor,fetchSortedDoctors)

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

