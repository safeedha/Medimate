"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Doctor = void 0;
const mongoose_1 = require("mongoose");
const DoctorSchema = new mongoose_1.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    specialisation: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Department' },
    experienceDetail: {
        type: [
            {
                hospitalName: { type: String, required: true },
                role: { type: String, required: true },
                years: { type: String, required: true },
            }
        ],
        default: []
    },
    experience: { type: Number, required: true },
    fee: { type: Number, required: true },
    status: {
        type: String,
        enum: ['Approved', 'Rejected', 'Pending'],
        required: true,
    },
    isBlocked: { type: Boolean, default: false },
    googleVerified: { type: Boolean, default: false },
    qualification: { type: String },
    additionalInfo: { type: String },
    profilePicture: { type: String },
    medicalLicence: { type: String },
    lastMessage: { type: Date, default: Date.now },
}, {
    timestamps: true,
});
exports.Doctor = (0, mongoose_1.model)('Doctor', DoctorSchema);
