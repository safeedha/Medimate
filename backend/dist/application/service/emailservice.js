"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = sendMail;
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
async function sendMail(email, otp, subject, reason) {
    const transporter = nodemailer_1.default.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASSWORD,
        },
    });
    let message = '';
    if (otp) {
        message = `Your OTP for verification is: ${otp}`;
    }
    else if (reason) {
        message = `Reason for rejecting your application: ${reason}`;
    }
    else {
        message = 'No message content provided.';
    }
    console.log(message);
    await transporter.sendMail({
        from: 'mksafeedha@gmail.com',
        to: email,
        subject: subject || 'Notification',
        text: message,
    });
}
