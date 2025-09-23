"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetPayout = void 0;
class GetPayout {
    constructor(_walletRepository) {
        this._walletRepository = _walletRepository;
    }
    async getrpayoutInfor() {
        try {
            const refunds = await this._walletRepository.getPayoutinfor();
            const allrefunds = refunds
                .filter((txn) => txn.appointmentId !== null && txn.paymentstatus === false)
                .map((txn) => ({
                _id: txn._id.toString(),
                amount: txn.amount,
                date: txn.date.toISOString(),
                from: txn.from,
                to: txn.to,
                toModel: txn.toModel,
                type: txn.type,
                doctorId: txn.doctorId.toString(),
                paymentstatus: txn.paymentstatus,
            }));
            return allrefunds;
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
exports.GetPayout = GetPayout;
