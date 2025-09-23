"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletController = void 0;
const httpStatus_1 = require("../../../constant/httpStatus");
class WalletController {
    constructor(_getAdminWallet, _getPayout, _payToDoctor) {
        this._getAdminWallet = _getAdminWallet;
        this._getPayout = _getPayout;
        this._payToDoctor = _payToDoctor;
    }
    async getWalletInformation(req, res, next) {
        try {
            const page = parseInt(req.query.page, 10);
            const limit = parseInt(req.query.limit, 10);
            const result = await this._getAdminWallet.getwallet(page, limit);
            res.status(httpStatus_1.HttpStatus.OK).json(result);
        }
        catch (error) {
            next(error);
        }
    }
    async getPayoutInfo(req, res, next) {
        try {
            const result = await this._getPayout.getrpayoutInfor();
            res.status(httpStatus_1.HttpStatus.OK).json(result);
        }
        catch (error) {
            next(error);
        }
    }
    async processDoctorPayout(req, res, next) {
        try {
            const { transactionId, doctorid } = req.body;
            const result = await this._payToDoctor.paymentToDoctor(transactionId, doctorid);
            res.status(httpStatus_1.HttpStatus.OK).json(result);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.WalletController = WalletController;
