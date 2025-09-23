"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddUserwallet = void 0;
class AddUserwallet {
    constructor(_walletRepository) {
        this._walletRepository = _walletRepository;
    }
    async addMoney(id, amount) {
        try {
            await this._walletRepository.adduserwallet(id, amount);
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
exports.AddUserwallet = AddUserwallet;
