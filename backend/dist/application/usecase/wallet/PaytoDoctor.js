"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Paytodoctor = void 0;
class Paytodoctor {
    constructor(_walletRepository) {
        this._walletRepository = _walletRepository;
    }
    async paymentToDoctor(transactionId, doctorId) {
        try {
            await this._walletRepository.addpaytodoctor(transactionId, doctorId);
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
exports.Paytodoctor = Paytodoctor;
