export interface IUpdateUser {
  updatesingleUser(
    userId: string,
    firstname: string,
    lastname: string,
    phone: string,
    age: number,
    gender: 'male' | 'female' | 'other'
  ): Promise<string>;
}