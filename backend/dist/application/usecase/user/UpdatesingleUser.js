"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatesingleUser = void 0;
class UpdatesingleUser {
    constructor(_baseRepository) {
        this._baseRepository = _baseRepository;
    }
    async updatesingleUser(id, firstname, lastname, phone, age, gender) {
        try {
            const user = await this._baseRepository.update(id, { firstname, lastname, phone, age, gender });
            return user;
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
exports.UpdatesingleUser = UpdatesingleUser;
