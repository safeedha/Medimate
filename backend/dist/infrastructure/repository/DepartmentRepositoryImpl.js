"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MongoDeptRepository = void 0;
const department_1 = __importDefault(require("../database/models/department"));
const BaseRepositoryImpl_1 = require("./BaseRepositoryImpl");
class MongoDeptRepository extends BaseRepositoryImpl_1.BaseRepository {
    async create(data) {
        const newDept = new department_1.default(data);
        await newDept.save();
    }
    async findAll(page, limit, search) {
        const filter = search
            ? { deptname: { $regex: search, $options: 'i' } }
            : {};
        const skip = (page - 1) * limit;
        const data = await department_1.default.find(filter).skip(skip).limit(limit);
        return data;
    }
    async getAllunblocked() {
        const dept = await department_1.default.find({ isblocked: false });
        return dept;
    }
    async getByName(name) {
        return await department_1.default.findOne({ deptname: name });
    }
    async findById(id) {
        return await department_1.default.findById(id);
    }
    async update(id, data) {
        const existingDept = await department_1.default.findOne({ deptname: data.deptname, _id: { $ne: id } });
        if (existingDept) {
            throw new Error('Department name already exists');
        }
        const updatedDept = await department_1.default.findByIdAndUpdate(id, {
            deptname: data.deptname,
            description: data.description
        }, { new: true });
        if (!updatedDept) {
            throw new Error('Department not found');
        }
        return "successfully updated";
    }
    async delete(id) {
        const dept = await department_1.default.findById(id);
        if (!dept) {
            throw new Error('Department not found');
        }
        dept.isblocked = !dept.isblocked;
        await dept.save();
        return "deleted successfully";
    }
}
exports.MongoDeptRepository = MongoDeptRepository;
