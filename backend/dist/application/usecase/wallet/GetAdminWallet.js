"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAdminWallet = void 0;
class GetAdminWallet {
    constructor(_walletRepository) {
        this._walletRepository = _walletRepository;
    }
    async getwallet(page, limit) {
        try {
            const wallet = await this._walletRepository.getdminwallet(page, limit);
            const transaction = wallet.transaction.map((txn) => ({
                _id: txn._id,
                amount: txn.amount,
                from: txn.from,
                to: txn.to,
                toModel: txn.toModel,
                type: txn.type,
                date: txn.date.toISOString(),
            }));
            return {
                transaction,
                balance: wallet.balance,
                total: wallet.balance
            };
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
exports.GetAdminWallet = GetAdminWallet;
