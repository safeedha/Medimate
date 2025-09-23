"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDatabase = connectToDatabase;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const MONGO_URL = process.env.MONGO_URL;
console.log(MONGO_URL);
async function connectToDatabase() {
    try {
        await mongoose_1.default.connect(MONGO_URL);
        console.log('Database connection successful');
    }
    catch (error) {
        console.log(error);
    }
}
