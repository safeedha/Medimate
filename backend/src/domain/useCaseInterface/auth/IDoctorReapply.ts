export interface IDoctorReapply {
  docreapply(
    email: string,
    specialisation: string,
    experience: number,
    fee: number,
    medicalLicence: string
  ): Promise<{ message: string }>;
}