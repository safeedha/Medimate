"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const errorlogger_1 = __importDefault(require("../logging/errorlogger"));
const errorHandler = (err, req, res, _next) => {
    const errorMessage = err instanceof Error
        ? err.message
        : 'Internal Server Error';
    errorlogger_1.default.error({
        message: errorMessage,
        stack: err instanceof Error ? err.stack : undefined,
        path: req.originalUrl,
        method: req.method,
        body: req.body,
        query: req.query,
        params: req.params,
    });
    res.status(500).json({
        message: errorMessage,
    });
};
exports.default = errorHandler;
