import { RegRepository  } from "../../../domain/repository/reg-repository"
import bcrypt from 'bcrypt';

export class UserReg {
  constructor(private regRepository: RegRepository) {}

  async signup(data: { firstname: string; lastname: string; email: string; phone: string; password: string,gender:'male' | 'female' | 'other'}): Promise<{ message: string }> {
    try {
         const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(data.password, saltRounds);
      const newdata = {
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        password: hashedPassword,
        phone: data.phone,
        isBlocked: false,
        googleVerified: false,
        gender:data.gender,
      };
      await this.regRepository.userRegister(newdata);
      return { message: "User registered successfully" };
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Unexpected error occurred during user registration");
    }
  }

}