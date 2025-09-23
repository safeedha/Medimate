"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const departmentSchema = new mongoose_1.Schema({
    deptname: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    isblocked: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});
const DepartmentModel = (0, mongoose_1.model)('Department', departmentSchema);
exports.default = DepartmentModel;
