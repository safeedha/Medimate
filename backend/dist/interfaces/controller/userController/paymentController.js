"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentController = void 0;
const createpayment_1 = require("../../../application/service/createpayment");
const verfypayment_1 = require("../../../application/service/verfypayment");
const httpStatus_1 = require("../../../constant/httpStatus");
class PaymentController {
    constructor() { }
    async createOrder(req, res, next) {
        try {
            const { amount } = req.body;
            const order = await (0, createpayment_1.createPayment)(amount);
            res.status(httpStatus_1.HttpStatus.OK).json(order);
        }
        catch (error) {
            next(error);
        }
    }
    async verifyOrderPayment(req, res, next) {
        try {
            const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;
            const result = await (0, verfypayment_1.verifypayment)(razorpay_order_id, razorpay_payment_id, razorpay_signature);
            res.status(httpStatus_1.HttpStatus.OK).json({ message: result.message });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.PaymentController = PaymentController;
