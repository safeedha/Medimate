"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshTokenRouter = void 0;
const express_1 = require("express");
const refreshTokenController_1 = require("../../interfaces/controller/refreshTokenController");
const router = (0, express_1.Router)();
exports.refreshTokenRouter = router;
router.post('/', refreshTokenController_1.refreshTokenController);
