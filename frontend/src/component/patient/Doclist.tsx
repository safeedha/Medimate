import { useState, useEffect } from 'react';
import Navbar from './Navbar';
import { getAlldoctors } from '../../api/userapi/doctor';
import {getDepartnment} from '../../api/userapi/doctor'

export interface IDepartment {
  _id: string;
  deptname: string;
  description?: string;
  createdAt?: Date;
  isblocked?: boolean;
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
  const [department, setDepartment] = useState<IDepartment[]>([]);
  const [singledepartment,setSingledepartment]=useState<string>("")
  const [search,setSearch]=useState<string>("")

  useEffect(() => {
    const fetchDoctors = async () => {
      const doctorData = await getAlldoctors(singledepartment,search);
      setDoctors(doctorData);
    };

    fetchDoctors();
  }, [singledepartment,search]);
  
  useEffect(() => {
    const fetchDepartnment = async () => {
      const response = await getDepartnment();
      setDepartment(response)
    };

    fetchDepartnment ();
  }, []);

 const deptdetails = department.map((dept) => (
  <div
    key={dept._id}
    className="hover:bg-slate-200 cursor-pointer p-2 rounded"
    onClick={() =>
      setSingledepartment(dept.deptname)
    }
  >
    <p>{dept.deptname}</p>
  </div>
));


  return (
   <div className="min-h-screen bg-teal-50">
  <Navbar />
  <div className='flex flex-row'>
    <div className='fixed h-screen w-48 top-0 shadow-lg py-20 flex flex-col gap-7 items-center overflow-y-auto'>
      <div className="hover:bg-slate-200 cursor-pointer p-2 rounded"
           onClick={() => setSingledepartment("All doctor")}>
        <p>All doctor</p>
      </div>
      {deptdetails}
    </div>

    <section className="py-4 px-4 md:px-12 lg:px-20 ml-48 w-full">
      <div >
       <input
        type="text"
        className="mb-4 px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 w-full max-w-md"
        placeholder="Search for Doctor"
        onChange={(e: React.ChangeEvent<HTMLInputElement>)=>setSearch(e.target.value)}
      />
      </div>
      

      {!doctors ? (
        <p className="text-center text-gray-600 text-lg">Loading doctors...</p>
      ) : doctors.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">No doctors found.</p>
      ) : (
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
              <p className="text-black text-center mt-1 font-semibold">
                {doctor?.specialisation?.deptname || 'General Practitioner'}
              </p>
              <p className="text-black text-center mt-1 font-semibold">
                Consultation fee: {doctor?.fee}
              </p>
              <p className="text-black text-center mt-1 font-semibold">
                Experience: {doctor?.experience}
              </p>
              <button className="bg-slate-900 text-white px-4 py-2 rounded-xl mt-4 mx-auto block hover:bg-slate-800 transition duration-200">
                Book Appointment
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  </div>
</div>

  );
}

export default Doclist;
