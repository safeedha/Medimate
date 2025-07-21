export interface IPasswordReset {
  passwordrest(email: string, newPassword: string): Promise<{ message: string }>;
}
