"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRepository = void 0;
class BaseRepository {
    async findAll(page, limit, search) {
        throw new Error("findAll not implemented");
    }
    async findById(id) {
        throw new Error("findById not implemented");
    }
    async create(data) {
        throw new Error("create not implemented");
    }
    async update(id, data) {
        throw new Error("update not implemented");
    }
    async delete(id) {
        throw new Error("delete not implemented");
    }
}
exports.BaseRepository = BaseRepository;
