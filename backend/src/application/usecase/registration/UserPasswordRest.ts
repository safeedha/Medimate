import {IRegistrationRepository} from "../../../domain/repository/RegistrationRepository"
import {IPasswordReset} from "../../../domain/useCaseInterface/authRecovery/IPasswordReset"
import bcrypt from 'bcrypt';
export class UserPasswordRest implements IPasswordReset  {
  constructor(private regRepository: IRegistrationRepository) {}

  async passwordrest( email: string, password: string): Promise<{ message: string }> {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log("hased",hashedPassword)
       await this.regRepository.reset(email,hashedPassword);
      return { message: "Password updated" };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Unexpected error occurred during user registration");
    }
  }

}