

import { IBaseRepository } from "../../domain/repository/BaseRepository";

export abstract class BaseRepository<T> implements IBaseRepository<T> {
  async findAll(page: number, limit: number, search?: string): Promise<T[]> {
    throw new Error("findAll not implemented");
  }


  async findById(id: string): Promise<T | null> {
    throw new Error("findById not implemented");
  }

  async create(data: T): Promise<T | void> {
    throw new Error("create not implemented");
  }

  async update(id: string, data: Partial<T>): Promise<string> {
    throw new Error("update not implemented");
  }

  async delete(id: string): Promise<string> {
    throw new Error("delete not implemented");
  }
    async findcount(
  page: number,
  limit: number,
  search?: string
): Promise<{ data: number }>
{
 throw new Error("count not implemented");
}

}
