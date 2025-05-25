import {useEffect,useState} from 'react'
import Navbar from './Navbar';
import {useParams} from 'react-router-dom'
import {getSingledoctor} from '../../api/userapi/doctor'
import type{Idoctor} from '../../Interface/interface'

function Docdetails() {
const[doctor,setDoctor]=useState<Idoctor>() 
type Params = {
  id: string;
};
 const { id } = useParams<Params>();

 useEffect(() => {
  if (!id) return; 
  const fetchSingleDoctor = async () => {
    const doctorData = await getSingledoctor(id);
    setDoctor(doctorData);
  };

  fetchSingleDoctor();
}, [id]);
  


  return (
     <div className="min-h-screen bg-teal-50">
      <Navbar />
     <div className="bg-white shadow-lg rounded-xl p-6 mt-4 mx-auto max-w-4xl flex items-start space-x-6">
 
          <div className="flex-shrink-0">
            <img
              src={doctor?.profilePicture}
              alt="Doctor"
              className="w-32 h-32 rounded-full object-cover border-4 border-teal-300 shadow-md"
            />
          </div>

          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Dr. {doctor?.firstname} {doctor?.lastname}
            </h2>
            <p className="text-teal-700 font-medium">
              Specialisation: {doctor?.specialisation?.deptname}
            </p>
            <p className="text-gray-600 mt-1">
              Experience: <span className="font-semibold">{doctor?.experience}</span> years
            </p>
            <p className="text-gray-600 mt-1">
              Consultation Fee: <span className="font-semibold">₹{doctor?.fee}</span>
            </p>
          </div>
        </div>

      </div>
  )
}

export default Docdetails