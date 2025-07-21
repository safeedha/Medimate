import express from 'express'
import { Request } from "express";
import  { auth, department, message,report,wallet,user,appointment,slot,doctor} from '../../infrastructure/config/dependencyInjection/doctorInjection'
import errorHandler from '../../infrastructure/middleware/errorHandler';
import {verifyToken} from '../../infrastructure/middleware/verifyToken';
const router=express.Router()
export interface CustomRequest extends Request {
  id: string;
}
router.get("/",verifyToken, (req, res, next) => {
  doctor.fetchSingleDoctor(req as CustomRequest, res, next)
})
router.post("/update",verifyToken, (req, res,next) => doctor.updateDoctorProfile(req as CustomRequest, res,next)) 

router.post("/signup", (req, res, next) => auth.registerDoctor(req, res, next));
router.post("/login", (req, res, next) => auth.loginDoctor(req, res, next));
router.get("/logout", (req, res, next) => auth.logoutDoctor(req, res, next));
router.put("/reapply", (req, res, next) => auth.reapplyDoctor(req, res, next));
router.post("/sendotp", (req, res, next) => auth.sendOtpToDoctor(req, res, next));
router.post("/verifyotp", (req, res, next) => auth.verifyDoctorOtp(req, res, next));
router.post("/reset", (req, res,next) => auth.resetDoctorPassword(req, res,next)) 

router.get("/department", (req, res,next) =>  department.fetchAllUnblockedDepartments(req, res,next)) 

router.get("/messages", verifyToken, (req, res, next) => {
  message.fetchMessages(req as CustomRequest, res, next);
});

router.delete("/messages/:messageid", verifyToken, (req, res, next) => {
  message.deleteMessage(req as CustomRequest, res, next);
});

router.get("/messages/unread-counts", verifyToken, (req, res, next) => {
  message.fetchUnreadCount(req as CustomRequest, res, next);
});

router.post("/report", verifyToken, (req, res, next) => {
  report.addReportforAppoinment(req as CustomRequest, res, next);
});

router.get("/wallet", verifyToken, (req, res, next) => {
  wallet.getWalletTransactions(req as CustomRequest, res, next);
});

router.get("/user", verifyToken, (req, res, next) => {
  user.getAllUsers(req as CustomRequest, res, next);
});
router.patch('/doctor/:reciever',verifyToken, (req, res,next) => user.updatemessagetime(req as CustomRequest, res,next))




router.get("/appoinment/count", verifyToken, (req, res, next) =>
  appointment.getAppointmentsOverview(req as CustomRequest, res, next)
);
router.get("/appoinment/filter", verifyToken, (req, res, next) =>
  appointment.getFilteredAppointments(req as CustomRequest, res, next)
);
router.get("/appoinment", verifyToken, (req, res, next) =>
  appointment.fetchAllAppointments(req as CustomRequest, res, next)
);
router.post("/appoinment/followup", verifyToken, (req, res, next) =>
  appointment.createFollowUpAppointment(req as CustomRequest, res, next)
);
router.post("/appoinment/reshedule", verifyToken, (req, res, next) =>
  appointment.rescheduleAppointmentWithReason(req as CustomRequest, res, next)
);
router.patch("/appoinment/:id/:userid", verifyToken, (req, res, next) =>
  appointment.cancelAppointmentWithReason(req as CustomRequest, res, next)
);
router.patch("/appoinment/:id", verifyToken, (req, res, next) =>
  appointment.markAppointmentCompleted(req as CustomRequest, res, next)
);
router.get("/appoinment/:id", verifyToken, (req, res, next) =>
  appointment.getSingleAppointmentdetail(req as CustomRequest, res, next)
);

router.get("/page", verifyToken, (req, res, next) =>
  appointment.paginateAppointments(req as CustomRequest, res, next)
);



router.get("/slots", verifyToken, (req, res, next) => slot.cancelRecurringSlots(req as CustomRequest, res, next));
router.get("/slots",verifyToken,(req, res,next) => slot.getDoctorSlotsByDate(req as CustomRequest, res,next)) 
router.delete("/slots/:slotid", verifyToken, (req, res, next) => slot.cancelSingleSlot(req as CustomRequest, res, next));
router.post("/slot/recurring", verifyToken, (req, res, next) => slot.createRecurringSlot(req as CustomRequest, res, next));
router.put("/slot/recurring/:recId", verifyToken, (req, res, next) => slot.editRecurringSlot(req as CustomRequest, res, next));
router.delete("/slots/recurring/:id", verifyToken, (req, res, next) => slot.cancelRecurringSlots(req as CustomRequest, res, next));
router.get("/slots/recurring/:id", verifyToken, (req, res, next) => slot.getAllRecurringSlots(req as CustomRequest, res, next));


router.use(errorHandler)
export { router as doctorRouter };