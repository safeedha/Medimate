export interface IUserRegister {
  signup(data: {
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    password: string;
    gender: string;
  }): Promise<{ message: string }>;
}