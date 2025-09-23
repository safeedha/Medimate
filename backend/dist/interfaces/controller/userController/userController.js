"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserProfileController = void 0;
const httpStatus_1 = require("../../../constant/httpStatus");
const httpessages_1 = require("../../../constant/httpessages");
class UserProfileController {
    constructor(_getSingleUserService, _updateUserService) {
        this._getSingleUserService = _getSingleUserService;
        this._updateUserService = _updateUserService;
    }
    async fetchUserDetails(req, res, next) {
        try {
            console.log("request hit");
            const userId = req.id;
            const user = await this._getSingleUserService.getsingleUser(userId);
            console.log(user);
            res.status(httpStatus_1.HttpStatus.OK).json({ message: httpessages_1.HttpMessage.USER_FETCH_SUCCESS, user });
        }
        catch (error) {
            next(error);
        }
    }
    async updateUserDetails(req, res, next) {
        try {
            const userId = req.id;
            const { firstname, lastname, phone, age, gender } = req.body;
            await this._updateUserService.updatesingleUser(userId, firstname, lastname, phone, age, gender);
            res.status(httpStatus_1.HttpStatus.OK).json({ message: httpessages_1.HttpMessage.USER_UPDATE_SUCCESS });
        }
        catch (error) {
            next(error);
        }
    }
}
exports.UserProfileController = UserProfileController;
