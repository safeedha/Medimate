"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlockDept = void 0;
class BlockDept {
    constructor(_baseRepository) {
        this._baseRepository = _baseRepository;
    }
    async blockDept(id) {
        try {
            await this._baseRepository.delete(id);
            return { message: "Department block status changed" };
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
exports.BlockDept = BlockDept;
