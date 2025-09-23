"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DocReapply = void 0;
class DocReapply {
    constructor(_docRepository) {
        this._docRepository = _docRepository;
    }
    async docreapply(email, specialisation, experience, fee, medicalLicence) {
        try {
            await this._docRepository.docReaplly(email, specialisation, experience, fee, medicalLicence);
            return { message: "Reapplication sucess" };
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
            throw new Error('Unexpected error occurred during otp verification');
        }
    }
}
exports.DocReapply = DocReapply;
