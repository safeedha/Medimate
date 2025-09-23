"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoUserRepository = void 0;
const BaseRepositoryImpl_1 = require("./BaseRepositoryImpl");
const user_1 = require("../database/models/user");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwt_decode_1 = require("jwt-decode");
class MongoUserRepository extends BaseRepositoryImpl_1.BaseRepository {
    constructor() {
        super();
    }
    async create(data) {
        try {
            const mail = data.email;
            const phone = data.phone;
            const existingPhone = await user_1.User.findOne({ phone: phone });
            if (existingPhone) {
                throw new Error('User with this phone number already exists');
            }
            const existingUser = await user_1.User.findOne({ email: mail });
            if (existingUser) {
                if (existingUser.password) {
                    throw new Error('Email is already registered');
                }
                else {
                    existingUser.firstname = data.firstname;
                    existingUser.lastname = data.lastname;
                    existingUser.phone = data.phone;
                    existingUser.isBlocked = data.isBlocked;
                    existingUser.gender = data.gender;
                    await existingUser.save();
                }
            }
            else {
                const newUser = new user_1.User(data);
                await newUser.save();
            }
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
            throw new Error('Unexpected error occurred during user registration');
        }
    }
    async usergoogleLogin(credential) {
        try {
            const decoded = (0, jwt_decode_1.jwtDecode)(credential);
            let user = await user_1.User.findOne({ email: decoded?.email });
            if (!user) {
                user = new user_1.User();
                user.googleIds = decoded?.sub;
                user.firstname = decoded.name?.split(" ")[0] || "";
                user.lastname = decoded.name?.split(" ").slice(1).join(" ") || "";
                user.googleVerified = true;
                user.email = decoded.email;
                await user.save();
            }
            else {
                if (user.isBlocked) {
                    throw new Error("This account is blocked");
                }
                user.googleIds = decoded?.sub;
                await user.save();
            }
            const loggedInUser = await user_1.User.findOne({ googleIds: decoded?.sub });
            if (!loggedInUser) {
                throw new Error("User creation failed");
            }
            return loggedInUser;
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
            throw new Error("Unexpected error occurred during user login");
        }
    }
    async userLogin(email, password) {
        try {
            const user = await user_1.User.findOne({ email: email });
            if (!user) {
                throw new Error("This email is not registered");
            }
            const isMatch = await bcrypt_1.default.compare(password, user.password);
            if (!isMatch) {
                throw new Error("Invalid credentials");
            }
            if (user.isBlocked) {
                throw new Error("This account is blocked");
            }
            if (!user.googleVerified) {
                throw new Error("This account is not verified");
            }
            return user;
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
            throw new Error("Unexpected error occurred during user login");
        }
    }
    async findAll(page, limit, search) {
        try {
            const baseFilter = {};
            if (search && search.trim() !== '') {
                baseFilter.$or = [
                    { firstname: { $regex: search, $options: 'i' } },
                    { lastname: { $regex: search, $options: 'i' } },
                    { email: { $regex: search, $options: 'i' } },
                ];
            }
            if (page === 0 && limit === 0) {
                const userDocs = await user_1.User.find(baseFilter);
                return userDocs;
            }
            const skip = (page - 1) * limit;
            const userDocs = await user_1.User.find(baseFilter)
                .skip(skip)
                .limit(limit)
                .exec();
            await user_1.User.countDocuments(baseFilter);
            return userDocs;
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
            throw new Error('Unknown error occurred');
        }
    }
    async getAlluserbysort(search) {
        try {
            const baseFilter = { isBlocked: false };
            if (search && search.trim() !== '') {
                baseFilter.$or = [
                    { firstname: { $regex: search, $options: 'i' } },
                    { lastname: { $regex: search, $options: 'i' } },
                    { email: { $regex: search, $options: 'i' } },
                ];
            }
            const userDocs = await user_1.User.find(baseFilter).sort({ lastMessage: -1 });
            return { users: userDocs };
        }
        catch (error) {
            throw new Error(error instanceof Error ? error.message : 'Unknown error occurred');
        }
    }
    async delete(id) {
        try {
            const user = await user_1.User.findById(id);
            if (!user) {
                throw new Error("User not found");
            }
            user.isBlocked = !user.isBlocked;
            await user.save();
            return "status changed";
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
    async findById(id) {
        try {
            const user = await user_1.User.findById(id);
            if (!user) {
                throw new Error("User not found");
            }
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
    async update(id, data) {
        try {
            const user = await user_1.User.findById(id);
            if (!user) {
                throw new Error("User not found");
            }
            const existingUser = await user_1.User.findOne({
                phone: data.phone,
                _id: { $ne: id }
            });
            if (existingUser) {
                throw new Error("This phone number already exists");
            }
            user.firstname = data.firstname ?? user.firstname;
            user.lastname = data.lastname;
            user.phone = data.phone ?? user.phone;
            user.age = data.age;
            user.gender = data.gender;
            await user.save();
            return 'Profile updated';
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
exports.MongoUserRepository = MongoUserRepository;
