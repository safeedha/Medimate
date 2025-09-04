
export interface IChangeDocStatus {
  changesatus(id: string): Promise<string>;
}