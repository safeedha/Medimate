
export interface IDoctorRegister {
  signup(data: {
    firstname: string;
    lastname: string;
    email: string;
    phone: string;
    specialisation: string;
    experience: number;
    password: string;
    fee: number;
    additionalInfo: string;
    profilePicture: string;
    medicalLicence: string;
  }): Promise<{ message: string }>;
}