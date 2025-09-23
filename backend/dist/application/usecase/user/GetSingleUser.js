"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetsingleUser = void 0;
class GetsingleUser {
    constructor(_baseRepository) {
        this._baseRepository = _baseRepository;
    }
    async getsingleUser(id) {
        try {
            const user = await this._baseRepository.findById(id);
            if (!user) {
                throw new Error("error during fetching single user");
            }
            const userDTO = {
                id: user._id.toString(),
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                phone: user.phone,
                gender: user.gender,
                age: user.age,
            };
            return userDTO;
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
exports.GetsingleUser = GetsingleUser;
