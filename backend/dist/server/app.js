"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const morgan_1 = __importDefault(require("morgan")); // ✅ Import Morgan
const adminRoutes_1 = require("../interfaces/routes/adminRoutes");
const doctorRoutes_1 = require("../interfaces/routes/doctorRoutes");
const userRoutes_1 = require("../interfaces/routes/userRoutes");
const refreshTokenRouter_1 = require("../interfaces/routes/refreshTokenRouter");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.setMiddleware();
        dotenv_1.default.config();
        this.setRouter();
    }
    setMiddleware() {
        this.app.use((0, morgan_1.default)('dev'));
        this.app.use((0, cors_1.default)({
            origin: 'https://www.medi-mate.safeedha.site',
            credentials: true
        }));
        this.app.use(express_1.default.json());
        this.app.use((0, cookie_parser_1.default)());
    }
    setRouter() {
        this.app.use('/refresh-token', refreshTokenRouter_1.refreshTokenRouter);
        this.app.use('/admin', adminRoutes_1.adminRouter);
        this.app.use('/doctor', doctorRoutes_1.doctorRouter);
        this.app.use('/user', userRoutes_1.userRouter);
    }
}
exports.App = App;
