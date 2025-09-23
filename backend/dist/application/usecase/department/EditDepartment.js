"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditDept = void 0;
class EditDept {
    constructor(_baseRepository) {
        this._baseRepository = _baseRepository;
    }
    async editDept(deptData) {
        try {
            const { deptname, description } = deptData;
            const mdeptname = deptname.trim().toLowerCase();
            const newDeptData = {
                deptname: mdeptname,
                description: description,
            };
            await this._baseRepository.update(deptData._id, newDeptData);
            return { message: "Department edited successfully" };
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
exports.EditDept = EditDept;
