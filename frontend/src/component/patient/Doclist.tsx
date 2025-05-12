import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { getAlldoctors } from '../../api/userapi/doctor';

export interface IDepartment {
  _id: string;
  deptname: string;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface Idoctor {
  _id?: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  phone: string;
  specialisation: IDepartment;
  experience: number;
  fee: number;
  status: 'Approved' | 'Rejected' | 'Pending';
  isBlocked: boolean;
  googleVerified?: boolean;
  additionalInfo?: string;
  profilePicture?: string;
  medicalLicence?: string;
}

function Doclist() {
  const [doctors, setDoctors] = useState<Idoctor[] | null>(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      const doctorData = await getAlldoctors();
      console.log(doctorData)
      setDoctors(doctorData);
    };

    fetchDoctors();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-indigo-100 to-purple-100">
      <Navbar />

      <section className="py-12 px-6 md:px-20">
        <h2 className="text-4xl font-bold text-center text-indigo-700 mb-10">Our Amazing Doctors</h2>

        {!doctors ? (
          <p className="text-center text-gray-600 text-lg">Loading doctors...</p>
        ) : doctors.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">No doctors found.</p>
        ) : (
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {doctors.map((doctor, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl border-2 border-teal-300 shadow-md hover:shadow-xl transition-transform duration-300 transform hover:-translate-y-1"
              >
                <img
                  src={doctor.profilePicture || 'https://via.placeholder.com/100'}
                  alt="Doctor"
                  className="w-24 h-24 mx-auto rounded-full object-cover border-4 border-teal-500 mb-4"
                />
                <h4 className="text-xl font-semibold text-teal-700 text-center">
                  Dr. {doctor.firstname} {doctor.lastname}
                </h4>
                <p className="text-gray-600 text-center mt-1">
                  {doctor.specialisation.deptname|| 'General Practitioner'}
                </p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Doclist;
