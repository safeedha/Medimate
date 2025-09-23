"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPayment = createPayment;
const razorpay_1 = __importDefault(require("razorpay"));
const dotenv_1 = __importDefault(require("dotenv"));
const serviceMessages_1 = require("../../constant/serviceMessages");
dotenv_1.default.config();
const razorpay = new razorpay_1.default({
    key_id: process.env.KEYID,
    key_secret: process.env.KEYSECRET
});
async function createPayment(amount) {
    try {
        const options = {
            amount: amount,
            currency: 'INR',
            receipt: 'receipt_' + Math.random().toString(36).substring(7),
        };
        const order = await razorpay.orders.create(options);
        return order;
    }
    catch (error) {
        console.log(error);
        throw new Error(serviceMessages_1.ServiceMessage.ORDER_CREATION_FAILED);
    }
}
