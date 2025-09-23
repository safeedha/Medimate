"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetUserBysort = void 0;
class GetUserBysort {
    constructor(_userRepository) {
        this._userRepository = _userRepository;
    }
    async getAllSortUser(search) {
        try {
            const { users } = await this._userRepository.getAlluserbysort(search);
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
            return { users: user, total: users.length };
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
exports.GetUserBysort = GetUserBysort;
