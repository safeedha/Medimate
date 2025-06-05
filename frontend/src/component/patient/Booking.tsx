import { useEffect, useState } from 'react';
import UserSidebar from './UserSidebar';
import Navbar from './Navbar';
import { getfutureAppoinments, getpasteAppoinments, cancelAppoinment } from '../../api/userapi/appoinment';
import type { Appointment } from '../../Interface/interface';
import Swal from 'sweetalert2';
import { Toaster, toast } from 'react-hot-toast';
import { getReport } from '../../api/userapi/report';
import { useRef } from 'react';

import jsPDF from 'jspdf';

function Booking() {
  const [futur, setFuture] = useState<Appointment[]>([]);
  const [past, setPast] = useState<Appointment[]>([]);
  const[render,setRender]=useState(false)
  const [showModal, setShowModal] = useState(false);
  const [selectedReport, setSelectedReport] = useState<string>('report');
  const [loadingReport, setLoadingReport] = useState(false);
    const reportTemplateRef = useRef(null);
   const handleDownloadPDF = () => {
    const doc = new jsPDF({
       format: 'a4',
      unit: 'px',
    });

      
         doc.setFont('helvetica', 'normal')

     doc.html(reportTemplateRef.current, {
       async callback(doc) {
         await doc.save('document');
       },
    });
   };

//  const handleDownloadPDF = () => {
//   const doc = new jsPDF({
//     format: 'a4',
//     unit: 'px',
//   });

//   doc.setFont('helvetica', 'normal'); // Use default font to ensure compatibility

//   doc.html(reportTemplateRef.current, {
//     x: 10, // horizontal offset
//     y: 10, // vertical offset
//     html2canvas: {
//       scale: 1.5, // better quality
//     },
//     callback(doc) {
//       doc.save('document.pdf');
//     },
//   });
// };
  useEffect(() => {
    const getFutureAppointments = async () => {
      const result = await getfutureAppoinments();
      setFuture(result);
    };
    getFutureAppointments();
  }, [render]);

  useEffect(() => {
    const getPastAppointments = async () => {
      const result = await getpasteAppoinments();
      setPast(result);
    };
    getPastAppointments();
  }, [render]);

  const cancelHandle = async (id: string) => {
    const result = await Swal.fire({
      title: 'Are you sure to cancel this?',
      text: "",
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
        setRender(!render)
      }
    }
  };

  const handleViewReport = async (appointmentId: string) => {
    try {
      setLoadingReport(true);
      const report = await getReport(appointmentId);
      console.log(report.content)
      setSelectedReport(report.content || "No report content found.");
      setShowModal(true);
    } catch (error) {
      toast.error("Failed to fetch report");
    } finally {
      setLoadingReport(false);
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
                        <th className="border px-4 py-2">Appointment Date</th>
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
                            {appointment.status === 'pending' ? (
                              <button
                                onClick={() => cancelHandle(appointment._id!)}
                                className="px-3 py-1 rounded-md text-sm bg-red-500 hover:bg-red-600 text-white"
                              >
                                Cancel
                              </button>
                            ) : appointment.status === 'cancelled' ? (
                              <span className="px-3 py-1 rounded-md text-sm bg-gray-300 text-gray-700 cursor-not-allowed">
                                Cancelled
                              </span>
                            ) : appointment.status === 'completed' ? (
                              appointment.reportAdded === false ? (
                                <span className="px-3 py-1 rounded-md text-sm bg-yellow-100 text-yellow-700">
                                  Report Pending
                                </span>
                              ) : (
                                <button
                                  onClick={() => handleViewReport(appointment._id!)}
                                  className="px-3 py-1 rounded-md text-sm bg-blue-500 text-white hover:bg-blue-600"
                                >
                                  View Report
                                </button>
                              )
                            ) : null}
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

            {showModal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm px-4">
              <div className="relative bg-white rounded-2xl w-full max-w-3xl p-6 md:p-8 shadow-2xl border border-gray-200">
                
                {/* Close Button */}
                <button
                  className="absolute top-4 right-4 text-gray-400 hover:text-red-600 text-2xl font-bold"
                  onClick={() => setShowModal(false)}
                  aria-label="Close"
                >
                  &times;
                </button>

                {/* Title */}
                <h3 className="text-2xl font-bold text-center text-gray-800 mb-4 border-b pb-2">
                  Appointment Report
                </h3>

                {/* Content */}
                <div className="max-h-[60vh] overflow-y-auto custom-scrollbar">
                  {loadingReport ? (
                    <p className="text-center text-gray-500 animate-pulse">Loading report...</p>
                  ) : (
                    <div
                    ref={reportTemplateRef}
                      className="prose max-w-none text-gray-800 "
                      dangerouslySetInnerHTML={{ __html: selectedReport || "<p>No report available.</p>" }}
                    />
                  )}
                    <button
                    onClick={handleDownloadPDF}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                  >
                    Download PDF
                  </button>
                </div>
              </div>
            </div>
          )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Booking;
