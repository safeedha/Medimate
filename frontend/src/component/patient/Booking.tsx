import {useEffect,useState} from 'react';
import UserSidebar from './UserSidebar';
import Navbar from './Navbar';
import { getfutureAppoinments, getpasteAppoinments,cancelAppoinment } from '../../api/userapi/appoinment';
import type{Appointment} from '../../Interface/interface'
import Swal from 'sweetalert2';
import { Toaster, toast } from 'react-hot-toast';

function Booking() {
  const [futur,setFuture]=useState<Appointment[]>([])
  const [past,setPast]=useState<Appointment[]>([])
  useEffect(() => {
   const getFutureAppointments = async () => {
     const result= await getfutureAppoinments();
     setFuture(result)
     }
   getFutureAppointments()
}, []);

  useEffect(() => {
   const getPastAppointments = async () => {
      const result= await getpasteAppoinments();
       setPast(result)  
     }
   getPastAppointments()
}, []);
   
const cancelHandle = async (id:string) => {
  const result = await Swal.fire({
    title: 'Are you sure?',
    text: "Your changes will not be saved!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, cancel it!',
  });

  if (result.isConfirmed) {
      const result=await cancelAppoinment(id)
      if(result==='Status updated')
      {
        toast.success("The appoinment cancelled,you will refunded with in weeks")
      }

  }
};

  return (
    <>
    <div className='min-h-screen'>
      < Toaster/>
      <Navbar />
      <div className="flex h-screen bg-teal-50 ">
        <UserSidebar />
        <div className="ml-64 flex-1 p-6 overflow-y-auto  space-y-8 mt-20">
          
          {/* Upcoming Appointments Container */}
          <div className="bg-white shadow-md rounded-lg p-6">
  <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2 text-center">
    Upcoming Appointments
  </h2>

  {futur.length > 0 ? (
    <div className="flex space-x-4 overflow-x-auto pb-2">
      {futur.map((appointment) => (
        <div
              key={appointment._id}
              className="min-w-[250px] flex-shrink-0 border border-gray-300 rounded-lg p-4 shadow-sm"
            >
              <h2 className="text-sm font-semibold text-gray-700">
                Patient Name:{appointment.patient_name}
              </h2>
             
              <p className="text-sm text-gray-600">
              Doctor: {typeof appointment.doctor_id !== 'string' ? appointment.doctor_id.firstname : ''}
            </p>
           <p className="text-sm text-gray-600">
            Date: {typeof appointment.schedule_id !== 'string'
              ? new Date(appointment.schedule_id.date).toLocaleDateString()
              : ''}
             </p>
              {typeof appointment.schedule_id !== 'string' && (
                <p className="text-sm text-gray-600">
                  Time: {appointment.schedule_id.startingTime} - {appointment.schedule_id.endTime}
                </p>
              )}
              <p className="text-sm text-gray-600">Reason: {appointment.reason}</p>
              <p className="text-sm text-gray-600 capitalize">Status: {appointment.status}</p>
              <button className="bg-red-500 hover:bg-red-600 text-white text-sm font-medium py-1.5 px-3 rounded-md shadow-sm transition" onClick={()=>cancelHandle(appointment._id!)}>
              Cancel
            </button>


            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600 text-center">You have no upcoming appointments.</p>
      )}
    </div>


          {/* Past Appointments Container */}
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2 text-center">
              Past Appointments
            </h2>
             {past.length > 0 ? (
    <div className="flex space-x-4 overflow-x-auto pb-2">
      {past.map((appointment, index) => (
        <div
              key={index}
              className="min-w-[250px] flex-shrink-0 border border-gray-300 rounded-lg p-4 shadow-sm"
            >
              <h2 className="text-sm font-semibold text-gray-700">
                Patient Name:{appointment.patient_name}
              </h2>
               <p className="text-sm text-gray-600">
              Doctor: {typeof appointment.doctor_id !== 'string' ? appointment.doctor_id.firstname : ''}
              </p>
              
              <p className="text-sm text-gray-600">
                Date: {new Date(appointment?.schedule_id?.date).toLocaleDateString()}
              </p>
              <p className="text-sm text-gray-600">
                Time: {appointment?.schedule_id?.startingTime} - {appointment?.schedule_id?.endTime}
              </p>
              <p className="text-sm text-gray-600">Reason: {appointment.reason}</p>
              <p className="text-sm text-gray-600 capitalize">Status: {appointment.status}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-600 text-center">You have no past appointments.</p>
      )}
          </div>

        </div>
      </div>
      </div>
    </>
  );
}

export default Booking;
