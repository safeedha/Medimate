import { RegRepository  } from "../../../domain/repository/reg-repository"
import bcrypt from 'bcrypt';
export class UserPassrest {
  constructor(private regRepository: RegRepository) {}

  async passwordrest( email: string, password: string): Promise<{ message: string }> {
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
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