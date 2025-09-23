"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminRouter = void 0;
const express_1 = __importDefault(require("express"));
const adminInjection_1 = require("../../infrastructure/config/dependencyInjection/adminInjection");
const errorHandler_1 = __importDefault(require("../../infrastructure/middleware/errorHandler"));
const verifyToken_1 = require("../../infrastructure/middleware/verifyToken");
const adminRoutes_1 = require("../../constant/adminRoutes");
const router = express_1.default.Router();
exports.adminRouter = router;
router.post(adminRoutes_1.ADMIN_ROUTES.AUTH.LOGIN, (req, res, next) => adminInjection_1.auth.adminLogin(req, res, next));
router.get(adminRoutes_1.ADMIN_ROUTES.AUTH.LOGOUT, (req, res, next) => adminInjection_1.auth.adminLogout(req, res, next));
// DEPARTMENT
router.put(adminRoutes_1.ADMIN_ROUTES.DEPARTMENT.BY_ID(":id"), verifyToken_1.verifyToken, (req, res, next) => adminInjection_1.department.editDepartment(req, res, next));
router.patch(adminRoutes_1.ADMIN_ROUTES.DEPARTMENT.BLOCK(":id"), verifyToken_1.verifyToken, (req, res, next) => adminInjection_1.department.blockDepartment(req, res, next));
router.get(adminRoutes_1.ADMIN_ROUTES.DEPARTMENT.BASE, verifyToken_1.verifyToken, (req, res, next) => adminInjection_1.department.getDepartment(req, res, next));
router.post(adminRoutes_1.ADMIN_ROUTES.DEPARTMENT.BASE, verifyToken_1.verifyToken, (req, res, next) => adminInjection_1.department.createDepartment(req, res, next));
// DOCTOR
router.get(adminRoutes_1.ADMIN_ROUTES.DOCTOR.UNVERIFIED, verifyToken_1.verifyToken, (req, res, next) => adminInjection_1.doctor.getAllUnverifiedDoctors(req, res, next));
router.get(adminRoutes_1.ADMIN_ROUTES.DOCTOR.BASE, verifyToken_1.verifyToken, (req, res, next) => adminInjection_1.doctor.getAllDoctors(req, res, next));
router.get(adminRoutes_1.ADMIN_ROUTES.DOCTOR.BY_ID(":doctorid"), verifyToken_1.verifyToken, (req, res, next) => adminInjection_1.doctor.getSingleDoctordetails(req, res, next));
router.patch(adminRoutes_1.ADMIN_ROUTES.DOCTOR.STATUS(":id"), verifyToken_1.verifyToken, (req, res, next) => adminInjection_1.doctor.toggleDoctorBlockStatus(req, res, next));
router.patch(adminRoutes_1.ADMIN_ROUTES.DOCTOR.VERIFY(":id"), verifyToken_1.verifyToken, (req, res, next) => adminInjection_1.doctor.updateVerificationStatus(req, res, next));
// USER
router.get(adminRoutes_1.ADMIN_ROUTES.USER.BASE, verifyToken_1.verifyToken, (req, res, next) => adminInjection_1.user.getAllUsers(req, res, next));
router.patch(adminRoutes_1.ADMIN_ROUTES.USER.STATUS(":id"), verifyToken_1.verifyToken, (req, res, next) => adminInjection_1.user.toggleUserBlockStatus(req, res, next));
router.patch(adminRoutes_1.ADMIN_ROUTES.USER.BY_ID(":id"), verifyToken_1.verifyToken, (req, res, next) => adminInjection_1.user.getSingleUser(req, res, next));
// APPOINTMENT
router.get(adminRoutes_1.ADMIN_ROUTES.APPOINTMENT.BASE, verifyToken_1.verifyToken, (req, res, next) => adminInjection_1.appoinment.getDashboardOverview(req, res, next));
router.get(adminRoutes_1.ADMIN_ROUTES.APPOINTMENT.COUNT, verifyToken_1.verifyToken, (req, res, next) => adminInjection_1.appoinment.getAppointmentCountByStatus(req, res, next));
router.get(adminRoutes_1.ADMIN_ROUTES.APPOINTMENT.FILTER, verifyToken_1.verifyToken, (req, res, next) => adminInjection_1.appoinment.getAppointmentsByDateRange(req, res, next));
router.get(adminRoutes_1.ADMIN_ROUTES.APPOINTMENT.DEPARTMENT_SUMMARY, verifyToken_1.verifyToken, (req, res, next) => adminInjection_1.appoinment.getDepartmentsummary(req, res, next));
// WALLET
router.get(adminRoutes_1.ADMIN_ROUTES.WALLET.BASE, verifyToken_1.verifyToken, (req, res, next) => adminInjection_1.wallet.getWalletInformation(req, res, next));
router.get(adminRoutes_1.ADMIN_ROUTES.WALLET.PAY_INFO, verifyToken_1.verifyToken, (req, res, next) => adminInjection_1.wallet.getPayoutInfo(req, res, next));
router.post(adminRoutes_1.ADMIN_ROUTES.WALLET.PAY, verifyToken_1.verifyToken, (req, res, next) => adminInjection_1.wallet.processDoctorPayout(req, res, next));
// router.post("/login", (req, res, next) => auth.adminLogin(req, res, next));
// router.get("/logout", (req, res, next) => auth.adminLogout(req, res, next));
// // DEPARTMENT
// router.put("/department/:id", verifyToken, (req, res, next) => department.editDepartment(req, res, next));
// router.patch("/department/:id", verifyToken, (req, res, next) => department.blockDepartment(req, res, next));
// router.get("/department", verifyToken, (req, res, next) => department.getDepartment(req, res, next));
// router.post("/department", verifyToken, (req, res, next) => department.createDepartment(req, res, next));
// // DOCTOR MANAGEMENT
// router.get("/doctor/unverified", verifyToken, (req, res, next) => doctor.getAllUnverifiedDoctors(req, res, next));
// router.get("/doctor", verifyToken, (req, res, next) => doctor.getAllDoctors(req, res, next));
// router.get("/doctor/:doctorid", verifyToken, (req, res, next) => doctor.getSingleDoctordetails(req, res, next));
// router.patch("/doctor/status/:id", verifyToken, (req, res, next) => doctor.toggleDoctorBlockStatus(req, res, next));
// router.patch("/doctor/verify/:id", verifyToken, (req, res, next) => doctor.updateVerificationStatus(req, res, next));
// // USER MANAGEMENT
// router.get("/user", verifyToken, (req, res, next) => user.getAllUsers(req, res, next));
// router.patch("/user/status/:id", verifyToken, (req, res, next) => user.toggleUserBlockStatus(req, res, next));
// router.patch("/user/:id", verifyToken, (req, res, next) => user.getsingleuser(req, res, next));
// // APPOINTMENT DASHBOARD
// router.get("/appoinment", verifyToken, (req, res, next) => appoinment.getDashboardOverview(req, res, next));
// router.get("/appoinment/count", verifyToken, (req, res, next) => appoinment.getAppointmentCountByStatus(req, res, next));
// router.get("/appoinment/filter", verifyToken, (req, res, next) => appoinment.getAppointmentsByDateRange(req, res, next));
// router.get("/department_summary", verifyToken, (req, res, next) =>
//   appoinment.getDepartmentsummary(req, res, next)
// );
// // WALLET MANAGEMENT
// router.get("/wallet", verifyToken, (req, res, next) => wallet.getWalletinformation(req, res, next));
// router.get("/wallet/pay", verifyToken, (req, res, next) => wallet.getPayoutInfo(req, res, next));
// router.post("/wallet/pay", verifyToken, (req, res, next) => wallet.processDoctorPayout(req, res, next));
router.use(errorHandler_1.default);
