"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddDept = void 0;
class AddDept {
    constructor(_baseRepository, _deptRepository) {
        this._baseRepository = _baseRepository;
        this._deptRepository = _deptRepository;
    }
    async addDept(deptData) {
        try {
            const { deptname, description } = deptData;
            const mdeptname = deptname.trim().toLowerCase();
            const existingDept = await this._deptRepository.getByName(mdeptname);
            if (existingDept) {
                throw new Error(`Department with name ${mdeptname} already exists`);
            }
            const data = {
                deptname: mdeptname,
                description: description,
            };
            await this._baseRepository.create(data);
            return { message: "Department added successfully" };
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
exports.AddDept = AddDept;
