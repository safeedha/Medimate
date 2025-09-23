"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifypayment = verifypayment;
const razorpay_1 = __importDefault(require("razorpay"));
const dotenv_1 = __importDefault(require("dotenv"));
const crypto_1 = __importDefault(require("crypto"));
const serviceMessages_1 = require("../../constant/serviceMessages");
dotenv_1.default.config();
const razorpay = new razorpay_1.default({
    key_id: process.env.KEYID,
    key_secret: process.env.KEYSECRET,
});
async function verifypayment(razorpay_order_id, razorpay_payment_id, razorpay_signature) {
    try {
        const sign = razorpay_order_id + '|' + razorpay_payment_id;
        const expectedSign = crypto_1.default.createHmac('sha256', 'toMYZYyUM0mObogBqYDzRIcU')
            .update(sign.toString())
            .digest('hex');
        if (razorpay_signature === expectedSign) {
            return { message: serviceMessages_1.ServiceMessage.VERIFIED_SUCCESS };
        }
        else {
            throw new Error(serviceMessages_1.ServiceMessage.VERIFIED_FAILED);
        }
    }
    catch (error) {
        if (error instanceof Error) {
            throw new Error(error.message);
        }
        throw new Error(serviceMessages_1.ServiceMessage.VERIFIED_FAILED);
    }
}
