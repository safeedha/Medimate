import {IRegistrationRepository} from "../../../domain/repository/RegistrationRepository";
import {IOtpCreator} from "../../../domain/useCaseInterface/authRecovery/IOtpCreator"


export class OtpCretion implements IOtpCreator{
constructor(private regRepository:IRegistrationRepository){}
async createOtp(email:string,otp:string):Promise<{message:string}>{
    try{
        const otpData={
            email:email,
            otp:otp,
            createdAt:new Date()
        }
        await this.regRepository.craeteOtp(otpData)
        return {message:"otp created successfully"}
    }
    catch(error){
        if (error instanceof Error) {
            throw new Error(error.message); 
         }
         throw new Error('Unexpected error occurred during otp creation');
    }
}

}