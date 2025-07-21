import express from 'express'
import { Request } from "express";
import  { auth, department,doctor,appoinment,wallet,user} from '../../infrastructure/config/dependencyInjection/adminInjection'
import errorHandler from '../../infrastructure/middleware/errorHandler';
import {verifyToken} from '../../infrastructure/middleware/verifyToken';
const router=express.Router()
export interface CustomRequest extends Request {
  id: string;
}



router.post("/login", (req, res, next) => auth.adminLogin(req, res, next));
router.get("/logout", (req, res, next) => auth.adminLogout(req, res, next));

// DEPARTMENT
router.put("/department/:id", verifyToken, (req, res, next) => department.editDepartment(req, res, next));
router.patch("/department/:id", verifyToken, (req, res, next) => department.blockDepartment(req, res, next));
router.get("/department", verifyToken, (req, res, next) => department.getDepartment(req, res, next));
router.post("/department", verifyToken, (req, res, next) => department.createDepartment(req, res, next));

// DOCTOR MANAGEMENT
router.get("/doctor/unverified", verifyToken, (req, res, next) => doctor.getAllUnverifiedDoctors(req, res, next));
router.get("/doctor", verifyToken, (req, res, next) => doctor.getAllDoctors(req, res, next));
router.get("/doctor/:doctorid", verifyToken, (req, res, next) => doctor.getSingleDoctordetails(req, res, next));
router.patch("/doctor/status/:id", verifyToken, (req, res, next) => doctor.toggleDoctorBlockStatus(req, res, next));
router.patch("/doctor/verify/:id", verifyToken, (req, res, next) => doctor.updateVerificationStatus(req, res, next));

// USER MANAGEMENT
router.get("/user", verifyToken, (req, res, next) => user.getAllUsers(req, res, next));
router.patch("/user/status/:id", verifyToken, (req, res, next) => user.toggleUserBlockStatus(req, res, next));
router.patch("/user/:id", verifyToken, (req, res, next) => user.getsingleuser(req, res, next));

// APPOINTMENT DASHBOARD
router.get("/appoinment", verifyToken, (req, res, next) => appoinment.getDashboardOverview(req, res, next));
router.get("/appoinment/count", verifyToken, (req, res, next) => appoinment.getAppointmentCountByStatus(req, res, next));
router.get("/appoinment/filter", verifyToken, (req, res, next) => appoinment.getAppointmentsByDateRange(req, res, next));
router.get("/department_summary", verifyToken, (req, res, next) =>
  appoinment.getDepartmentsummary(req, res, next)
);
// WALLET MANAGEMENT
router.get("/wallet", verifyToken, (req, res, next) => wallet.getWalletinformation(req, res, next));
router.get("/wallet/pay", verifyToken, (req, res, next) => wallet.getPayoutInfo(req, res, next));
router.post("/wallet/pay", verifyToken, (req, res, next) => wallet.processDoctorPayout(req, res, next));

router.use(errorHandler)
export { router as adminRouter };