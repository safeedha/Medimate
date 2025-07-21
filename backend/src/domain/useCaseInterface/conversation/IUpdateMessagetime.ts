export interface IUpdateMessagetime {
  update(userId: string,reciever:string): Promise<string>;
}