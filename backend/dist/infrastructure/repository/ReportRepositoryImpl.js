"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoreportRepository = void 0;
const report_1 = require("../database/models/report");
const appoinment_1 = require("../database/models/appoinment");
const BaseRepositoryImpl_1 = require("./BaseRepositoryImpl");
const mongoose_1 = __importDefault(require("mongoose"));
class MongoreportRepository extends BaseRepositoryImpl_1.BaseRepository {
    async create(data) {
        try {
            const newReport = new report_1.Report({
                content: data.content,
                appointmentId: data.appointmentId,
                userId: data.userId,
                medicine: data.medicine,
                createdAt: new Date(),
            });
            await newReport.save();
            const appointment = await appoinment_1.AppointmentModel.findById(data.appointmentId);
            if (!appointment) {
                throw new Error('Appointment does not exist');
            }
            appointment.reportAdded = true;
            await appointment.save();
        }
        catch (error) {
            console.error('Error adding report:', error);
            throw new Error('Could not save report');
        }
    }
    async findById(appId) {
        try {
            const objectId = new mongoose_1.default.Types.ObjectId(appId);
            const savedReport = await report_1.Report.findOne({ appointmentId: objectId });
            if (!savedReport) {
                throw new Error('Report not found for the given appointment ID');
            }
            return {
                content: savedReport.content,
                appointmentId: savedReport.appointmentId.toString(),
                userId: savedReport.userId.toString(),
                medicine: savedReport.medicine,
                createdAt: savedReport.createdAt,
            };
        }
        catch (error) {
            console.error('Error fetching report:', error);
            throw new Error('Could not fetch report');
        }
    }
}
exports.MongoreportRepository = MongoreportRepository;
