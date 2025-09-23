"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Getrefund = void 0;
class Getrefund {
    constructor(_walletRepository) {
        this._walletRepository = _walletRepository;
    }
    async getrefundable(appoinmentId) {
        try {
            const refunds = await this._walletRepository.getRefundTransaction(appoinmentId);
            return refunds;
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
            else {
                throw new Error("An unknown error occurred");
            }
        }
    }
}
exports.Getrefund = Getrefund;
