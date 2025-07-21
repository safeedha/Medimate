import express from 'express'
import { Request } from "express";
import  { auth,authcontroller,department,doctor,user,payment,review,message,appoinment,wallet,notification} from '../../infrastructure/config/dependencyInjection/userInjection'
import {verifyToken} from '../../infrastructure/middleware/verifyToken';
import errorHandler from '../../infrastructure/middleware/errorHandler';
const router=express.Router()
export interface CustomRequest extends Request {
  id: string;
}

router.post("/register", (req, res,next) => auth.registerUser(req, res,next)) 
router.post("/login", (req, res) => auth.loginUser(req, res)) 
router.post("/googlelogin",(req, res) => auth.googleLogin(req, res))
router.get("/logout", (req, res) => auth.logoutUser(req, res))


router.post("/sendotp", (req, res,next) => authcontroller.sendOtp(req, res,next))
router.post("/verifyotp", (req, res,next) => authcontroller.verifyOtp(req, res,next))
router.post("/reset",(req, res,next) => authcontroller.resetPassword(req, res,next))

router.get("/department",verifyToken, (req, res,next) => department.fetchAllUnblockedDepartments(req, res,next)) 

router.get("/doctors", verifyToken,(req, res,next) => doctor.fetchAllVerifiedDoctors(req, res,next))
router.get("/doctors/sort", verifyToken,(req, res,next) => doctor.fetchSortedDoctors(req, res,next))  
router.get("/doctor/:id", verifyToken,(req, res,next) => doctor.fetchSingleDoctor(req, res,next))
router.patch('/doctor/:reciever',verifyToken, (req, res,next) => doctor.updatemessagetime(req as CustomRequest, res,next))

router.get("/profile", verifyToken, (req, res, next) => {
  user.fetchUserDetails(req as CustomRequest, res, next);
});
router.post("/profile", verifyToken, (req, res, next) => {
  user.updateUserDetails(req as CustomRequest, res, next);
});


router.post("/bookappoinment", verifyToken, (req, res, next) => {
  payment.createOrder(req as CustomRequest, res, next);
});

router.post("/verify-payment", verifyToken, (req, res, next) => {
  payment.verifyOrderPayment(req as CustomRequest, res, next);
})

router.get("/messages", verifyToken, (req, res, next) => {
  message.fetchMessages(req as CustomRequest, res, next);
});
router.delete("/messages/:messageid", verifyToken, (req, res, next) => {
  message.deleteMessage(req as CustomRequest, res, next);
});
router.get("/messages/unread-counts", verifyToken, (req, res, next) => {
  message.fetchUnreadMessageCount(req as CustomRequest, res, next);
});
//router.patch('/doctor/:reciever',verifyUserAuth, (req, res) => message.updatemessagetime(req as CustomRequest, res))


router.get("/doctor/slot/:id", verifyToken, (req, res, next) => 
  appoinment.getDoctorSlotsByDate(req, res, next)
);

router.get("/doctor/slot/:id", (req, res,next) => appoinment.getDoctorSlotsByDate(req, res,next)) 
router.post("/createappoinment", verifyToken, (req, res, next) => {
  appoinment.bookAppointment(req as CustomRequest, res, next);
});
router.get("/appointments/future", verifyToken, (req, res, next) => {
  appoinment.fetchFutureAppointments(req as CustomRequest, res, next);
});
router.post("/lockslot", verifyToken, (req, res, next) => {
  appoinment.createlockSlot(req as CustomRequest, res, next);
});
router.get("/page", verifyToken, (req, res, next) => {
  appoinment.fetchAppointmentPages(req as CustomRequest, res, next);
});
router.patch("/appointment", verifyToken, (req, res, next) => {
  appoinment.cancelAppointment(req as CustomRequest, res, next);
});
router.get("/report/:appId", verifyToken, (req, res, next) => {
  appoinment.reportGet(req as CustomRequest, res, next);
});
router.post("/review", verifyToken, (req, res, next) => {
  review.submitReview(req as CustomRequest, res, next);
});
router.get("/review", verifyToken, (req, res, next) => {
  review.fetchDoctorReviews(req as CustomRequest, res, next);
});
router.get("/review/count", verifyToken, (req, res, next) => {
  review.fetchAverageRating(req as CustomRequest, res, next);
});

router.get("/notification", verifyToken, (req, res, next) => {
  notification.getUnreadnotification(req as CustomRequest, res, next);
});
router.patch("/notification", verifyToken, (req, res, next) => {
  notification.readAllnotification(req as CustomRequest, res, next);
});


router.get("/wallet", verifyToken, (req, res, next) => {
  wallet.fetchUserWallet(req as CustomRequest, res, next);
});
router.post("/wallet", verifyToken, (req, res, next) => {
  wallet.debitUserWallet(req as CustomRequest, res, next);
});
router.use(errorHandler)
export { router as userRouter };