"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoRegRepository = void 0;
const docter_1 = require("../database/models/docter");
const user_1 = require("../database/models/user");
const otp_1 = require("../database/models/otp");
class MongoRegRepository {
    async craeteOtp(data) {
        try {
            const mail = data.email;
            const user = await user_1.User.findOne({ email: mail });
            if (!user) {
                throw new Error("This email not exist");
            }
            const existOtp = await otp_1.Otp.findOne({ email: mail });
            if (existOtp) {
                await existOtp.deleteOne();
            }
            const otp = new otp_1.Otp(data);
            await otp.save();
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
            throw new Error('Unexpected error occurred during otp creation');
        }
    }
    async craetedocOtp(data) {
        try {
            const mail = data.email;
            const doctor = await docter_1.Doctor.findOne({ email: mail });
            if (!doctor) {
                throw new Error("This email not exist");
            }
            const existOtp = await otp_1.Otp.findOne({ email: mail });
            if (existOtp) {
                throw new Error('Otp already exists for this email');
            }
            const otp = new otp_1.Otp(data);
            await otp.save();
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
            throw new Error('Unexpected error occurred during otp creation');
        }
    }
    async verifyOtp(email, otp) {
        try {
            const mail = email;
            const existingOtp = await otp_1.Otp.findOne({ email: mail });
            console.log(existingOtp);
            if (!existingOtp) {
                throw new Error('this email not registered for otp');
            }
            if (existingOtp.otp !== otp) {
                throw new Error('invalid otp');
            }
            const user = await user_1.User.findOne({ email: mail });
            if (!user) {
                throw new Error("User not found");
            }
            user.googleVerified = true;
            await user.save();
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
            throw new Error('Unexpected error occurred during otp verification');
        }
    }
    async verifydocOtp(email, otp) {
        try {
            const mail = email;
            const existingOtp = await otp_1.Otp.findOne({ email: mail });
            if (!existingOtp) {
                throw new Error('this email not registered for otp');
            }
            if (existingOtp.otp !== otp) {
                throw new Error('invalid otp');
            }
            const doctor = await docter_1.Doctor.findOne({ email: mail });
            if (!doctor) {
                throw new Error("User not found");
            }
            doctor.googleVerified = true;
            await doctor.save();
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
            throw new Error('Unexpected error occurred during otp verification');
        }
    }
    async reset(email, password) {
        try {
            const user = await user_1.User.findOne({ email: email });
            if (!user) {
                throw new Error('this email not registered');
            }
            user.password = password;
            await user.save();
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
            throw new Error('Unexpected error occurred during otp verification');
        }
    }
    async resetdoctor(email, password) {
        try {
            const doctor = await docter_1.Doctor.findOne({ email: email, googleIds: null });
            if (!doctor) {
                throw new Error('this email not registered');
            }
            doctor.password = password;
            await doctor.save();
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
            throw new Error('Unexpected error occurred during otp verification');
        }
    }
}
exports.MongoRegRepository = MongoRegRepository;
