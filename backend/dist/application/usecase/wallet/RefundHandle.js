"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Refundhandle = void 0;
class Refundhandle {
    constructor(_walletRepository) {
        this._walletRepository = _walletRepository;
    }
    async refundhandler(transactionId) {
        try {
            await this._walletRepository.addrefund(transactionId);
            return { message: 'Payment updated' };
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
exports.Refundhandle = Refundhandle;
