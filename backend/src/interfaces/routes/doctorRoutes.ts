import express from 'express'
import { Request } from "express";
import  { auth, department, message,wallet,user,appointment,slot,doctor,report} from '../../infrastructure/config/dependencyInjection/doctorInjection'
import errorHandler from '../../infrastructure/middleware/errorHandler';
import {verifyToken} from '../../infrastructure/middleware/verifyToken';
import { DOCTOR_ROUTES } from "../../constant/doctorRoutes";
const router=express.Router()
export interface CustomRequest extends Request {
  id: string;
}
// Profile
router.get(DOCTOR_ROUTES.PROFILE.BASE, verifyToken, (req, res, next) =>
  doctor.fetchSingleDoctor(req as CustomRequest, res, next)
);
router.post(DOCTOR_ROUTES.PROFILE.UPDATE, verifyToken, (req, res, next) =>
  doctor.updateDoctorProfile(req as CustomRequest, res, next)
);

// Auth
router.post(DOCTOR_ROUTES.AUTH.SIGNUP, (req, res, next) => auth.registerDoctor(req, res, next));
router.post(DOCTOR_ROUTES.AUTH.LOGIN, (req, res, next) => auth.loginDoctor(req, res, next));
router.get(DOCTOR_ROUTES.AUTH.LOGOUT, (req, res, next) => auth.logoutDoctor(req, res, next));
router.put(DOCTOR_ROUTES.AUTH.REAPPLY, (req, res, next) => auth.reapplyDoctor(req, res, next));
router.post(DOCTOR_ROUTES.AUTH.SEND_OTP, (req, res, next) => auth.sendOtpToDoctor(req, res, next));
router.post(DOCTOR_ROUTES.AUTH.VERIFY_OTP, (req, res, next) => auth.verifyDoctorOtp(req, res, next));
router.post(DOCTOR_ROUTES.AUTH.RESET_PASSWORD, (req, res, next) => auth.resetDoctorPassword(req, res, next));

// Department
router.get(DOCTOR_ROUTES.DEPARTMENT.UNBLOCKED, (req, res, next) => department.fetchAllUnblockedDepartments(req, res, next));
router.get(DOCTOR_ROUTES.DEPARTMENT.ALL, (req, res, next) => department.fetchAllDepartments(req, res, next));

// Messages
router.get(DOCTOR_ROUTES.MESSAGE.BASE, verifyToken, (req, res, next) => message.fetchMessages(req as CustomRequest, res, next));
router.delete(DOCTOR_ROUTES.MESSAGE.BY_ID(":messageid"), verifyToken, (req, res, next) => message.deleteMessage(req as CustomRequest, res, next));
router.get(DOCTOR_ROUTES.MESSAGE.UNREAD_COUNTS, verifyToken, (req, res, next) => message.fetchUnreadCount(req as CustomRequest, res, next));

// Report
router.post(DOCTOR_ROUTES.REPORT.ADD, verifyToken, (req, res, next) => report.addReportforAppoinment(req as CustomRequest, res, next));

// Wallet
router.get(DOCTOR_ROUTES.WALLET.BASE, verifyToken, (req, res, next) => wallet.getWalletTransactions(req as CustomRequest, res, next));

// User
router.get(DOCTOR_ROUTES.USER.BASE, verifyToken, (req, res, next) => user.getAllUsers(req as CustomRequest, res, next));
router.patch(DOCTOR_ROUTES.USER.UPDATE_MESSAGE_TIME(":reciever"), verifyToken, (req, res, next) => user.updatemessagetime(req as CustomRequest, res, next));

// Appointment
router.get(DOCTOR_ROUTES.APPOINTMENT.COUNT, verifyToken, (req, res, next) => appointment.getAppointmentsOverview(req as CustomRequest, res, next));
router.get(DOCTOR_ROUTES.APPOINTMENT.FILTER, verifyToken, (req, res, next) => appointment.getFilteredAppointments(req as CustomRequest, res, next));
router.get(DOCTOR_ROUTES.APPOINTMENT.BASE, verifyToken, (req, res, next) => appointment.fetchAllAppointments(req as CustomRequest, res, next));
router.post(DOCTOR_ROUTES.APPOINTMENT.FOLLOWUP, verifyToken, (req, res, next) => appointment.createFollowUpAppointment(req as CustomRequest, res, next));
router.post(DOCTOR_ROUTES.APPOINTMENT.RESCHEDULE, verifyToken, (req, res, next) => appointment.rescheduleAppointmentWithReason(req as CustomRequest, res, next));
router.patch(DOCTOR_ROUTES.APPOINTMENT.CANCEL(":id", ":userid"), verifyToken, (req, res, next) => appointment.cancelAppointmentWithReason(req as CustomRequest, res, next));
router.patch(DOCTOR_ROUTES.APPOINTMENT.COMPLETE(":id"), verifyToken, (req, res, next) => appointment.markAppointmentCompleted(req as CustomRequest, res, next));
router.get(DOCTOR_ROUTES.APPOINTMENT.BY_ID(":id"), verifyToken, (req, res, next) => appointment.getSingleAppointmentDetail(req as CustomRequest, res, next));
router.get(DOCTOR_ROUTES.APPOINTMENT.PAGINATION, verifyToken, (req, res, next) => appointment.paginateAppointments(req as CustomRequest, res, next));

// Slots
router.get(DOCTOR_ROUTES.SLOT.BASE, verifyToken, (req, res, next) => slot.getDoctorSlotsByDate(req as CustomRequest, res, next));
router.delete(DOCTOR_ROUTES.SLOT.BY_SLOT_ID(":slotid"), verifyToken, (req, res, next) => slot.cancelSingleSlot(req as CustomRequest, res, next));
router.post(DOCTOR_ROUTES.SLOT.RECURRING.CREATE, verifyToken, (req, res, next) => slot.createRecurringSlot(req as CustomRequest, res, next));
router.put(DOCTOR_ROUTES.SLOT.RECURRING.EDIT(":recId"), verifyToken, (req, res, next) => slot.editRecurringSlot(req as CustomRequest, res, next));
router.delete(DOCTOR_ROUTES.SLOT.RECURRING.DELETE(":id"), verifyToken, (req, res, next) => slot.cancelRecurringSlots(req as CustomRequest, res, next));
router.get(DOCTOR_ROUTES.SLOT.RECURRING.GET_BY_DOCTOR_ID, verifyToken, (req, res, next) => slot.getAllRecurringSlots(req as CustomRequest, res, next));
router.use(errorHandler)
export { router as doctorRouter };