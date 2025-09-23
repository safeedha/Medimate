"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserWalletController = void 0;
const httpStatus_1 = require("../../../constant/httpStatus");
const httpessages_1 = require("../../../constant/httpessages");
class UserWalletController {
    constructor(_getUserWallet, _addUserWallet) {
        this._getUserWallet = _getUserWallet;
        this._addUserWallet = _addUserWallet;
    }
    async fetchUserWallet(req, res, next) {
        try {
            const userId = req.id;
            const page = parseInt(req.query.page);
            const limit = parseInt(req.query.limit);
            const result = await this._getUserWallet.getwallet(userId, page, limit);
            res.status(httpStatus_1.HttpStatus.OK).json(result);
        }
        catch (error) {
            next(error);
        }
    }
    async debitUserWallet(req, res, next) {
        try {
            const userId = req.id;
            const { amount } = req.body;
            console.log(amount);
            await this._addUserWallet.addMoney(userId, Number(amount));
            res.status(httpStatus_1.HttpStatus.CREATED).json({ message: httpessages_1.HttpMessage.WALLET_ADDED_SUCCESS });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.UserWalletController = UserWalletController;
