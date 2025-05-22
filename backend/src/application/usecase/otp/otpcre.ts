import {RegRepository} from "../../../domain/repository/reg-repository";



export class OtpCretion {
constructor(private regRepository:RegRepository){}
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