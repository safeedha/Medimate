export interface IBaseRepository<T> {
  findAll(page:number,limit:number,search?:string): Promise<T[]>;
  findById(id: string): Promise<T | null>;
  create(data: T): Promise<T|void>;
  update(id: string, data: Partial<T>): Promise<string>;
  delete(id: string): Promise<string>;
}