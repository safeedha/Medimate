"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoctorWalletController = void 0;
const httpStatus_1 = require("../../../constant/httpStatus");
class DoctorWalletController {
    constructor(_getDoctorWalletUseCase) {
        this._getDoctorWalletUseCase = _getDoctorWalletUseCase;
    }
    async getWalletTransactions(req, res, next) {
        try {
            const doctorId = req.id;
            const page = parseInt(req.query.page);
            const limit = parseInt(req.query.limit);
            const walletTransactions = await this._getDoctorWalletUseCase.getwallet(doctorId, page, limit);
            res.status(httpStatus_1.HttpStatus.OK).json(walletTransactions);
        }
        catch (error) {
            next(error);
        }
    }
}
exports.DoctorWalletController = DoctorWalletController;
