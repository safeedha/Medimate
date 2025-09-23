"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetDoctorWallet = void 0;
class GetDoctorWallet {
    constructor(_walletRepository) {
        this._walletRepository = _walletRepository;
    }
    async getwallet(doctrid, page, limit) {
        try {
            const { balance, transaction, total } = await this._walletRepository.getdoctorwallet(doctrid, page, limit);
            const transactions = transaction.map((txn) => ({
                type: txn.type,
                amount: txn.amount,
                appointmentId: txn.appointmentId?.toString(),
                date: txn.date,
            }));
            return { balance, transactions, total };
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
exports.GetDoctorWallet = GetDoctorWallet;
