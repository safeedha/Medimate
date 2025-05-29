import { useEffect, useState } from 'react';
import UserSidebar from './UserSidebar';
import Navbar from './Navbar';
import { getfutureAppoinments, getpasteAppoinments, cancelAppoinment } from '../../api/userapi/appoinment';
import type { Appointment } from '../../Interface/interface';
import Swal from 'sweetalert2';
import { Toaster, toast } from 'react-hot-toast';

function Booking() {
  const [futur, setFuture] = useState<Appointment[]>([]);
  const [past, setPast] = useState<Appointment[]>([]);

  useEffect(() => {
    const getFutureAppointments = async () => {
      const result = await getfutureAppoinments();
      setFuture(result);
    };
    getFutureAppointments();
  }, []);

  useEffect(() => {
    const getPastAppointments = async () => {
      const result = await getpasteAppoinments();
      setPast(result);
    };
    getPastAppointments();
  }, []);

  const cancelHandle = async (id: string) => {
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
      const response = await cancelAppoinment(id);
      if (response === 'Status updated') {
        toast.success("The appointment was cancelled. You will be refunded within weeks.");
        setFuture((prev) => prev.filter(item => item._id !== id));
      }
    }
  };

  return (
    <>
      <div className='min-h-screen'>
        <Toaster />
        <Navbar />
        <div className="flex h-screen bg-teal-50">
          <UserSidebar />
          <div className="ml-64 flex-1 p-6 overflow-y-auto space-y-8 mt-20">

            {/* Upcoming Appointments Table */}
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2 text-center">
                Upcoming Appointments
              </h2>
              {futur.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full table-auto border-collapse border border-gray-300">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="border px-4 py-2">Patient Name</th>
                        <th className="border px-4 py-2">Doctor</th>
                        <th className="border px-4 py-2"> Appoinment Date</th>
                        <th className="border px-4 py-2">Time</th>
                        <th className="border px-4 py-2">Reason</th>
                        <th className="border px-4 py-2">Status</th>
                        <th className="border px-4 py-2">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {futur.map((appointment) => (
                        <tr key={appointment._id}>
                          <td className="border px-4 py-2">{appointment.patient_name}</td>
                          <td className="border px-4 py-2">
                            {typeof appointment.doctor_id !== 'string' ? appointment.doctor_id.firstname : ''}
                          </td>
                          <td className="border px-4 py-2">
                            {typeof appointment.schedule_id !== 'string'
                              ? new Date(appointment.schedule_id.date).toLocaleDateString()
                              : ''}
                          </td>
                          <td className="border px-4 py-2">
                            {typeof appointment.schedule_id !== 'string'
                              ? `${appointment.schedule_id.startingTime} - ${appointment.schedule_id.endTime}`
                              : ''}
                          </td>
                          <td className="border px-4 py-2">{appointment.reason}</td>
                          <td className="border px-4 py-2 capitalize">{appointment.status}</td>
                          <td className="border px-4 py-2 text-center">
                           <button
                              onClick={() => cancelHandle(appointment._id!)}
                              className={`px-3 py-1 rounded-md text-sm ${
                                appointment.status === 'cancelled'
                                  ? 'bg-gray-400 cursor-not-allowed'
                                  : 'bg-red-500 hover:bg-red-600 text-white'
                              }`}
                              disabled={appointment.status === 'cancelled'}
                            >
                              {appointment.status === 'cancelled' ? 'Cancelled' : 'Cancel'}
                            </button>

                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-gray-600 text-center">You have no upcoming appointments.</p>
              )}
            </div>

            {/* Past Appointments Table */}
            <div className="bg-white shadow-md rounded-lg p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4 border-b pb-2 text-center">
                Past Appointments
              </h2>
              {past.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full table-auto border-collapse border border-gray-300">
                    <thead className="bg-gray-100">
                      <tr>
                        <th className="border px-4 py-2">Patient Name</th>
                        <th className="border px-4 py-2">Doctor</th>
                        <th className="border px-4 py-2">Date</th>
                        <th className="border px-4 py-2">Time</th>
                        <th className="border px-4 py-2">Reason</th>
                        <th className="border px-4 py-2">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {past.map((appointment, index) => (
                        <tr key={index}>
                          <td className="border px-4 py-2">{appointment.patient_name}</td>
                          <td className="border px-4 py-2">
                            {typeof appointment.doctor_id !== 'string' ? appointment.doctor_id.firstname : ''}
                          </td>
                          <td className="border px-4 py-2">
                            {new Date(appointment?.schedule_id?.date).toLocaleDateString()}
                          </td>
                          <td className="border px-4 py-2">
                            {appointment?.schedule_id?.startingTime} - {appointment?.schedule_id?.endTime}
                          </td>
                          <td className="border px-4 py-2">{appointment.reason}</td>
                          <td className="border px-4 py-2 capitalize">{appointment.status}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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
