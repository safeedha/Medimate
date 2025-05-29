import { useEffect, useState } from 'react';
import DoctorSidebar from './Docsidebar';
import { getallappoinment, cancelAppoinment } from '../../api/doctorapi/appoinment';
import { toast, Toaster } from 'react-hot-toast';
import Pagination from '../../component/common/Pgination';  // Your pagination component

function Docappoinment() {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [userid, setUserid] = useState<string | null>(null);
  const [reason, setReason] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [render, setRender] = useState(false);
  const [mail,setMail]=useState<string>('')


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

  const openCancelModal = (id: string, userid: string,email:string) => {
    setSelectedId(id);
    setReason('');
    setShowModal(true);
    setUserid(userid);
    setMail(email)
  };

  const handleCancelSubmit = async () => {
    if (!reason.trim()) {
      toast.error('Reason Required ,Please enter a reason for cancellation.');
      return;
    }
    const result = await cancelAppoinment(selectedId!, reason, userid!,mail);
    if (result === "Status updated") {
      toast.success("Appointment is cancelled, Reason for cancellation mailed to patient mail");
      setRender(!render);
      setShowModal(false);
    }
  };

  // Calculate appointments for the current page
  const indexOfLastAppointment = currentPage * appointmentsPerPage;
  const indexOfFirstAppointment = indexOfLastAppointment - appointmentsPerPage;
  const currentAppointments = appointments.slice(indexOfFirstAppointment, indexOfLastAppointment);

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentAppointments.map((appt, index) => (
                <div
                  key={appt._id || index}
                  className="flex justify-between items-start bg-white shadow-sm border border-gray-200 rounded-xl px-4 py-3 w-full"
                >
                  <div className="text-sm text-gray-700 space-y-0.5">
                    <p><span className="font-medium">Patient Name:</span> {appt.patient_name}</p>
                    <p><span className="font-medium">Email:</span> {appt.patient_email}</p>
                    <p><span className="font-medium">Age:</span> {appt.patient_age}</p>
                    <p><span className="font-medium">Gender:</span> {appt.patient_gender}</p>
                    <p><span className="font-medium">Reason:</span> {appt.reason}</p>
                    {/* <p><span className="font-medium">Status:</span> {appt.status}</p> */}
                    <p><span className="font-medium">Payment:</span> {appt.payment_status}</p>
                    <p><span className="font-medium">Date:</span> {new Date(appt.schedule?.date).toLocaleDateString()}</p>
                    <p><span className="font-medium">Time:</span> {appt.schedule?.startingTime} - {appt.schedule?.endTime}</p>
                  </div>

                  <div className="flex flex-col items-end justify-between ml-4 gap-2">
                    <button
                      className="text-sm bg-red-500 text-white px-5 py-2 rounded hover:bg-red-600 min-w-[90px]"
                      onClick={() => openCancelModal(appt._id, appt.user_id,appt.patient_email)}
                    >
                      Cancel
                    </button>
                    <a
                      href={`/chat/`}
                      className="text-xs text-blue-600 hover:underline"
                    >
                      Chat With patient
                    </a>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
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
            ></textarea>
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
