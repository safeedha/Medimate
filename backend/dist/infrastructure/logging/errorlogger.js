"use strict";
// import winston from 'winston';
// import path from 'path';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const errorLogger = winston.createLogger({
//   level: 'error',
//   format: winston.format.combine(
//     winston.format.timestamp(),
//     winston.format.json()
//   ),
//   transports: [
//     new winston.transports.File({
//       filename: path.join(__dirname, '../../../logs/error.log'),
//       level: 'error'
//     }),
//     new winston.transports.Console()
//   ],
// });
// export default errorLogger;
// src/infrastructure/logging/errorLogger.ts
// src/infrastructure/logging/errorLogger.ts
// src/infrastructure/logging/errorLogger.ts
const winston_1 = __importDefault(require("winston"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const winston_daily_rotate_file_1 = __importDefault(require("winston-daily-rotate-file"));
const logDirectory = path_1.default.join(__dirname, '../../../logs');
if (!fs_1.default.existsSync(logDirectory)) {
    fs_1.default.mkdirSync(logDirectory, { recursive: true });
}
const transports = [
    new winston_daily_rotate_file_1.default({
        filename: 'error-%DATE%.log',
        dirname: logDirectory,
        datePattern: 'YYYY-MM-DD',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '7d',
    })
];
const errorLogger = winston_1.default.createLogger({
    level: 'error',
    format: winston_1.default.format.combine(winston_1.default.format.timestamp(), winston_1.default.format.json()),
    transports,
});
exports.default = errorLogger;
