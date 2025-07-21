export interface IBlockDept {
  blockDept(id: string): Promise<{ message: string }>;
}