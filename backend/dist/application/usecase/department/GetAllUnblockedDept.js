"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetAllUnblockedDept = void 0;
class GetAllUnblockedDept {
    constructor(_deptRepository) {
        this._deptRepository = _deptRepository;
    }
    async getAllunblockedDept() {
        try {
            const departments = await this._deptRepository.getAllunblocked();
            return departments.map((dept) => ({
                id: dept._id?.toString(),
                deptname: dept.deptname,
                description: dept.description,
                isblocked: dept.isblocked,
            }));
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
exports.GetAllUnblockedDept = GetAllUnblockedDept;
