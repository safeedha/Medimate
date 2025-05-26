import { useEffect, useState } from 'react';
import DoctorSidebar from './Docsidebar';
import {getallappoinment} from  '../../api/doctorapi/appoinment'
import axios from 'axios'; // or use your custom axios instance if you have one

function Docappoinment() {
  const [appointments, setAppointments] = useState([]);


  const fetchAppointments = async () => {
    try {
      const result=await getallappoinment()
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
      <div className="ml-64 flex-1 bg-gradient-to-br from-white via-blue-50 to-indigo-100 p-4">
        <h1 className="text-xl font-bold mb-4">Appointments</h1>
        {appointments.length === 0 ? (
          <p>No appointments found.</p>
        ) : (
          <ul className="space-y-2">
            {appointments.map((appt, index) => (
              <li key={index} className="bg-white shadow p-4 rounded">
                <p><strong>Patient:</strong> {appt.patientName}</p>
                <p><strong>Date:</strong> {appt.date}</p>
                <p><strong>Time:</strong> {appt.time}</p>
                {/* Add more fields if needed */}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Docappoinment;
