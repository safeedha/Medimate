import { RegRepository  } from "../../../domain/repository/reg-repository"

export class UserPassrest {
  constructor(private regRepository: RegRepository) {}

  async passwordrest( email: string, password: string): Promise<{ message: string }> {
    try {
       await this.regRepository.reset(email,password);
      return { message: "Password updated" };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Unexpected error occurred during user registration");
    }
  }

}