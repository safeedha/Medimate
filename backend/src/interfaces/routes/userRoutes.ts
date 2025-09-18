import express from 'express'
import { Request } from "express";
import  { auth,authcontroller,department,doctor,user,payment,review,message,appoinment,wallet,notification} from '../../infrastructure/config/dependencyInjection/userInjection'
import {verifyToken} from '../../infrastructure/middleware/verifyToken';
import errorHandler from '../../infrastructure/middleware/errorHandler';
import { USER_ROUTES } from "../../constant/userRoutes";
const router=express.Router()
export interface CustomRequest extends Request {
  id: string;
}

router.post(USER_ROUTES.AUTH.REGISTER, (req, res,next) => auth.registerUser(req, res,next));
router.post(USER_ROUTES.AUTH.LOGIN, (req, res) => auth.loginUser(req, res));
router.post(USER_ROUTES.AUTH.GOOGLE_LOGIN, (req, res) => auth.googleLogin(req, res));
router.get(USER_ROUTES.AUTH.LOGOUT, (req, res) => auth.logoutUser(req, res));

router.post(USER_ROUTES.AUTH.SEND_OTP, (req, res,next) => authcontroller.sendOtp(req, res,next));
router.post(USER_ROUTES.AUTH.VERIFY_OTP, (req, res,next) => authcontroller.verifyOtp(req, res,next));
router.post(USER_ROUTES.AUTH.RESET_PASSWORD, (req, res,next) => authcontroller.resetPassword(req, res,next));

router.get(USER_ROUTES.DEPARTMENT, verifyToken, (req, res,next) => department.fetchAllUnblockedDepartments(req, res,next));

router.get(USER_ROUTES.DOCTOR.LIST, verifyToken, (req, res,next) => doctor.fetchAllVerifiedDoctors(req, res,next));
router.get(USER_ROUTES.DOCTOR.SORT, verifyToken, (req, res,next) => doctor.fetchSortedDoctors(req, res,next));
router.get(USER_ROUTES.DOCTOR.BY_ID(":id"), verifyToken, (req, res,next) => doctor.fetchSingleDoctor(req, res,next));
router.patch(USER_ROUTES.DOCTOR.MESSAGE_TIME(":reciever"), verifyToken, (req, res,next) => doctor.updatemessagetime(req as CustomRequest, res,next));

router.get(USER_ROUTES.USER.PROFILE, verifyToken, (req, res,next) => user.fetchUserDetails(req as CustomRequest, res,next));
router.post(USER_ROUTES.USER.PROFILE, verifyToken, (req, res,next) => user.updateUserDetails(req as CustomRequest, res,next));

router.post(USER_ROUTES.PAYMENT.BOOK_APPOINTMENT, verifyToken, (req, res,next) => payment.createOrder(req as CustomRequest, res,next));
router.post(USER_ROUTES.PAYMENT.VERIFY_PAYMENT, verifyToken, (req, res,next) => payment.verifyOrderPayment(req as CustomRequest, res,next));

router.get(USER_ROUTES.MESSAGE.ROOT, verifyToken, (req, res,next) => message.fetchMessages(req as CustomRequest, res,next));
router.delete(USER_ROUTES.MESSAGE.BY_ID(":messageid"), verifyToken, (req, res,next) => message.deleteMessage(req as CustomRequest, res,next));
router.get(USER_ROUTES.MESSAGE.UNREAD_COUNT, verifyToken, (req, res,next) => message.fetchUnreadMessageCount(req as CustomRequest, res,next));

router.get(USER_ROUTES.DOCTOR.SLOT_BY_ID(":id"), verifyToken, (req, res,next) => appoinment.getDoctorSlotsByDate(req, res,next));

router.post(USER_ROUTES.APPOINTMENT.CREATE, verifyToken, (req, res,next) => appoinment.bookAppointment(req as CustomRequest, res,next));
router.get(USER_ROUTES.APPOINTMENT.FUTURE, verifyToken, (req, res,next) => appoinment.fetchFutureAppointments(req as CustomRequest, res,next));
router.post(USER_ROUTES.APPOINTMENT.LOCK_SLOT, verifyToken, (req, res,next) => appoinment.createLockSlot(req as CustomRequest, res,next));
router.get(USER_ROUTES.APPOINTMENT.PAGE, verifyToken, (req, res,next) => appoinment.fetchAppointmentPages(req as CustomRequest, res,next));
router.patch(USER_ROUTES.APPOINTMENT.CANCEL, verifyToken, (req, res,next) => appoinment.cancelAppointment(req as CustomRequest, res,next));
router.get(USER_ROUTES.APPOINTMENT.REPORT(":appId"), verifyToken, (req, res,next) => appoinment.reportGet(req as CustomRequest, res,next));

router.post(USER_ROUTES.REVIEW.ROOT, verifyToken, (req, res,next) => review.submitReview(req as CustomRequest, res,next));
router.get(USER_ROUTES.REVIEW.ROOT, verifyToken, (req, res,next) => review.fetchDoctorReviews(req as CustomRequest, res,next));
router.get(USER_ROUTES.REVIEW.COUNT, verifyToken, (req, res,next) => review.fetchAverageRating(req as CustomRequest, res,next));

router.get(USER_ROUTES.NOTIFICATION.ROOT, verifyToken, (req, res,next) => notification.getUnreadNotification(req as CustomRequest, res,next));
router.patch(USER_ROUTES.NOTIFICATION.ROOT, verifyToken, (req, res,next) => notification.readAllNotification(req as CustomRequest, res,next));

router.get(USER_ROUTES.WALLET.ROOT, verifyToken, (req, res,next) => wallet.fetchUserWallet(req as CustomRequest, res,next));
router.post(USER_ROUTES.WALLET.ROOT, verifyToken, (req, res,next) => wallet.debitUserWallet(req as CustomRequest, res,next));
router.use(errorHandler)
export { router as userRouter };