"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetDept = void 0;
class GetDept {
    constructor(_baseRepository) {
        this._baseRepository = _baseRepository;
    }
    async getAllDept(page, limit, search) {
        try {
            const data = await this._baseRepository.findAll(page, limit, search);
            const departmentDtos = data.map((dept) => ({
                id: dept._id?.toString(),
                deptname: dept.deptname,
                description: dept.description,
                isblocked: dept.isblocked,
            }));
            return { data: departmentDtos, total: data.length };
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
exports.GetDept = GetDept;
