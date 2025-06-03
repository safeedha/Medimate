import { useEffect, useState } from 'react';
import DoctorSidebar from './Docsidebar';
import { getallappoinment, cancelAppoinment } from '../../api/doctorapi/appoinment';
import { toast, Toaster } from 'react-hot-toast';
import Pagination from '../../component/common/Pgination';
import { Link } from 'react-router-dom';

function Docappoinment() {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [userid, setUserid] = useState<string | null>(null);
  const [reason, setReason] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [render, setRender] = useState(false);
  const [mail, setMail] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const appointmentsPerPage = 4;

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
  }, [render]);

  const openCancelModal = (id: string, userid: string, email: string) => {
    setSelectedId(id);
    setReason('');
    setShowModal(true);
    setUserid(userid);
    setMail(email);
  };

  const handleCancelSubmit = async () => {
    if (!reason.trim()) {
      toast.error('Please enter a reason for cancellation.');
      return;
    }
    const result = await cancelAppoinment(selectedId!, reason, userid!, mail);
    if (result === "Status updated") {
      toast.success("Appointment cancelled. Reason mailed to patient.");
      setRender(!render);
      setShowModal(false);
    }
  };

  const indexOfLastAppointment = currentPage * appointmentsPerPage;
  const indexOfFirstAppointment = indexOfLastAppointment - appointmentsPerPage;
  const currentAppointments = appointments.slice(indexOfFirstAppointment, indexOfLastAppointment);
  const handlePageChange = (page: number) => setCurrentPage(page);
  const totalPages = Math.ceil(appointments.length / appointmentsPerPage);

  return (
    <div className="flex min-h-screen overflow-hidden font-sans">
      <DoctorSidebar />
      <Toaster />
      <div className="ml-52 flex-1 bg-gray-100 p-6">
        <h1 className="text-xl font-bold text-gray-800 mb-4">Upcoming Appointments</h1>

        {appointments.length === 0 ? (
          <div className="text-center text-gray-500 mt-16 text-base">
            No appointments found.
          </div>
        ) : (
          <>
            <div className="overflow-x-auto bg-white rounded-xl shadow border border-gray-200">
              <table className="w-full table-auto text-sm text-left text-gray-700">
                <thead className="bg-gray-100 text-gray-600 font-semibold uppercase text-xs">
                  <tr>
                    <th className="px-4 py-3">Patient Name</th>
                    <th className="px-4 py-3">Email</th>
                    <th className="px-4 py-3">Age</th>
                    <th className="px-4 py-3">Gender</th>
                    <th className="px-4 py-3">Reason</th>
                    <th className="px-4 py-3">Date</th>
                    <th className="px-4 py-3">Time</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentAppointments.map((appt) => (
                    <tr key={appt._id} className="border-t border-gray-200">
                      <td className="px-4 py-2">{appt.patient_name}</td>
                      <td className="px-4 py-2">{appt.patient_email}</td>
                      <td className="px-4 py-2">{appt.patient_age}</td>
                      <td className="px-4 py-2">{appt.patient_gender}</td>
                      <td className="px-4 py-2">{appt.reason}</td>
                      <td className="px-4 py-2">{new Date(appt.schedule?.date).toLocaleDateString()}</td>
                      <td className="px-4 py-2">{appt.schedule?.startingTime} - {appt.schedule?.endTime}</td>
                      <td className="px-4 py-2 font-semibold">{appt.status}</td>
                      <td className="px-4 py-2 space-y-1">
                        {appt.status === 'Completed' ? (
                          <Link
                            to="/doctor/addreport"
                            state={{ appointmentId: appt._id }}
                            className="inline-block px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 text-xs"
                          >
                            Add Report
                          </Link>
                        ) : appt.status === 'Cancelled' ? (
                          <span className="text-gray-500 text-xs">No actions</span>
                        ) : (
                          <>
                            <button
                              onClick={() => openCancelModal(appt._id, appt.user_id, appt.patient_email)}
                              className="block w-full px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs mb-1"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => toast.success('Appointment confirmed')}
                              className="block w-full px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 text-xs"
                            >
                              Confirm
                            </button>
                          </>
                        )}
                        <Link
                          to="/doctor/chat"
                          state={{ userId: appt.user_id }}
                          className="block w-full px-3 py-1 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 text-xs mt-1"
                        >
                          Chat
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {totalPages > 1 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}
      </div>

      {/* Cancel Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 shadow-md w-full max-w-md">
            <h2 className="text-lg font-bold mb-4 text-gray-800">Cancel Appointment</h2>
            <textarea
              className="w-full h-24 p-2 border border-gray-300 rounded-md mb-4"
              placeholder="Enter cancellation reason..."
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
              >
                Close
              </button>
              <button
                onClick={handleCancelSubmit}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Docappoinment;
