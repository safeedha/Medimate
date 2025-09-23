"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FetchSortedDoctors = void 0;
class FetchSortedDoctors {
    constructor(_doctorRepository) {
        this._doctorRepository = _doctorRepository;
    }
    async getAllDoctors(search) {
        try {
            const { data, total } = await this._doctorRepository.getAllverifiedbysort(search);
            const mapeddata = data.map((doc) => ({
                _id: doc._id.toString(),
                firstname: doc.firstname,
                lastname: doc.lastname,
                email: doc.email,
                phone: doc.phone,
                specialisation: doc.specialisation && typeof doc.specialisation === 'object'
                    ? {
                        deptname: doc.specialisation.deptname,
                        description: doc.specialisation.description,
                    }
                    : doc.specialisation?.toString() ?? null,
                experience: doc.experience,
                fee: doc.fee,
                profilePicture: doc.profilePicture,
            }));
            return { data: mapeddata, total };
        }
        catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message);
            }
            else {
                throw new Error("An unknown error occurred");
            }
        }
    }
}
exports.FetchSortedDoctors = FetchSortedDoctors;
