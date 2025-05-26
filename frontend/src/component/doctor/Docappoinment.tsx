import { useEffect, useState } from 'react';
import DoctorSidebar from './Docsidebar';
import { getallappoinment } from '../../api/doctorapi/appoinment';

function Docappoinment() {
  const [appointments, setAppointments] = useState([]);

  const fetchAppointments = async () => {
    try {
      const result = await getallappoinment();
      setAppointments(result);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div className="flex min-h-screen overflow-hidden font-sans">
      <DoctorSidebar />
      <div className="ml-52 flex-1 bg-gray-100 p-6">
        <h1 className="text-xl font-bold text-gray-800 mb-4">Appointments</h1>

        {appointments.length === 0 ? (
          <div className="text-center text-gray-500 mt-16 text-base">
            No appointments found.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[80vh] overflow-y-auto pr-1">
            {appointments.map((appt, index) => (
              <div
                key={index}
                className="flex justify-between items-start bg-white shadow-sm border border-gray-200 rounded-xl px-4 py-3 w-full"
              >
                {/* Left Side: Compact Details */}
                <div className="text-sm text-gray-700 space-y-0.5">
                  <p><span className="font-medium">Name:</span> {appt.patient_name}</p>
                  <p><span className="font-medium">Email:</span> {appt.patient_email}</p>
                  <p><span className="font-medium">Age:</span> {appt.patient_age}</p>
                  <p><span className="font-medium">Gender:</span> {appt.patient_gender}</p>
                  <p><span className="font-medium">Reason:</span> {appt.reason}</p>
                  <p><span className="font-medium">Status:</span> {appt.status}</p>
                  <p><span className="font-medium">Payment:</span> {appt.payment_status}</p>
                  <p><span className="font-medium">Date:</span> {new Date(appt.schedule?.date).toLocaleDateString()}</p>
                  <p><span className="font-medium">Time:</span> {appt.schedule?.startingTime} - {appt.schedule?.endTime}</p>
                </div>

                {/* Right Side: Compact Actions */}
                <div className="flex flex-col items-end justify-between ml-4 gap-2">
                  <button
                    className="text-sm bg-red-500 text-white px-5 py-2 rounded hover:bg-red-600 min-w-[90px]"
                    onClick={() => alert('Cancel feature coming soon!')}
                  >
                    Cancel
                  </button>
                  <a
                    href={`/chat/${appt.user_id}`}
                    className="text-xs text-blue-600 hover:underline"
                  >
                    Chat
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Docappoinment;
