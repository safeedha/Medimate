"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserallet = void 0;
class GetUserallet {
    constructor(_walletRepository) {
        this._walletRepository = _walletRepository;
    }
    async getwallet(userid, page, limit) {
        try {
            const { balance, transaction, total } = await this._walletRepository.getuserwallet(userid, page, limit);
            const paginatedTransactions = transaction.reverse()
                .map((tx) => ({
                type: tx.type,
                amount: tx.amount,
                date: tx.date,
            }));
            return { balance, transactions: paginatedTransactions, total };
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
exports.GetUserallet = GetUserallet;
