"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUser = void 0;
class GetUser {
    constructor(_baseRepository) {
        this._baseRepository = _baseRepository;
    }
    async getAllUser(page, limit, search) {
        try {
            const users = await this._baseRepository.findAll(page, limit, search);
            const user = users.map(doc => ({
                _id: doc._id.toString(),
                firstname: doc.firstname,
                lastname: doc.lastname,
                email: doc.email,
                phone: doc.phone ?? null,
                isBlocked: doc.isBlocked,
                gender: doc.gender,
                age: doc.age,
            }));
            return { users: user, total: user.length };
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
exports.GetUser = GetUser;
