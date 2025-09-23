"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoAppointmentRepository = void 0;
const appoinment_1 = require("../database/models/appoinment");
const slotlock_1 = require("../database/models/slotlock");
const mongoose_1 = __importDefault(require("mongoose"));
const BaseRepositoryImpl_1 = require("./BaseRepositoryImpl");
class MongoAppointmentRepository extends BaseRepositoryImpl_1.BaseRepository {
    async create(data) {
        try {
            const appointment = new appoinment_1.AppointmentModel(data);
            await appointment.save();
            return appointment;
        }
        catch (error) {
            throw new Error('Failed to create appointment');
        }
    }
    async getcountofappoinmentofdoctor(id) {
        let _pending = 0;
        let _completed = 0;
        let _cancelled = 0;
        const result = await appoinment_1.AppointmentModel.find({ doctor_id: id });
        result.forEach((appointment) => {
            if (appointment.status === 'pending') {
                _pending++;
            }
            else if (appointment.status === 'completed') {
                _completed++;
            }
            else if (appointment.status === 'cancelled') {
                _cancelled++;
            }
        });
        return {
            total: result.length,
            completed: _completed,
            cancelled: _cancelled,
            pending: _pending,
        };
    }
    async getfilteredapooinment(status, start, end) {
        try {
            console.log(start, end);
            const result = await appoinment_1.AppointmentModel.aggregate([
                {
                    $match: { status }
                },
                {
                    $lookup: {
                        from: "slots",
                        localField: "schedule_id",
                        foreignField: "_id",
                        as: "slot"
                    }
                },
                { $unwind: "$slot" },
                {
                    $match: {
                        "slot.date": {
                            $gte: start,
                            $lte: end
                        }
                    }
                },
                {
                    $group: {
                        _id: {
                            $dateToString: {
                                format: "%Y-%m-%d",
                                date: "$slot.date"
                            }
                        },
                        count: { $sum: 1 }
                    }
                },
                {
                    $sort: { _id: 1 }
                }
            ]);
            return result;
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
            throw new Error("Error in fetching appointments");
        }
    }
    async getfilteredapooinmentfordoc(status, start, end, id) {
        try {
            const objId = new mongoose_1.default.Types.ObjectId(id);
            const result = await appoinment_1.AppointmentModel.aggregate([
                {
                    $match: { status, doctor_id: objId },
                },
                {
                    $lookup: {
                        from: "slots",
                        localField: "schedule_id",
                        foreignField: "_id",
                        as: "slot"
                    }
                },
                { $unwind: "$slot" },
                {
                    $match: {
                        "slot.date": {
                            $gte: start,
                            $lte: end
                        }
                    }
                },
                {
                    $group: {
                        _id: {
                            $dateToString: {
                                format: "%Y-%m-%d",
                                date: "$slot.date"
                            }
                        },
                        count: { $sum: 1 }
                    }
                },
                {
                    $sort: { _id: 1 }
                }
            ]);
            return result;
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
            throw new Error("Error in fetching appointments");
        }
    }
    async getcountofappoinmentforeacdoc(status) {
        try {
            const result = await appoinment_1.AppointmentModel.aggregate([
                {
                    $match: { status: status }
                },
                {
                    $lookup: {
                        from: "doctors",
                        localField: "doctor_id",
                        foreignField: "_id",
                        as: "doctor"
                    }
                },
                {
                    $unwind: "$doctor"
                },
                {
                    $group: {
                        _id: "$doctor.firstname",
                        count: { $sum: 1 }
                    }
                }
            ]);
            const countMap = {};
            result.forEach((item) => {
                countMap[item._id] = item.count;
            });
            return countMap;
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
            throw new Error("Error in fetching completed appointment counts by doctor");
        }
    }
    async getdetails() {
        const appointments = await appoinment_1.AppointmentModel.find();
        let pending = 0;
        let completed = 0;
        let cancelled = 0;
        appointments.forEach((appointment) => {
            if (appointment.status === 'pending') {
                pending++;
            }
            else if (appointment.status === 'completed') {
                completed++;
            }
            else if (appointment.status === 'cancelled') {
                cancelled++;
            }
        });
        const total = appointments.length;
        return { total, pending, completed, cancelled };
    }
    async rescheduleStatus(id, rescheduleId) {
        try {
            const appointment = await appoinment_1.AppointmentModel.findOne({ _id: id });
            if (!appointment) {
                throw new Error('Appointment not found');
            }
            appointment.rescheduled_to = rescheduleId;
            appointment.isRescheduled = true;
            await appointment.save();
            return appointment;
        }
        catch (error) {
            if (error instanceof Error) {
                throw Error(error.message);
            }
            throw Error("error in updating");
        }
    }
    async getpastappoinment(userId) {
        try {
            const currentDate = new Date();
            const now = new Date();
            const appointments = await appoinment_1.AppointmentModel.find({
                user_id: userId
            }).populate({
                path: 'schedule_id',
                match: {
                    date: { $lte: now } // dates in future or now
                }
            }).populate({
                path: 'doctor_id'
            }).sort({ created_at: -1 });
            const pastAppointments = appointments.filter(app => app.schedule_id);
            return pastAppointments;
        }
        catch (error) {
            console.error('Error fetching past appointments:', error);
            throw new Error('Failed to fetch past appointments');
        }
    }
    async getpageforuserId(id, originalId, limit) {
        try {
            const appointments = await appoinment_1.AppointmentModel.find({
                user_id: id,
            }).populate({
                path: 'schedule_id',
            }).populate({
                path: 'doctor_id'
            }).sort({ created_at: -1 });
            const futureAppointments = appointments.filter(app => app.schedule_id);
            const index = futureAppointments.findIndex(app => app._id.toString() === originalId);
            if (index === -1) {
                throw new Error('Appointment not found');
            }
            const page = Math.floor(index / limit) + 1;
            return page;
        }
        catch (error) {
            console.error('Error fetching past appointments:', error);
            throw new Error('Failed to get page');
        }
    }
    async getfutureappoinment(userid, page, limit) {
        try {
            const now = new Date();
            const appointments = await appoinment_1.AppointmentModel.find({
                user_id: userid,
            }).populate({
                path: 'schedule_id',
            }).populate({
                path: 'doctor_id'
            }).sort({ created_at: -1 });
            const futureAppointments = appointments.filter(app => app.schedule_id);
            const total = futureAppointments.length;
            const startIndex = (page - 1) * limit;
            const paginatedAppointments = futureAppointments.slice(startIndex, startIndex + limit);
            return {
                total,
                appoi: paginatedAppointments
            };
        }
        catch (error) {
            console.error('Error fetching future appointments:', error);
            throw new Error('Failed to fetch future appointments');
        }
    }
    async changestatus(id, status) {
        try {
            const appointment = await appoinment_1.AppointmentModel.findById(id);
            if (!appointment) {
                throw new Error('Appointment not found');
            }
            if (status === 'cancelled') {
                await slotlock_1.SlotLock.deleteOne({ slotId: appointment.schedule_id });
            }
            appointment.status = status;
            await appointment.save();
            return appointment;
        }
        catch (error) {
            if (error instanceof Error) {
                throw Error(error.message);
            }
            throw Error("error in updating");
        }
    }
    async getpageforId(id, originalId, limit) {
        const doctorObjectId = new mongoose_1.default.Types.ObjectId(id);
        const originalObjectId = new mongoose_1.default.Types.ObjectId(originalId);
        const appointments = await appoinment_1.AppointmentModel.aggregate([
            {
                $match: {
                    doctor_id: doctorObjectId,
                },
            },
            {
                $lookup: {
                    from: "slots",
                    localField: "schedule_id",
                    foreignField: "_id",
                    as: "schedule",
                },
            },
            { $unwind: "$schedule" },
            {
                $sort: {
                    "schedule.date": 1,
                },
            }
        ]);
        const index = appointments.findIndex(item => item._id.toString() === originalObjectId.toString());
        if (index === -1)
            throw new Error("Appointment not found");
        const page = Math.floor(index / limit) + 1;
        return page;
    }
    async getappinmentbydoctor(doctorid, page, limit) {
        try {
            const doctorObjectId = new mongoose_1.default.Types.ObjectId(doctorid);
            const countResult = await appoinment_1.AppointmentModel.countDocuments({
                doctor_id: doctorObjectId,
            });
            const appointments = await appoinment_1.AppointmentModel.aggregate([
                {
                    $match: {
                        doctor_id: doctorObjectId,
                    },
                },
                {
                    $lookup: {
                        from: "slots",
                        localField: "schedule_id",
                        foreignField: "_id",
                        as: "schedule",
                    },
                },
                { $unwind: "$schedule" },
                {
                    $sort: {
                        created_at: -1,
                    },
                },
                {
                    $skip: (page - 1) * limit,
                },
                {
                    $limit: limit,
                },
            ]);
            return {
                total: countResult,
                appointments: appointments,
            };
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
            throw new Error("Error in retrieving appointments");
        }
    }
    async createfollowp(appoinmentId, followupid) {
        try {
            const appointments = await appoinment_1.AppointmentModel.findOne({ _id: appoinmentId });
            console.log(appointments);
            if (!appointments) {
                throw new Error('this appoinments not exist');
            }
            appointments.followup_status = true;
            appointments.followup_id = followupid;
            await appointments.save();
            return 'followup appoinment created';
        }
        catch (error) {
            if (error instanceof Error) {
                throw Error(error.message);
            }
            throw Error("error in updating");
        }
    }
    async getallappinmentfordoctor(doctorid) {
        try {
            const doctorObjectId = new mongoose_1.default.Types.ObjectId(doctorid);
            const appointments = await appoinment_1.AppointmentModel.aggregate([
                {
                    $match: {
                        doctor_id: doctorObjectId,
                    }
                },
                {
                    $lookup: {
                        from: "slots", // collection name of schedule_id
                        localField: "schedule_id",
                        foreignField: "_id",
                        as: "schedule"
                    }
                },
                { $unwind: "$schedule" },
                {
                    $sort: {
                        "schedule.date": -1 // sort by schedule.date ascending
                    }
                }
            ]);
            return appointments;
        }
        catch (error) {
            if (error instanceof Error) {
                throw Error(error.message);
            }
            throw Error("error in updating");
        }
    }
    async findById(id) {
        try {
            const appointment = await appoinment_1.AppointmentModel.findById(id).populate({ path: 'schedule_id', });
            if (!appointment) {
                throw new Error('no appoinment found');
            }
            return appointment;
        }
        catch (error) {
            if (error instanceof Error) {
                throw Error(error.message);
            }
            throw Error("error in updating");
        }
    }
    async getdepartmentsummary() {
        const result = await appoinment_1.AppointmentModel.aggregate([
            {
                $lookup: {
                    from: "doctors",
                    localField: "doctor_id",
                    foreignField: "_id",
                    as: "doctorData",
                },
            },
            { $unwind: "$doctorData" },
            {
                $lookup: {
                    from: "departments",
                    localField: "doctorData.specialisation",
                    foreignField: "_id",
                    as: "departmentData",
                },
            },
            { $unwind: "$departmentData" },
            {
                $group: {
                    _id: {
                        departmentId: "$departmentData._id",
                        departmentName: "$departmentData.deptname",
                        status: "$status",
                    },
                    count: { $sum: 1 },
                },
            },
            {
                $group: {
                    _id: {
                        departmentId: "$_id.departmentId",
                        departmentName: "$_id.departmentName",
                    },
                    total: { $sum: "$count" },
                    pending: {
                        $sum: {
                            $cond: [{ $eq: ["$_id.status", "pending"] }, "$count", 0],
                        },
                    },
                    completed: {
                        $sum: {
                            $cond: [{ $eq: ["$_id.status", "completed"] }, "$count", 0],
                        },
                    },
                    cancelled: {
                        $sum: {
                            $cond: [{ $eq: ["$_id.status", "cancelled"] }, "$count", 0],
                        },
                    },
                },
            },
            {
                $project: {
                    _id: 0,
                    departmentName: "$_id.departmentName",
                    total: 1,
                    pending: 1,
                    completed: 1,
                    cancelled: 1,
                },
            },
        ]);
        console.log(result);
        return result;
    }
}
exports.MongoAppointmentRepository = MongoAppointmentRepository;
