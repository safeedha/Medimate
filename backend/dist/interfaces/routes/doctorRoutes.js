"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.doctorRouter = void 0;
const express_1 = __importDefault(require("express"));
const doctorInjection_1 = require("../../infrastructure/config/dependencyInjection/doctorInjection");
const errorHandler_1 = __importDefault(require("../../infrastructure/middleware/errorHandler"));
const verifyToken_1 = require("../../infrastructure/middleware/verifyToken");
const doctorRoutes_1 = require("../../constant/doctorRoutes");
const router = express_1.default.Router();
exports.doctorRouter = router;
// Profile
router.get(doctorRoutes_1.DOCTOR_ROUTES.PROFILE.BASE, verifyToken_1.verifyToken, (req, res, next) => doctorInjection_1.doctor.fetchSingleDoctor(req, res, next));
router.post(doctorRoutes_1.DOCTOR_ROUTES.PROFILE.UPDATE, verifyToken_1.verifyToken, (req, res, next) => doctorInjection_1.doctor.updateDoctorProfile(req, res, next));
// Auth
router.post(doctorRoutes_1.DOCTOR_ROUTES.AUTH.SIGNUP, (req, res, next) => doctorInjection_1.auth.registerDoctor(req, res, next));
router.post(doctorRoutes_1.DOCTOR_ROUTES.AUTH.LOGIN, (req, res, next) => doctorInjection_1.auth.loginDoctor(req, res, next));
router.get(doctorRoutes_1.DOCTOR_ROUTES.AUTH.LOGOUT, (req, res, next) => doctorInjection_1.auth.logoutDoctor(req, res, next));
router.put(doctorRoutes_1.DOCTOR_ROUTES.AUTH.REAPPLY, (req, res, next) => doctorInjection_1.auth.reapplyDoctor(req, res, next));
router.post(doctorRoutes_1.DOCTOR_ROUTES.AUTH.SEND_OTP, (req, res, next) => doctorInjection_1.auth.sendOtpToDoctor(req, res, next));
router.post(doctorRoutes_1.DOCTOR_ROUTES.AUTH.VERIFY_OTP, (req, res, next) => doctorInjection_1.auth.verifyDoctorOtp(req, res, next));
router.post(doctorRoutes_1.DOCTOR_ROUTES.AUTH.RESET_PASSWORD, (req, res, next) => doctorInjection_1.auth.resetDoctorPassword(req, res, next));
// Department
router.get(doctorRoutes_1.DOCTOR_ROUTES.DEPARTMENT.UNBLOCKED, (req, res, next) => doctorInjection_1.department.fetchAllUnblockedDepartments(req, res, next));
router.get(doctorRoutes_1.DOCTOR_ROUTES.DEPARTMENT.ALL, (req, res, next) => doctorInjection_1.department.fetchAllDepartments(req, res, next));
// Messages
router.get(doctorRoutes_1.DOCTOR_ROUTES.MESSAGE.BASE, verifyToken_1.verifyToken, (req, res, next) => doctorInjection_1.message.fetchMessages(req, res, next));
router.delete(doctorRoutes_1.DOCTOR_ROUTES.MESSAGE.BY_ID(":messageid"), verifyToken_1.verifyToken, (req, res, next) => doctorInjection_1.message.deleteMessage(req, res, next));
router.get(doctorRoutes_1.DOCTOR_ROUTES.MESSAGE.UNREAD_COUNTS, verifyToken_1.verifyToken, (req, res, next) => doctorInjection_1.message.fetchUnreadCount(req, res, next));
// Report
router.post(doctorRoutes_1.DOCTOR_ROUTES.REPORT.ADD, verifyToken_1.verifyToken, (req, res, next) => doctorInjection_1.report.addReportforAppoinment(req, res, next));
// Wallet
router.get(doctorRoutes_1.DOCTOR_ROUTES.WALLET.BASE, verifyToken_1.verifyToken, (req, res, next) => doctorInjection_1.wallet.getWalletTransactions(req, res, next));
// User
router.get(doctorRoutes_1.DOCTOR_ROUTES.USER.BASE, verifyToken_1.verifyToken, (req, res, next) => doctorInjection_1.user.getAllUsers(req, res, next));
router.patch(doctorRoutes_1.DOCTOR_ROUTES.USER.UPDATE_MESSAGE_TIME(":reciever"), verifyToken_1.verifyToken, (req, res, next) => doctorInjection_1.user.updatemessagetime(req, res, next));
// Appointment
router.get(doctorRoutes_1.DOCTOR_ROUTES.APPOINTMENT.COUNT, verifyToken_1.verifyToken, (req, res, next) => doctorInjection_1.appointment.getAppointmentsOverview(req, res, next));
router.get(doctorRoutes_1.DOCTOR_ROUTES.APPOINTMENT.FILTER, verifyToken_1.verifyToken, (req, res, next) => doctorInjection_1.appointment.getFilteredAppointments(req, res, next));
router.get(doctorRoutes_1.DOCTOR_ROUTES.APPOINTMENT.BASE, verifyToken_1.verifyToken, (req, res, next) => doctorInjection_1.appointment.fetchAllAppointments(req, res, next));
router.post(doctorRoutes_1.DOCTOR_ROUTES.APPOINTMENT.FOLLOWUP, verifyToken_1.verifyToken, (req, res, next) => doctorInjection_1.appointment.createFollowUpAppointment(req, res, next));
router.post(doctorRoutes_1.DOCTOR_ROUTES.APPOINTMENT.RESCHEDULE, verifyToken_1.verifyToken, (req, res, next) => doctorInjection_1.appointment.rescheduleAppointmentWithReason(req, res, next));
router.patch(doctorRoutes_1.DOCTOR_ROUTES.APPOINTMENT.CANCEL(":id", ":userid"), verifyToken_1.verifyToken, (req, res, next) => doctorInjection_1.appointment.cancelAppointmentWithReason(req, res, next));
router.patch(doctorRoutes_1.DOCTOR_ROUTES.APPOINTMENT.COMPLETE(":id"), verifyToken_1.verifyToken, (req, res, next) => doctorInjection_1.appointment.markAppointmentCompleted(req, res, next));
router.get(doctorRoutes_1.DOCTOR_ROUTES.APPOINTMENT.BY_ID(":id"), verifyToken_1.verifyToken, (req, res, next) => doctorInjection_1.appointment.getSingleAppointmentDetail(req, res, next));
router.get(doctorRoutes_1.DOCTOR_ROUTES.APPOINTMENT.PAGINATION, verifyToken_1.verifyToken, (req, res, next) => doctorInjection_1.appointment.paginateAppointments(req, res, next));
// Slots
router.get(doctorRoutes_1.DOCTOR_ROUTES.SLOT.BASE, verifyToken_1.verifyToken, (req, res, next) => doctorInjection_1.slot.getDoctorSlotsByDate(req, res, next));
router.delete(doctorRoutes_1.DOCTOR_ROUTES.SLOT.BY_SLOT_ID(":slotid"), verifyToken_1.verifyToken, (req, res, next) => doctorInjection_1.slot.cancelSingleSlot(req, res, next));
router.post(doctorRoutes_1.DOCTOR_ROUTES.SLOT.RECURRING.CREATE, verifyToken_1.verifyToken, (req, res, next) => doctorInjection_1.slot.createRecurringSlot(req, res, next));
router.put(doctorRoutes_1.DOCTOR_ROUTES.SLOT.RECURRING.EDIT(":recId"), verifyToken_1.verifyToken, (req, res, next) => doctorInjection_1.slot.editRecurringSlot(req, res, next));
router.delete(doctorRoutes_1.DOCTOR_ROUTES.SLOT.RECURRING.DELETE(":id"), verifyToken_1.verifyToken, (req, res, next) => doctorInjection_1.slot.cancelRecurringSlots(req, res, next));
router.get(doctorRoutes_1.DOCTOR_ROUTES.SLOT.RECURRING.GET_BY_DOCTOR_ID, verifyToken_1.verifyToken, (req, res, next) => doctorInjection_1.slot.getAllRecurringSlots(req, res, next));
router.use(errorHandler_1.default);
